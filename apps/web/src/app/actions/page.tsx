"use client";

import { useState } from "react";
import { ErrorBoundary } from "@/components/ErrorBoundary";

interface KestraTriggerResponse {
  ok: boolean;
  mode?: "mock" | "real";
  message?: string;
  error?: string;
  executionId?: string;
}

const actions = [
  {
    id: "scan",
    title: "Run Health Scan",
    desc: "Triggers Kestra on-demand flow. Updates signals + summary + judge output.",
  },
];

export default function ActionsPage() {
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function runScan() {
    setIsLoading(true);
    setStatus("Running...");
    
    try {
      const res = await fetch("/api/kestra/trigger", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repo: "demo/dev-sentinel" }),
      });

      // Get response text first to see what we're getting
      const text = await res.text();
      
      if (!res.ok) {
        // Try to parse error response
        let errorData: any = {};
        try {
          errorData = JSON.parse(text);
        } catch {
          errorData = { error: text || `HTTP ${res.status}` };
        }
        
        console.error("API Error:", {
          status: res.status,
          statusText: res.statusText,
          body: errorData,
        });
        
        throw new Error(errorData.error || errorData.message || `HTTP error! status: ${res.status}`);
      }

      // Parse successful response
      const json: KestraTriggerResponse = JSON.parse(text);
      
      if (!json.ok) {
        throw new Error(json.error ?? "Trigger failed");
      }

      setStatus(
        json.mode === "mock"
          ? "Mock trigger success (set KESTRA_TRIGGER_URL for real)."
          : `Kestra triggered successfully! Execution ID: ${json.executionId || "N/A"}`
      );
    } catch (error) {
      console.error("Run scan error:", error);
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
      setStatus(`Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ErrorBoundary>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-semibold">Actions Center</h1>
          <p className="text-sm text-muted-foreground">
            One-click automations powered by Cline + Kestra
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="text-lg font-semibold">{actions[0]?.title}</div>
          <p className="mt-1 text-sm text-muted-foreground">{actions[0]?.desc}</p>

          <button
            className="mt-4 rounded-xl border px-3 py-2 text-sm hover:bg-black/5 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={runScan}
            disabled={isLoading}
          >
            {isLoading ? "Running..." : "Run"}
          </button>

          {status && (
            <div className={`mt-3 text-xs ${
              status.startsWith("Error") 
                ? "text-red-600" 
                : status.includes("success") 
                  ? "text-green-600" 
                  : "text-muted-foreground"
            }`}>
              {status}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
