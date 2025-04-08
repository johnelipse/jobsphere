import { Job } from "@prisma/client";

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
