import { create } from 'zustand';
import { db } from '../db';
import { TomatoSession, TomatoSettings } from '../types';

interface TomatoStore {
  sessions: TomatoSession[];
  settings: TomatoSettings;
  currentSession: TomatoSession | null;
  isRunning: boolean;
  remainingTime: number;
  currentType: 'focus' | 'short-break' | 'long-break';
  completedCount: number; // Today's completed sessions
  loading: boolean;

  // Methods
  loadSessions: () => Promise<void>;
  loadSettings: () => Promise<void>;
  saveSettings: (settings: Partial<TomatoSettings>) => Promise<void>;
  startSession: (taskId?: string, type?: 'focus' | 'short-break' | 'long-break') => Promise<void>;
  pauseSession: () => void;
  resumeSession: () => void;
  completeSession: (note?: string) => Promise<void>;
  cancelSession: () => void;
  updateRemainingTime: (time: number) => void;
  incrementCompletedCount: () => void;
}

export const useTomatoStore = create<TomatoStore>((set, get) => ({
  sessions: [],
  settings: {
    focusDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    longBreakInterval: 4,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    soundEnabled: true,
  },
  currentSession: null,
  isRunning: false,
  remainingTime: 25 * 60,
  currentType: 'focus',
  completedCount: 0,
  loading: false,

  loadSessions: async () => {
    set({ loading: true });
    const today = new Date().toISOString().split('T')[0];
    const sessions = await db.tomatoSessions.toArray();
    const todaySessions = sessions.filter(s => 
      new Date(s.startDate).toISOString().split('T')[0] === today
    );
    set({ 
      sessions, 
      completedCount: todaySessions.filter(s => s.completed).length,
      loading: false 
    });
  },

  loadSettings: async () => {
    const settings = await db.tomatoSettings.toArray();
    if (settings.length > 0) {
      set({ settings: settings[0] });
    } else {
      const defaultSettings = {
        focusDuration: 25,
        shortBreakDuration: 5,
        longBreakDuration: 15,
        longBreakInterval: 4,
        autoStartBreaks: false,
        autoStartPomodoros: false,
        soundEnabled: true,
      };
      await db.tomatoSettings.add(defaultSettings);
      set({ settings: defaultSettings });
    }
  },

  saveSettings: async (newSettings) => {
    const { settings } = get();
    const updatedSettings = { ...settings, ...newSettings };
    
    if (updatedSettings.id) {
      await db.tomatoSettings.update(updatedSettings.id, updatedSettings);
    } else {
      const id = await db.tomatoSettings.add(updatedSettings);
      updatedSettings.id = id;
    }
    
    set({ settings: updatedSettings });
  },

  startSession: async (taskId, type = 'focus') => {
    const { settings } = get();
    const now = Date.now();
    let duration = settings.focusDuration;

    if (type === 'short-break') {
      duration = settings.shortBreakDuration;
    } else if (type === 'long-break') {
      duration = settings.longBreakDuration;
    }

    const session: TomatoSession = {
      taskId,
      type,
      duration,
      completed: false,
      startDate: now,
      createdAt: now,
    };

    const id = await db.tomatoSessions.add(session);
    set({
      currentSession: { ...session, id },
      isRunning: true,
      remainingTime: duration * 60,
      currentType: type,
    });
  },

  pauseSession: () => {
    set({ isRunning: false });
  },

  resumeSession: () => {
    set({ isRunning: true });
  },

  completeSession: async (note) => {
    const { currentSession } = get();
    if (!currentSession || !currentSession.id) return;

    const now = Date.now();
    const actualDuration = Math.round((now - currentSession.startDate) / 1000 / 60);
    
    const updates: Partial<TomatoSession> = {
      completed: true,
      endDate: now,
      actualDuration,
      note,
    };

    await db.tomatoSessions.update(currentSession.id, updates);

    set((state) => ({
      currentSession: null,
      isRunning: false,
      sessions: state.sessions.map(s => 
        s.id === currentSession.id ? { ...s, ...updates } : s
      ),
      completedCount: state.completedCount + 1,
    }));
  },

  cancelSession: () => {
    const { currentSession } = get();
    if (!currentSession || !currentSession.id) return;

    db.tomatoSessions.delete(currentSession.id);

    set({
      currentSession: null,
      isRunning: false,
    });
  },

  updateRemainingTime: (time) => {
    set({ remainingTime: time });
  },

  incrementCompletedCount: () => {
    set((state) => ({ completedCount: state.completedCount + 1 }));
  },
}));