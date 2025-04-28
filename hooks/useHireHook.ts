import { invitationService } from "@/services/hire";
import { HireCreateProps } from "@/types/types";
import { toast } from "@mosespace/toast";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

export function useHires() {
  const queryClient = useQueryClient();

  const createHireQuery = useMutation({
    mutationFn: (data: HireCreateProps) => invitationService.create(data),
    onSuccess: () => {
      toast.success("Success", "Invitation submitted successfully.");
      queryClient.invalidateQueries({ queryKey: ["hires"] });
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(
        "error",
        `Failed to create Invitation: ${
          error.message || "Unknown error occurred"
        }`
      );
    },
  });

  // Query for fetching all contacts
  const InvitationsQuery = useSuspenseQuery({
    queryKey: ["hires"],
    queryFn: () => {
      const data = invitationService.getInvitations();
      return data;
    },
  });

  const updateInvitationQuery = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      invitationService.updatedinvitation(data, id),
    onSuccess: () => {
      toast.success("Saved", "Invitation saved successfully");
      queryClient.invalidateQueries({ queryKey: ["hires"] });
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error(
        "Failed",
        `Failed to update invitation: ${
          error.message || "Unknown error occurred"
        }`
      );
    },
  });

  const deleteInvitationQuery = useMutation({
    mutationFn: (id: string) => invitationService.delete(id),
    onSuccess: () => {
      toast.success("Success", "Invitation deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["hires"] });
    },
    onError: (error: Error) => {
      console.log(error);
      toast.error(
        "error",
        `Failed to delete invitation: ${
          error.message || "Unknown error occurred"
        }`
      );
    },
  });

  return {
    // Queries
    Invitations: InvitationsQuery.data ?? [],
    isLoading: InvitationsQuery.isLoading,
    error: InvitationsQuery.error || InvitationsQuery.error,
    refetch: InvitationsQuery.refetch,

    //mutations
    InvitationUpdated: updateInvitationQuery.mutate,
    deletedInvitation: deleteInvitationQuery.mutate,
    createInvitation: createHireQuery.mutateAsync,
    success: createHireQuery.isSuccess,
    isCreating: createHireQuery.isPending,
    isDeleting: deleteInvitationQuery.isPending,
    isUpdating: updateInvitationQuery.isPending,
  };
}
export function useInvitation(id: string) {
  const queryClient = useQueryClient();

  // Query for fetching all contacts
  const singleInvitationQuery = useSuspenseQuery({
    queryKey: ["hires"],
    queryFn: () => {
      const data = invitationService.getinvitation(id);
      return data;
    },
  });

  return {
    // Queries
    invitation: singleInvitationQuery.data ?? null,
    isLoading: singleInvitationQuery.isLoading,
    error: singleInvitationQuery.error || singleInvitationQuery.error,
  };
}
