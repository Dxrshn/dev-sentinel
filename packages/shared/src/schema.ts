import { z } from "zod";

export const RiskLevel = z.enum(["low", "medium", "high", "critical"]);

export const ComplexityHotspot = z.object({
  file: z.string(),
  score: z.number().min(0),
  reason: z.string().optional()
});

export const DependencyItem = z.object({
  name: z.string(),
  current: z.string(),
  latest: z.string(),
  risk: RiskLevel,
  isDirect: z.boolean().default(true)
});

export const PRStat = z.object({
  id: z.string(),
  title: z.string(),
  author: z.string().optional(),
  additions: z.number().optional(),
  deletions: z.number().optional(),
  filesChanged: z.number().optional()
});

export const SignalsSchema = z.object({
  repo: z.string(),
  timestamp: z.string(),
  complexity_hotspots: z.array(ComplexityHotspot).default([]),
  outdated_deps: z.array(DependencyItem).default([]),
  pr_stats: z.array(PRStat).default([])
});

export const SummarySchema = z.object({
  repo: z.string(),
  timestamp: z.string(),
  narrative: z.string(),
  highlights: z.array(z.string()).default([]),
  warnings: z.array(z.string()).default([])
});

export const PriorityFix = z.object({
  title: z.string(),
  impact: z.string(),
  confidence: z.number().min(0).max(1),
  category: z.enum(["deps", "tests", "docs", "refactor", "architecture"]).optional()
});

export const JudgeSchema = z.object({
  repo: z.string(),
  timestamp: z.string(),
  health_score: z.number().min(0).max(100),
  risk_score: z.number().min(0).max(100),
  priority_fixes: z.array(PriorityFix).default([])
});
