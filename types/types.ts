import {
  Application,
  Category,
  ExperienceLevel,
  Job,
  JobType,
  Status,
  StatusTypes,
  User,
} from "@prisma/client";

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
export interface JobCreateCTO {
  title: string;
  salary: number;
  jobType: JobType;
  requiredSkills: string[];
  deadline: Date;
  categoryId: string;
  experience?: ExperienceLevel | undefined;
}

export interface JobCTO {
  id: string;
  title: string;
  isSaved: boolean | null;
  description: string | null;
  company: string | null;
  salary: number;
  jobType: JobType | null;
  experience: ExperienceLevel | null;
  city: string | null;
  country: string | null;
  status: StatusTypes | null;
  requiredSkills: string[];
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
  User: User | null;
  userId: string | null;

  category: Category | null;
  categoryId: string | null;

  applications: Application[];
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

export interface ApplicationProp {
  id: string;
  job: Job;
  jobId: string;

  applicant: User;
  applicantId: string;

  coverLetter: string | null;
  resume: string | null;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export type JobQueriesResponse = {
  data: JobCTO[];
  error?: string;
};

// For single contact queries
export type SingleJobQueryResponse = {
  data: JobCTO | null;
  error?: string;
};

// For mutation operations
export type MutationJobResponse = {
  success: boolean;
  data?: Job | null;
  error?: string;
};
export type ApplicationQueriesResponse = {
  data: ApplicationProp[];
  error?: string;
};

// For single contact queries
export type SingleApplicationQueryResponse = {
  data: ApplicationProp | null;
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

export interface HireCreateProps {
  jobTitle: string;
  startDate: Date;
  employmentType: JobType;
  salaryOffered: number;
  employerId: string;
  applicantId: string;
}
export interface HireCreateCTO {
  id: string;
  jobTitle: string;
  startDate: Date;
  employmentType: JobType;
  salaryOffered: number;
  employerId: string;
  applicantId: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface HireProps {
  id: string;
  jobTitle: string;
  startDate: Date;
  employmentType: JobType;
  salaryOffered: number;
  employerId: string;
  User: User;
  applicantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type HireQueriesResponse = {
  data: HireProps[];
  error?: string;
};

// For single contact queries
export type SingleHireQueryResponse = {
  data: HireProps | null;
  error?: string;
};

// For mutation operations
export type MutationHireResponse = {
  success: boolean;
  data?: HireCreateCTO | null;
  error?: string;
};
