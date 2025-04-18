import { categoryServices } from "@/services/categories";
import { CreateCTO } from "@/types/types";
import { toast } from "@mosespace/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCategories() {
  const queryClient = useQueryClient();

  const createCatQuery = useMutation({
    mutationFn: (data: CreateCTO) => categoryServices.create(data),
    onSuccess: () => {
      toast.success("Success", "Category submitted successfully.");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(
        "error",
        `Failed to create Category: ${
          error.message || "Unknown error occurred"
        }`
      );
    },
  });

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      const categories = categoryServices.getCategories();
      return categories;
    },
  });

  const deleteCatQuery = useMutation({
    mutationFn: (slug: string) => categoryServices.delete(slug),
    onSuccess: () => {
      toast.success("Success", "Category deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(
        "error",
        `Failed to delete Category: ${
          error.message || "Unknown error occurred"
        }`
      );
    },
  });

  const updateCategoryQuery = useMutation({
    mutationFn: ({ slug, data }: { slug: string; data: any }) =>
      categoryServices.update(data, slug),
    onSuccess: () => {
      toast.success("Success", "Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(
        "error",
        `Failed to update category: ${
          error.message || "Unknown error occurred"
        }`
      );
    },
  });

  return {
    allCategories: categoryQuery.data || [],
    isLoading: categoryQuery.isLoading,
    error: categoryQuery.error,

    deletedCategory: deleteCatQuery.mutate,
    categoryUpdated: updateCategoryQuery.mutate,
    createCat: createCatQuery.mutate,
    isDeleting: deleteCatQuery.isPending,
    isCreating: createCatQuery.isPending,
    isUpdating: updateCategoryQuery.isPending,
  };
}

export function useCategory(slug: string) {
  const queryClient = useQueryClient();
  const singleCatQuery = useQuery({
    queryKey: ["categories"],
    queryFn: () => {
      const category = categoryServices.getCategory(slug);
      return category;
    },
  });

  return {
    category: singleCatQuery.data || null,
    isLoading: singleCatQuery.isLoading,
    error: singleCatQuery.error,
  };
}
