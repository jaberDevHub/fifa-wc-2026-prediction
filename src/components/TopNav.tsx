import { Button } from "@/components/ui/button";
import { Trophy, Home, Calendar, Users } from "lucide-react";

export function TopNav() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="FIFA World Cup 2026" 
              className="h-10 w-10 rounded-lg object-cover"
            />
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-foreground">FIFA World Cup 2026</h1>
              <p className="text-xs text-muted-foreground">Bracket Predictor</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Teams
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Schedule
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-2">
              <Trophy className="w-4 h-4" />
              Leaderboard
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex">
              About
            </Button>
            <Button size="sm">
              Start Prediction
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}