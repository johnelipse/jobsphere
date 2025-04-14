import { ArticleSection } from "@/components/front-end/articles/article-section";
import { CourseSection } from "@/components/front-end/courses/course-section";
import { CareerCoachingBanner } from "@/components/front-end/home/career-coaching-banner";
import { FeaturedArticles } from "@/components/front-end/home/featured-articles";
import { ProfileBanner } from "@/components/front-end/home/profile-banner";
import { WelcomeSection } from "@/components/front-end/home/welcome-section";
import { JobSection } from "@/components/front-end/jobs/job-section";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

// Mock data
const featuredArticles = [
  {
    id: 1,
    title:
      "How Recruitment Platforms Are Shaping the Next Generation of African Leaders",
    image: "https://hrty.vercel.app/zYq-ye",
    author: "African Leaders",
    views: 143,
    comments: 1,
  },
  {
    id: 2,
    title:
      "The Rise of Women Entrepreneurs: Thriving in a Digital-First Economy",
    image: "https://hrty.vercel.app/hSbm9Z",
    views: 158,
    comments: 2,
  },
  {
    id: 3,
    title:
      "The Gender Pay Gap: Are Women in Emerging Industries Fairly Compensated?",
    image: "https://hrty.vercel.app/YfW6Ct",
    views: 115,
    comments: 1,
  },
];

const bestMatchingJobs = [
  {
    id: 1,
    title: "Sales Manager (Log Book Financing Product)",
    company: "Premier Credit Limited",
    location: "Kampala, Uganda",
    logo: "https://hrty.vercel.app/gxP8x4",
    daysRemaining: "5 days remaining",
  },
  {
    id: 2,
    title: "Media Planner",
    company: "WPP Scan Group",
    location: "Kampala, Uganda",
    logo: "https://hrty.vercel.app/qLCnFA",
    daysRemaining: "10 days remaining",
  },
  {
    id: 3,
    title: "Media Buyer",
    company: "WPP Scan Group",
    location: "Kampala, Uganda",
    logo: "https://hrty.vercel.app/ZkbqrC",
    daysRemaining: "10 days remaining",
  },
];

const latestJobs = [
  {
    id: 1,
    title: "Graduate Trainee - IT Applications",
    company: "Housing Finance Group",
    location: "Kampala, Uganda",
    logo: "https://hrty.vercel.app/uEFqB1",
    daysRemaining: "5 days remaining",
  },
  {
    id: 2,
    title: "Graduate Trainee - Software Developer",
    company: "Housing Finance Group",
    location: "Kampala, Uganda",
    logo: "https://hrty.vercel.app/uEFqB1",
    daysRemaining: "3 days remaining",
  },
  {
    id: 3,
    title: "Accountant for an Agribusiness company",
    company: "Harvest Company Ltd",
    location: "Kampala, Uganda",
    logo: "https://hrty.vercel.app/uEFqB1",
    daysRemaining: "Closing today",
  },
  {
    id: 4,
    title: "Bakery Technology Supervisor",
    company: "Uganda Industrial Research Institute",
    location: "Kampala, Uganda",
    logo: "https://hrty.vercel.app/uEFqB1",
    daysRemaining: "2 days remaining",
  },
];

const careerArticles = [
  {
    id: 1,
    title:
      "How Recruitment Platforms Are Shaping the Next Generation of African Leaders",
    image: "https://hrty.vercel.app/Ll4b2h",
    date: "Apr 3, 2023",
    views: 143,
    comments: 1,
  },
  {
    id: 2,
    title:
      "The Rise of Women Entrepreneurs: Thriving in a Digital-First Economy",
    image: "https://hrty.vercel.app/Ll4b2h",
    date: "Apr 5, 2023",
    views: 158,
    comments: 2,
  },
  {
    id: 3,
    title:
      "The Gender Pay Gap: Are Women in Emerging Industries Fairly Compensated?",
    image: "https://hrty.vercel.app/Ll4b2h",
    date: "Mar 28, 2023",
    views: 115,
    comments: 1,
  },
  {
    id: 4,
    title: "Workplace Wellness: How Companies Are Prioritizing Employee Health",
    image: "https://hrty.vercel.app/Ll4b2h",
    date: "Mar 20, 2023",
    views: 98,
    comments: 3,
  },
];

