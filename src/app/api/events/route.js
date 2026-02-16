import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const name = typeof body?.name === "string" ? body.name.trim() : "";

    if (!name) {
      return NextResponse.json({ error: "Event name is required" }, { status: 400 });
    }

    console.info("[analytics]", {
      name,
      properties: body?.properties ?? {},
      path: body?.path ?? null,
      ts: body?.ts ?? new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid event payload" }, { status: 400 });
  }
}
