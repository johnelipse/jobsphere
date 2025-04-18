// job-matching-service.ts
import { db } from "@/lib/db";
import { User, Job } from "@prisma/client";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface JobMatch {
  job: Job;
  score: number;
  matchReasons: string[];
}

export class JobMatchingService {
  /**
   * Get job recommendations for a specific user
   */
  async getJobRecommendations(
    userId: string,
    limit: number = 10
  ): Promise<JobMatch[]> {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: {
        applications: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Get all active jobs
    const jobs = await db.job.findMany({
      where: {
        status: "active",
        deadline: { gte: new Date() },
      },
      include: {
        category: true,
      },
    });

    // Filter out jobs user has already applied to
    const appliedJobIds = user.applications.map((app) => app.jobId);
    const unappliedJobs = jobs.filter((job) => !appliedJobIds.includes(job.id));

    // Calculate match scores for each job
    const jobMatches: JobMatch[] = await Promise.all(
      unappliedJobs.map(async (job) => {
        const score = await this.calculateMatchScore(user, job);
        const matchReasons = await this.generateMatchReasons(user, job);
        return { job, score, matchReasons };
      })
    );

    // Sort by score and return top matches
    return jobMatches.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  /**
   * Calculate similarity score between user and job
   */
  private async calculateMatchScore(user: User, job: Job): Promise<number> {
    let score = 0;

    // Skills matching (highest weight)
    const userSkills = user.skills || [];
    const requiredSkills = job.requiredSkills || [];

    // Calculate skill overlap
    const skillOverlap = userSkills.filter((skill) =>
      requiredSkills.some(
        (reqSkill) =>
          reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(reqSkill.toLowerCase())
      )
    ).length;

    // Normalize skill score (0-50 points)
    const skillScore =
      requiredSkills.length > 0
        ? (skillOverlap / requiredSkills.length) * 50
        : 0;
    score += skillScore;

    // Experience level matching (0-20 points)
    if (user.headline && job.experience) {
      const experienceKeywords = {
        entry: ["entry", "junior", "graduate", "intern"],
        mid: ["mid", "intermediate", "associate"],
        senior: ["senior", "lead", "manager", "expert"],
        executive: ["executive", "director", "head", "chief", "vp"],
      };

      const userHeadline = user.headline.toLowerCase();
      const matchingLevel = experienceKeywords[job.experience].some((keyword) =>
        userHeadline.includes(keyword)
      );

      if (matchingLevel) {
        score += 20;
      }
    }

    // Location matching (0-15 points)
    if (job.jobType !== "REMOTE" && user.city && job.city) {
      const sameCity = user.city.toLowerCase() === job.city.toLowerCase();
      const sameCountry =
        user.country?.toLowerCase() === job.country?.toLowerCase();

      if (sameCity) score += 15;
      else if (sameCountry) score += 7;
    } else if (job.jobType === "REMOTE") {
      score += 10; // Remote jobs get a bonus as they're location-independent
    }

    // Use AI to analyze job description and user summary for semantic matching (0-15 points)
    if (user.summary && job.description) {
      const semanticScore = await this.calculateSemanticSimilarity(
        user.summary,
        job.description
      );
      score += semanticScore * 15;
    }

    return Math.min(100, score); // Cap score at 100
  }

  /**
   * Calculate semantic similarity between two texts using embeddings
   */
  private async calculateSemanticSimilarity(
    text1: string,
    text2: string
  ): Promise<number> {
    try {
      // Get embeddings for both texts
      const [embedding1Response, embedding2Response] = await Promise.all([
        openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: text1.slice(0, 1000), // Limit input size
        }),
        openai.embeddings.create({
          model: "text-embedding-ada-002",
          input: text2.slice(0, 1000), // Limit input size
        }),
      ]);

      const embedding1 = embedding1Response.data[0].embedding;
      const embedding2 = embedding2Response.data[0].embedding;

      // Calculate cosine similarity
      return this.cosineSimilarity(embedding1, embedding2);
    } catch (error) {
      console.error("Error calculating semantic similarity:", error);
      return 0;
    }
  }

  /**
   * Calculate cosine similarity between two vectors
   */
  private cosineSimilarity(vec1: number[], vec2: number[]): number {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));

    if (mag1 === 0 || mag2 === 0) return 0;
    return dotProduct / (mag1 * mag2);
  }

  /**
   * Generate human-readable reasons for this match
   */
  private async generateMatchReasons(user: User, job: Job): Promise<string[]> {
    const reasons: string[] = [];

    // Skills matching
    const userSkills = user.skills || [];
    const requiredSkills = job.requiredSkills || [];
    const matchingSkills = userSkills.filter((skill) =>
      requiredSkills.some(
        (reqSkill) =>
          reqSkill.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(reqSkill.toLowerCase())
      )
    );

    if (matchingSkills.length > 0) {
      reasons.push(
        `You have ${
          matchingSkills.length
        } matching skills: ${matchingSkills.join(", ")}`
      );
    }

    // Job type matching
    if (job.jobType === "REMOTE") {
      reasons.push("This is a remote job");
    } else if (user.city?.toLowerCase() === job.city?.toLowerCase()) {
      reasons.push(`This job is in your city (${job.city})`);
    }

    // Experience level
    if (job.experience) {
      reasons.push(`This job requires ${job.experience}-level experience`);
    }

    // Salary information
    if (job.salary) {
      reasons.push(`Salary: $${job.salary.toLocaleString()}`);
    }

    return reasons;
  }

  /**
   * Find suitable candidates for a specific job
   */
  async findCandidatesForJob(
    jobId: string,
    limit: number = 10
  ): Promise<{ user: User; score: number; matchReasons: string[] }[]> {
    const job = await db.job.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      throw new Error("Job not found");
    }

    // Get all users with role USER
    const users = await db.user.findMany({
      where: {
        role: "USER",
        isMachine: false,
      },
    });

    // Calculate match scores for each user
    const candidateMatches = await Promise.all(
      users.map(async (user) => {
        const score = await this.calculateMatchScore(user, job);
        const matchReasons = await this.generateMatchReasons(user, job);
        return { user, score, matchReasons };
      })
    );

    // Sort by score and return top matches
    return candidateMatches.sort((a, b) => b.score - a.score).slice(0, limit);
  }
}
