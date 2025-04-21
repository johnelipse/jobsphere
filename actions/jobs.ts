"use server";

import { api } from "@/config/axios";
import { JobCreateCTO } from "@/types/types";
import { Job } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
export async function getSingleJob(id: string) {
  try {
    const res = await api.get(`/jobs/${id}`);
    const job = res.data.data;
    return job as Job;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateJob(data: any, id: string) {
  try {
    await api.patch(`/jobs/${id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}

export async function deleteJob(id: string) {
  try {
    await api.delete(`/jobs/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}

export async function createJob(data: JobCreateCTO) {
  try {
    const res = await api.post(`/jobs`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/categories");
    revalidatePath("/jobs");
    revalidatePath("/");

    revalidatePath("/dashboard/jobs");
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
    };
  }
}
