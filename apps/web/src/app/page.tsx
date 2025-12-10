export default async function Page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/data`, {
    cache: "no-store"
  }).catch(() => null);

  const data = res ? await res.json() : null;

  const health = data?.judge?.health_score ?? 0;
  const narrative = data?.summary?.narrative ?? "No data yet.";

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dev-Sentinel Overview</h1>
        <p className="text-muted-foreground">Code Health Command Center</p>
      </div>

      <div className="rounded-2xl border p-4">
        <div className="text-sm text-muted-foreground">Health Score</div>
        <div className="text-4xl font-bold">{health}</div>
      </div>

      <div className="rounded-2xl border p-4">
        <div className="text-sm text-muted-foreground">Weekly Summary</div>
        <p className="mt-2">{narrative}</p>
      </div>
    </div>
  );
}
