"use server";

import { ApplicationProps } from "@/components/front-end/jobs/application-dialog";
import { api } from "@/config/axios";
import { ApplicationProp } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function getAllApplications() {
  try {
    const res = await api.get(`/applications`);
    const applications = res.data.data;
    return applications as ApplicationProp[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getSingleApplication(id: string) {
  try {
    const res = await api.get(`/applications/${id}`);
    const job = res.data.data;
    return job as ApplicationProp;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateApplication(data: any, id: string) {
  try {
    await api.patch(`/applications/${id}`, data, {
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

export async function deleteApplication(id: string) {
  try {
    await api.delete(`/applications/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidatePath("/jobs");
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

export async function createApplication(data: ApplicationProps) {
  try {
    const res = await api.post(`/applications`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/jobs");
    revalidatePath("/dashboard/applications");
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
