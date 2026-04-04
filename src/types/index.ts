export type CountryCode = string;

export type Continent =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'South America'
  | 'Oceania';

export interface Country {
  code: CountryCode;
  name: string;
  capital: string;
  continent: Continent;
  population: number;
  flag: string;
  alternateNames: string[];
  landlocked: boolean;
}

export type RuleType =
  | 'borders'
  | 'same_continent'
  | 'starts_with_same'
  | 'starts_with_last'
  | 'same_first_letter_capital';

export type Difficulty = 'easy' | 'hard';

export interface Rule {
  type: RuleType;
  displayText: string;
}

export interface ChainLink {
  country: Country;
  rule: Rule | null; // null for the starting country
}

export type FeedbackType = 'correct' | 'wrong' | 'already_used' | 'invalid_country';

export interface Feedback {
  type: FeedbackType;
  message: string;
  hint?: string;
}

export type GameStatus = 'idle' | 'playing' | 'ended';

export interface GameState {
  status: GameStatus;
  difficulty: Difficulty;
  chain: ChainLink[];
  currentRule: Rule | null;
  score: number;
  timeLimit: number;
  timeRemaining: number;
  usedCountries: Set<CountryCode>;
  streak: number;
  lastFeedback: Feedback | null;
  endReason?: 'timeout' | 'no_moves' | 'quit';
  possibleAnswers?: string[]; // country names that would have been valid
}

export interface PlayerStats {
  gamesPlayed: number;
  bestChainLength: number;
  bestScore: number;
  countriesLearned: CountryCode[];
  history: GameRecord[];
}

export interface GameRecord {
  date: string;
  playerName: string;
  difficulty: Difficulty;
  chainLength: number;
  score: number;
  countries: CountryCode[];
}

export interface LeaderboardEntry {
  playerName: string;
  score: number;
  chainLength: number;
  difficulty: Difficulty;
  date: string;
}

export type LeaderboardData = Partial<Record<Difficulty, LeaderboardEntry[]>>;
