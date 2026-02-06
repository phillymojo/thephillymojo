import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-4">thephillymojo</h1>
      <p className="text-muted-foreground mb-12">
        Personal hub and dashboard.
      </p>

      <section className="space-y-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Backgammon</h2>
            <p className="text-sm text-muted-foreground">
              Multiplayer backgammon over WebSocket (sign in required).
            </p>
          </div>
          <Button asChild>
            <Link href="/backgammon">Backgammon WS Test</Link>
          </Button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Snake</h2>
            <p className="text-sm text-muted-foreground">
              Classic grid-based Snake mini-game.
            </p>
          </div>
          <Button asChild>
            <Link href="/snake">Play Snake</Link>
          </Button>
        </div>

        <h2 className="text-xl font-semibold text-foreground">
          Component library (shadcn/ui)
        </h2>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Button
          </h3>
          <div className="flex flex-wrap gap-2">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Card
          </h3>
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Card title</CardTitle>
              <CardDescription>
                A short description for the card content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground">
                Use Card, CardHeader, CardTitle, CardDescription, CardContent,
                and CardFooter to build content blocks.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">Action</Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">
            Input
          </h3>
          <div className="max-w-sm space-y-2">
            <Input placeholder="Enter something..." />
            <Input type="email" placeholder="you@example.com" />
            <Input type="password" placeholder="Password" disabled />
          </div>
        </div>
      </section>
    </div>
  );
}
