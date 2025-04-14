"use client";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  country: string;
  city: string;
  logo: string;
  daysRemaining?: number | string;
  showSaveButton?: boolean;
}

export function JobCard({
  id,
  title,
  city,
  company,
  country,
  logo,
  daysRemaining,
  showSaveButton = false,
}: JobCardProps) {
  const router = useRouter();
  function handleRedirect() {
    router.push(`/jobs/${encodeURIComponent(id)}`);
  }

  return (
    <Card
      onClick={() => handleRedirect()}
      className="p-4 relative cursor-pointer"
    >
      {showSaveButton && (
        <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <Heart className="h-5 w-5" />
        </button>
      )}
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center mr-3">
          <Image
            src={logo || "/placeholder.svg"}
            alt={`${company} logo`}
            width={40}
            height={40}
            className="rounded"
          />
        </div>
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          <p className="text-xs text-gray-500">{company}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          <span>
            {country}-{city}
          </span>
        </div>
        {daysRemaining && (
          <div
            className={`text-xs ${
              Number(daysRemaining) < 10
                ? "text-red-500 font-medium"
                : "text-gray-500"
            }`}
          >
            {daysRemaining} days remaining
          </div>
        )}
      </div>
    </Card>
  );
}
