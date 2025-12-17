import heroImage from "@/assets/world-cup-hero.jpg";
import { Trophy } from "lucide-react";

export function TournamentHeader() {
  return (
    <header className="relative overflow-hidden rounded-2xl mb-8">
      {/* Hero Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="FIFA World Cup 2026"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-12 md:py-20 text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-sm">
          <span className="text-xl">🇺🇸</span>
          <span className="text-xl">🇲🇽</span>
          <span className="text-xl">🇨🇦</span>
          <span className="text-sm text-primary font-medium">Host Nations</span>
        </div>

        <div className="flex items-center justify-center gap-4 mb-4">
          <Trophy className="w-10 h-10 md:w-14 md:h-14 text-primary animate-pulse-gold" />
          <h1 className="font-display text-4xl md:text-7xl font-bold text-gradient-gold tracking-tight">
            FIFA WORLD CUP
          </h1>
          <Trophy className="w-10 h-10 md:w-14 md:h-14 text-primary animate-pulse-gold" />
        </div>

        <div className="font-display text-5xl md:text-8xl font-bold text-foreground mb-4">
          2026
        </div>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          48 Teams • 12 Groups • Build Your Bracket
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <span className="px-3 py-1 bg-muted/50 rounded-full text-sm text-muted-foreground backdrop-blur-sm">
            Round of 32
          </span>
          <span className="px-3 py-1 bg-muted/50 rounded-full text-sm text-muted-foreground backdrop-blur-sm">
            Quarter Finals
          </span>
          <span className="px-3 py-1 bg-muted/50 rounded-full text-sm text-muted-foreground backdrop-blur-sm">
            Semi Finals
          </span>
          <span className="px-3 py-1 bg-primary/30 rounded-full text-sm text-primary font-medium backdrop-blur-sm">
            Final
          </span>
        </div>
      </div>
    </header>
  );
}
