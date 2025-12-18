import { useState, useCallback, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { TournamentHeader } from "@/components/TournamentHeader";
import { InteractiveGroupCard } from "@/components/InteractiveGroupCard";
import { KnockoutMatchSelector } from "@/components/KnockoutMatchSelector";
import { ChampionReveal } from "@/components/ChampionReveal";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { groups, Team } from "@/data/teams";
import { ChevronRight, RefreshCw, Trophy, Zap } from "lucide-react";

type Stage = "groups" | "round32" | "round16" | "quarters" | "semis" | "final" | "champion";

interface KnockoutMatch {
  team1: Team | null;
  team2: Team | null;
  winner: Team | null;
}

const Index = () => {
  const [stage, setStage] = useState<Stage>("groups");
  const [selectedTeams, setSelectedTeams] = useState<Team[]>([]);
  const [round32, setRound32] = useState<KnockoutMatch[]>(Array(16).fill(null).map(() => ({ team1: null, team2: null, winner: null })));
  const [round16, setRound16] = useState<KnockoutMatch[]>(Array(8).fill(null).map(() => ({ team1: null, team2: null, winner: null })));
  const [quarters, setQuarters] = useState<KnockoutMatch[]>(Array(4).fill(null).map(() => ({ team1: null, team2: null, winner: null })));
  const [semis, setSemis] = useState<KnockoutMatch[]>(Array(2).fill(null).map(() => ({ team1: null, team2: null, winner: null })));
  const [final, setFinal] = useState<KnockoutMatch>({ team1: null, team2: null, winner: null });
  const [thirdPlace, setThirdPlace] = useState<KnockoutMatch>({ team1: null, team2: null, winner: null });
  const [showChampion, setShowChampion] = useState(false);

  // Check if all groups are complete (24 teams selected - 2 per group)
  const groupsComplete = useMemo(() => {
    return groups.every(group => {
      const groupTeamCodes = group.teams.map(t => t.code);
      const selectedFromGroup = selectedTeams.filter(t => groupTeamCodes.includes(t.code));
      return selectedFromGroup.length === 2;
    });
  }, [selectedTeams]);

  const handleTeamSelect = useCallback((team: Team) => {
    setSelectedTeams(prev => {
      const exists = prev.find(t => t.code === team.code);
      if (exists) {
        return prev.filter(t => t.code !== team.code);
      }

      // Find the team's group
      const teamGroup = groups.find(g => g.teams.some(t => t.code === team.code));
      if (!teamGroup) return prev;

      // Check how many from this group are already selected
      const groupTeamCodes = teamGroup.teams.map(t => t.code);
      const selectedFromGroup = prev.filter(t => groupTeamCodes.includes(t.code));

      if (selectedFromGroup.length >= 2) return prev;

      return [...prev, team];
    });
  }, []);

  // Get ranked teams for each group based on selection order
  const getRankedTeamsForGroup = useCallback((groupName: string): Team[] => {
    const group = groups.find(g => g.name === groupName);
    if (!group) return [];
    
    const groupTeamCodes = group.teams.map(t => t.code);
    const rankedFromGroup = selectedTeams.filter(t => groupTeamCodes.includes(t.code));
    return rankedFromGroup;
  }, [selectedTeams]);

  const setupRound32 = useCallback(() => {
    if (!groupsComplete) return;

    // Organize qualified teams by group (1st and 2nd place)
    const qualifiedByGroup: Record<string, Team[]> = {};
    groups.forEach(group => {
      const groupTeamCodes = group.teams.map(t => t.code);
      const qualified = selectedTeams.filter(t => groupTeamCodes.includes(t.code));
      qualifiedByGroup[group.name] = qualified;
    });

    // Get third-placed teams from each group (the team with highest rating not in top 2)
    const thirdPlacedTeams: { team: Team; group: string }[] = [];
    groups.forEach(group => {
      const groupTeamCodes = group.teams.map(t => t.code);
      const selectedFromGroup = selectedTeams.filter(t => groupTeamCodes.includes(t.code));
      const notSelected = group.teams.filter(t => !selectedFromGroup.some(s => s.code === t.code));
      // Sort by rating and take the best one as 3rd place
      const sorted = notSelected.sort((a, b) => b.rating - a.rating);
      if (sorted.length > 0) {
        thirdPlacedTeams.push({ team: sorted[0], group: group.name });
      }
    });

    // Sort all third-placed teams by rating and take best 8
    const bestThirdPlaced = thirdPlacedTeams
      .sort((a, b) => b.team.rating - a.team.rating)
      .slice(0, 8);

    // Simple pairing: 1st vs 8th, 2nd vs 7th, 3rd vs 6th, 4th vs 5th
    const t3 = bestThirdPlaced.map(t => t.team);

    // Official 2026 World Cup Round of 32 matchups (16 matches):
    const newRound32: KnockoutMatch[] = [
      // Match 1-6: Group winners vs Group runners-up
      { team1: qualifiedByGroup["A"]?.[0] || null, team2: qualifiedByGroup["B"]?.[1] || null, winner: null }, // 1A vs 2B
      { team1: qualifiedByGroup["C"]?.[0] || null, team2: qualifiedByGroup["D"]?.[1] || null, winner: null }, // 1C vs 2D
      { team1: qualifiedByGroup["E"]?.[0] || null, team2: qualifiedByGroup["F"]?.[1] || null, winner: null }, // 1E vs 2F
      { team1: qualifiedByGroup["G"]?.[0] || null, team2: qualifiedByGroup["H"]?.[1] || null, winner: null }, // 1G vs 2H
      { team1: qualifiedByGroup["I"]?.[0] || null, team2: qualifiedByGroup["J"]?.[1] || null, winner: null }, // 1I vs 2J
      { team1: qualifiedByGroup["K"]?.[0] || null, team2: qualifiedByGroup["L"]?.[1] || null, winner: null }, // 1K vs 2L
      
      // Match 7-12: Reverse pairings
      { team1: qualifiedByGroup["B"]?.[0] || null, team2: qualifiedByGroup["A"]?.[1] || null, winner: null }, // 1B vs 2A
      { team1: qualifiedByGroup["D"]?.[0] || null, team2: qualifiedByGroup["C"]?.[1] || null, winner: null }, // 1D vs 2C
      { team1: qualifiedByGroup["F"]?.[0] || null, team2: qualifiedByGroup["E"]?.[1] || null, winner: null }, // 1F vs 2E
      { team1: qualifiedByGroup["H"]?.[0] || null, team2: qualifiedByGroup["G"]?.[1] || null, winner: null }, // 1H vs 2G
      { team1: qualifiedByGroup["J"]?.[0] || null, team2: qualifiedByGroup["I"]?.[1] || null, winner: null }, // 1J vs 2I
      { team1: qualifiedByGroup["L"]?.[0] || null, team2: qualifiedByGroup["K"]?.[1] || null, winner: null }, // 1L vs 2K
      
      // Match 13-16: Best 8 third-placed teams (paired by ranking: 1v8, 2v7, 3v6, 4v5)
      { team1: t3[0] || null, team2: t3[7] || null, winner: null },
      { team1: t3[1] || null, team2: t3[6] || null, winner: null },
      { team1: t3[2] || null, team2: t3[5] || null, winner: null },
      { team1: t3[3] || null, team2: t3[4] || null, winner: null },
    ];

    setRound32(newRound32);
    setStage("round32");
  }, [groupsComplete, selectedTeams]);

  const handleR32Winner = useCallback((matchIndex: number, winner: Team) => {
    setRound32(prev => {
      const updated = [...prev];
      updated[matchIndex] = { ...updated[matchIndex], winner };
      return updated;
    });

    // Check if R32 is complete and setup R16
    setTimeout(() => {
      setRound32(current => {
        const allComplete = current.every(m => m.winner);
        if (allComplete) {
          const winners = current.map(m => m.winner!);
          const newRound16: KnockoutMatch[] = [];
          for (let i = 0; i < 8; i++) {
            newRound16.push({
              team1: winners[i * 2] || null,
              team2: winners[i * 2 + 1] || null,
              winner: null,
            });
          }
          setRound16(newRound16);
          setStage("round16");
        }
        return current;
      });
    }, 100);
  }, []);

  const handleR16Winner = useCallback((matchIndex: number, winner: Team) => {
    setRound16(prev => {
      const updated = [...prev];
      updated[matchIndex] = { ...updated[matchIndex], winner };
      return updated;
    });

    setTimeout(() => {
      setRound16(current => {
        const allComplete = current.every(m => m.winner);
        if (allComplete) {
          const winners = current.map(m => m.winner!);
          const newQuarters: KnockoutMatch[] = [];
          for (let i = 0; i < 4; i++) {
            newQuarters.push({
              team1: winners[i * 2] || null,
              team2: winners[i * 2 + 1] || null,
              winner: null,
            });
          }
          setQuarters(newQuarters);
          setStage("quarters");
        }
        return current;
      });
    }, 100);
  }, []);

  const handleQuarterWinner = useCallback((matchIndex: number, winner: Team) => {
    setQuarters(prev => {
      const updated = [...prev];
      updated[matchIndex] = { ...updated[matchIndex], winner };
      return updated;
    });

    setTimeout(() => {
      setQuarters(current => {
        const allComplete = current.every(m => m.winner);
        if (allComplete) {
          const winners = current.map(m => m.winner!);
          const newSemis: KnockoutMatch[] = [
            { team1: winners[0], team2: winners[1], winner: null },
            { team1: winners[2], team2: winners[3], winner: null },
          ];
          setSemis(newSemis);
          setStage("semis");
        }
        return current;
      });
    }, 100);
  }, []);

  const handleSemiWinner = useCallback((matchIndex: number, winner: Team) => {
    setSemis(prev => {
      const updated = [...prev];
      updated[matchIndex] = { ...updated[matchIndex], winner };
      return updated;
    });

    setTimeout(() => {
      setSemis(current => {
        const allComplete = current.every(m => m.winner);
        if (allComplete) {
          const winners = current.map(m => m.winner!);
          const losers = current.map(m => m.winner?.code === m.team1?.code ? m.team2! : m.team1!);
          setFinal({ team1: winners[0], team2: winners[1], winner: null });
          setThirdPlace({ team1: losers[0], team2: losers[1], winner: null });
          setStage("final");
        }
        return current;
      });
    }, 100);
  }, []);

  const handleFinalWinner = useCallback((winner: Team) => {
    setFinal(prev => ({ ...prev, winner }));
    setStage("champion");
    setTimeout(() => setShowChampion(true), 500);
  }, []);

  const handleThirdPlaceWinner = useCallback((winner: Team) => {
    setThirdPlace(prev => ({ ...prev, winner }));
  }, []);

  const reset = useCallback(() => {
    setStage("groups");
    setSelectedTeams([]);
    setRound32(Array(16).fill(null).map(() => ({ team1: null, team2: null, winner: null })));
    setRound16(Array(8).fill(null).map(() => ({ team1: null, team2: null, winner: null })));
    setQuarters(Array(4).fill(null).map(() => ({ team1: null, team2: null, winner: null })));
    setSemis(Array(2).fill(null).map(() => ({ team1: null, team2: null, winner: null })));
    setFinal({ team1: null, team2: null, winner: null });
    setThirdPlace({ team1: null, team2: null, winner: null });
    setShowChampion(false);
  }, []);

  const autoSimulate = useCallback(() => {
    // Auto-pick top 2 rated teams from each group
    const autoSelected: Team[] = [];
    groups.forEach(group => {
      const sorted = [...group.teams].sort((a, b) => b.rating - a.rating);
      autoSelected.push(sorted[0], sorted[1]);
    });
    setSelectedTeams(autoSelected);
  }, []);

  const progressStages = [
    { name: "Groups", completed: stage !== "groups", active: stage === "groups" },
    { name: "R32", completed: ["round16", "quarters", "semis", "final", "champion"].includes(stage), active: stage === "round32" },
    { name: "R16", completed: ["quarters", "semis", "final", "champion"].includes(stage), active: stage === "round16" },
    { name: "Quarters", completed: ["semis", "final", "champion"].includes(stage), active: stage === "quarters" },
    { name: "Semis", completed: ["final", "champion"].includes(stage), active: stage === "semis" },
    { name: "Final", completed: stage === "champion", active: stage === "final" },
  ];

  // Auto-progress to knockout stage when all teams are selected
  useEffect(() => {
    if (groupsComplete && stage === "groups") {
      const timer = setTimeout(() => {
        setupRound32();
      }, 1000); // 1 second delay for smooth UX
      
      return () => clearTimeout(timer);
    }
  }, [groupsComplete, stage, setupRound32]);

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-[1800px] mx-auto">
      <TournamentHeader />

      <ProgressIndicator stages={progressStages} />

      {/* Desktop Controls */}
      <div className="hidden md:flex flex-wrap justify-center gap-4 mb-8">
        {stage === "groups" && (
          <>
            <Button variant="reset" size="lg" onClick={autoSimulate}>
              <Zap className="w-5 h-5" />
              Auto Pick (By Rating)
            </Button>
            {groupsComplete && (
              <Button variant="simulate" size="xl" onClick={setupRound32}>
                <ChevronRight className="w-6 h-6" />
                Start Knockout Stage
              </Button>
            )}
          </>
        )}

        <Button variant="reset" size="lg" onClick={reset}>
          <RefreshCw className="w-5 h-5" />
          Reset Tournament
        </Button>
      </div>

      {/* Group Stage */}
      {stage === "groups" && (
        <section className="pb-24 md:pb-0">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full" />
            Select 2 Teams from Each Group
          </h2>
          <p className="text-muted-foreground mb-6">Click teams to qualify them for the knockout stage</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {groups.map((group, index) => (
              <InteractiveGroupCard
                key={group.name}
                groupName={group.name}
                teams={group.teams}
                selectedTeams={selectedTeams}
                onSelectTeam={handleTeamSelect}
                animationDelay={index * 50}
                rankedTeams={getRankedTeamsForGroup(group.name)}
              />
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              Selected: <span className="text-primary font-bold">{selectedTeams.length}</span> / 24 teams
            </p>
            {groupsComplete && (
              <p className="text-sm text-green-600 mt-2 animate-pulse">
                🎉 All teams selected! Auto-advancing to knockout stage...
              </p>
            )}
          </div>
        </section>
      )}

      {/* Mobile Floating Controls */}
      {stage === "groups" && (
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4 md:hidden">
          <div className="flex flex-col gap-3 max-w-md mx-auto">
            <div className="flex gap-2">
              <Button variant="outline" size="lg" onClick={autoSimulate} className="flex-1">
                <Zap className="w-4 h-4" />
                Auto Pick
              </Button>
              {groupsComplete && (
                <Button variant="simulate" size="lg" onClick={setupRound32} className="flex-1">
                  <ChevronRight className="w-4 h-4" />
                  Start Knockout
                </Button>
              )}
            </div>
            <Button variant="reset" size="lg" onClick={reset} className="w-full">
              <RefreshCw className="w-4 h-4" />
              Reset Tournament
            </Button>
          </div>
        </div>
      )}

      {/* Round of 32 */}
      {stage === "round32" && (
        <section>
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full" />
            Round of 32 (16 Matches)
          </h2>
          
          {/* Group Winners vs Runners-up Matches (12 matches) */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-muted-foreground mb-4">Group Stage Qualifiers</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {round32.slice(0, 12).map((match, index) => {
                const matchLabels = [
                  "1A vs 2B", "1C vs 2D", "1E vs 2F", "1G vs 2H", "1I vs 2J", "1K vs 2L",
                  "1B vs 2A", "1D vs 2C", "1F vs 2E", "1H vs 2G", "1J vs 2I", "1L vs 2K"
                ];
                return (
                  <KnockoutMatchSelector
                    key={index}
                    team1={match.team1}
                    team2={match.team2}
                    winner={match.winner}
                    onSelectWinner={(winner) => handleR32Winner(index, winner)}
                    round={matchLabels[index]}
                    matchNumber={index + 1}
                    animationDelay={index * 30}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Best 3rd-place group finishers matches (4 matches) */}
          <div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-4">Best 3rd-Place Group Finishers</h3>
            <p className="text-xs text-muted-foreground/70 mb-3">Teams that finished 3rd in their groups but qualified as best third-place teams</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {round32.slice(12, 16).map((match, idx) => {
                const matchLabels = [
                  "Match 13", 
                  "Match 14",
                  "Match 15", 
                  "Match 16"
                ];
                return (
                  <KnockoutMatchSelector
                    key={idx + 12}
                    team1={match.team1}
                    team2={match.team2}
                    winner={match.winner}
                    onSelectWinner={(winner) => handleR32Winner(idx + 12, winner)}
                    round={matchLabels[idx]}
                    matchNumber={idx + 13}
                    animationDelay={(idx + 12) * 30}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Round of 16 */}
      {["round16", "quarters", "semis", "final", "champion"].includes(stage) && round16.some(m => m.team1) && (
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full" />
            Round of 16
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {round16.map((match, index) => (
              <KnockoutMatchSelector
                key={index}
                team1={match.team1}
                team2={match.team2}
                winner={match.winner}
                onSelectWinner={(winner) => handleR16Winner(index, winner)}
                round={`Match ${index + 1}`}
                matchNumber={index + 1}
                animationDelay={index * 30}
              />
            ))}
          </div>
        </section>
      )}

      {/* Quarter Finals */}
      {["quarters", "semis", "final", "champion"].includes(stage) && quarters.some(m => m.team1) && (
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full" />
            Quarter Finals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {quarters.map((match, index) => (
              <KnockoutMatchSelector
                key={index}
                team1={match.team1}
                team2={match.team2}
                winner={match.winner}
                onSelectWinner={(winner) => handleQuarterWinner(index, winner)}
                round={`QF ${index + 1}`}
                matchNumber={index + 1}
                animationDelay={index * 50}
              />
            ))}
          </div>
        </section>
      )}

      {/* Semi Finals */}
      {["semis", "final", "champion"].includes(stage) && semis.some(m => m.team1) && (
        <section className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-primary rounded-full" />
            Semi Finals
          </h2>
          <div className="grid grid-cols-2 gap-8 max-w-xl mx-auto">
            {semis.map((match, index) => (
              <KnockoutMatchSelector
                key={index}
                team1={match.team1}
                team2={match.team2}
                winner={match.winner}
                onSelectWinner={(winner) => handleSemiWinner(index, winner)}
                round={`SF ${index + 1}`}
                matchNumber={index + 1}
                animationDelay={index * 75}
              />
            ))}
          </div>
        </section>
      )}

      {/* Final & Third Place */}
      {["final", "champion"].includes(stage) && final.team1 && (
        <section className="mb-12">
          <div className="flex flex-col md:flex-row justify-center gap-8 items-start">
            <div className="w-full md:w-64">
              <h3 className="font-display text-lg text-muted-foreground mb-4 text-center">Third Place</h3>
              <KnockoutMatchSelector
                team1={thirdPlace.team1}
                team2={thirdPlace.team2}
                winner={thirdPlace.winner}
                onSelectWinner={handleThirdPlaceWinner}
                round="3rd Place"
                matchNumber={1}
                isThirdPlace
              />
            </div>

            <div className="w-full md:w-80">
              <h3 className="font-display text-xl text-primary mb-4 text-center flex items-center justify-center gap-2">
                <Trophy className="w-5 h-5" />
                THE FINAL
                <Trophy className="w-5 h-5" />
              </h3>
              <KnockoutMatchSelector
                team1={final.team1}
                team2={final.team2}
                winner={final.winner}
                onSelectWinner={handleFinalWinner}
                round="World Cup Final"
                matchNumber={1}
                isFinal
              />
            </div>
          </div>
        </section>
      )}

      {/* Champion Reveal */}
      {showChampion && final.winner && (
        <ChampionReveal
          champion={final.winner}
          runnerUp={final.winner.code === final.team1?.code ? final.team2! : final.team1!}
          onClose={() => setShowChampion(false)}
        />
      )}

      {/* Footer */}
      <footer className="text-center mt-16 py-8 border-t border-border">
        <p className="text-muted-foreground text-sm">
          FIFA World Cup 2026 Bracket Predictor
        </p> <a href="https://jaberdevhub.com" className="text-sm text-yellow-500"> Developed by: @jaberdevhub</a>
      </footer>

      {/* Mobile Reset Button - Always Visible */}
      <div className="fixed top-4 right-4 md:hidden z-50">
        <Button variant="reset" size="sm" onClick={reset} className="shadow-lg">
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
