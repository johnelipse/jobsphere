import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
}

export function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {/* <div className="flex items-center space-x-2">
        <Button variant="ghost" size="sm" className="text-xs text-blue-600">
          See all
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div> */}
    </div>
  );
}
