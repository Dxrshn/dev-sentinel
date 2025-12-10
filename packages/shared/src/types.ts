import type { z } from "zod";
import { SignalsSchema, SummarySchema, JudgeSchema } from "./schema";

export type Signals = z.infer<typeof SignalsSchema>;
export type Summary = z.infer<typeof SummarySchema>;
export type Judge = z.infer<typeof JudgeSchema>;
