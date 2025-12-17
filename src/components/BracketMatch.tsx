import { Team } from "@/data/teams";
import { MatchResult } from "@/utils/simulation";
import { TeamFlag } from "@/components/TeamFlag";

interface BracketMatchProps {
  match: MatchResult | null;
  round: string;
  matchNumber: number;
  animationDelay?: number;
}

export function BracketMatch({ match, round, matchNumber, animationDelay = 0 }: BracketMatchProps) {
  if (!match) {
    return (
      <div 
        className="bg-muted/30 rounded-lg border border-border/50 p-3 w-48 opacity-50"
        style={{ animationDelay: `${animationDelay}ms` }}
      >
        <div className="text-xs text-muted-foreground mb-2">{round} - Match {matchNumber}</div>
        <div className="space-y-1">
          <div className="h-8 bg-muted/50 rounded animate-pulse" />
          <div className="h-8 bg-muted/50 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const team1Won = match.winner?.code === match.team1.code;
  const team2Won = match.winner?.code === match.team2.code;

  return (
    <div 
      className="bg-gradient-card rounded-lg border border-border shadow-card p-3 w-48 animate-scale-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="text-xs text-muted-foreground mb-2">{round}</div>
      
      <div className="space-y-1">
        <div className={`flex items-center justify-between p-2 rounded transition-all ${
          team1Won ? 'bg-secondary/30 border border-secondary/50' : 'bg-muted/30'
        }`}>
          <div className="flex items-center gap-2">
            <TeamFlag countryCode={match.team1.code} size="sm" />
            <span className={`font-medium text-sm ${team1Won ? 'text-secondary' : 'text-foreground'}`}>
              {match.team1.code}
            </span>
          </div>
          <span className={`font-display font-bold ${team1Won ? 'text-secondary' : 'text-muted-foreground'}`}>
            {match.score1}
          </span>
        </div>
        
        <div className={`flex items-center justify-between p-2 rounded transition-all ${
          team2Won ? 'bg-secondary/30 border border-secondary/50' : 'bg-muted/30'
        }`}>
          <div className="flex items-center gap-2">
            <TeamFlag countryCode={match.team2.code} size="sm" />
            <span className={`font-medium text-sm ${team2Won ? 'text-secondary' : 'text-foreground'}`}>
              {match.team2.code}
            </span>
          </div>
          <span className={`font-display font-bold ${team2Won ? 'text-secondary' : 'text-muted-foreground'}`}>
            {match.score2}
          </span>
        </div>
      </div>
    </div>
  );
}
