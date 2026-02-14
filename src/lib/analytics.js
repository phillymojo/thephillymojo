export function trackEvent(name, properties = {}) {
  if (!name) return;

  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      properties,
      path: typeof window !== "undefined" ? window.location.pathname : undefined,
      ts: new Date().toISOString(),
    }),
  }).catch(() => {
    // Intentionally ignore analytics transport failures.
  });
}
