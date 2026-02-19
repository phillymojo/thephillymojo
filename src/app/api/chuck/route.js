import { FALLBACK_CHUCK_QUOTES, pickRandomItem } from "@/lib/funContent";

const CHUCK_ENDPOINT = "https://api.chucknorris.io/jokes/random";

export async function GET() {
  try {
    const response = await fetch(CHUCK_ENDPOINT, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Chuck API returned ${response.status}`);
    }

    const data = await response.json();
    const quote = typeof data?.value === "string" ? data.value.trim() : "";

    if (!quote) {
      throw new Error("Chuck API returned empty content");
    }

    return Response.json({ quote, source: "api" });
  } catch (error) {
    console.error("Chuck API fallback:", error);
    return Response.json({
      quote: pickRandomItem(FALLBACK_CHUCK_QUOTES),
      source: "fallback",
    });
  }
}
