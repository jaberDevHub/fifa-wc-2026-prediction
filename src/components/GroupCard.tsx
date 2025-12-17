import { GroupStanding } from "@/utils/simulation";
import { TeamFlag } from "@/components/TeamFlag";

interface GroupCardProps {
  groupName: string;
  standings: GroupStanding[];
  animationDelay?: number;
}

export function GroupCard({ groupName, standings, animationDelay = 0 }: GroupCardProps) {
  return (
    <div 
      className="bg-gradient-card rounded-lg border border-border shadow-card overflow-hidden animate-scale-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="bg-muted/50 px-4 py-2 border-b border-border">
        <h3 className="font-display text-lg font-bold text-primary">
          GROUP {groupName}
        </h3>
      </div>
      
      <div className="p-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-muted-foreground text-xs">
              <th className="text-left py-1 px-2">#</th>
              <th className="text-left py-1 px-2">Team</th>
              <th className="text-center py-1 px-1">P</th>
              <th className="text-center py-1 px-1">W</th>
              <th className="text-center py-1 px-1">D</th>
              <th className="text-center py-1 px-1">L</th>
              <th className="text-center py-1 px-1">GD</th>
              <th className="text-center py-1 px-2 text-primary font-bold">Pts</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing, index) => {
              const isQualified = index < 2;
              return (
                <tr 
                  key={standing.team.code}
                  className={`border-t border-border/50 transition-colors ${
                    isQualified ? 'bg-secondary/20' : ''
                  }`}
                >
                  <td className="py-2 px-2">
                    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-bold ${
                      isQualified ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </span>
                  </td>
                  <td className="py-2 px-2">
                    <div className="flex items-center gap-2">
                      <TeamFlag countryCode={standing.team.code} size="md" />
                      <span className={`font-medium ${isQualified ? 'text-secondary' : 'text-foreground'}`}>
                        {standing.team.code}
                      </span>
                    </div>
                  </td>
                  <td className="text-center py-2 px-1 text-muted-foreground">{standing.played}</td>
                  <td className="text-center py-2 px-1 text-muted-foreground">{standing.won}</td>
                  <td className="text-center py-2 px-1 text-muted-foreground">{standing.drawn}</td>
                  <td className="text-center py-2 px-1 text-muted-foreground">{standing.lost}</td>
                  <td className="text-center py-2 px-1 text-muted-foreground">
                    {standing.goalsFor - standing.goalsAgainst > 0 ? '+' : ''}
                    {standing.goalsFor - standing.goalsAgainst}
                  </td>
                  <td className={`text-center py-2 px-2 font-bold ${isQualified ? 'text-primary' : 'text-foreground'}`}>
                    {standing.points}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
