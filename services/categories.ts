import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "@/actions/categories";
import { CreateCTO } from "@/types/types";

export const categoryServices = {
  getCategories: async () => {
    const categories = await getAllCategories();
    if (!categories) {
      throw new Error("Categories not found");
    }
    return categories;
  },
  getCategory: async (slug: string) => {
    const category = await getSingleCategory(slug);
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  },
  delete: async (slug: string) => {
    const categoryDeleted = await deleteCategory(slug);
    if (!categoryDeleted) {
      throw new Error("Failed to delete application");
    }

    return categoryDeleted;
  },
  update: async (data: any, slug: string) => {
    const categoryUpdated = await updateCategory(data, slug);
    if (!categoryUpdated) {
      throw new Error("Failed to update category.");
    }

    return categoryUpdated;
  },
  create: async (data: CreateCTO) => {
    const newCat = await createCategory(data);
    if (!newCat) {
      throw new Error("Failed to delete application");
    }

    return newCat;
  },
};
