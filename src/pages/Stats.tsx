import React, { useEffect, useState } from 'react';
import { format, subDays, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { useCheckInStore } from '@/store';
import { TrendChart, CategoryPieChart, WeeklyBarChart } from '@/components/Charts';
import { Card } from '@/components/ui/Card';
import { CategoryId } from '@/types';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">数据统计</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex flex-wrap gap-2">
          {(['7d', '30d', '90d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range === '7d' ? '近7天' : range === '30d' ? '近30天' : '近90天'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{totalCheckIns}</p>
              <p className="text-sm text-gray-500 mt-1">总打卡次数</p>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{avgPerDay}</p>
              <p className="text-sm text-gray-500 mt-1">日均打卡</p>
            </div>
          </Card>
        </div>

        <TrendChart data={trendData} title="打卡趋势" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CategoryPieChart data={pieData} title="分类分布" />
          <WeeklyBarChart data={weeklyData} title="本周统计" />
        </div>
      </div>
    </div>
  );
};