import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const repo = body.repo ?? "demo/dev-sentinel";

    // Support both full URL or base URL
    const kestraBaseUrl = process.env.KESTRA_BASE_URL;
    const kestraTriggerUrl = process.env.KESTRA_TRIGGER_URL;
    const kestraApiKey = process.env.KESTRA_API_KEY;

    // Demo-safe fallback
    if (!kestraTriggerUrl && !kestraBaseUrl) {
      return NextResponse.json({
        ok: true,
        mode: "mock",
        message: "KESTRA_TRIGGER_URL or KESTRA_BASE_URL not set, using mock success.",
        executionId: "mock-exec-123",
        repo,
        mockOutput: {
          summary: {
            repo,
            timestamp: new Date().toISOString(),
            narrative: "Mock AI Agent output: Code health is stable with minor dependency drift. Consider updating lodash to latest version.",
            highlights: [
              "Code structure is maintainable",
              "No critical security vulnerabilities detected",
              "Test coverage is adequate"
            ],
            warnings: [
              "Dependency drift detected in lodash (4.17.20 -> 4.17.21)"
            ]
          }
        }
      });
    }

    // Construct URL if base URL provided
    // Use simple flow for validation (non-AI, runs without errors)
    // Switch to code-health-on-demand when AI Agent is configured
    const flowId = process.env.KESTRA_FLOW_ID || "code-health-on-demand-simple";
    const url = kestraTriggerUrl || 
      `${kestraBaseUrl}/api/v1/executions/trigger/dev.sentinel/${flowId}`;

    // Prepare headers
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };
    
    if (kestraApiKey) {
      headers["Authorization"] = `Bearer ${kestraApiKey}`;
    }

    // Kestra API expects inputs in this format
    const payload = {
      inputs: {
        repo
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const text = await res.text();
    
    if (!res.ok) {
      return NextResponse.json(
        { 
          ok: false, 
          error: "Kestra trigger failed", 
          details: text,
          status: res.status 
        },
        { status: 500 }
      );
    }

    // Parse response
    let parsed: any = null;
    try { 
      parsed = JSON.parse(text); 
    } catch {
      // If not JSON, return as text
      parsed = { raw: text };
    }

    return NextResponse.json({
      ok: true,
      mode: "real",
      repo,
      execution: parsed,
      executionId: parsed?.id || parsed?.executionId || "unknown",
    });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
