"use client";

import { useCallback, useEffect, useState } from "react";

export default function HomeFunCards() {
  const [fact, setFact] = useState("Loading a random fact...");
  const [quote, setQuote] = useState("Loading a Chuck Norris quote...");
  const [isFactLoading, setIsFactLoading] = useState(false);
  const [isQuoteLoading, setIsQuoteLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchFact = useCallback(async () => {
    setIsFactLoading(true);
    setError("");
    try {
      const response = await fetch("/api/fact", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || typeof data?.fact !== "string" || !data.fact.trim()) {
        throw new Error("Failed to load fact");
      }
      setFact(data.fact.trim());
    } catch {
      setError("Could not refresh content right now.");
    } finally {
      setIsFactLoading(false);
    }
  }, []);

  const fetchQuote = useCallback(async () => {
    setIsQuoteLoading(true);
    setError("");
    try {
      const response = await fetch("/api/chuck", { cache: "no-store" });
      const data = await response.json();
      if (!response.ok || typeof data?.quote !== "string" || !data.quote.trim()) {
        throw new Error("Failed to load quote");
      }
      setQuote(data.quote.trim());
    } catch {
      setError("Could not refresh content right now.");
    } finally {
      setIsQuoteLoading(false);
    }
  }, []);

  const refreshBoth = useCallback(async () => {
    await Promise.all([fetchFact(), fetchQuote()]);
  }, [fetchFact, fetchQuote]);

  useEffect(() => {
    refreshBoth();
  }, [refreshBoth]);

  const isAnyLoading = isFactLoading || isQuoteLoading;

  return (
    <section className="fade-up" style={{ animationDelay: "120ms" }}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-900 md:text-xl">Daily Curiosities</h2>
        <button
          type="button"
          onClick={refreshBoth}
          disabled={isAnyLoading}
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          {isAnyLoading ? "Loading..." : "Surprise me"}
        </button>
      </div>
      {error ? <p className="mb-3 text-sm text-rose-700">{error}</p> : null}

      <div className="grid gap-4 md:grid-cols-2">
        <article className="soft-surface rounded-2xl p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-sky-700">Random Fact</p>
          <p className="mb-5 text-sm leading-6 text-slate-700 md:text-base">{fact}</p>
          <button
            type="button"
            onClick={fetchFact}
            disabled={isFactLoading}
            className="inline-flex items-center rounded-lg bg-sky-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-sky-800"
          >
            {isFactLoading ? "Loading..." : "New fact"}
          </button>
        </article>

        <article className="soft-surface rounded-2xl p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">Chuck Norris Quote</p>
          <p className="mb-5 text-sm leading-6 text-slate-700 md:text-base">{quote}</p>
          <button
            type="button"
            onClick={fetchQuote}
            disabled={isQuoteLoading}
            className="inline-flex items-center rounded-lg bg-emerald-700 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
          >
            {isQuoteLoading ? "Loading..." : "New quote"}
          </button>
        </article>
      </div>
    </section>
  );
}
