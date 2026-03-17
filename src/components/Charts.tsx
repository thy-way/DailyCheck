import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { CategoryId } from '@/types';

const CATEGORY_COLORS: Record<CategoryId, string> = {
  fitness: '#ef4444',
  coding: '#3b82f6',
  english: '#22c55e',
  exam: '#8b5cf6',
  side: '#f59e0b',
};

interface ChartData {
  date: string;
  count: number;
}

interface PieData {
  name: string;
  value: number;
  id: CategoryId;
}

interface TrendChartProps {
  data: ChartData[];
  title?: string;
}

export const TrendChart: React.FC<TrendChartProps> = ({ data }) => {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => format(parseISO(value), 'M/d')}
          />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            labelFormatter={(value) => format(parseISO(value), 'M月d日', { locale: zhCN })}
            formatter={(value: number) => [`${value} 次`, '打卡']}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ fill: '#3b82f6', strokeWidth: 2 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

interface CategoryPieChartProps {
  data: PieData[];
  title?: string;
}

export const CategoryPieChart: React.FC<CategoryPieChartProps> = ({ data }) => {
  return (
    <>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[entry.id] || '#94a3b8'} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => [`${value} 次`, '打卡']} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex flex-wrap gap-2 mt-2 justify-center">
        {data.map((item) => (
          <div key={item.id} className="flex items-center space-x-1">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: CATEGORY_COLORS[item.id] || '#94a3b8' }}
            />
            <span className="text-xs text-gray-600">{item.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

interface WeeklyBarChartProps {
  data: { day: string; count: number }[];
  title?: string;
}

export const WeeklyBarChart: React.FC<WeeklyBarChartProps> = ({ data }) => {
  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="day" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip formatter={(value: number) => [`${value} 次`, '打卡']} />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};