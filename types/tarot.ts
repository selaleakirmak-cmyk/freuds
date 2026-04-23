export type CardCategory =
  | "major"
  | "anxiety"
  | "defense"
  | "desire"
  | "relation";

export type MinorSuit = "anxiety" | "defense" | "desire" | "relation";

export type Card = {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  category: CardCategory;
  number?: number;
  suit?: MinorSuit;
  rank?: string;
  image: string;
  keywords: string[];
  summary: string;
  meaning: string;
  reflectionQuestions: string[];
  psychoanalyticNotes?: string;
  sourceNote?: string;
};

export type SpreadPosition = {
  id: string;
  label: string;
  meaning: string;
  x?: number;
  y?: number;
};

export type Spread = {
  id: string;
  slug: string;
  title: string;
  description: string;
  cardCount: number;
  positions: SpreadPosition[];
  recommended?: boolean;
  estimatedTime?: string;
};

export type DrawnCard = {
  positionId: string;
  cardId: string;
  revealed: boolean;
  revealedAt?: string;
};

export type Reading = {
  id: string;
  spreadId: string;
  intention?: string;
  createdAt: string;
  cards: DrawnCard[];
};

export type ResolvedReadingCard = {
  position: SpreadPosition;
  card: Card;
  revealed: boolean;
  revealedAt?: string;
};

export type ResolvedReading = {
  id: string;
  spread: Spread;
  intention?: string;
  createdAt: string;
  cards: ResolvedReadingCard[];
};

export type InterpretationBlock = {
  positionLabel: string;
  positionMeaning: string;
  cardTitle: string;
  cardSummary: string;
  cardMeaning: string;
  synthesis: string;
  reflectionQuestions: string[];
};

export type ReadingPhase =
  | "setup"
  | "drawing"
  | "dealing"
  | "ready_to_reveal"
  | "revealing"
  | "complete";

export type ReadingSessionState = {
  phase: ReadingPhase;
  spreadId: string;
  intention: string;
  reading: Reading | null;
  activePositionId: string | null;
  lastRevealedPositionId: string | null;
};
