"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import SignOutButton from "@/components/SignOutButton";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold hover:opacity-80">
          thephillymojo
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/dashboard" className="hover:opacity-80">
            Dashboard
          </Link>
          {status === "loading" ? (
            <span className="text-sm text-muted-foreground">...</span>
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              <Image
                src={session.user.image}
                alt=""
                width={28}
                height={28}
                className="rounded-full"
              />
              <span className="text-sm text-muted-foreground">
                {session.user.email}
              </span>
              <SignOutButton />
            </div>
          ) : (
            <Link
              href="/login"
              className="text-sm hover:opacity-80 text-muted-foreground"
            >
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
