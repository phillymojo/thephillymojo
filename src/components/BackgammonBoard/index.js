"use client";

import { useState, useMemo } from "react";
import { applyMove } from "@/lib/backgammon";

function Checker({ color }) {
  return (
    <div
      className={`h-5 w-5 rounded-full border ${
        color === "white"
          ? "bg-white border-zinc-300"
          : "bg-zinc-900 border-zinc-700"
      }`}
    />
  );
}

function PointColumn({ point, label, isTop, shade, pointIndex, isSelected, isValidTarget, onClick, disabled }) {
  const visibleCheckers = Math.min(point.count, 5);
  const overflow = point.count - visibleCheckers;
  const checkers = Array.from({ length: visibleCheckers });
  const canSelect = !disabled && point.count > 0 && point.color;
  const isClickable = canSelect || isValidTarget;

  function handleClick() {
    if (disabled || !onClick) return;
    onClick(pointIndex);
  }

  return (
    <div className="flex-1 min-w-0">
      <div
        className={`relative h-28 px-1 py-1 flex items-stretch cursor-default rounded ${
          isClickable ? "cursor-pointer" : ""
        } ${isSelected ? "ring-2 ring-blue-500 ring-offset-1 ring-offset-amber-50 z-20" : ""} ${
          isValidTarget ? "ring-2 ring-green-500/80 ring-offset-1 ring-offset-amber-50 z-10" : ""
        }`}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (isClickable && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleClick();
          }
        }}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable ? 0 : undefined}
        aria-label={`Point ${label}${point.count ? `, ${point.count} ${point.color} checker(s)` : ", empty"}${isSelected ? ", selected" : ""}`}
      >
        <div
          className={`absolute inset-0 border border-amber-900/20 ${
            shade ? "bg-amber-200/80" : "bg-amber-100/80"
          } ${isTop ? "" : "rotate-180"}`}
          style={{ clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)" }}
        />
        <div
          className={`relative z-10 w-full flex flex-col items-center gap-1 ${
            isTop ? "" : "justify-end"
          }`}
        >
          {checkers.map((_, idx) => (
            <Checker key={`${label}-${idx}`} color={point.color} />
          ))}
          {overflow > 0 && (
            <span className="text-[10px] text-muted-foreground">+{overflow}</span>
          )}
        </div>
      </div>
      <div className="text-center text-[10px] text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function BoardRow({ points, labels, indices, isTop, selectedPointIndex, validDestinations, onPointClick, disabled }) {
  const leftPoints = points.slice(0, 6);
  const rightPoints = points.slice(6);
  const leftLabels = labels.slice(0, 6);
  const rightLabels = labels.slice(6);
  const leftIndices = indices.slice(0, 6);
  const rightIndices = indices.slice(6);

  return (
    <div className="flex items-stretch gap-2">
      <div className="flex flex-1 gap-1">
        {leftPoints.map((point, idx) => (
          <PointColumn
            key={leftLabels[idx]}
            point={point}
            label={leftLabels[idx]}
            isTop={isTop}
            shade={idx % 2 === 0}
            pointIndex={leftIndices[idx]}
            isSelected={selectedPointIndex === leftIndices[idx]}
            isValidTarget={validDestinations?.includes(leftIndices[idx])}
            onClick={onPointClick}
            disabled={disabled}
          />
        ))}
      </div>
      <div className="w-10 rounded-sm bg-amber-900/15 border border-amber-900/20" />
      <div className="flex flex-1 gap-1">
        {rightPoints.map((point, idx) => (
          <PointColumn
            key={rightLabels[idx]}
            point={point}
            label={rightLabels[idx]}
            isTop={isTop}
            shade={idx % 2 !== 0}
            pointIndex={rightIndices[idx]}
            isSelected={selectedPointIndex === rightIndices[idx]}
            isValidTarget={validDestinations?.includes(rightIndices[idx])}
            onClick={onPointClick}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default function BackgammonBoard({ boardState, onMove, disabled = false }) {
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);

  const topIndices = [23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12];
  const bottomIndices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const topPoints = topIndices.map((idx) => boardState.points[idx]);
  const bottomPoints = bottomIndices.map((idx) => boardState.points[idx]);
  const topLabels = topIndices.map((idx) => String(idx + 1));
  const bottomLabels = bottomIndices.map((idx) => String(idx + 1));

  const turn = boardState.turn;

  const validDestinations = useMemo(() => {
    if (selectedPointIndex == null) return null;
    const candidates = turn === "white"
      ? [selectedPointIndex - 1]
      : [selectedPointIndex + 1];
    return candidates.filter(
      (to) => to >= 0 && to <= 23 && applyMove(boardState, selectedPointIndex, to) != null
    );
  }, [boardState, selectedPointIndex, turn]);

  function handlePointClick(pointIndex) {
    if (disabled) return;
    if (selectedPointIndex === null) {
      const point = boardState.points[pointIndex];
      if (point?.count > 0 && point?.color === turn) {
        setSelectedPointIndex(pointIndex);
      }
      return;
    }
    if (selectedPointIndex === pointIndex) {
      setSelectedPointIndex(null);
      return;
    }
    if (onMove) {
      onMove(selectedPointIndex, pointIndex);
    }
    setSelectedPointIndex(null);
  }

  return (
    <div className="rounded-lg border border-amber-900/20 bg-amber-50 p-3 space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span>
          Turn: <span className="font-medium capitalize">{boardState.turn}</span>
        </span>
        <span className="text-muted-foreground">
          Bar W/B: {boardState.bar.white}/{boardState.bar.black} · Off W/B:{" "}
          {boardState.borneOff.white}/{boardState.borneOff.black}
        </span>
      </div>
      <BoardRow
        points={topPoints}
        labels={topLabels}
        indices={topIndices}
        isTop
        selectedPointIndex={selectedPointIndex}
        validDestinations={validDestinations}
        onPointClick={handlePointClick}
        disabled={disabled}
      />
      <BoardRow
        points={bottomPoints}
        labels={bottomLabels}
        indices={bottomIndices}
        isTop={false}
        selectedPointIndex={selectedPointIndex}
        validDestinations={validDestinations}
        onPointClick={handlePointClick}
        disabled={disabled}
      />
    </div>
  );
}
