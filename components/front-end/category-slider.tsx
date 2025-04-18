"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/categories";
import CategoryCard from "./category-card";
import { useCategories } from "@/hooks/useCategories";

interface CategorySliderProps {
  categories: Category[];
}

export default function CategorySlider({ categories }: CategorySliderProps) {
  const { allCategories } = useCategories();
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  const scrollNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {allCategories?.map((category) => (
              <div
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.33%]"
                key={category.id}
              >
                <CategoryCard
                  category={category}
                  jobCount={(category.jobs ?? []).length}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex absolute -top-5 right-0 justify-end gap-2 mt-4">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="rounded-full border-none"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous slide</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="rounded-full border-none"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next slide</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