const popularArticles = [
  {
    id: 1,
    title: "Everything You Need to Know About Fuzu",
    image: "https://hrty.vercel.app/Ll4b2h",
    date: "Apr 3, 2023",
    views: 350,
    comments: 5,
  },
  {
    id: 2,
    title: "Get Interviews: 5 Steps to a Perfect Cover Letter",
    image: "https://hrty.vercel.app/Ll4b2h",
    date: "Apr 5, 2023",
    views: 258,
    comments: 3,
  },
  {
    id: 3,
    title: "Salary Negotiation Tips and What You Should Focus On",
    image: "https://hrty.vercel.app/Ll4b2h",
    date: "Mar 28, 2023",
    views: 315,
    comments: 4,
  },
  {
    id: 4,
    title: "Advantages and disadvantages of working online",
    image: "https://hrty.vercel.app/Ll4b2h",
    date: "Mar 20, 2023",
    views: 198,
    comments: 2,
  },
];

const recommendedCourses = [
  {
    id: 1,
    title: "How To Prepare A Successful Job Application",
    image: "https://hrty.vercel.app/Ll4b2h",
    rating: 4.4,
    students: 1794,
  },
  {
    id: 2,
    title: "Steps For Preparing A Stellar Job Application",
    image: "https://hrty.vercel.app/Ll4b2h",
    rating: 4.5,
    students: 2040,
  },
  {
    id: 3,
    title:
      "People & Life Skills | How To Tell About Yourself In A Job Interview",
    image: "https://hrty.vercel.app/Ll4b2h",
    rating: 4.5,
    students: 4356,
  },
  {
    id: 4,
    title: "Preparation Is The Key - Winner's Guide To Job Interview",
    image: "https://hrty.vercel.app/Ll4b2h",
    rating: 4.4,
    students: 1070,
  },
];

const lastChanceJobs = [
  {
    id: 1,
    title: "Internal Controls Officer",
    company: "DFCU Bank",
    location: "Kampala, Uganda",
    logo: "https://hrty.vercel.app/uEFqB1",
  },
  {
    id: 2,
    title: "Agent Banking Consultant",
    company: "DFCU Bank",
    location: "Kampala, Uganda",
    logo: "https://hrty.vercel.app/uEFqB1",
  },
  {
    id: 3,
    title: "Accountant for an Agribusiness company",
    company: "Harvest Company Ltd",
    location: "Kampala, Uganda",
    logo: "https://hrty.vercel.app/uEFqB1",
  },
  {
    id: 4,
    title: "Sales Officers for a bridal wear company",
    company: "Dainelli Company Ltd",
    location: "Kampala, Uganda",
    logo: "https://hrty.vercel.app/uEFqB1",
  },
];

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <WelcomeSection session={session} />
      <FeaturedArticles articles={featuredArticles} />
      <JobSection title="Best matching jobs for you" showProfileCard={true} />
      <ProfileBanner />
      <JobSection title="Latest jobs for you" showSaveButton={true} />
      <CareerCoachingBanner />
      {/* <ArticleSection
        title="Inspiring career tips and stories"
        articles={careerArticles}
      /> */}
      {/* <ArticleSection
        title="Popular articles on Fuzu"
        articles={popularArticles}
      />
      <CourseSection
        title="Recommended courses for your growth"
        courses={recommendedCourses}
      /> */}
      {/* <JobSection title="Be fast! Last chance to apply" showSaveButton={true} /> */}
      <JobSection title="Be fast! Last chance to apply" showSaveButton={true} />
    </div>
  );
}
