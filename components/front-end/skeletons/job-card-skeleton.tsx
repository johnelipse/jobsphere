import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function JobCardSkeleton() {
  return (
    <Card className="w-full max-w-md shadow-sm">
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 animate-pulse w-8 h-8 rounded-md"></div>
            <div className="bg-gray-200 animate-pulse h-5 w-12 rounded"></div>
          </div>
          <div className="flex gap-2">
            <div className="bg-gray-200 animate-pulse w-5 h-5 rounded-full"></div>
            <div className="bg-gray-200 animate-pulse w-5 h-5 rounded-full"></div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="bg-gray-200 animate-pulse h-6 w-3/4 rounded"></div>
          <div className="bg-gray-200 animate-pulse h-4 w-1/2 rounded"></div>
          <div className="flex items-center gap-2">
            <div className="bg-gray-200 animate-pulse h-4 w-24 rounded"></div>
            <div className="bg-gray-200 animate-pulse h-4 w-4 rounded-full"></div>
            <div className="bg-gray-200 animate-pulse h-4 w-16 rounded"></div>
            <div className="bg-gray-200 animate-pulse h-4 w-4 rounded-full"></div>
            <div className="bg-gray-200 animate-pulse h-4 w-20 rounded"></div>
          </div>
        </div>

        <div className="space-y-1">
          <div className="bg-gray-200 animate-pulse h-4 w-full rounded"></div>
          <div className="bg-gray-200 animate-pulse h-4 w-full rounded"></div>
          <div className="bg-gray-200 animate-pulse h-4 w-3/4 rounded"></div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="bg-gray-200 animate-pulse h-10 w-full rounded"></div>
      </CardFooter>
    </Card>
  );
}

export function JobCardSkeletonArray() {
  const skeletonCount = 12;
  const skeletonArray = Array.from(
    { length: skeletonCount },
    (_, index) => index
  );
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4`}>
      {skeletonArray.map((index) => (
        <JobCardSkeleton key={`skeleton-${index}`} />
      ))}
    </div>
  );
}
