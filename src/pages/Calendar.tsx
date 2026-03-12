import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { useCheckInStore } from '@/store';
import { CalendarGrid } from '@/components/CalendarGrid';
import { Card } from '@/components/ui/Card';
import { DailyStats } from '@/types';
import { CATEGORY_STYLES } from '@/utils/categoryStyles';
import { cn } from '@/utils';

export const Calendar: React.FC = () => {
  const { getDailyStats, categories } = useCheckInStore();
  const [statsMap, setStatsMap] = useState<Record<string, DailyStats>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedStats, setSelectedStats] = useState<DailyStats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      const today = new Date();
      const stats: Record<string, DailyStats> = {};

      for (let i = 0; i < 90; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = format(date, 'yyyy-MM-dd');
        stats[dateStr] = await getDailyStats(dateStr);
      }

      setStatsMap(stats);
    };

    loadStats();
  }, [getDailyStats]);

  useEffect(() => {
    if (selectedDate && statsMap[selectedDate]) {
      setSelectedStats(statsMap[selectedDate]);
    }
  }, [selectedDate, statsMap]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">日历视图</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <CalendarGrid
          statsMap={statsMap}
          onDateSelect={setSelectedDate}
          selectedDate={selectedDate || undefined}
        />

        {selectedStats && selectedDate && (
          <Card>
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">
              {format(parseISO(selectedDate), 'yyyy年M月d日 EEEE', { locale: zhCN })}
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 bg-gray-50 rounded-xl px-4">
                <span className="text-gray-600">总打卡次数</span>
                <span className="font-bold text-gray-900 text-lg">{selectedStats.totalCheckIns} 次</span>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-3">各分类完成情况</h4>
                <div className="space-y-3">
                  {categories.filter((c) => c.enabled).map((cat) => {
                    const count = selectedStats.byCategory[cat.id] || 0;
                    const goal = cat.dailyGoal || 1;
                    const isCompleted = count >= goal;
                    const styles = CATEGORY_STYLES[cat.id];

                    return (
                      <div key={cat.id} className="flex items-center justify-between py-2 px-3">
                        <div className="flex items-center space-x-3">
                          <div className={cn('w-3 h-3 rounded-full', styles.bg)} />
                          <span className="text-gray-700">{cat.name}</span>
                        </div>
                        <span className={cn(
                          'font-medium',
                          isCompleted ? 'text-green-600' : 'text-gray-500'
                        )}>
                          {count}/{goal}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};