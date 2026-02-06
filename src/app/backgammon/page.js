"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function getDefaultWsUrl() {
  if (typeof window === "undefined") {
    return "";
  }
  if (process.env.NEXT_PUBLIC_WS_URL) {
    return process.env.NEXT_PUBLIC_WS_URL;
  }
  const hostname = window.location.hostname;
  if (hostname === "localhost" || hostname === "127.0.0.1") {
    return "ws://localhost:8080";
  }
  const rootDomain = hostname.startsWith("www.")
    ? hostname.slice(4)
    : hostname;
  if (hostname.startsWith("localhost.")) {
    return `ws://${hostname}:8080`;
  }
  return `wss://ws.${rootDomain}`;
}

export default function BackgammonTestPage() {
  const { status: authStatus } = useSession();
  const [wsUrl, setWsUrl] = useState("");
  const [gameId, setGameId] = useState("local-test");
  const [status, setStatus] = useState("disconnected");
  const [messages, setMessages] = useState([]);
  const [isLocalEnv, setIsLocalEnv] = useState(false);
  const socketRef = useRef(null);

  const isAuthed = authStatus === "authenticated";
  const canConnect = status === "disconnected" && isAuthed;
  const canDisconnect = status === "connected";

  useEffect(() => {
    const hostname = window.location.hostname;
    const local =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname.startsWith("localhost.");
    setIsLocalEnv(local);
    setWsUrl((prev) => prev || getDefaultWsUrl());
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  function logMessage(source, payload) {
    setMessages((prev) => [
      { id: `${Date.now()}-${Math.random()}`, source, payload },
      ...prev,
    ]);
  }

  function connect() {
    if (!wsUrl) return;
    const socket = new WebSocket(wsUrl);
    socketRef.current = socket;
    setStatus("connecting");

    socket.onopen = () => {
      setStatus("connected");
      logMessage("system", { message: "connected" });
    };

    socket.onclose = () => {
      setStatus("disconnected");
      logMessage("system", { message: "disconnected" });
    };

    socket.onerror = (event) => {
      logMessage("system", { message: "socket error", event: String(event) });
    };

    socket.onmessage = (event) => {
      let parsed;
      try {
        parsed = JSON.parse(event.data);
      } catch (error) {
        parsed = { raw: event.data };
      }
      logMessage("server", parsed);
    };
  }

  function disconnect() {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
  }

  function sendMessage(type, payload) {
    if (!socketRef.current || socketRef.current.readyState !== 1) return;
    const message = { type, payload };
    socketRef.current.send(JSON.stringify(message));
    logMessage("client", message);
  }

  const messageList = useMemo(
    () => messages.map((msg) => ({ id: msg.id, text: JSON.stringify(msg, null, 2) })),
    [messages]
  );

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Backgammon WS Test</h1>
          <p className="text-muted-foreground">
            Minimal harness to validate join/broadcast behavior.
          </p>
        </div>
        <Button variant="outline" asChild>
          <Link href="/">Back home</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connection</CardTitle>
          <CardDescription>
            Uses your current login session to authenticate.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <label className="text-sm text-muted-foreground">WebSocket URL</label>
            <Input value={wsUrl} onChange={(event) => setWsUrl(event.target.value)} />
          </div>
          {isLocalEnv && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>Quick set:</span>
              <Button size="sm" variant="outline" onClick={() => setWsUrl(getDefaultWsUrl())}>
                Local WS
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setWsUrl("wss://ws.thephillymojo.com")}
              >
                Prod WS
              </Button>
            </div>
          )}
          <div className="grid gap-2">
            <label className="text-sm text-muted-foreground">Game ID</label>
            <Input value={gameId} onChange={(event) => setGameId(event.target.value)} />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={connect} disabled={!canConnect}>
              Connect
            </Button>
            <Button onClick={disconnect} disabled={!canDisconnect} variant="secondary">
              Disconnect
            </Button>
            <Button
              onClick={() => sendMessage("join", { gameId })}
              disabled={!canDisconnect}
              variant="outline"
            >
              Join Game
            </Button>
            <Button
              onClick={() => sendMessage("move", { state: { note: "test" } })}
              disabled={!canDisconnect}
              variant="outline"
            >
              Send Test Move
            </Button>
          </div>
          {!isAuthed && (
            <div className="text-sm text-muted-foreground">
              You are not signed in.{" "}
              <Button asChild size="sm" variant="link" className="px-0">
                <Link href="/login?callbackUrl=/backgammon">Sign in</Link>
              </Button>{" "}
              to connect.
            </div>
          )}
          <div className="text-sm text-muted-foreground flex flex-wrap gap-3">
            <span>
              Auth:{" "}
              <span className="text-foreground font-medium">{authStatus}</span>
            </span>
            <span>
              WS: <span className="text-foreground font-medium">{status}</span>
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
          <CardDescription>Newest first.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 text-xs font-mono">
            {messageList.length === 0 && (
              <div className="text-muted-foreground">No messages yet.</div>
            )}
            {messageList.map(({ id, text }) => (
              <pre key={id} className="whitespace-pre-wrap">
                {text}
              </pre>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
