const http = require("http");
const { WebSocketServer } = require("ws");
const { decode: decodeJwt } = require("next-auth/jwt");

const PORT = Number(process.env.PORT || 8080);
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!NEXTAUTH_SECRET) {
  console.error("Missing NEXTAUTH_SECRET env var.");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

const wss = new WebSocketServer({ noServer: true });

const games = new Map();
const rooms = new Map();

function getRoom(gameId) {
  if (!rooms.has(gameId)) {
    rooms.set(gameId, new Set());
  }
  return rooms.get(gameId);
}

function broadcast(gameId, payload) {
  const room = rooms.get(gameId);
  if (!room) return;
  const message = JSON.stringify(payload);
  room.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(message);
    }
  });
}

function ensureGame(gameId) {
  if (!games.has(gameId)) {
    games.set(gameId, {
      id: gameId,
      status: "waiting",
      players: { white: null, black: null },
      createdAt: Date.now(),
      updatedAt: Date.now(),
      state: null,
    });
  }
  return games.get(gameId);
}

function assignPlayer(game, userId) {
  if (game.players.white === userId || game.players.black === userId) {
    return game.players.white === userId ? "white" : "black";
  }

  if (!game.players.white) {
    game.players.white = userId;
    return "white";
  }

  if (!game.players.black) {
    game.players.black = userId;
    return "black";
  }

  return null;
}

function updateGame(game, patch) {
  Object.assign(game, patch, { updatedAt: Date.now() });
}

const isSecureCookie = (process.env.NEXTAUTH_URL || "").startsWith("https://");
const sessionCookieName = isSecureCookie
  ? "__Secure-next-auth.session-token"
  : "next-auth.session-token";

function parseCookies(header) {
  const result = {};
  if (!header) return result;
  header.split(";").forEach((pair) => {
    const [name, ...rest] = pair.trim().split("=");
    if (!name) return;
    result[name] = rest.join("=");
  });
  return result;
}

function assembleChunkedCookie(cookies, baseName) {
  if (cookies[baseName]) return cookies[baseName];
  const chunks = [];
  for (let i = 0; ; i += 1) {
    const part = cookies[`${baseName}.${i}`];
    if (!part) break;
    chunks.push(part);
  }
  if (chunks.length === 0) return null;
  return chunks.join("");
}

async function authenticate(request) {
  const cookieHeader = request.headers.cookie || "";
  const cookies = parseCookies(cookieHeader);
  const rawToken = assembleChunkedCookie(cookies, sessionCookieName);

  if (!rawToken) {
    return null;
  }

  try {
    const token = await decodeJwt({
      token: rawToken,
      secret: NEXTAUTH_SECRET,
    });
    return token?.sub ? { userId: token.sub, email: token.email } : null;
  } catch (_error) {
    return null;
  }
}

server.on("upgrade", async (request, socket, head) => {
  try {
    if (ALLOWED_ORIGINS.length > 0) {
      const origin = request.headers.origin;
      if (!origin || !ALLOWED_ORIGINS.includes(origin)) {
        socket.write("HTTP/1.1 403 Forbidden\r\n\r\n");
        socket.destroy();
        return;
      }
    }

    const auth = await authenticate(request);
    if (!auth) {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    wss.handleUpgrade(request, socket, head, (ws) => {
      ws.auth = auth;
      wss.emit("connection", ws, request);
    });
  } catch (error) {
    console.error("WebSocket upgrade error:", error);
    socket.write("HTTP/1.1 500 Internal Server Error\r\n\r\n");
    socket.destroy();
  }
});

wss.on("connection", (ws) => {
  ws.gameId = null;

  ws.send(
    JSON.stringify({
      type: "welcome",
      payload: { userId: ws.auth.userId, email: ws.auth.email },
    })
  );

  ws.on("message", (raw) => {
    let message;
    try {
      message = JSON.parse(raw.toString());
    } catch (error) {
      ws.send(JSON.stringify({ type: "error", payload: { message: "Invalid JSON" } }));
      return;
    }

    const { type, payload } = message || {};

    if (type === "join") {
      const gameId = payload?.gameId;
      const trimmedId = typeof gameId === "string" ? gameId.trim() : "";
      if (!trimmedId || trimmedId.length > 128) {
        ws.send(
          JSON.stringify({
            type: "error",
            payload: { message: "Missing or invalid gameId (max 128 chars)" },
          })
        );
        return;
      }

      const game = ensureGame(trimmedId);
      const role = assignPlayer(game, ws.auth.userId);

      if (!role) {
        ws.send(
          JSON.stringify({
            type: "error",
            payload: { message: "Game is full" },
          })
        );
        return;
      }

      ws.gameId = trimmedId;
      ws.role = role;
      getRoom(trimmedId).add(ws);

      if (game.players.white && game.players.black) {
        updateGame(game, { status: "playing" });
      }

      ws.send(
        JSON.stringify({
          type: "joined",
          payload: { gameId: trimmedId, role, game },
        })
      );

      broadcast(trimmedId, { type: "state", payload: { game } });
      return;
    }

    if (type === "leave") {
      if (ws.gameId) {
        const room = rooms.get(ws.gameId);
        if (room) room.delete(ws);
      }
      ws.gameId = null;
      ws.role = null;
      ws.send(JSON.stringify({ type: "left" }));
      return;
    }

    if (type === "move") {
      if (!ws.gameId) {
        ws.send(
          JSON.stringify({
            type: "error",
            payload: { message: "Join a game first" },
          })
        );
        return;
      }

      const game = games.get(ws.gameId);
      if (!game) {
        ws.send(
          JSON.stringify({
            type: "error",
            payload: { message: "Unknown game" },
          })
        );
        return;
      }

      updateGame(game, {
        state: payload?.state || game.state,
      });

      broadcast(ws.gameId, { type: "state", payload: { game } });
      return;
    }

    ws.send(
      JSON.stringify({
        type: "error",
        payload: { message: "Unknown message type" },
      })
    );
  });

  ws.on("close", () => {
    if (!ws.gameId) return;
    const room = rooms.get(ws.gameId);
    if (room) room.delete(ws);
  });
});

const pingInterval = setInterval(() => {
  wss.clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.ping();
    }
  });
}, 20000);

wss.on("close", () => clearInterval(pingInterval));

server.listen(PORT, () => {
  console.log(`WS server listening on :${PORT}`);
});
