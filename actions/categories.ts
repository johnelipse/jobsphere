"use server";

import { api } from "@/config/axios";
import { CategoryProps, CreateCTO } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function getAllCategories() {
  try {
    const res = await api.get(`/categories`);
    const categories = res.data.data;
    return categories as CategoryProps[];
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getSingleCategory(slug: string) {
  try {
    const res = await api.get(`/categories/${slug}`);
    const category = res.data.data;
    return category as CategoryProps;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteCategory(slug: string) {
  try {
    await api.delete(`/categories/${slug}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    revalidatePath("/dashboard/categories");

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

export async function updateCategory(data: any, slug: string) {
  try {
    await api.patch(`/categories/${slug}`, data, {
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

export async function createCategory(data: CreateCTO) {
  try {
    const res = await api.post(`/categories`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    revalidatePath("/categories");
    revalidatePath("/jobs");
    revalidatePath("/");

    revalidatePath("/dashboard/categories");
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
