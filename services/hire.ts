import {
  createInvitation,
  deleteInvitation,
  getAllInvitations,
  getSingleInvitation,
  updateInvitation,
} from "@/actions/hire";
import { HireCreateProps } from "@/types/types";

export const invitationService = {
  getInvitations: async () => {
    const invitations = await getAllInvitations();

    if (!invitations) {
      throw new Error("Failed to fetch invitations");
    }
    return invitations;
  },
  getinvitation: async (id: string) => {
    const invitation = await getSingleInvitation(id);
    if (!invitation) {
      throw new Error("Failed to fetch invitation");
    }

    return invitation;
  },
  updatedinvitation: async (data: any, id: string) => {
    const invitationUpdated = await updateInvitation(data, id);
    if (!invitationUpdated) {
      throw new Error("Failed to update invitation");
    }

    return invitationUpdated;
  },
  delete: async (id: string) => {
    const invitationDeleted = await deleteInvitation(id);
    if (!invitationDeleted) {
      throw new Error("Failed to delete invitation");
    }

    return invitationDeleted;
  },
  create: async (data: HireCreateProps) => {
    const newinvitation = await createInvitation(data);
    if (!newinvitation) {
      throw new Error("Failed to create invitation");
    }

    return newinvitation;
  },
};
