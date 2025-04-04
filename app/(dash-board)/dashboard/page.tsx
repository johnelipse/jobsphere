import { JobOverview } from "@/components/back-end/back-pages/job-overview";

export default async function page() {
  return (
    <div className="w-full pt-6">
      <JobOverview />
    </div>
  );
}
