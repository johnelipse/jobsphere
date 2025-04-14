import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CourseCardProps {
  id: number;
  title: string;
  image: string;
  rating: number;
  students: number;
}

export function CourseCard({
  id,
  title,
  image,
  rating,
  students,
}: CourseCardProps) {
  return (
    <Card className="overflow-hidden relative">
      <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 z-10">
        <Heart className="h-5 w-5" />
      </button>
      <div className="relative h-40">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={160}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-sm mb-2">{title}</h3>
        <div className="flex items-center mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-3 w-3 ${
                star <= rating
                  ? "fill-amber-400 text-amber-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs ml-1">{rating.toFixed(1)}</span>
        </div>
        <div className="text-xs text-gray-500">{students} Students</div>
      </div>
    </Card>
  );
}
