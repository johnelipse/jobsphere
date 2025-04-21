import {
  createJob,
  deleteJob,
  getAllJobs,
  getSingleJob,
  updateJob,
} from "@/actions/jobs";
import { JobCreateCTO } from "@/types/types";

export const jobService = {
  getJobs: async () => {
    const jobs = await getAllJobs();

    if (!jobs) {
      throw new Error("Failed to fetch jobs");
    }
    return jobs;
  },
  getJob: async (id: string) => {
    const job = await getSingleJob(id);
    if (!job) {
      throw new Error("Failed to fetch job");
    }

    return job;
  },
  updatedJob: async (data: any, id: string) => {
    const jobUpdated = await updateJob(data, id);
    if (!jobUpdated) {
      throw new Error("Failed to update job");
    }

    return jobUpdated;
  },
  delete: async (id: string) => {
    const jobUpdated = await deleteJob(id);
    if (!jobUpdated) {
      throw new Error("Failed to delete job");
    }

    return jobUpdated;
  },
  create: async (data: JobCreateCTO) => {
    const newJob = await createJob(data);
    if (!newJob) {
      throw new Error("Failed to delete application");
    }

    return newJob;
  },
};
