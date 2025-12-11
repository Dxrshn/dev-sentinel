import { Suspense } from "react";
import { RiskBadge } from "@/components/Badge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import type { HealthDataResponse, DependencyItemType } from "@dev-sentinel/shared";

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

async function DependenciesContent() {
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

  const deps: DependencyItemType[] = data.signals.outdated_deps;

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="text-xs text-muted-foreground mb-3">
        Outdated dependencies
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs text-muted-foreground">
            <tr>
              <th className="py-2">Package</th>
              <th>Current</th>
              <th>Latest</th>
              <th>Direct</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {deps.map((d, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 font-medium">{d.name}</td>
                <td>{d.current}</td>
                <td>{d.latest}</td>
                <td>{d.isDirect ? "Yes" : "No"}</td>
                <td><RiskBadge level={d.risk} /></td>
              </tr>
            ))}

            {deps.length === 0 && (
              <tr className="border-t">
                <td className="py-4 text-muted-foreground" colSpan={5}>
                  No dependency drift detected.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default async function DependenciesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dependencies</h1>
        <p className="text-sm text-muted-foreground">
          Safe updates with Cline automation
        </p>
      </div>

      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner message="Loading dependencies..." />}>
          <DependenciesContent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
