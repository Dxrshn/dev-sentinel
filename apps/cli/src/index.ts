#!/usr/bin/env node
import { Command } from "commander";
import { runBaseline } from "./commands/health-baseline";
import { runScan } from "./commands/health-scan";
import { runDepsUpdate } from "./commands/deps-update";
import { runDocsGenerate } from "./commands/docs-generate";

const program = new Command();

program
  .name("dev-sentinel")
  .description("Dev-Sentinel Cline-powered code health automations")
  .version("0.0.1");

program
  .command("health:baseline")
  .option("--repo <repo>", "Repo name", "demo/dev-sentinel")
  .action(runBaseline);

program
  .command("health:scan")
  .option("--repo <repo>", "Repo name", "demo/dev-sentinel")
  .action(runScan);

program
  .command("deps:update")
  .option("--repo <repo>", "Repo name", "demo/dev-sentinel")
  .option("--safe", "Safe updates only", true)
  .action(runDepsUpdate);

program
  .command("docs:generate")
  .option("--repo <repo>", "Repo name", "demo/dev-sentinel")
  .option("--scope <scope>", "Module scope", "apps/web")
  .action(runDocsGenerate);

program.parse();
