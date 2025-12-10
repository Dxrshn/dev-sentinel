import { NextResponse } from "next/server";

export async function GET() {
  // TODO: Fetch actual data from your backend
  const mockData = {
    judge: {
      health_score: 85,
    },
    summary: {
      narrative: "Your code quality has improved by 15% this week. Great job on reducing technical debt!",
    },
  };

  return NextResponse.json(mockData);
}
