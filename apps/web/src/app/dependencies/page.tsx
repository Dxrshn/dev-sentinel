import { RiskBadge } from "@/components/Badge";

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/data`, {
    cache: "no-store",
  }).catch(() => null);

  return res ? res.json() : null;
}

export default async function DependenciesPage() {
  const data = await getData();
  const deps = data?.signals?.outdated_deps ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dependencies</h1>
        <p className="text-sm text-muted-foreground">
          Safe updates with Cline automation
        </p>
      </div>

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
              {deps.map((d: any, i: number) => (
                <tr key={i} className="border-t">
                  <td className="py-2 font-medium">{d.name}</td>
                  <td>{d.current}</td>
                  <td>{d.latest}</td>
                  <td>{d.isDirect ? "Yes" : "No"}</td>
                  <td><RiskBadge level={d.risk} /></td>
                </tr>
              ))}

              {!deps.length && (
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
    </div>
  );
}
