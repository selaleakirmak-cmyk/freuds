import type {
  Card,
  DrawnCard,
  InterpretationBlock,
  Reading,
  ReadingSessionState,
  ResolvedReading,
  ResolvedReadingCard,
  Spread,
  SpreadPosition,
} from "@/types/tarot";

const STORAGE_KEY = "freudstarot-reading-session";

export function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateReadingId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `reading-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createReading(spread: Spread, deck: Card[], intention?: string): Reading {
  if (deck.length < spread.cardCount) {
    throw new Error("Deck does not contain enough cards for this spread.");
  }

  const shuffled = shuffleArray(deck);
  const selected = shuffled.slice(0, spread.cardCount);

  return {
    id: generateReadingId(),
    spreadId: spread.id,
    intention: intention?.trim() || "",
    createdAt: new Date().toISOString(),
    cards: spread.positions.map((position, index): DrawnCard => ({
      positionId: position.id,
      cardId: selected[index].id,
      revealed: false,
    })),
  };
}

export function revealReadingCard(reading: Reading, positionId: string): Reading {
  return {
    ...reading,
    cards: reading.cards.map((card) =>
      card.positionId === positionId && !card.revealed
        ? { ...card, revealed: true, revealedAt: new Date().toISOString() }
        : card
    ),
  };
}

export function getRevealedCount(reading: Reading): number {
  return reading.cards.filter((card) => card.revealed).length;
}

export function isReadingComplete(reading: Reading): boolean {
  return reading.cards.every((card) => card.revealed);
}

export function getNextUnrevealedPositionId(reading: Reading): string | null {
  const next = reading.cards.find((card) => !card.revealed);
  return next ? next.positionId : null;
}

export function resolveReading(reading: Reading, spread: Spread, deck: Card[]): ResolvedReading {
  const cards: ResolvedReadingCard[] = reading.cards.map((drawn) => {
    const position = spread.positions.find((p) => p.id === drawn.positionId);
    const card = deck.find((c) => c.id === drawn.cardId);

    if (!position) throw new Error(`Missing spread position: ${drawn.positionId}`);
    if (!card) throw new Error(`Missing card data: ${drawn.cardId}`);

    return {
      position,
      card,
      revealed: drawn.revealed,
      revealedAt: drawn.revealedAt,
    };
  });

  return {
    id: reading.id,
    spread,
    intention: reading.intention,
    createdAt: reading.createdAt,
    cards,
  };
}

export function buildInterpretationBlock(position: SpreadPosition, card: Card): InterpretationBlock {
  return {
    positionLabel: position.label,
    positionMeaning: position.meaning,
    cardTitle: card.title,
    cardSummary: card.summary,
    cardMeaning: card.meaning,
    synthesis: `${position.label} pozisyonunda ${card.title}, ${position.meaning.toLowerCase()} alanında ${card.summary.toLowerCase()} temasını öne çıkarır.`,
    reflectionQuestions: card.reflectionQuestions,
  };
}

export function createInitialSessionState(spreadId: string, intention = ""): ReadingSessionState {
  return {
    phase: "setup",
    spreadId,
    intention,
    reading: null,
    activePositionId: null,
    lastRevealedPositionId: null,
  };
}

export function saveReadingSession(state: ReadingSessionState): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadReadingSession(): ReadingSessionState | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ReadingSessionState;
  } catch {
    return null;
  }
}

export function clearReadingSession(): void {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}
