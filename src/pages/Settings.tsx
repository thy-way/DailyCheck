import React, { useState } from 'react';
import { useSettingsStore, useCheckInStore } from '@/store';
import { Dialog } from '@/components/ui/Dialog';
import { Switch } from '@/components/ui/Switch';
import { CATEGORY_STYLES } from '@/utils/categoryStyles';
import { cn } from '@/utils';
import { Download, Upload, Trash2, AlertTriangle, Flame } from 'lucide-react';

export const Settings: React.FC = () => {
  const {
    categories,
    settings,
    updateCategoryGoal,
    toggleCategory,
    setReminder,
    exportData,
    importData,
    resetToDefaults,
  } = useSettingsStore();
  const { streak } = useCheckInStore();

  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    try {
      const data = await exportData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dailycheck-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    }
    setExporting(false);
  };

  const handleImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setImporting(true);
      try {
        const text = await file.text();
        await importData(text);
        alert('导入成功！');
        window.location.reload();
      } catch (error) {
        alert('导入失败，请检查文件格式');
      }
      setImporting(false);
    };
    input.click();
  };

  const handleReset = async () => {
    await resetToDefaults();
    setResetDialogOpen(false);
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 pb-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">⚙️ 设置</h1>
          <p className="text-gray-600 mt-1">自定义你的打卡体验</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">
          <div className="flex items-center justify-center py-4">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 text-orange-500 mb-2">
                <Flame className="w-8 h-8" />
                <span className="text-5xl font-bold">{streak}</span>
              </div>
              <p className="text-gray-600">连续打卡天数</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">📂 分类管理</h2>
          <div className="space-y-3">
            {categories.map((cat) => {
              const styles = CATEGORY_STYLES[cat.id];
              return (
                <div key={cat.id} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-3">
                    <div className={cn('w-3 h-3 rounded-full', styles.bg)} />
                    <span className="text-gray-900">{cat.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <select
                      value={cat.dailyGoal || 1}
                      onChange={(e) => updateCategoryGoal(cat.id, Number(e.target.value))}
                      className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1, 2, 3, 4, 5].map(n => (
                        <option key={n} value={n}>每日 {n} 次</option>
                      ))}
                    </select>
                    <Switch
                      checked={cat.enabled}
                      onChange={() => toggleCategory(cat.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 mb-6">
          <h2 className="font-semibold text-gray-900 mb-4">🔔 提醒设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">每日提醒</span>
              <Switch
                checked={settings.reminderEnabled}
                onChange={(checked) => setReminder(checked, settings.reminderTime)}
              />
            </div>
            {settings.reminderEnabled && (
              <select
                value={settings.reminderTime}
                onChange={(e) => setReminder(true, e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Array.from({ length: 24 }, (_, i) => (
                  <option key={i} value={`${String(i).padStart(2, '0')}:00`}>
                    {String(i).padStart(2, '0')}:00
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6">
          <h2 className="font-semibold text-gray-900 mb-4">💾 数据管理</h2>
          <div className="space-y-2">
            <button
              onClick={handleExport}
              disabled={exporting}
              className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Download className="w-5 h-5 mr-3 text-blue-500" />
              导出数据
            </button>
            <button
              onClick={handleImport}
              disabled={importing}
              className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
            >
              <Upload className="w-5 h-5 mr-3 text-green-500" />
              导入数据
            </button>
            <button
              onClick={() => setResetDialogOpen(true)}
              className="w-full flex items-center px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <Trash2 className="w-5 h-5 mr-3" />
              清空所有数据
            </button>
          </div>
        </div>
      </div>

      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)} title="确认清空">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm">此操作将清除所有打卡记录，无法恢复！</span>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setResetDialogOpen(false)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              取消
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              确认清空
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};