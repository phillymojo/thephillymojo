import { FALLBACK_FACTS, pickRandomItem } from "@/lib/funContent";

const FACT_ENDPOINT = "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en";

export async function GET() {
  try {
    const response = await fetch(FACT_ENDPOINT, { cache: "no-store" });

    if (!response.ok) {
      throw new Error(`Fact API returned ${response.status}`);
    }

    const data = await response.json();
    const fact = typeof data?.text === "string" ? data.text.trim() : "";

    if (!fact) {
      throw new Error("Fact API returned empty content");
    }

    return Response.json({ fact, source: "api" });
  } catch (error) {
    console.error("Fact API fallback:", error);
    return Response.json({ fact: pickRandomItem(FALLBACK_FACTS), source: "fallback" });
  }
}
