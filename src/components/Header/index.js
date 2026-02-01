import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold hover:opacity-80">
          thephillymojo
        </Link>
        <nav className="flex gap-6">
          <Link href="/dashboard" className="hover:opacity-80">
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
