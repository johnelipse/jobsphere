import { jobService } from "@/services/job";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export function useJobs() {
  const queryClient = useQueryClient();

  // Query for fetching all contacts
  const jobsQuery = useQuery({
    queryKey: ["jobs"],
    queryFn: () => {
      const data = jobService.getJobs();
      return data;
    },
  });

  return {
    // Queries
    jobs: jobsQuery.data ?? [],
    isLoading: jobsQuery.isLoading,
    error: jobsQuery.error || jobsQuery.error,
  };
}
