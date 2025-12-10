import { SignalsSchema } from "@dev-sentinel/shared";

export async function runScan(opts: { repo: string }) {
  const payload = {
    repo: opts.repo,
    timestamp: new Date().toISOString(),
    complexity_hotspots: [
      { file: "apps/web/src/app/actions/page.tsx", score: 70 }
    ],
    outdated_deps: [
      { name: "lodash", current: "4.17.20", latest: "4.17.21", risk: "medium", isDirect: true }
    ],
    pr_stats: []
  };

  const validated = SignalsSchema.parse(payload);
  process.stdout.write(JSON.stringify(validated, null, 2));
}
