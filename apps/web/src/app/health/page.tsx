import { Suspense } from "react";
import { ScoreCard } from "@/components/ScoreCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import type { HealthDataResponse, PriorityFixType, ComplexityHotspotType } from "@dev-sentinel/shared";

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

async function HealthContent() {
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
  const priorityFixes: PriorityFixType[] = data.judge.priority_fixes;
  const complexityHotspots: ComplexityHotspotType[] = data.signals.complexity_hotspots;
  const outdatedDeps = data.signals.outdated_deps;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ScoreCard title="Health Score" value={health} subtitle="0–100 maintainability index" />
        <ScoreCard title="Risk Score" value={risk} subtitle="Change failure likelihood proxy" />
      </div>

      {priorityFixes.length > 0 && (
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-xs text-muted-foreground mb-3">Priority Fixes</div>
          <ul className="space-y-2">
            {priorityFixes.map((fix, i) => (
              <li key={i} className="text-sm">
                <div className="font-medium">{fix.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{fix.impact}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Confidence: {Math.round(fix.confidence * 100)}% • {fix.category || "general"}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {complexityHotspots.length > 0 && (
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-xs text-muted-foreground mb-3">Complexity Hotspots</div>
          <ul className="space-y-2">
            {complexityHotspots.map((hotspot, i) => (
              <li key={i} className="text-sm">
                <div className="font-medium">{hotspot.file}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Score: {hotspot.score} {hotspot.reason && `• ${hotspot.reason}`}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="text-xs text-muted-foreground mb-3">Summary Statistics</div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="font-medium">Outdated Dependencies</div>
            <div className="text-2xl font-bold mt-1">{outdatedDeps.length}</div>
          </div>
          <div>
            <div className="font-medium">Complexity Hotspots</div>
            <div className="text-2xl font-bold mt-1">{complexityHotspots.length}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default async function HealthPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Health Metrics</h1>
        <p className="text-sm text-muted-foreground">
          Detailed code health analysis
        </p>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner message="Loading health metrics..." />}>
          <HealthContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
