import { Team } from "@/data/teams";

export interface MatchResult {
  team1: Team;
  team2: Team;
  score1: number;
  score2: number;
  winner: Team | null;
}

export interface GroupStanding {
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

function simulateGoals(rating: number): number {
  const baseChance = rating / 100;
  let goals = 0;
  
  // Simulate multiple scoring chances
  for (let i = 0; i < 6; i++) {
    if (Math.random() < baseChance * 0.4) {
      goals++;
    }
  }
  
  return goals;
}

export function simulateMatch(team1: Team, team2: Team): MatchResult {
  const score1 = simulateGoals(team1.rating);
  const score2 = simulateGoals(team2.rating);
  
  let winner: Team | null = null;
  if (score1 > score2) winner = team1;
  else if (score2 > score1) winner = team2;
  
  return { team1, team2, score1, score2, winner };
}

export function simulateKnockoutMatch(team1: Team, team2: Team): MatchResult {
  let result = simulateMatch(team1, team2);
  
  // Force a winner in knockout (no draws)
  while (result.score1 === result.score2) {
    // Penalty shootout simulation
    const pen1 = Math.random();
    const pen2 = Math.random();
    if (pen1 !== pen2) {
      result = {
        ...result,
        winner: pen1 > pen2 ? team1 : team2,
      };
      break;
    }
  }
  
  return result;
}

export function simulateGroupStage(teams: Team[]): { standings: GroupStanding[]; matches: MatchResult[] } {
  const standings: Map<string, GroupStanding> = new Map();
  const matches: MatchResult[] = [];
  
  // Initialize standings
  teams.forEach(team => {
    standings.set(team.code, {
      team,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    });
  });
  
  // Round robin matches
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      const result = simulateMatch(teams[i], teams[j]);
      matches.push(result);
      
      const standing1 = standings.get(teams[i].code)!;
      const standing2 = standings.get(teams[j].code)!;
      
      standing1.played++;
      standing2.played++;
      standing1.goalsFor += result.score1;
      standing1.goalsAgainst += result.score2;
      standing2.goalsFor += result.score2;
      standing2.goalsAgainst += result.score1;
      
      if (result.winner === teams[i]) {
        standing1.won++;
        standing1.points += 3;
        standing2.lost++;
      } else if (result.winner === teams[j]) {
        standing2.won++;
        standing2.points += 3;
        standing1.lost++;
      } else {
        standing1.drawn++;
        standing2.drawn++;
        standing1.points += 1;
        standing2.points += 1;
      }
    }
  }
  
  // Sort by points, goal difference, goals scored
  const sortedStandings = Array.from(standings.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });
  
  return { standings: sortedStandings, matches };
}
