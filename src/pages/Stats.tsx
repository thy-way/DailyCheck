import React, { useEffect, useState } from 'react';
import { format, subDays, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { useCheckInStore } from '@/store';
import { TrendChart, CategoryPieChart, WeeklyBarChart } from '@/components/Charts';
import { CategoryId } from '@/types';
import { cn } from '@/utils';

export const Stats: React.FC = () => {
  const { getDailyStats, getWeeklyStats, categories } = useCheckInStore();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [trendData, setTrendData] = useState<{ date: string; count: number }[]>([]);
  const [pieData, setPieData] = useState<{ name: string; value: number; id: CategoryId }[]>([]);
  const [weeklyData, setWeeklyData] = useState<{ day: string; count: number }[]>([]);
  const [totalCheckIns, setTotalCheckIns] = useState(0);
  const [avgPerDay, setAvgPerDay] = useState(0);

  useEffect(() => {
    const loadStats = async () => {
      const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
      const trend: { date: string; count: number }[] = [];
      const categoryTotals: Record<CategoryId, number> = {} as Record<CategoryId, number>;

      categories.forEach((cat) => {
        categoryTotals[cat.id] = 0;
      });

      let total = 0;

      for (let i = days - 1; i >= 0; i--) {
        const date = subDays(new Date(), i);
        const dateStr = format(date, 'yyyy-MM-dd');
        const stats = await getDailyStats(dateStr);

        trend.push({ date: dateStr, count: stats.totalCheckIns });
        total += stats.totalCheckIns;

        Object.entries(stats.byCategory).forEach(([catId, count]) => {
          categoryTotals[catId as CategoryId] = (categoryTotals[catId as CategoryId] || 0) + count;
        });
      }

      setTrendData(trend);
      setTotalCheckIns(total);
      setAvgPerDay(Number((total / days).toFixed(1)));

      const pie = Object.entries(categoryTotals)
        .filter(([_, value]) => value > 0)
        .map(([id, value]) => {
          const cat = categories.find((c) => c.id === id);
          return {
            name: cat?.name || id,
            value,
            id: id as CategoryId,
          };
        });

      setPieData(pie);

      const weeklyStats = await getWeeklyStats();
      const weekly = weeklyStats.days.map((day) => ({
        day: format(parseISO(day.date), 'E', { locale: zhCN }),
        count: day.totalCheckIns,
      }));
      setWeeklyData(weekly);
    };

    loadStats();
  }, [timeRange, getDailyStats, getWeeklyStats, categories]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">📊 统计</h1>
            <p className="text-gray-600 mt-1">数据可视化分析</p>
          </div>
          <div className="flex bg-white rounded-xl p-1 shadow-sm">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={cn(
                  'px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-all',
                  timeRange === range
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                )}
              >
                {range === '7d' ? '7天' : range === '30d' ? '30天' : '90天'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">总打卡</div>
            <div className="text-3xl sm:text-4xl font-bold text-blue-600">{totalCheckIns}</div>
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm">
            <div className="text-sm text-gray-500 mb-1">日均</div>
            <div className="text-3xl sm:text-4xl font-bold text-green-600">{avgPerDay}</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">📈 打卡趋势</h3>
          <TrendChart data={trendData} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-4">🎯 分类分布</h3>
            <CategoryPieChart data={pieData} />
          </div>
          <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
            <h3 className="font-semibold text-gray-900 mb-4">📅 本周统计</h3>
            <WeeklyBarChart data={weeklyData} />
          </div>
        </div>
      </div>
    </div>
  );
};