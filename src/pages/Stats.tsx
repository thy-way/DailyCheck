import React, { useEffect, useState } from 'react';
import { format, subDays, parseISO, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { useCheckInStore } from '@/store';
import { CheckIn } from '@/types';
import { cn } from '@/utils';
import { Calendar, Target, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface DailyRecord {
  date: string;
  checkIns: CheckIn[];
  totalDuration: number;
  totalCount: number;
  categories: Record<string, number>;
}

const getCategoryName = (categoryId: string, categories: { id: string; name: string }[]) => {
  const cat = categories.find(c => c.id === categoryId);
  return cat?.name || categoryId;
};

const getCategoryColor = (categoryId: string, categories: { id: string; name: string; color: string }[]) => {
  const cat = categories.find(c => c.id === categoryId);
  return cat?.color || '#3b82f6';
};

export const Stats: React.FC = () => {
  const { categories, tasks, getDailyStats } = useCheckInStore();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [weeklyRecords, setWeeklyRecords] = useState<DailyRecord[]>([]);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedDayCheckIns, setSelectedDayCheckIns] = useState<CheckIn[]>([]);

  // Get week date range
  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 }); // Monday
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

  useEffect(() => {
    const loadWeeklyData = async (): Promise<void> => {
      const records: DailyRecord[] = [];

      for (const day of weekDays) {
        const dateStr = format(day, 'yyyy-MM-dd');
        const stats = await getDailyStats(dateStr);
        
        const dayCheckIns = await useCheckInStore.getState().loadDateCheckIns(dateStr);
        
        const categoryCount: Record<string, number> = {};
        dayCheckIns.forEach(ci => {
          categoryCount[ci.categoryId] = (categoryCount[ci.categoryId] || 0) + 1;
        });

        records.push({
          date: dateStr,
          checkIns: dayCheckIns,
          totalDuration: stats.totalCheckIns * 30, // Approximate
          totalCount: stats.totalCheckIns,
          categories: categoryCount,
        });
      }

      setWeeklyRecords(records);
    };

    loadWeeklyData();
  }, [currentWeek, getDailyStats, weekDays]);

  const handlePrevWeek = () => {
    setCurrentWeek(subDays(weekStart, 1));
    setSelectedDay(null);
  };

  const handleNextWeek = () => {
    setCurrentWeek(subDays(weekEnd, -7));
    setSelectedDay(null);
  };

  const handleDayClick = (date: string) => {
    setSelectedDay(date);
    const record = weeklyRecords.find(r => r.date === date);
    setSelectedDayCheckIns(record?.checkIns || []);
  };

  const getTaskName = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    return task?.name || taskId;
  };

  // Calculate weekly summary
  const weeklyTotal = weeklyRecords.reduce((acc, r) => acc + r.totalCount, 0);
  const weeklyAvg = Math.round(weeklyTotal / 7 * 10) / 10;
  const completedDays = weeklyRecords.filter(r => r.totalCount > 0).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">📋 复盘总结</h1>
          <p className="text-gray-600 mt-1">回顾每日打卡，分析成长轨迹</p>
        </div>

        {/* Weekly Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">本周概况</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevWeek}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <span className="text-sm font-medium text-gray-700 min-w-[120px] text-center">
                {format(weekStart, 'MM/dd')} - {format(weekEnd, 'MM/dd')}
              </span>
              <button
                onClick={handleNextWeek}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600">{weeklyTotal}</div>
              <div className="text-sm text-gray-600 mt-1">本周打卡</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <div className="text-3xl font-bold text-green-600">{weeklyAvg}</div>
              <div className="text-sm text-gray-600 mt-1">日均打卡</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <div className="text-3xl font-bold text-purple-600">{completedDays}/7</div>
              <div className="text-sm text-gray-600 mt-1">打卡天数</div>
            </div>
          </div>
        </div>

        {/* Week Calendar View */}
        <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day) => {
              const dateStr = format(day, 'yyyy-MM-dd');
              const record = weeklyRecords.find(r => r.date === dateStr);
              const isToday = format(new Date(), 'yyyy-MM-dd') === dateStr;
              const isSelected = selectedDay === dateStr;
              const hasCheckIns = record && record.totalCount > 0;

              return (
                <button
                  key={dateStr}
                  onClick={() => handleDayClick(dateStr)}
                  className={cn(
                    'p-3 rounded-xl text-center transition-all',
                    isSelected
                      ? 'bg-blue-600 text-white'
                      : hasCheckIns
                        ? 'bg-blue-50 text-gray-800'
                        : 'bg-gray-50 text-gray-400',
                    isToday && !isSelected && 'ring-2 ring-blue-400'
                  )}
                >
                  <div className="text-xs mb-1">{format(day, 'EEE', { locale: zhCN })}</div>
                  <div className={cn(
                    'text-lg font-semibold',
                    isSelected ? 'text-white' : 'text-gray-800'
                  )}>
                    {format(day, 'd')}
                  </div>
                  {hasCheckIns && !isSelected && (
                    <div className="text-xs text-blue-600 mt-1">{record.totalCount}次</div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Detail View */}
        {selectedDay && (
          <div className="bg-white rounded-2xl shadow-sm p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                {format(parseISO(selectedDay), 'yyyy年MM月dd日 EEEE', { locale: zhCN })}
              </h2>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  {selectedDayCheckIns.length} 项任务
                </span>
              </div>
            </div>

            {selectedDayCheckIns.length > 0 ? (
              <div className="space-y-3">
                {selectedDayCheckIns.map((checkIn, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: getCategoryColor(checkIn.categoryId, categories as any) }}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">
                        {getTaskName(checkIn.taskId)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {getCategoryName(checkIn.categoryId, categories as any)}
                        {checkIn.duration && ` · ${checkIn.duration}分钟`}
                        {checkIn.note && ` · ${checkIn.note}`}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {format(new Date(checkIn.timestamp), 'HH:mm')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>当日无打卡记录</p>
              </div>
            )}

            {/* Category Summary */}
            {selectedDayCheckIns.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-600 mb-3">分类统计</h3>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(
                    selectedDayCheckIns.reduce((acc, ci) => {
                      acc[ci.categoryId] = (acc[ci.categoryId] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([catId, count]) => (
                    <span
                      key={catId}
                      className="px-3 py-1.5 rounded-lg text-sm font-medium"
                      style={{
                        backgroundColor: `${getCategoryColor(catId, categories as any)}15`,
                        color: getCategoryColor(catId, categories as any),
                      }}
                    >
                      {getCategoryName(catId, categories as any)}: {count}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!selectedDay && (
          <div className="text-center py-8 text-gray-400">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>点击上方日期查看详细打卡记录</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;