const actions = [
    {
      id: "scan",
      title: "Run Health Scan",
      desc: "Triggers Kestra on-demand flow. Updates signals + summary + judge output.",
    },
    {
      id: "deps-safe",
      title: "Safe Dependency Update",
      desc: "Invokes Cline deps:update --safe and creates a PR.",
    },
    {
      id: "docs",
      title: "Generate Docs",
      desc: "Invokes Cline docs:generate to create missing README/ADRs.",
    },
  ];
  
  export default function ActionsPage() {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Actions Center</h1>
          <p className="text-sm text-muted-foreground">
            One-click automations powered by Cline + Kestra
          </p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {actions.map((a) => (
            <div key={a.id} className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="text-lg font-semibold">{a.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{a.desc}</p>
              <button
                className="mt-4 rounded-xl border px-3 py-2 text-sm hover:bg-black/5"
                onClick={() => alert("Wire this to /api/kestra or /api/cli trigger")}
              >
                Run
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  