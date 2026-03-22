"use client";

import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/components/Header"), {
  ssr: false,
  loading: () => (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <span className="text-lg font-semibold">&nbsp;</span>
      </div>
    </header>
  ),
});

export default function ClientHeader() {
  return <Header />;
}
