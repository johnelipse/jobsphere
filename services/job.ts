import { getAllJobs } from "@/actions/jobs";

export const jobService = {
  getJobs: async () => {
    const jobs = await getAllJobs();
    // console.log(jobs);
    if (!jobs) {
      throw new Error("Failed to fetch items");
    }
    return jobs;
  },
};
