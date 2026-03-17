import { create } from 'zustand';
import { db } from '../db';
import { QuadrantTask } from '../types';

interface QuadrantStore {
  tasks: QuadrantTask[];
  loading: boolean;
  loadTasks: () => Promise<void>;
  addTask: (task: Omit<QuadrantTask, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: number, updates: Partial<QuadrantTask>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  getTasksByQuadrant: (quadrant: QuadrantType) => QuadrantTask[];
}

type QuadrantType = 
  | 'urgent-important'
  | 'urgent-not-important'
  | 'not-urgent-important'
  | 'not-urgent-not-important';

export const useQuadrantStore = create<QuadrantStore>((set, get) => ({
  tasks: [],
  loading: false,

  loadTasks: async () => {
    set({ loading: true });
    const tasks = await db.quadrants.toArray();
    set({ tasks, loading: false });
  },

  addTask: async (task) => {
    const now = Date.now();
    const newTask = { ...task, createdAt: now, updatedAt: now };
    const id = await db.quadrants.add(newTask);
    set((state) => ({ tasks: [...state.tasks, { ...newTask, id }] }));
  },

  updateTask: async (id, updates) => {
    const now = Date.now();
    await db.quadrants.update(id, { ...updates, updatedAt: now });
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id ? { ...task, ...updates, updatedAt: now } : task
      ),
    }));
  },

  deleteTask: async (id) => {
    await db.quadrants.delete(id);
    set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
  },

  getTasksByQuadrant: (quadrant) => {
    const tasks = get().tasks;
    switch (quadrant) {
      case 'urgent-important':
        return tasks.filter((t) => t.urgency === 'high' && t.importance === 'high');
      case 'urgent-not-important':
        return tasks.filter((t) => t.urgency === 'high' && t.importance === 'low');
      case 'not-urgent-important':
        return tasks.filter((t) => t.urgency === 'low' && t.importance === 'high');
      case 'not-urgent-not-important':
        return tasks.filter((t) => t.urgency === 'low' && t.importance === 'low');
      default:
        return [];
    }
  },
}));