import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, BarChart2, Settings, Target, Timer } from 'lucide-react';
import { cn } from '@/utils';

const navItems = [
  { to: '/', icon: Home, label: '打卡' },
  { to: '/quadrants', icon: Target, label: '计划' },
  { to: '/tomato', icon: Timer, label: '番茄' },
  { to: '/calendar', icon: Calendar, label: '日历' },
  { to: '/stats', icon: BarChart2, label: '统计' },
  { to: '/settings', icon: Settings, label: '设置' },
];

export const BottomNav: React.FC = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 z-40 shadow-lg">
      <div className="max-w-6xl mx-auto px-2">
        <div className="flex justify-around">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center py-2.5 px-3 sm:px-4 text-xs sm:text-sm transition-all duration-200',
                  isActive
                    ? 'text-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <div className={cn(
                    'p-1.5 rounded-xl transition-all duration-200',
                    isActive ? 'bg-blue-50' : ''
                  )}>
                    <Icon className={cn(
                      'w-5 h-5 sm:w-6 sm:h-6 transition-all',
                      isActive ? 'text-blue-600 scale-110' : 'text-gray-500'
                    )} />
                  </div>
                  <span className={cn(
                    'font-medium mt-1',
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  )}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};