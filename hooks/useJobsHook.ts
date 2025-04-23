import { jobService } from "@/services/job";
import { JobCreateCTO } from "@/types/types";
import { toast } from "@mosespace/toast";
import {
  useMutation,
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useJobs() {
  const queryClient = useQueryClient();

  const createJobQuery = useMutation({
    mutationFn: (data: JobCreateCTO) => jobService.create(data),
    onSuccess: () => {
      toast.success("Success", "Job submitted successfully.");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
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

  // Query for fetching all contacts
  const jobsQuery = useSuspenseQuery({
    queryKey: ["jobs"],
    queryFn: () => {
      const data = jobService.getJobs();
      return data;
    },
  });

  const updateJobQuery = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      jobService.updatedJob(data, id),
    onSuccess: (data) => {
      // console.log("Data ✅:", data);
      // Check the 'ok' property of the result object
      if (data.data.favourites === true) {
        toast.success("Saved", "Job saved successfully");
      } else {
        toast.success("Updated", "Job updated successfully");
      }

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error(
        "Failed",
        `Failed to update job: ${error.message || "Unknown error occurred"}`
      );
    },
  });

  const deleteJobQuery = useMutation({
    mutationFn: (id: string) => jobService.delete(id),
    onSuccess: () => {
      toast.success("Success", "Job deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["jobs"] });
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
    jobs: jobsQuery.data ?? [],
    isLoading: jobsQuery.isLoading,
    error: jobsQuery.error || jobsQuery.error,
    refetch: jobsQuery.refetch,

    //mutations
    jobUpdated: updateJobQuery.mutate,
    deletedJob: deleteJobQuery.mutate,
    createJob: createJobQuery.mutate,
    success: createJobQuery.isSuccess,
    isCreating: createJobQuery.isPending,
    isDeleting: deleteJobQuery.isPending,
    isUpdating: updateJobQuery.isPending,
  };
}
export function useJob(id: string) {
  const queryClient = useQueryClient();

  // Query for fetching all contacts
  const singleJobQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: () => {
      const data = jobService.getJob(id);
      return data;
    },
  });

  return {
    // Queries
    job: singleJobQuery.data ?? null,
    isLoading: singleJobQuery.isLoading,
    error: singleJobQuery.error || singleJobQuery.error,
  };
}
