import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  stages: { name: string; completed: boolean; active: boolean }[];
}

export function ProgressIndicator({ stages }: ProgressIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
      {stages.map((stage, index) => (
        <div key={stage.name} className="flex items-center">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
              stage.completed
                ? "bg-secondary/20 border border-secondary text-secondary"
                : stage.active
                ? "bg-primary/20 border border-primary text-primary"
                : "bg-muted/30 border border-border text-muted-foreground"
            }`}
          >
            {stage.completed ? (
              <Check className="w-4 h-4" />
            ) : (
              <span className="w-4 h-4 flex items-center justify-center text-xs font-bold">
                {index + 1}
              </span>
            )}
            <span className="text-sm font-medium">{stage.name}</span>
          </div>
          {index < stages.length - 1 && (
            <div className={`w-8 h-0.5 mx-1 ${stage.completed ? "bg-secondary" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
