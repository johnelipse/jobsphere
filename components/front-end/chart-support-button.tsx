import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ChatSupportButton() {
  return (
    <div className="fixed bottom-6 left-6 z-20">
      <Button className="bg-amber-400 hover:bg-amber-500 text-black rounded-full flex items-center gap-2 px-4">
        <MessageCircle className="h-5 w-5" />
        Chat with our Support
      </Button>
    </div>
  );
}
