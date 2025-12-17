import { Team } from "@/data/teams";
import { Check, Star, Trophy, Medal } from "lucide-react";
import { TeamFlag } from "@/components/TeamFlag";

interface InteractiveGroupCardProps {
  groupName: string;
  teams: Team[];
  selectedTeams: Team[];
  onSelectTeam: (team: Team) => void;
  maxSelections?: number;
  animationDelay?: number;
  isLocked?: boolean;
  showRankings?: boolean;
  rankedTeams?: Team[]; // Full ranking of all teams in this group
}

export function InteractiveGroupCard({
  groupName,
  teams,
  selectedTeams,
  onSelectTeam,
  maxSelections = 2,
  animationDelay = 0,
  isLocked = false,
  showRankings = true,
  rankedTeams = [],
}: InteractiveGroupCardProps) {
  const selectedCodes = selectedTeams.map(t => t.code);
  const selectionCount = teams.filter(t => selectedCodes.includes(t.code)).length;

  // Get position in rankings for this specific group
  const getPosition = (teamCode: string): number | null => {
    const index = rankedTeams.findIndex(t => t.code === teamCode);
    return index >= 0 ? index + 1 : null;
  };

  const getPositionBadge = (position: number | null) => {
    if (!position) return null;
    
    const styles: Record<number, { bg: string; text: string; label: string }> = {
      1: { bg: "bg-primary", text: "text-primary-foreground", label: "1st" },
      2: { bg: "bg-secondary", text: "text-secondary-foreground", label: "2nd" },
      3: { bg: "bg-accent/80", text: "text-accent-foreground", label: "3rd" },
      4: { bg: "bg-muted", text: "text-muted-foreground", label: "4th" },
    };
    
    const style = styles[position] || styles[4];
    
    return (
      <div className={`flex items-center justify-center min-w-[36px] h-8 rounded-full ${style.bg} ${style.text} font-bold text-xs`}>
        {style.label}
      </div>
    );
  };

  return (
    <div
      className="bg-gradient-card rounded-xl border border-border shadow-card overflow-hidden animate-scale-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="bg-muted/50 px-4 py-3 border-b border-border flex items-center justify-between">
        <h3 className="font-display text-xl font-bold text-primary">
          GROUP {groupName}
        </h3>
        <span className="text-xs text-muted-foreground">
          {selectionCount}/{maxSelections} qualified
        </span>
      </div>

      {/* Table Header */}
      <div className="px-3 pt-3">
        <div className="grid grid-cols-[1fr,auto] gap-2 text-xs text-muted-foreground pb-2 border-b border-border/50">
          <span>Team</span>
          <span className="text-center w-[36px]">Pos</span>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {teams.map((team, index) => {
          const isSelected = selectedCodes.includes(team.code);
          const canSelect = !isLocked && (isSelected || selectionCount < maxSelections);
          const position = getPosition(team.code);

          return (
            <button
              key={team.code}
              onClick={() => canSelect && onSelectTeam(team)}
              disabled={!canSelect && !isSelected}
              className={`w-full grid grid-cols-[1fr,auto] items-center gap-2 p-3 rounded-lg transition-all duration-200 ${
                isSelected
                  ? position === 1
                    ? "bg-primary/20 border-2 border-primary ring-2 ring-primary/30"
                    : position === 2
                    ? "bg-secondary/20 border-2 border-secondary ring-2 ring-secondary/30"
                    : "bg-accent/10 border-2 border-accent/50 ring-2 ring-accent/20"
                  : canSelect
                  ? "bg-muted/30 border border-border/50 hover:bg-muted/50 hover:border-muted-foreground/30 cursor-pointer"
                  : "bg-muted/20 border border-border/30 opacity-50 cursor-not-allowed"
              }`}
            >
              <div className="flex items-center gap-3">
                <TeamFlag countryCode={team.code} size="lg" />

                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${
                      isSelected 
                        ? position === 1 
                          ? "text-primary" 
                          : position === 2 
                          ? "text-secondary" 
                          : "text-accent"
                        : "text-foreground"
                    }`}>
                      {team.name}
                    </span>
                    {team.isPlayoff && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-accent/30 text-accent rounded">
                        Playoff
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{team.code}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-primary/50 text-primary/50" />
                      {team.rating}
                    </span>
                  </div>
                </div>
              </div>

              {isSelected ? getPositionBadge(position) : (
                <div className="w-[36px] h-8 rounded-full border border-dashed border-muted-foreground/30" />
              )}
            </button>
          );
        })}
      </div>

      {selectionCount === maxSelections && (
        <div className="px-4 py-2 bg-secondary/10 border-t border-secondary/30 flex items-center gap-2 text-secondary text-sm">
          <Check className="w-4 h-4" />
          Top 2 qualified for Round of 32
        </div>
      )}
    </div>
  );
}
