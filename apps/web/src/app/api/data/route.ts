import { NextResponse } from "next/server";
import { SignalsSchema, SummarySchema, JudgeSchema } from "@dev-sentinel/shared";

import signals from "../../../../../../mock/signals.json";
import summary from "../../../../../../mock/summary.json";
import judge from "../../../../../../mock/judge.json";

export async function GET() {
  const parsedSignals = SignalsSchema.parse(signals);
  const parsedSummary = SummarySchema.parse(summary);
  const parsedJudge = JudgeSchema.parse(judge);

  return NextResponse.json({
    signals: parsedSignals,
    summary: parsedSummary,
    judge: parsedJudge,
    source: "mock",
  });
}
