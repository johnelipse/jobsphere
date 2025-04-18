import CategorySlider from "@/components/front-end/category-slider";
import { ProfileBanner } from "@/components/front-end/home/profile-banner";
import { WelcomeSection } from "@/components/front-end/home/welcome-section";
import { JobSection } from "@/components/front-end/jobs/job-section";
import { LatestJobSection } from "@/components/front-end/jobs/latest-jobs";
import { authOptions } from "@/lib/auth";
import { categories } from "@/lib/categories";
import { getServerSession } from "next-auth";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <WelcomeSection session={session} />

      <JobSection title="Best matching jobs for you" showProfileCard={true} />

      <ProfileBanner />

      <CategorySlider categories={categories} />

      <LatestJobSection title="Latest jobs for you" showSaveButton={true} />

      {/* <CareerCoachingBanner /> */}
    </div>
  );
}
