const map: Record<string, string> = {
    low: "bg-green-50 text-green-700 border-green-200",
    medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
    high: "bg-orange-50 text-orange-700 border-orange-200",
    critical: "bg-red-50 text-red-700 border-red-200",
  };
  
  export function RiskBadge({ level }: { level: string }) {
    const cls = map[level] ?? "bg-gray-50 text-gray-700 border-gray-200";
    return (
      <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] ${cls}`}>
        {level.toUpperCase()}
      </span>
    );
  }
  