import {
  createApplication,
  deleteApplication,
  getAllApplications,
  getSingleApplication,
  updateApplication,
} from "@/actions/applications";
import { ApplicationProps } from "@/components/front-end/jobs/application-dialog";

export const applicationservice = {
  getApplications: async () => {
    const applications = await getAllApplications();

    if (!applications) {
      throw new Error("Failed to fetch jobs");
    }
    return applications;
  },
  getApplication: async (id: string) => {
    const application = await getSingleApplication(id);
    if (!application) {
      throw new Error("Failed to fetch job");
    }

    return application;
  },
  update: async (data: any, id: string) => {
    const applicationUpdated = await updateApplication(data, id);
    if (!applicationUpdated) {
      throw new Error("Failed to update application");
    }

    return applicationUpdated;
  },
  delete: async (id: string) => {
    const applicationUpdated = await deleteApplication(id);
    if (!applicationUpdated) {
      throw new Error("Failed to delete application");
    }

    return applicationUpdated;
  },
  create: async (data: ApplicationProps) => {
    const application = await createApplication(data);
    if (!application) {
      throw new Error("Failed to delete application");
    }

    return application;
  },
};
