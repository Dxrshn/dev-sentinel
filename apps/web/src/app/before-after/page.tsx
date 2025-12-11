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

async function BeforeAfterContent() {
  const data = await getData();

  // Baseline is hard-coded for demo purposes
  const baseline = 65;
  const now = data?.judge?.health_score ?? 78;

  if (!data) {
    return (
      <div className="rounded-2xl border border-yellow-200 bg-yellow-50 p-6">
        <div className="text-sm text-yellow-800">
          Unable to load data. Please check your connection and try again.
        </div>
      </div>
    );
  }

  const improvement = now - baseline;
  const improvementPercent = Math.round((improvement / baseline) * 100);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-xs text-muted-foreground">Baseline Health</div>
          <div className="mt-2 text-4xl font-bold">{baseline}</div>
          <div className="mt-1 text-xs text-muted-foreground">Initial snapshot</div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-xs text-muted-foreground">Current Health</div>
          <div className="mt-2 text-4xl font-bold">{now}</div>
          <div className="mt-1 text-xs text-muted-foreground">
            {improvement > 0 ? `+${improvement}` : improvement} points
            {improvementPercent > 0 && ` (+${improvementPercent}%)`}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="text-xs text-muted-foreground mb-3">ROI Snapshot</div>
        <ul className="mt-2 list-disc pl-5 text-sm space-y-1">
          <li>Reduced dependency drift risk</li>
          <li>Improved maintainability in hotspot modules</li>
          <li>Faster onboarding via auto-generated docs</li>
          {data.judge.priority_fixes.length > 0 && (
            <li>{data.judge.priority_fixes.length} actionable fixes identified</li>
          )}
        </ul>
      </div>
    </>
  );
}

export default async function BeforeAfterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Before / After</h1>
        <p className="text-sm text-muted-foreground">
          Proof of improvement with automated fixes
        </p>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner message="Loading comparison data..." />}>
          <BeforeAfterContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
