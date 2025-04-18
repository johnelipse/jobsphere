// components/CategoryCard.tsx
import Link from "next/link";
import { format } from "date-fns";

interface CategoryCardProps {
  category: {
    id: string;
    title: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    jobs?: any[]; // You can define a proper Job type if needed
  };
  jobCount?: number;
}

export default function CategoryCard({
  category,
  jobCount = 0,
}: CategoryCardProps) {
  return (
    <div className="relative mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white truncate">
            {category.title}
          </h3>
          <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-semibold px-3 py-1 rounded-full">
            {jobCount} {jobCount === 1 ? "Job" : "Jobs"}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4">
          <span className="mr-4">
            Created: {format(new Date(category.createdAt), "MMM d, yyyy")}
          </span>
          <span>
            Updated: {format(new Date(category.updatedAt), "MMM d, yyyy")}
          </span>
        </div>

        <div className="mt-6 flex justify-between items-center">
          <Link
            href={`/categories/${category.slug}`}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition-colors duration-300"
          >
            View Category
          </Link>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            ID: {category.id.substring(0, 8)}...
          </span>
        </div>
      </div>

      <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-indigo-400 to-indigo-600"></div>
    </div>
  );
}
