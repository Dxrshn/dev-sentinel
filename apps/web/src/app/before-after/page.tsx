import signals from "../../../../../mock/signals.json";
import judge from "../../../../../mock/judge.json";

export default function BeforeAfterPage() {
  // For hackathon: show simple static “baseline vs now”.
  const baseline = 65;
  const now = (judge as any).health_score ?? 78;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Before / After</h1>
        <p className="text-sm text-muted-foreground">
          Proof of improvement with automated fixes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-xs text-muted-foreground">Baseline Health</div>
          <div className="mt-2 text-4xl font-bold">{baseline}</div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-xs text-muted-foreground">Current Health</div>
          <div className="mt-2 text-4xl font-bold">{now}</div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="text-xs text-muted-foreground">ROI Snapshot</div>
        <ul className="mt-2 list-disc pl-5 text-sm">
          <li>Reduced dependency drift risk</li>
          <li>Improved maintainability in hotspot modules</li>
          <li>Faster onboarding via auto-generated docs</li>
        </ul>
      </div>
    </div>
  );
}
