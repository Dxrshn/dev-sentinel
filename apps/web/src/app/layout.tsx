import "./globals.css";
import Link from "next/link";

const nav = [
  { href: "/", label: "Overview" },
  { href: "/health", label: "Health Score" },
  { href: "/dependencies", label: "Dependencies" },
  { href: "/actions", label: "Actions Center" },
  { href: "/before-after", label: "Before / After" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <aside className="w-64 border-r bg-white/50 backdrop-blur">
            <div className="p-6">
              <div className="text-xl font-semibold">Dev-Sentinel</div>
              <div className="text-xs text-muted-foreground">
                Code Health Command Center
              </div>
            </div>

            <nav className="px-3 space-y-1">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="block rounded-xl px-3 py-2 text-sm hover:bg-black/5 transition"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="p-6 mt-auto">
              <div className="rounded-xl border p-3 text-xs text-muted-foreground">
                Demo-safe mode enabled:
                <div className="mt-1">Mock data fallback</div>
              </div>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1">
            <div className="max-w-6xl mx-auto p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
