#!/usr/bin/env node
import { Command } from "commander";
import { runBaseline } from "./commands/health-baseline.js";
import { runScan } from "./commands/health-scan.js";
import { runDepsScan } from "./commands/deps-scan.js";
import { runDepsUpdate } from "./commands/deps-update.js";
import { runDocsGenerate } from "./commands/docs-generate.js";

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
  .command("deps:scan")
  .option("--repo <repo>", "Repo name", "demo/dev-sentinel")
  .action(runDepsScan);

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
