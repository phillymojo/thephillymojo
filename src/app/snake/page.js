"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  GRID_SIZE,
  TICK_MS,
  createInitialState,
  directionFromKey,
  queueDirection,
  stepState,
} from "@/lib/snake";

const CELL_SIZE = 18;

export default function SnakePage() {
  const [state, setState] = useState(() => createInitialState());
  const [isPaused, setIsPaused] = useState(false);
  const lastTickRef = useRef(null);

  const handleRestart = useCallback(() => {
    setState(createInitialState());
    setIsPaused(false);
  }, []);

  const handlePauseToggle = useCallback(() => {
    setIsPaused((prev) => !prev);
  }, []);

  const handleDirection = useCallback((direction) => {
    setState((prev) => queueDirection(prev, direction));
  }, []);

  useEffect(() => {
    function handleKeyDown(event) {
      const direction = directionFromKey(event.code);
      if (direction) {
        event.preventDefault();
        handleDirection(direction);
      }
      if (event.code === "Space") {
        event.preventDefault();
        setIsPaused((prev) => !prev);
      }
      if (event.code === "KeyR") {
        event.preventDefault();
        handleRestart();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleDirection, handleRestart]);

  useEffect(() => {
    if (state.status !== "playing" || isPaused) {
      return undefined;
    }

    let rafId;

    const tick = (timestamp) => {
      if (lastTickRef.current == null) {
        lastTickRef.current = timestamp;
      }

      const delta = timestamp - lastTickRef.current;
      if (delta >= TICK_MS) {
        setState((prev) => stepState(prev));
        lastTickRef.current = timestamp;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(rafId);
      lastTickRef.current = null;
    };
  }, [state.status, isPaused]);

  const cells = useMemo(() => {
    const snakeSet = new Set(
      state.snake.map((segment) => `${segment.x},${segment.y}`)
    );
    const foodKey = `${state.food.x},${state.food.y}`;

    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, idx) => {
      const x = idx % GRID_SIZE;
      const y = Math.floor(idx / GRID_SIZE);
      const key = `${x},${y}`;
      return {
        key,
        isSnake: snakeSet.has(key),
        isFood: key === foodKey,
      };
    });
  }, [state.snake, state.food]);

  const statusLabel =
    state.status === "gameover"
      ? "Game Over"
      : isPaused
      ? "Paused"
      : "Playing";

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Snake</h1>
          <p className="text-muted-foreground">Classic grid-based Snake.</p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/">Back home</Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="text-sm text-muted-foreground">
          Score: <span className="text-foreground font-medium">{state.score}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Status: <span className="text-foreground font-medium">{statusLabel}</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handlePauseToggle}>
            {isPaused ? "Resume" : "Pause"}
          </Button>
          <Button size="sm" variant="secondary" onClick={handleRestart}>
            Restart
          </Button>
        </div>
      </div>

      <div
        className="inline-grid rounded-lg border border-border bg-muted/30 p-2"
        style={{
          gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
          gap: "2px",
        }}
      >
        {cells.map((cell) => (
          <div
            key={cell.key}
            className={
              cell.isSnake
                ? "bg-foreground"
                : cell.isFood
                ? "bg-red-500"
                : "bg-background"
            }
            style={{
              width: `${CELL_SIZE}px`,
              height: `${CELL_SIZE}px`,
            }}
          />
        ))}
      </div>

      <div className="mt-8 space-y-4">
        <p className="text-sm text-muted-foreground">
          Controls: Arrow keys or WASD to move. Space to pause. R to restart.
        </p>

        <div className="grid grid-cols-3 gap-2 max-w-[220px]">
          <div />
          <Button size="sm" variant="outline" onClick={() => handleDirection({ x: 0, y: -1 })}>
            Up
          </Button>
          <div />
          <Button size="sm" variant="outline" onClick={() => handleDirection({ x: -1, y: 0 })}>
            Left
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleDirection({ x: 0, y: 1 })}>
            Down
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleDirection({ x: 1, y: 0 })}>
            Right
          </Button>
        </div>
      </div>
    </div>
  );
}
