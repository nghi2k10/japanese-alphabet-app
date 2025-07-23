export type AlphabetCharacter = {
  id: number;
  character: string;
  romaji: string;
  row: string;
  audio: string;
  isYouon: boolean;
  isDakuten: boolean;
};

export type KanaData = {
  basic: AlphabetCharacter[];
  dakuten: AlphabetCharacter[];
  youon: AlphabetCharacter[];
};

export type QuizMode = 'hiragana' | 'katakana';
export type DifficultyLevel = 'all' | 'basic' | 'vowels' | 'k' | 's' | 't' | 'n' | 'h' | 'm' | 'y' | 'r' | 'w';

export type QuizSettings = {
  mode: QuizMode;
  includeYouon: boolean;
  includeDakuten: boolean;
  difficulty: DifficultyLevel;
};

export type QuizState = {
  currentQuestion: AlphabetCharacter | null;
  correctAnswers: number;
  wrongAnswers: number;
  currentStreak: number;
  maxStreak: number;
  progress: number;
};

export type AppMode = 'learn' | 'quiz';