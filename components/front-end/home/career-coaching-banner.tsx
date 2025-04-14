import Image from "next/image";
import { Button } from "@/components/ui/button";

export function CareerCoachingBanner() {
  return (
    <div className="bg-gray-900 rounded-md mb-8 overflow-hidden relative">
      <div className="p-6 md:p-8 max-w-lg relative z-10">
        <h2 className="text-white text-xl font-semibold mb-2">
          Lost with your career?
        </h2>
        <p className="text-gray-300 text-sm mb-4">
          Want to make more money? Our Certified Career Coaches will provide you
          with effective salary negotiation tactics.
        </p>
        <Button className="bg-teal-500 hover:bg-teal-600 text-white">
          Get Career Coaching
        </Button>
      </div>
      <div className="absolute right-0 bottom-0 w-1/3 h-full hidden md:block">
        <Image
          src="/placeholder.svg?height=200&width=300"
          alt="Career coaching"
          width={300}
          height={200}
          className="object-cover h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=10&width=10')] opacity-10"></div>
    </div>
  );
}
