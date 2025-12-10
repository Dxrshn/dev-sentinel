import { SignalsSchema } from "@dev-sentinel/shared";

export async function runDepsScan(opts: { repo: string }) {
  const payload = {
    repo: opts.repo,
    timestamp: new Date().toISOString(),
    complexity_hotspots: [],
    outdated_deps: [
      { name: "react", current: "18.2.0", latest: "18.3.1", risk: "low", isDirect: true },
      { name: "some-transitive-lib", current: "1.0.0", latest: "3.0.0", risk: "high", isDirect: false }
    ],
    pr_stats: []
  };

  const validated = SignalsSchema.parse(payload);
  process.stdout.write(JSON.stringify(validated, null, 2));
}
