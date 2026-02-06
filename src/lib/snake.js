export const GRID_SIZE = 20;
export const START_LENGTH = 3;
export const TICK_MS = 140;

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  KeyW: { x: 0, y: -1 },
  KeyS: { x: 0, y: 1 },
  KeyA: { x: -1, y: 0 },
  KeyD: { x: 1, y: 0 },
};

export function isOppositeDirection(a, b) {
  return a && b && a.x === -b.x && a.y === -b.y;
}

export function directionFromKey(code) {
  return DIRECTIONS[code] || null;
}

export function createInitialState(rng = Math.random) {
  const center = Math.floor(GRID_SIZE / 2);
  const snake = Array.from({ length: START_LENGTH }, (_, idx) => ({
    x: center - idx,
    y: center,
  }));
  const direction = { x: 1, y: 0 };
  const food = placeFood(snake, rng);

  return {
    snake,
    direction,
    pendingDirection: direction,
    food,
    score: 0,
    status: "playing",
  };
}

export function stepState(state, rng = Math.random) {
  if (state.status !== "playing") {
    return state;
  }

  const direction = state.pendingDirection || state.direction;
  const head = state.snake[0];
  const nextHead = { x: head.x + direction.x, y: head.y + direction.y };

  if (isOutOfBounds(nextHead) || hitsSnake(nextHead, state.snake)) {
    return { ...state, direction, status: "gameover" };
  }

  const ateFood = nextHead.x === state.food.x && nextHead.y === state.food.y;
  const nextSnake = [nextHead, ...state.snake];

  if (!ateFood) {
    nextSnake.pop();
  }

  let nextFood = state.food;
  let nextScore = state.score;
  let nextStatus = "playing";

  if (ateFood) {
    nextScore += 1;
    nextFood = placeFood(nextSnake, rng);
    if (!nextFood) {
      nextStatus = "gameover";
    }
  }

  return {
    ...state,
    snake: nextSnake,
    direction,
    pendingDirection: direction,
    food: nextFood || state.food,
    score: nextScore,
    status: nextStatus,
  };
}

export function queueDirection(state, nextDirection) {
  if (!nextDirection || isOppositeDirection(nextDirection, state.direction)) {
    return state;
  }

  return { ...state, pendingDirection: nextDirection };
}

export function isOutOfBounds(cell) {
  return (
    cell.x < 0 ||
    cell.y < 0 ||
    cell.x >= GRID_SIZE ||
    cell.y >= GRID_SIZE
  );
}

export function hitsSnake(cell, snake) {
  return snake.some((segment) => segment.x === cell.x && segment.y === cell.y);
}

export function placeFood(snake, rng = Math.random) {
  const emptyCells = [];
  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      if (!hitsSnake({ x, y }, snake)) {
        emptyCells.push({ x, y });
      }
    }
  }

  if (emptyCells.length === 0) {
    return null;
  }

  const index = Math.floor(rng() * emptyCells.length);
  return emptyCells[index];
}
