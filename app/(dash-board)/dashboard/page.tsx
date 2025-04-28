import { getSingleUser } from "@/actions/users";
import { JobOverview } from "@/components/back-end/back-pages/job-overview";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function page() {
  const session = await getServerSession(authOptions);
  const user = await getSingleUser(session?.user.id as string);
  return (
    <div className="w-full pt-6">
      <JobOverview user={user} />
    </div>
  );
}
