import { Team } from "@/data/teams";
import { Trophy } from "lucide-react";
import { TeamFlag } from "@/components/TeamFlag";

interface KnockoutMatchSelectorProps {
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
  onSelectWinner: (team: Team) => void;
  round: string;
  matchNumber: number;
  isFinal?: boolean;
  isThirdPlace?: boolean;
  animationDelay?: number;
}

export function KnockoutMatchSelector({
  team1,
  team2,
  winner,
  onSelectWinner,
  round,
  matchNumber,
  isFinal = false,
  isThirdPlace = false,
  animationDelay = 0,
}: KnockoutMatchSelectorProps) {
  const bothTeamsReady = team1 && team2;

  if (!team1 && !team2) {
    return (
      <div
        className="bg-muted/20 rounded-lg border border-border/30 p-3 w-full opacity-40"
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div className="text-xs text-muted-foreground mb-2">{round}</div>
        <div className="space-y-2">
          <div className="h-10 bg-muted/30 rounded animate-pulse" />
          <div className="h-10 bg-muted/30 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border overflow-hidden animate-scale-in ${
        isFinal
          ? "bg-gradient-to-b from-primary/20 to-card border-primary/50 shadow-glow"
          : isThirdPlace
          ? "bg-gradient-card border-border"
          : "bg-gradient-card border-border shadow-card"
      }`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className={`px-3 py-2 border-b flex items-center gap-2 ${
        isFinal ? "border-primary/30 bg-primary/10" : "border-border bg-muted/30"
      }`}>
        {isFinal && <Trophy className="w-4 h-4 text-primary" />}
        <span className={`text-xs font-medium ${isFinal ? "text-primary" : "text-muted-foreground"}`}>
          {round}
        </span>
      </div>

      <div className="p-2 space-y-2">
        {[team1, team2].map((team, idx) => {
          if (!team) {
            return (
              <div
                key={idx}
                className="flex items-center gap-2 p-2 rounded-lg bg-muted/20 border border-dashed border-border/50"
              >
                <div className="w-8 h-8 rounded-full bg-muted/30 flex items-center justify-center text-muted-foreground text-lg">
                  ?
                </div>
                <span className="text-sm text-muted-foreground">TBD</span>
              </div>
            );
          }

          const isWinner = winner?.code === team.code;
          const isLoser = winner && winner.code !== team.code;
          const canSelect = bothTeamsReady && !winner;

          return (
            <button
              key={team.code}
              onClick={() => canSelect && onSelectWinner(team)}
              disabled={!canSelect}
              className={`w-full flex items-center gap-3 p-2 rounded-lg transition-all duration-200 ${
                isWinner
                  ? isFinal
                    ? "bg-primary/30 border-2 border-primary"
                    : "bg-secondary/30 border-2 border-secondary"
                  : isLoser
                  ? "bg-muted/20 border border-border/30 opacity-40"
                  : canSelect
                  ? "bg-muted/30 border border-border/50 hover:bg-muted/50 hover:border-primary/50 cursor-pointer"
                  : "bg-muted/30 border border-border/50"
              }`}
            >
              <TeamFlag countryCode={team.code} size="lg" />
              <div className="flex-1 text-left">
                <span className={`font-medium text-sm ${isWinner ? (isFinal ? "text-primary" : "text-secondary") : "text-foreground"}`}>
                  {team.name}
                </span>
              </div>
              {isWinner && (
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  isFinal ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}>
                  <Trophy className="w-3 h-3" />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {bothTeamsReady && !winner && (
        <div className="px-3 py-2 bg-accent/10 border-t border-accent/30 text-center">
          <span className="text-xs text-accent">Click a team to advance</span>
        </div>
      )}
    </div>
  );
}
