import React, { useState } from 'react';
import { useCheckInStore } from '@/store';
import { ChevronDown, ChevronRight, BookOpen, ExternalLink, Clock, Target } from 'lucide-react';
import { cn } from '@/utils';

interface LearningRouteProps {
  route: string[];
  title: string;
}

const LearningRouteCard: React.FC<LearningRouteProps> = ({ route, title }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-medium text-gray-800">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>
      
      {isExpanded && (
        <div className="px-4 pb-4">
          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
            {route.map((line, index) => (
              <p
                key={index}
                className={cn(
                  'text-sm leading-relaxed',
                  line.startsWith('Week') || line.startsWith('第') || line.startsWith('📋') || line.startsWith('📦') || line.startsWith('🛒') || line.startsWith('🔒') || line.startsWith('🚀') || line.startsWith('📊') || line.startsWith('📈') || line.startsWith('🎛') || line.startsWith('☁') || line.startsWith('🎯') || line.startsWith('🤖') || line.startsWith('💾') || line.startsWith('⚡')
                    ? 'font-semibold text-gray-800'
                    : 'text-gray-600'
                )}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const ResourceLink: React.FC<{ name: string; url?: string }> = ({ name, url }) => {
  if (!url) return null;
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 hover:underline"
    >
      <ExternalLink className="w-3.5 h-3.5" />
      {name}
    </a>
  );
};

export const Plan: React.FC = () => {
  const { tasks, categories } = useCheckInStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTasks = selectedCategory === 'all'
    ? tasks.filter(t => t.learningRoute && t.learningRoute.length > 0)
    : tasks.filter(t => t.categoryId === selectedCategory && t.learningRoute && t.learningRoute.length > 0);

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.gradient || 'from-blue-500 to-indigo-600';
  };

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.name || categoryId;
  };

  // Group tasks by category
  const tasksByCategory = filteredTasks.reduce((acc, task) => {
    if (!acc[task.categoryId]) {
      acc[task.categoryId] = [];
    }
    acc[task.categoryId].push(task);
    return acc;
  }, {} as Record<string, typeof filteredTasks>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">📚 学习计划</h1>
          <p className="text-gray-600 mt-1">学习路线与资源导航</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('all')}
            className={cn(
              'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            )}
          >
            全部
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={cn(
                'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Learning Routes by Category */}
        {Object.entries(tasksByCategory).map(([categoryId, categoryTasks]) => (
          <div key={categoryId} className="mb-8">
            {/* Category Header */}
            <div className={cn(
              'flex items-center gap-3 mb-4 p-3 rounded-xl bg-gradient-to-r',
              getCategoryColor(categoryId),
              'text-white'
            )}>
              <Target className="w-5 h-5" />
              <h2 className="text-lg font-semibold">{getCategoryName(categoryId)}</h2>
              <span className="ml-auto text-sm opacity-90">{categoryTasks.length} 个学习路线</span>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
              {categoryTasks.map((task) => (
                <div key={task.id} className="space-y-3">
                  <LearningRouteCard
                    title={task.name}
                    route={task.learningRoute || []}
                  />
                  
                  {/* Resources */}
                  {task.resources && task.resources.length > 0 && (
                    <div className="flex flex-wrap gap-3 px-2">
                      <div className="flex items-center gap-1.5 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        推荐资源：
                      </div>
                      {task.resources.map((resource, idx) => (
                        <React.Fragment key={idx}>
                          <ResourceLink name={resource.name} url={resource.url} />
                          {idx < task.resources!.length - 1 && (
                            <span className="text-gray-300">|</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">暂无学习路线</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Plan;