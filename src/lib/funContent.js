export const FALLBACK_FACTS = [
  "Honey never spoils. Sealed honey found in ancient tombs is still edible.",
  "Octopuses have three hearts and blue blood.",
  "A day on Venus is longer than a year on Venus.",
  "Bananas are berries, but strawberries are not.",
  "The Eiffel Tower can grow taller in summer due to thermal expansion.",
  "Sharks existed before trees first appeared on Earth.",
  "Your brain can generate about 20 watts of power while awake.",
  "Wombat poop is cube-shaped, which helps it stay in place.",
];

export const FALLBACK_CHUCK_QUOTES = [
  "Chuck Norris counted to infinity. Twice.",
  "Chuck Norris can divide by zero.",
  "When Chuck Norris does push-ups, he pushes the Earth down.",
  "Chuck Norris can hear sign language.",
  "Death once had a near-Chuck Norris experience.",
  "Chuck Norris can slam a revolving door.",
  "Chuck Norris can strangle you with a cordless phone.",
  "Chuck Norris once won a game of Connect Four in three moves.",
];

export function pickRandomItem(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return "";
  }

  return items[Math.floor(Math.random() * items.length)];
}
