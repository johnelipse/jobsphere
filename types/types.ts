import { Application, Job } from "@prisma/client";

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string | Date;
  endDate: string | Date;
  reason: string | null;
  status: string;
  approvedBy: string | null;
  remarks: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface CreateCTO {
  slug: string;
  title: string;
}

export interface LeaveFormData {
  leaveType: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

export interface LeaveStatisticsData {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export type JobQueriesResponse = {
  data: Job[];
  error?: string;
};

// For single contact queries
export type SingleJobQueryResponse = {
  data: Job | null;
  error?: string;
};

// For mutation operations
export type MutationJobResponse = {
  success: boolean;
  data?: Job | null;
  error?: string;
};
export type ApplicationQueriesResponse = {
  data: Application[];
  error?: string;
};

// For single contact queries
export type SingleApplicationQueryResponse = {
  data: Application | null;
  error?: string;
};

// For mutation operations
export type MutationApplicationResponse = {
  success: boolean;
  data?: Application | null;
  error?: string;
};

export type CategoryProps = {
  id: string;
  title: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  jobs?: Job[];
};

export type CategoryQueriesResponse = {
  data: CategoryProps[];
  error?: string;
};

// For single contact queries
export type SingleCategoryQueryResponse = {
  data: CategoryProps | null;
  error?: string;
};

// For mutation operations
export type MutationCategoryResponse = {
  success: boolean;
  data?: CategoryProps | null;
  error?: string;
};
