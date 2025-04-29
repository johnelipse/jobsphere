import { Heart, Wifi } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { getTimeAgo } from "@/lib/getTimeAgo";
import Link from "next/link";
import { JobApplicationDialog } from "./application-dialog";
import { FaHeart } from "react-icons/fa";
import { useIsaved } from "@/hooks/useIsaved";
import { JobCTO } from "@/types/types";

export type NewProps = Omit<JobCTO, "User" | "category" | "applications">;

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  country: string;
  city: string;
  createdAt: Date;
  logo: string;
  daysRemaining?: number | string;
  showSaveButton?: boolean;
  description: string;
  jobType: string;
  refetch?: any;
  isSaved: boolean;
  myJob: NewProps;
}

export function JobCard({
  id,
  title,
  city,
  company,
  country,
  daysRemaining,
  showSaveButton = false,
  description,
  createdAt,
  jobType,
  isSaved,

  myJob,
}: JobCardProps) {
  const { handleSave } = useIsaved((state) => state);

  return (
    <Card className="w-full max-w-md shadow-sm">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between  items-center">
          <div className="flex items-center gap-2">
            <div className="bg-green-100 w-8 h-8 flex items-center justify-center rounded-md">
              <span className="text-green-800 font-medium">J</span>
            </div>
            <span className="text-emerald-700 text-sm font-medium">
              {daysRemaining} days remaining
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleSave(myJob)}
              className="text-gray-500 hover:text-gray-700"
            >
              {isSaved === true ? (
                <FaHeart className="text-[#E71D36]" size={20} />
              ) : (
                <Heart size={20} />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <Link
            href={`/jobs/${id}`}
            className="text-lg font-semibold text-purple-950"
          >
            {title}
          </Link>
          <p className="text-gray-700 text-sm">{company}</p>
          <div className="flex justify-between items-center gap-2 text-gray-600 text-xs font-bold">
            <span className="line-clamp-1 text-[0.61rem]">{`${country}-${city}`}</span>
            <span>•</span>
            <span className="text-xs">{getTimeAgo(createdAt)}</span>
            <span>•</span>
            <div className="flex items-center gap-1 text-xs">
              <Wifi size={14} className="text-gray-500" />
              <span>{jobType}</span>
            </div>
          </div>
        </div>

        <p className="text-sm line-clamp-4 text-gray-700">{description}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <JobApplicationDialog jobId={id} jobTitle={title} />
      </CardFooter>
    </Card>
  );
}
