import { User, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Session } from "next-auth";

interface WelcomeSectionProps {
  session: Session | null;
}

export function WelcomeSection({ session }: WelcomeSectionProps) {
  return (
    <div className="flex items-center mb-8">
      <div className="mr-4">
        <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center">
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt="profile"
              className="w-full h-full"
            />
          ) : (
            <User className="h-6 w-6 text-white" />
          )}
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold">
          Welcome back, {session?.user.name}!
        </h1>
        <div className="flex items-center space-x-4 text-sm">
          <p className="text-muted-foreground">{session?.user.email}</p>
          {/* <Badge
            variant="outline"
            className="bg-red-100 text-red-600 border-red-200 flex items-center gap-1 px-2 py-0.5 rounded-sm font-normal"
          >
            <span className="text-xs">●</span> {level}
          </Badge>
          <div className="flex items-center gap-1 text-gray-600">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span>{points} Fuzu points</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
