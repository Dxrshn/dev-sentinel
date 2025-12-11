import { Suspense } from "react";
import { ScoreCard } from "@/components/ScoreCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import type { HealthDataResponse } from "@dev-sentinel/shared";

async function getData(): Promise<HealthDataResponse | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/data`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function OverviewContent() {
  const data = await getData();

  if (!data) {
    return (
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
        <div className="text-sm text-yellow-800">
          Unable to load data. Please check your connection and try again.
        </div>
      </div>
    );
  }

  const health = data.judge.health_score;
  const risk = data.judge.risk_score;
  const narrative = data.summary.narrative;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ScoreCard title="Health Score" value={health} subtitle="0–100 maintainability index" />
        <ScoreCard title="Risk Score" value={risk} subtitle="Change failure likelihood proxy" />
        <ScoreCard
          title="Top Priority Fixes"
          value={data.judge.priority_fixes.length}
          subtitle="Ranked by RL-tuned judge"
        />
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="text-xs text-muted-foreground">Weekly Summary</div>
        <p className="mt-2 text-sm">{narrative}</p>

        {data.summary.highlights.length > 0 && (
          <div className="mt-4">
            <div className="text-xs text-muted-foreground">Highlights</div>
            <ul className="mt-2 list-disc pl-5 text-sm">
              {data.summary.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default async function OverviewPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Observe → Summarize → Judge → Fix → Prove
        </p>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner message="Loading health data..." />}>
          <OverviewContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
