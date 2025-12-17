import { Team } from "@/data/teams";
import { MatchResult } from "@/utils/simulation";
import { BracketMatch } from "./BracketMatch";

interface KnockoutBracketProps {
  round32: MatchResult[];
  round16: MatchResult[];
  quarterFinals: MatchResult[];
  semiFinals: MatchResult[];
  final: MatchResult | null;
  thirdPlace: MatchResult | null;
}

export function KnockoutBracket({
  round32,
  round16,
  quarterFinals,
  semiFinals,
  final,
  thirdPlace,
}: KnockoutBracketProps) {
  return (
    <div className="overflow-x-auto pb-8">
      <div className="min-w-[1400px] p-8">
        {/* Round of 32 */}
        <div className="mb-8">
          <h3 className="font-display text-xl font-bold text-primary mb-4">Round of 32</h3>
          <div className="grid grid-cols-8 gap-4">
            {round32.slice(0, 8).map((match, i) => (
              <BracketMatch
                key={i}
                match={match}
                round="R32"
                matchNumber={i + 1}
                animationDelay={i * 50}
              />
            ))}
          </div>
          <div className="grid grid-cols-8 gap-4 mt-4">
            {round32.slice(8, 16).map((match, i) => (
              <BracketMatch
                key={i + 8}
                match={match}
                round="R32"
                matchNumber={i + 9}
                animationDelay={(i + 8) * 50}
              />
            ))}
          </div>
        </div>

        {/* Round of 16 */}
        <div className="mb-8">
          <h3 className="font-display text-xl font-bold text-primary mb-4">Round of 16</h3>
          <div className="grid grid-cols-8 gap-4">
            {round16.map((match, i) => (
              <BracketMatch
                key={i}
                match={match}
                round="R16"
                matchNumber={i + 1}
                animationDelay={i * 75}
              />
            ))}
          </div>
        </div>

        {/* Quarter Finals */}
        <div className="mb-8">
          <h3 className="font-display text-xl font-bold text-primary mb-4">Quarter Finals</h3>
          <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto">
            {quarterFinals.map((match, i) => (
              <BracketMatch
                key={i}
                match={match}
                round="QF"
                matchNumber={i + 1}
                animationDelay={i * 100}
              />
            ))}
          </div>
        </div>

        {/* Semi Finals */}
        <div className="mb-8">
          <h3 className="font-display text-xl font-bold text-primary mb-4">Semi Finals</h3>
          <div className="grid grid-cols-2 gap-16 max-w-lg mx-auto">
            {semiFinals.map((match, i) => (
              <BracketMatch
                key={i}
                match={match}
                round="SF"
                matchNumber={i + 1}
                animationDelay={i * 150}
              />
            ))}
          </div>
        </div>

        {/* Finals */}
        <div className="flex justify-center gap-16">
          <div>
            <h3 className="font-display text-lg font-bold text-muted-foreground mb-4 text-center">
              Third Place
            </h3>
            <BracketMatch
              match={thirdPlace}
              round="3rd"
              matchNumber={1}
              animationDelay={200}
            />
          </div>
          
          <div>
            <h3 className="font-display text-xl font-bold text-primary mb-4 text-center">
              🏆 FINAL 🏆
            </h3>
            {final && (
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-lg" />
                <div className="relative">
                  <BracketMatch
                    match={final}
                    round="Final"
                    matchNumber={1}
                    animationDelay={300}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
