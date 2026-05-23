

export interface Lesson {
  id: string;
  title: string;
  id_formatted: string;
  description?: string;
}

export interface Module {
  title: string;
  weight: string;
  icon: any; // Lucide icon
  color: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Flashcard {
  front: string;
  back: string;
}

export interface ChoiceOption {
  text: string;
  outcome: string;
  isLogical: boolean;
}

export interface CachedLesson {
  script: string;
  quiz: QuizQuestion[];
  flashcards: Flashcard[];
  pulse: { text: string, sources: any[] } | null;
  masteryChoices: ChoiceOption[];
  audio?: string; 
  imageUrl?: string;
  timestamp: number;
}

export interface ExamResult {
  score: number;
  total: number;
  timestamp: number;
  weakTopics: string[];
  cachedReport?: string;
}

export interface UserVault {
  mnemonics: Record<string, string>;
  lessons: Record<string, CachedLesson>;
  globalFlashcards: Flashcard[];
  examHistory: ExamResult[];
}

// Added ChatMessage interface to resolve Error 1 in components/AIChat.tsx
export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  coinReward: number;
  isCompleted: boolean;
  progress: number;
  target: number;
  type: 'daily' | 'milestone';
}

export interface LeaderboardEntry {
  userId: string;
  name: string;
  xp: number;
  level: number;
  badgesCount: number;
  streak: number;
}

export type UserTier = 'basic' | 'pro' | 'enterprise';

export interface UserStats {
  tier: UserTier;
  xp: number;
  level: number;
  coins: number;
  streak: number;
  lastActive: number;
  badges: string[];
  completedQuests: string[];
  totalLessonsCompleted: number;
  totalQuizzesPassed: number;
  skillTree: Record<string, boolean>;
  activeBoosts: Record<string, number>;
}
