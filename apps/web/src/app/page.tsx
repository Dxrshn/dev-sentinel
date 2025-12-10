import { ScoreCard } from "@/components/ScoreCard";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/data`, {
    cache: "no-store",
  }).catch(() => null);

  return res ? res.json() : null;
}

export default async function OverviewPage() {
  const data = await getData();

  const health = data?.judge?.health_score ?? 0;
  const risk = data?.judge?.risk_score ?? 0;
  const narrative = data?.summary?.narrative ?? "No summary yet.";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Observe → Summarize → Judge → Fix → Prove
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard title="Health Score" value={health} subtitle="0–100 maintainability index" />
        <ScoreCard title="Risk Score" value={risk} subtitle="Change failure likelihood proxy" />
        <ScoreCard
          title="Top Priority Fixes"
          value={data?.judge?.priority_fixes?.length ?? 0}
          subtitle="Ranked by RL-tuned judge"
        />
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="text-xs text-muted-foreground">Weekly Summary</div>
        <p className="mt-2 text-sm">{narrative}</p>

        {!!data?.summary?.highlights?.length && (
          <div className="mt-4">
            <div className="text-xs text-muted-foreground">Highlights</div>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {data.summary.highlights.map((h: string, i: number) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
