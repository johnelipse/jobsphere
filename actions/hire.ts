"use server";

import { api } from "@/config/axios";
import { authOptions } from "@/lib/auth";
import { HireCreateProps, HireProps } from "@/types/types";
import { getServerSession } from "next-auth";

export async function getAllInvitations() {
  try {
    const res = await api.get(`/hires`);
    const invitations = res.data.data;
    return invitations as HireProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
export async function getSingleInvitation(id: string) {
  try {
    const res = await api.get(`/hires/${id}`);
    const invitation = res.data.data;
    return invitation as HireProps;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateInvitation(data: any, id: string) {
  try {
    await api.patch(`/hires/${id}`, data, {
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

export async function deleteInvitation(id: string) {
  try {
    await api.delete(`/hires/${id}`, {
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

export async function createInvitation(data: HireCreateProps) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  try {
    const res = await api.post(`/hires`, data, {
      headers: {
        "Content-Type": "application/json",
        userId: userId,
      },
    });

    // revalidatePath("/categories");
    // revalidatePath("/jobs");
    // revalidatePath("/");

    // revalidatePath("/dashboard/jobs");
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
