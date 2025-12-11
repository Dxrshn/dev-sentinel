import type { z } from "zod";
import { SignalsSchema, SummarySchema, JudgeSchema, PriorityFix, ComplexityHotspot, DependencyItem, RiskLevel } from "./schema";

export type Signals = z.infer<typeof SignalsSchema>;
export type Summary = z.infer<typeof SummarySchema>;
export type Judge = z.infer<typeof JudgeSchema>;
export type PriorityFixType = z.infer<typeof PriorityFix>;
export type ComplexityHotspotType = z.infer<typeof ComplexityHotspot>;
export type DependencyItemType = z.infer<typeof DependencyItem>;
export type RiskLevelType = z.infer<typeof RiskLevel>;

// Combined API response type
export interface HealthDataResponse {
  signals: Signals;
  summary: Summary;
  judge: Judge;
  source: string;
}
