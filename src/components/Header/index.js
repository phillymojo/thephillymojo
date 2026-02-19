"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { LayoutDashboard, ChevronDown } from "lucide-react";
import SignOutButton from "@/components/SignOutButton";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const safePathname = pathname || "/";
  const loginHref =
    safePathname === "/login"
      ? "/login"
      : `/login?callbackUrl=${encodeURIComponent(safePathname)}`;

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="text-lg font-semibold hover:opacity-80">
          thephillymojo
        </Link>
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm hover:bg-slate-100 hover:opacity-90 dark:hover:bg-slate-800"
          >
            <LayoutDashboard className="size-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                <span className="hidden sm:inline">Games</span>
                <span className="sm:hidden">Play</span>
                <ChevronDown className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem asChild>
                <Link href="/backgammon">Backgammon</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/snake">Snake</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {status === "loading" ? (
            <span className="text-sm text-muted-foreground">...</span>
          ) : session?.user ? (
            <div className="flex items-center gap-3">
              {typeof session.user.image === "string" && session.user.image ? (
                <Image
                  src={session.user.image}
                  alt=""
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              ) : (
                <div className="size-7 rounded-full bg-slate-300 dark:bg-slate-600" />
              )}
              <span className="hidden text-sm text-muted-foreground lg:inline">
                {session.user.email}
              </span>
              <SignOutButton />
            </div>
          ) : (
            <Link
              href={loginHref}
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
