import React, { useState } from 'react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import {
  Dumbbell,
  BookOpen,
  Globe,
  Briefcase,
  Code,
  Heart,
  Sparkles,
  Layout,
  Server,
  Binary,
  Folder,
  BookMarked,
  Headphones,
  Mic,
  Newspaper,
  PenTool,
  Video,
  Users,
  GraduationCap,
  Search,
  Activity,
  ChevronDown,
  ChevronUp,
  Flame,
  Check,
  X,
  ExternalLink,
  Calendar,
  Target,
  TrendingUp,
  Clock,
  Link2,
  Coffee,
  Box,
  Play,
  Star,
  Zap,
  FileCode,
  Terminal,
  FileText,
  ShoppingCart,
  MessageCircle,
  BarChart,
} from 'lucide-react';
import { useCheckInStore } from '@/store';
import { Category, Task, CheckIn } from '@/types';
import { CATEGORY_STYLES, cn } from '@/utils';

const iconMap: Record<string, React.ElementType> = {
  Dumbbell,
  BookOpen,
  Globe,
  Briefcase,
  Code,
  Heart,
  Sparkles,
  Layout,
  Server,
  Binary,
  Folder,
  BookMarked,
  Headphones,
  Mic,
  Newspaper,
  PenTool,
  Video,
  Users,
  GraduationCap,
  Search,
  Activity,
  Coffee,
  Box,
  FileCode,
  Terminal,
  FileText,
  ShoppingCart,
  MessageCircle,
  BarChart,
};

interface TaskDetailDialogProps {
  task: Task | null;
  onClose: () => void;
}

