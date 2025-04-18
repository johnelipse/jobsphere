"use client";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileBanner() {
  const router = useRouter();
  function handleRedirect() {
    router.push("/update");
  }
  return (
    <div className="bg-gray-100 p-4 rounded-md mb-8 flex items-center justify-between">
      <div className="text-sm">
        <span className="font-medium">
          Want better recommendations? Build Fuzu Profile!
        </span>{" "}
        You can also set your profile visible to employers and get headhunted!
      </div>
      <Button
        onClick={() => handleRedirect()}
        variant="link"
        className="text-blue-600 text-sm"
      >
        Build profile <ChevronRight className="h-3 w-3 ml-1" />
      </Button>
    </div>
  );
}
