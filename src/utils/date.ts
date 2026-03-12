import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
  isYesterday,
  parseISO,
  subDays,
  addDays,
} from 'date-fns';
import { zhCN } from 'date-fns/locale';

export function getToday(): string {
  return format(Date.now(), 'yyyy-MM-dd');
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getWeekRange(date: Date = new Date()) {
  return {
    start: startOfWeek(date, { locale: zhCN }),
    end: endOfWeek(date, { locale: zhCN }),
  };
}

export function getMonthRange(date: Date = new Date()) {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  };
}

export function getMonthCalendarDays(date: Date = new Date()) {
  const { start, end } = getMonthRange(date);
  return eachDayOfInterval({ start, end });
}

export function getFullMonthCalendarDays(date: Date = new Date()) {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const startWeekDay = monthStart.getDay();
  const offset = startWeekDay === 0 ? 6 : startWeekDay - 1;

  const calendarStart = subDays(monthStart, offset);
  const calendarEnd = addDays(monthEnd, 42 - offset - monthEnd.getDate() + 1);

  return eachDayOfInterval({ start: calendarStart, end: calendarEnd });
}

export function formatDateDisplay(dateStr: string): string {
  const date = parseISO(dateStr);
  if (isToday(date)) return '今天';
  if (isYesterday(date)) return '昨天';
  return format(date, 'M月d日', { locale: zhCN });
}

export function formatDateFull(dateStr: string): string {
  const date = parseISO(dateStr);
  return format(date, 'yyyy年M月d日 EEEE', { locale: zhCN });
}

export function formatWeekRange(date: Date = new Date()): string {
  const { start, end } = getWeekRange(date);
  return `${format(start, 'M月d日', { locale: zhCN })} - ${format(end, 'M月d日', { locale: zhCN })}`;
}

export function getDaysInMonth(date: Date): number {
  return eachDayOfInterval(getMonthRange(date)).length;
}