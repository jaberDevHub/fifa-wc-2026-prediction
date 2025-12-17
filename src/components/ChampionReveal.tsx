import { Team } from "@/data/teams";
import { Trophy, X } from "lucide-react";
import { TeamFlag } from "@/components/TeamFlag";

interface ChampionRevealProps {
  champion: Team;
  runnerUp: Team;
  onClose: () => void;
}

export function ChampionReveal({ champion, runnerUp, onClose }: ChampionRevealProps) {
  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in p-4">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="text-center animate-bounce-in max-w-2xl">
        <div className="relative">
          <div className="absolute inset-0 blur-3xl bg-primary/40 rounded-full scale-150" />

          <div className="relative bg-gradient-card border-2 border-primary rounded-3xl p-8 md:p-12 shadow-glow">
            <Trophy className="w-20 h-20 md:w-28 md:h-28 text-primary mx-auto mb-6 animate-pulse-gold" />

            <h2 className="font-display text-xl md:text-2xl text-muted-foreground mb-2">
              FIFA WORLD CUP 2026
            </h2>

            <h1 className="font-display text-5xl md:text-7xl font-bold text-gradient-gold mb-6">
              CHAMPION
            </h1>

            <div className="flex items-center justify-center gap-4 mb-8">
              <TeamFlag countryCode={champion.code} size="lg" />
              <div className="text-left">
                <p className="font-display text-3xl md:text-5xl font-bold text-foreground">
                  {champion.name}
                </p>
                <p className="text-lg text-primary">
                  World Cup Winner 🏆
                </p>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <p className="text-sm text-muted-foreground mb-2">Runner-up</p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-full">
                <TeamFlag countryCode={runnerUp.code} size="md" />
                <span className="text-foreground font-medium">{runnerUp.name}</span>
                <span className="text-muted-foreground">🥈</span>
              </div>
            </div>

            <div className="mt-8 flex justify-center gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary animate-pulse"
                  style={{ animationDelay: `${i * 200}ms` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
