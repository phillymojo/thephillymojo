"use client";

import Link from "next/link";
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
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold hover:opacity-80">
          thephillymojo
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 hover:opacity-80"
          >
            <LayoutDashboard className="size-4" />
            Dashboard
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1">
                Games
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
