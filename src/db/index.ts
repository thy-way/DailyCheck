import Dexie, { Table } from 'dexie';
import { CheckIn, Category, Task } from '../types';

class CheckInDatabase extends Dexie {
  checkIns!: Table<CheckIn, number>;
  categories!: Table<Category, string>;
  tasks!: Table<Task, string>;

  constructor() {
    super('DailyCheckDB');

    this.version(4).stores({
      checkIns: '++id, taskId, categoryId, date, timestamp',
      categories: 'id, name, enabled',
      tasks: 'id, categoryId, name, enabled, order',
    }).upgrade(tx => {
      return tx.table('tasks').clear() && tx.table('categories').clear();
    });
  }
}

export const db = new CheckInDatabase();

export async function initializeDatabase() {
  const categoryCount = await db.categories.count();
  if (categoryCount === 0) {
    const { DEFAULT_CATEGORIES } = await import('../types/categories');
    await db.categories.bulkAdd(DEFAULT_CATEGORIES);
  }

  const taskCount = await db.tasks.count();
  if (taskCount === 0) {
    const { DEFAULT_TASKS } = await import('../types/categories');
    await db.tasks.bulkAdd(DEFAULT_TASKS);
  }
}