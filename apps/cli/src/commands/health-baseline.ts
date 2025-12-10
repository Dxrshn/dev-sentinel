import { SignalsSchema } from "@dev-sentinel/shared";

export async function runBaseline(opts: { repo: string }) {
  const payload = {
    repo: opts.repo,
    timestamp: new Date().toISOString(),
    complexity_hotspots: [],
    outdated_deps: [],
    pr_stats: []
  };

  const validated = SignalsSchema.parse(payload);
  process.stdout.write(JSON.stringify(validated, null, 2));
}