const TaskDetailDialog: React.FC<TaskDetailDialogProps> = ({ task, onClose }) => {
  if (!task) return null;

  const styles = CATEGORY_STYLES[task.categoryId];
  const Icon = iconMap[task.icon] || Dumbbell;

  const handleResourceClick = (url: string) => {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    window.open(fullUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className={cn('p-5 sm:p-6 text-white', styles.bg)}>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-white/20 flex items-center justify-center">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-2xl font-bold">{task.name}</h3>
                <p className="text-white/80 text-xs sm:text-sm mt-0.5 sm:mt-1">{task.description}</p>
                <div className="flex items-center space-x-3 sm:space-x-4 mt-1 sm:mt-2">
                  <span className="flex items-center text-xs text-white/70">
                    <Clock className="w-3 h-3 mr-1" />
                    建议 {task.defaultDuration} {task.unit}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-full flex-shrink-0"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto max-h-[55vh]">
          {task.learningRoute && task.learningRoute.length > 0 && (
            <div className="mb-6 sm:mb-8">
              <h4 className="flex items-center text-base sm:text-lg font-bold text-gray-900 mb-4">
                <Target className="w-5 h-5 mr-2 text-blue-500" />
                学习计划
              </h4>
              <div className="space-y-4">
                {task.learningRoute.map((item, idx) => {
                  const isSeparator = item.includes('═') || item.includes('【');
                  const isProjectTitle = item.startsWith('【');
                  const isPhaseTitle = item.startsWith('📋') || item.startsWith('🎨') || item.startsWith('⚙️') || item.startsWith('🚀') || item.startsWith('📦') || item.startsWith('🛒') || item.startsWith('🎯') || item.startsWith('🤖') || item.startsWith('💾') || item.startsWith('🎛️') || item.startsWith('☁️') || item.startsWith('📊') || item.startsWith('📈');
                  
                  if (isSeparator) {
                    return (
                      <div key={idx} className="border-t-2 border-dashed border-gray-200 my-4" />
                    );
                  }
                  
                  if (isProjectTitle) {
                    return (
                      <div key={idx} className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-bold text-sm">
                        {item}
                      </div>
                    );
                  }
                  
                  if (isPhaseTitle) {
                    return (
                      <div key={idx} className="flex items-center text-sm font-bold text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                        {item}
                      </div>
                    );
                  }
                  
                  if (item.trim() === '') {
                    return <div key={idx} className="h-2" />;
                  }
                  
                  return (
                    <div
                      key={idx}
                      className="flex items-start p-3 bg-white border border-gray-100 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <span className={cn(
                        'w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold mr-3 flex-shrink-0',
                        styles.bg, 'text-white'
                      )}>
                        {idx + 1}
                      </span>
                      <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {task.resources && task.resources.length > 0 && (
            <div>
              <h4 className="flex items-center text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                推荐资源
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {task.resources.map((resource, idx) => {
                  const isVideo = resource.name.includes('演示') || resource.name.includes('教程');
                  return (
                    <button
                      key={idx}
                      onClick={() => resource.url && handleResourceClick(resource.url)}
                      className={cn(
                        'flex items-center p-3 sm:p-4 rounded-xl transition-all text-left',
                        resource.url 
                          ? 'bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 border border-gray-100 hover:border-blue-200 cursor-pointer' 
                          : 'bg-gray-50 border border-gray-100 cursor-default'
                      )}
                    >
                      <div className={cn(
                        'w-9 sm:w-10 h-9 sm:h-10 rounded-lg flex items-center justify-center mr-2.5 sm:mr-3 flex-shrink-0',
                        styles.bgLight
                      )}>
                        {isVideo ? (
                          <Play className={cn('w-4 sm:w-5 h-4 sm:h-5', styles.text)} />
                        ) : (
                          <Link2 className={cn('w-4 sm:w-5 h-4 sm:h-5', styles.text)} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs sm:text-sm font-medium text-gray-900 block truncate">
                          {resource.name}
                        </span>
                        {resource.url && (
                          <span className="text-xs text-gray-400 flex items-center">
                            {isVideo ? '观看演示' : '点击访问'} <ExternalLink className="w-3 h-3 ml-1" />
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface TaskCheckInDialogProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
  onConfirm: (duration?: number, quantity?: number, note?: string) => void;
}

const TaskCheckInDialog: React.FC<TaskCheckInDialogProps> = ({
  open,
  onClose,
  task,
  onConfirm,
}) => {
  const [duration, setDuration] = useState(task?.defaultDuration || 30);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [mode, setMode] = useState<'duration' | 'quantity'>(
    task?.unit === '分钟' ? 'duration' : 'quantity'
  );

  if (!open || !task) return null;

  const handleConfirm = () => {
    if (mode === 'duration') {
      onConfirm(duration, undefined, note || undefined);
    } else {
      onConfirm(undefined, quantity, note || undefined);
    }
    setNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">{task.name}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex mb-6 bg-gray-100 rounded-xl p-1">
            <button
              onClick={() => setMode('duration')}
              className={cn(
                'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
                mode === 'duration'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500'
              )}
            >
              按时长
            </button>
            <button
              onClick={() => setMode('quantity')}
              className={cn(
                'flex-1 py-2 rounded-lg text-sm font-medium transition-all',
                mode === 'quantity'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500'
              )}
            >
              按数量
            </button>
          </div>

          {mode === 'duration' ? (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                时长（分钟）
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="5"
                  max="180"
                  step="5"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <span className="text-2xl font-bold text-blue-600 w-16 text-right">
                  {duration}
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>5分钟</span>
                <span>180分钟</span>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                数量（{task.unit || '次'}）
              </label>
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 text-2xl font-bold"
                >
                  -
                </button>
                <span className="text-4xl font-bold text-gray-900 w-20 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 text-2xl font-bold"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              备注（可选）
            </label>
            <input
              type="text"
              placeholder="添加备注..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleConfirm}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity"
          >
            确认打卡
          </button>
        </div>
      </div>
    </div>
  );
};

interface CategorySectionProps {
  category: Category;
  tasks: Task[];
  checkIns: CheckIn[];
  onCheckIn: (task: Task) => void;
  onShowDetail: (task: Task) => void;
  expanded: boolean;
  onToggle: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  category,
  tasks,
  checkIns,
  onCheckIn,
  onShowDetail,
  expanded,
  onToggle,
}) => {
  const styles = CATEGORY_STYLES[category.id];
  const enabledTasks = tasks.filter((t) => t.enabled).sort((a, b) => a.order - b.order);
  const completedTasks = enabledTasks.filter((task) =>
    checkIns.some((ci) => ci.taskId === task.id)
  );

  return (
    <div className="mb-5 sm:mb-6">
      <button
        onClick={onToggle}
        className={cn(
          'w-full p-4 sm:p-5 rounded-2xl flex items-center justify-between transition-all',
          'bg-gradient-to-r shadow-lg hover:shadow-xl',
          category.gradient,
          'text-white'
        )}
      >
        <div className="flex items-center space-x-3 sm:space-x-4">
          {(() => {
            const Icon = iconMap[category.icon] || Dumbbell;
            return <Icon className="w-7 sm:w-8 h-7 sm:h-8" />;
          })()}
          <div className="text-left">
            <h2 className="text-lg sm:text-xl font-bold">{category.name}</h2>
            <p className="text-white/80 text-xs sm:text-sm">
              {completedTasks.length}/{enabledTasks.length} 项完成
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3">
          {completedTasks.length === enabledTasks.length && enabledTasks.length > 0 && (
            <div className="w-7 sm:w-8 h-7 sm:h-8 rounded-full bg-white/20 flex items-center justify-center">
              <Check className="w-4 sm:w-5 h-4 sm:h-5" />
            </div>
          )}
          {expanded ? (
            <ChevronUp className="w-5 sm:w-6 h-5 sm:h-6" />
          ) : (
            <ChevronDown className="w-5 sm:w-6 h-5 sm:h-6" />
          )}
        </div>
      </button>

      {expanded && (
        <div className="mt-3 sm:mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {enabledTasks.map((task) => {
            const taskCheckIns = checkIns.filter((ci) => ci.taskId === task.id);
            const isCompleted = taskCheckIns.length > 0;
            const Icon = iconMap[task.icon] || Dumbbell;

            return (
              <div
                key={task.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
                    <div
                      className={cn(
                        'w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0',
                        isCompleted ? styles.bg : 'bg-gray-100'
                      )}
                    >
                      <Icon className={cn('w-5 sm:w-6 h-5 sm:h-6', isCompleted ? 'text-white' : styles.text)} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{task.name}</h4>
                      <p className="text-xs text-gray-500 truncate">
                        {task.description}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => onShowDetail(task)}
                    className="text-xs text-blue-500 hover:text-blue-600 flex items-center"
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    学习计划
                  </button>
                  <button
                    onClick={() => onCheckIn(task)}
                    className={cn(
                      'px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all',
                      isCompleted
                        ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        : cn(styles.bg, 'text-white hover:opacity-90')
                    )}
                  >
                    {isCompleted ? '再打卡' : '打卡'}
                  </button>
                </div>
                
                {taskCheckIns.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-50">
                    <div className="flex flex-wrap gap-1">
                      {taskCheckIns.map((ci, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            'px-2 py-0.5 rounded-full text-xs',
                            styles.bgLight,
                            styles.text
                          )}
                        >
                          {ci.duration && `${ci.duration}分钟`}
                          {ci.quantity && `${ci.quantity}${task.unit}`}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const Home: React.FC = () => {
  const { todayCheckIns, categories, tasks, streak, addCheckIn, removeCheckIn } = useCheckInStore();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [detailTask, setDetailTask] = useState<Task | null>(null);

  const handleCheckIn = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const handleShowDetail = (task: Task) => {
    setDetailTask(task);
  };

  const confirmCheckIn = async (duration?: number, quantity?: number, note?: string) => {
    if (selectedTask) {
      await addCheckIn(selectedTask.id, selectedTask.categoryId, duration, quantity, note);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

  const enabledCategories = categories.filter((c) => c.enabled);
  const totalTasks = tasks.filter((t) => t.enabled).length;
  const completedTasks = tasks.filter((t) => {
    const cat = categories.find((c) => c.id === t.categoryId);
    return cat?.enabled && t.enabled && todayCheckIns.some((ci) => ci.taskId === t.id);
  }).length;

  const today = new Date();
  const dayOfWeek = format(today, 'EEEE', { locale: zhCN });
  const isWeekend = dayOfWeek === '星期六' || dayOfWeek === '星期日';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
      <header className={cn(
        'text-white px-4 sm:px-6 py-5 sm:py-7',
        'bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900',
        'shadow-2xl'
      )}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Zap className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-400" />
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  DailyCheck
                </h1>
              </div>
              <p className="text-blue-200 mt-1 sm:mt-2 text-sm sm:text-lg">
                {format(today, 'yyyy年M月d日 EEEE', { locale: zhCN })}
                {isWeekend && <span className="ml-2 px-2 py-0.5 bg-yellow-500/30 rounded-full text-xs">周末</span>}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-1 sm:space-x-2 text-orange-400">
                <Flame className="w-5 sm:w-7 h-5 sm:h-7" />
                <span className="text-3xl sm:text-4xl font-bold">{streak}</span>
              </div>
              <p className="text-blue-200 text-xs sm:text-sm">连续打卡天数</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 sm:p-5 border border-white/10">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center space-x-2">
                <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
                <span className="text-blue-100 text-sm sm:text-base">今日进度</span>
              </div>
              <span className="text-white font-bold text-sm sm:text-base">
                {completedTasks}/{totalTasks} 项
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2.5 sm:h-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 transition-all duration-700 shadow-lg"
                style={{ width: `${totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5 text-xs text-blue-300">
              <span>已完成 {Math.round(totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0)}%</span>
              <span>{completedTasks === totalTasks && totalTasks > 0 ? '🎉 全部完成！' : '加油！'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
        {enabledCategories.map((category) => {
          const categoryTasks = tasks.filter((t) => t.categoryId === category.id);
          const categoryCheckIns = todayCheckIns.filter((ci) => ci.categoryId === category.id);

          return (
            <CategorySection
              key={category.id}
              category={category}
              tasks={categoryTasks}
              checkIns={categoryCheckIns}
              onCheckIn={handleCheckIn}
              onShowDetail={handleShowDetail}
              expanded={expandedCategories[category.id] ?? false}
              onToggle={() => toggleCategory(category.id)}
            />
          );
        })}

        {todayCheckIns.length > 0 && (
          <div className="mt-6 sm:mt-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-5 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-500" />
              今日打卡记录
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {todayCheckIns.map((ci) => {
                const task = tasks.find((t) => t.id === ci.taskId);
                const cat = categories.find((c) => c.id === ci.categoryId);
                const Icon = iconMap[task?.icon || ''] || Dumbbell;

                return (
                  <div
                    key={ci.id}
                    className="flex items-center justify-between py-3 px-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100"
                  >
                    <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
                      <div
                        className={cn(
                          'w-9 sm:w-10 h-9 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                          CATEGORY_STYLES[ci.categoryId]?.bg || 'bg-gray-500'
                        )}
                      >
                        <Icon className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0">
                        <span className="font-medium text-gray-900 text-sm sm:text-base truncate block">{task?.name || cat?.name}</span>
                        <div className="flex items-center space-x-1.5 text-xs sm:text-sm text-gray-500">
                          <span>{format(ci.timestamp, 'HH:mm')}</span>
                          {ci.duration && <span className="text-blue-500">· {ci.duration}分钟</span>}
                          {ci.quantity && <span className="text-blue-500">· {ci.quantity}{task?.unit}</span>}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => ci.id && removeCheckIn(ci.id)}
                      className="text-xs sm:text-sm text-red-500 hover:text-red-600 font-medium flex-shrink-0 ml-2"
                    >
                      撤销
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <TaskCheckInDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        task={selectedTask}
        onConfirm={confirmCheckIn}
      />

      <TaskDetailDialog
        task={detailTask}
        onClose={() => setDetailTask(null)}
      />
    </div>
  );
};