import { JobOverview } from "@/components/back-end/back-pages/job-overview";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function page() {
  
  return (
    <div className="w-full pt-6">
      <JobOverview />
    </div>
  );
}
