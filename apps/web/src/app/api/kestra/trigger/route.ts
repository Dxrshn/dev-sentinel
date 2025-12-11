import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Get repo from request body, default to demo repo
    let repo = "demo/dev-sentinel";
    
    try {
      const body = await req.json();
      if (body?.repo) {
        repo = String(body.repo);
      }
    } catch {
      // If body parsing fails, use default
    }

    // Check environment variables (trim to handle whitespace)
    const kestraBaseUrl = (process.env.KESTRA_BASE_URL || "").trim();
    const kestraTriggerUrl = (process.env.KESTRA_TRIGGER_URL || "").trim();
    
    // If no Kestra config (empty or not set), return mock response
    // This ensures local development always works without Kestra setup
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

    // Kestra is configured - make real API call
    const flowId = process.env.KESTRA_FLOW_ID || "code-health-on-demand-simple";
    const url = kestraTriggerUrl || `${kestraBaseUrl}/api/v1/executions/trigger/dev.sentinel/${flowId}`;
    const kestraApiKey = process.env.KESTRA_API_KEY?.trim();

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };
    
    if (kestraApiKey) {
      headers["Authorization"] = `Bearer ${kestraApiKey}`;
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ inputs: { repo } }),
    });

    if (!res.ok) {
      const text = await res.text();
      
      // If we get 401 (Unauthorized), it means Kestra is configured but not properly authenticated
      // Fall back to mock response for local development
      if (res.status === 401) {
        console.warn("[Kestra API] Got 401 Unauthorized - falling back to mock response");
        return NextResponse.json({
          ok: true,
          mode: "mock",
          message: "Kestra authentication failed (401). Using mock response for local development.",
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

    const text = await res.text();
    let parsed: Record<string, unknown> = {};
    try { 
      parsed = JSON.parse(text);
    } catch {
      parsed = { raw: text };
    }

    const executionId = 
      (typeof parsed.id === "string" ? parsed.id : null) ||
      (typeof parsed.executionId === "string" ? parsed.executionId : null) ||
      "unknown";

    return NextResponse.json({
      ok: true,
      mode: "real",
      repo,
      execution: parsed,
      executionId,
    });
  } catch (err) {
    // Log full error for debugging
    const error = err instanceof Error ? err : new Error(String(err));
    console.error("[Kestra API] Full error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    
    return NextResponse.json(
      { 
        ok: false, 
        error: error.message || "Unknown error",
        ...(process.env.NODE_ENV === "development" ? { 
          stack: error.stack 
        } : {})
      },
      { status: 500 }
    );
  }
}
