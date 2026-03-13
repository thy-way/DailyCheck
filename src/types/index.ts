export type CategoryId = 'fitness' | 'coding' | 'english' | 'exam' | 'side';

export interface Task {
  id: string;
  categoryId: CategoryId;
  name: string;
  icon: string;
  unit?: string;
  defaultDuration?: number;
  enabled: boolean;
  order: number;
  group?: string;
  groupOrder?: number;
  description?: string;
  learningRoute?: string[];
  resources?: { name: string; url?: string }[];
}

export interface CheckIn {
  id?: number;
  taskId: string;
  categoryId: CategoryId;
  date: string;
  timestamp: number;
  note?: string;
  duration?: number;
  quantity?: number;
  photo?: string;
  createdAt: number;
}

export interface Category {
  id: CategoryId;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  enabled: boolean;
  dailyGoal?: number;
}

export interface UserSettings {
  reminderEnabled: boolean;
  reminderTime: string;
  theme: 'light' | 'dark' | 'system';
}

export interface DailyStats {
  date: string;
  totalCheckIns: number;
  byCategory: Record<CategoryId, number>;
  byTask: Record<string, number>;
  isCompleted: boolean;
}

export interface WeeklyStats {
  weekStart: string;
  weekEnd: string;
  days: DailyStats[];
  totalCheckIns: number;
  averagePerDay: number;
  bestDay: string;
}

export interface ExportData {
  version: string;
  exportedAt: string;
  settings: UserSettings;
  categories: Category[];
  tasks: Task[];
  checkIns: CheckIn[];
}