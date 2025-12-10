import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex space-x-8">
            <Link href="/" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
              Home
            </Link>
            <Link href="/health" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
              Health
            </Link>
            <Link href="/dependencies" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
              Dependencies
            </Link>
            <Link href="/before-after" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
              Before/After
            </Link>
            <Link href="/actions" className="inline-flex items-center px-1 pt-1 text-sm font-medium">
              Actions
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
