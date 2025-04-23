"use server";

import { api } from "@/config/axios";
import { JobCreateCTO, JobCTO } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function getAllJobs() {
  try {
    const res = await api.get(`/jobs`);
    const jobs = res.data.data;
    return jobs as JobCTO[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getSingleJob(id: string) {
  try {
    const res = await api.get(`/jobs/${id}`);
    const job = res.data.data;
    return job as JobCTO;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateJob(data: any, id: string) {
  const { favourites, ...dataToApi } = data;

  try {
    await api.patch(`/jobs/${id}`, dataToApi, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return {
      ok: true,
      data,
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
