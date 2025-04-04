"use server";

import { api } from "@/config/axios";
import { Job } from "@prisma/client";

export async function getAllJobs() {
  try {
    const res = await api.get(`/jobs`);
    const jobs = res.data.data;
    return jobs as Job[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
