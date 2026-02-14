const COLORS = new Set(["white", "black"]);

function point(color, count) {
  return { color, count };
}

export function createInitialBoardState() {
  const points = Array.from({ length: 24 }, () => point(null, 0));

  points[23] = point("white", 2); // 24-point
  points[12] = point("white", 5); // 13-point
  points[7] = point("white", 3); // 8-point
  points[5] = point("white", 5); // 6-point

  points[0] = point("black", 2); // 1-point
  points[11] = point("black", 5); // 12-point
  points[16] = point("black", 3); // 17-point
  points[18] = point("black", 5); // 19-point

  return {
    points,
    bar: { white: 0, black: 0 },
    borneOff: { white: 0, black: 0 },
    turn: "white",
  };
}

function normalizePoint(input) {
  if (!input || typeof input !== "object") return point(null, 0);
  const count = Number(input.count);
  const color = typeof input.color === "string" ? input.color : null;

  if (!Number.isFinite(count) || count < 0) return null;
  if (count === 0) return point(null, 0);
  if (!COLORS.has(color)) return null;

  return point(color, Math.floor(count));
}

export function normalizeBoardState(input) {
  if (!input || typeof input !== "object") return null;
  if (!Array.isArray(input.points) || input.points.length !== 24) return null;

  const points = [];
  for (const candidate of input.points) {
    const normalized = normalizePoint(candidate);
    if (!normalized) return null;
    points.push(normalized);
  }

  const barWhite = Number(input.bar?.white ?? 0);
  const barBlack = Number(input.bar?.black ?? 0);
  const offWhite = Number(input.borneOff?.white ?? 0);
  const offBlack = Number(input.borneOff?.black ?? 0);
  const turn = typeof input.turn === "string" && COLORS.has(input.turn) ? input.turn : "white";

  if ([barWhite, barBlack, offWhite, offBlack].some((n) => !Number.isFinite(n) || n < 0)) {
    return null;
  }

  return {
    points,
    bar: { white: Math.floor(barWhite), black: Math.floor(barBlack) },
    borneOff: { white: Math.floor(offWhite), black: Math.floor(offBlack) },
    turn,
  };
}

/**
 * Returns true if moving from fromIndex to toIndex is one step in the
 * correct direction for the given color (no dice; single step only).
 */
function isOneStep(color, fromIndex, toIndex) {
  if (color === "white") return toIndex === fromIndex - 1;
  if (color === "black") return toIndex === fromIndex + 1;
  return false;
}

/**
 * Apply a move from one point to another. Returns a new board state or null if invalid.
 * Does not handle bar entry/exit; only point-to-point moves.
 */
export function applyMove(boardState, fromIndex, toIndex) {
  if (!boardState || fromIndex < 0 || fromIndex > 23 || toIndex < 0 || toIndex > 23) {
    return null;
  }
  const { points, bar, borneOff, turn } = boardState;
  const from = points[fromIndex];
  const to = points[toIndex];
  if (!from || from.count < 1 || from.color !== turn) return null;
  if (!isOneStep(turn, fromIndex, toIndex)) return null;

  const opponent = turn === "white" ? "black" : "white";
  if (to.count > 0 && to.color === opponent) {
    if (to.count > 1) return null; // blocked
    // hit blot: opponent goes to bar
  }

  const newPoints = points.map((p, i) => {
    if (i === fromIndex) {
      const newCount = p.count - 1;
      return newCount === 0 ? point(null, 0) : point(p.color, newCount);
    }
    if (i === toIndex) {
      if (p.count === 0) return point(turn, 1);
      if (p.color === turn) return point(turn, p.count + 1);
      // blot: replace with our checker, opponent goes to bar
      return point(turn, 1);
    }
    return { ...p };
  });

  let newBar = { ...bar };
  if (to.count === 1 && to.color === opponent) {
    newBar = { ...newBar, [opponent]: newBar[opponent] + 1 };
  }

  return {
    points: newPoints,
    bar: newBar,
    borneOff: { ...borneOff },
    turn: opponent, // switch turn after move
  };
}
