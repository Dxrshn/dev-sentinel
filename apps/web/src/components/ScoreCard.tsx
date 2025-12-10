export function ScoreCard({
    title,
    value,
    subtitle,
  }: {
    title: string;
    value: number | string;
    subtitle?: string;
  }) {
    return (
      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <div className="text-xs text-muted-foreground">{title}</div>
        <div className="mt-2 text-4xl font-bold">{value}</div>
        {subtitle && (
          <div className="mt-2 text-xs text-muted-foreground">{subtitle}</div>
        )}
      </div>
    );
  }
  