import { ApplicationProps } from "@/components/front-end/jobs/application-dialog";
import { applicationservice } from "@/services/application";
import { toast } from "@mosespace/toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useApplications() {
  const queryClient = useQueryClient();
  const createApplicationQuery = useMutation({
    mutationFn: (data: ApplicationProps) => applicationservice.create(data),
    onSuccess: () => {
      toast.success("Success", "Application submitted successfully.");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error: Error) => {
      if (error.message === "You have already applied.") {
        toast.error("error", "You have already applied.");
      } else {
        console.log(error);
        toast.error(
          "error",
          `Failed to create Application: ${
            error.message || "Unknown error occurred"
          }`
        );
      }
    },
  });
  // Query for fetching all contacts
  const applicationsQuery = useQuery({
    queryKey: ["applications"],
    queryFn: () => {
      const applications = applicationservice.getApplications();
      console.log(applications);
      return applications;
    },
  });

  const updateApplicationQuery = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      applicationservice.update(data, id),
    onSuccess: () => {
      toast.success("Success", "Application updated successfully");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(
        "error",
        `Failed to update Application: ${
          error.message || "Unknown error occurred"
        }`
      );
    },
  });

  const deleteApplicationQuery = useMutation({
    mutationFn: (id: string) => applicationservice.delete(id),
    onSuccess: () => {
      toast.success("Success", "Applications deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(
        "error",
        `Failed to delete job: ${error.message || "Unknown error occurred"}`
      );
    },
  });

  return {
    // Queries
    applications: applicationsQuery.data ?? [],
    isLoading: applicationsQuery.isLoading,
    error: applicationsQuery.error || applicationsQuery.error,

    //mutations
    applicationUpdated: updateApplicationQuery.mutate,
    deletedApplication: deleteApplicationQuery.mutate,
    applicationCreated: createApplicationQuery.mutate,
    isDeleting: deleteApplicationQuery.isPending,
    isUpdating: updateApplicationQuery.isPending,
    isCreating: createApplicationQuery.isPending,
    isCreated: createApplicationQuery.isSuccess,
  };
}
export function useApplication(id: string) {
  const queryClient = useQueryClient();

  // Query for fetching all contacts
  const singleApplicationQuery = useQuery({
    queryKey: ["applications"],
    queryFn: () => {
      const data = applicationservice.getApplication(id);
      return data;
    },
  });

  return {
    // Queries
    job: singleApplicationQuery.data ?? null,
    isLoading: singleApplicationQuery.isLoading,
    error: singleApplicationQuery.error || singleApplicationQuery.error,
  };
}
