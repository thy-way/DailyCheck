import React, { useState } from 'react';
import { useSettingsStore, useCheckInStore } from '@/store';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Dialog } from '@/components/ui/Dialog';
import { Switch } from '@/components/ui/Switch';
import { Select } from '@/components/ui/Select';
import { CATEGORY_STYLES } from '@/utils/categoryStyles';
import { cn } from '@/utils';
import { Download, Upload, Trash2, AlertTriangle } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-5">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">设置</h1>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <Card>
          <h2 className="font-semibold text-gray-900 mb-4">分类管理</h2>
          <div className="space-y-4">
            {categories.map((cat) => {
              const styles = CATEGORY_STYLES[cat.id];
              return (
                <div key={cat.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn('w-3 h-3 rounded-full', styles.bg)} />
                    <span className="font-medium text-gray-900">{cat.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Select
                      value={cat.dailyGoal || 1}
                      onChange={(e) => updateCategoryGoal(cat.id, Number(e.target.value))}
                      options={[
                        { value: 1, label: '每日 1 次' },
                        { value: 2, label: '每日 2 次' },
                        { value: 3, label: '每日 3 次' },
                        { value: 4, label: '每日 4 次' },
                        { value: 5, label: '每日 5 次' },
                      ]}
                    />
                    <Switch
                      checked={cat.enabled}
                      onChange={() => toggleCategory(cat.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-gray-900 mb-4">提醒设置</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">每日提醒</span>
              <Switch
                checked={settings.reminderEnabled}
                onChange={(checked) => setReminder(checked, settings.reminderTime)}
              />
            </div>
            {settings.reminderEnabled && (
              <Select
                label="提醒时间"
                value={settings.reminderTime}
                onChange={(e) => setReminder(true, e.target.value)}
                options={Array.from({ length: 24 }, (_, i) => ({
                  value: `${String(i).padStart(2, '0')}:00`,
                  label: `${String(i).padStart(2, '0')}:00`,
                }))}
              />
            )}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-gray-900 mb-4">数据管理</h2>
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleExport}
              disabled={exporting}
            >
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={handleImport}
              disabled={importing}
            >
              <Upload className="w-4 h-4 mr-2" />
              导入数据
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => setResetDialogOpen(true)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              清空所有数据
            </Button>
          </div>
        </Card>

        <Card>
          <div className="text-center text-sm text-gray-500">
            <p>DailyCheck v1.0.0</p>
            <p className="mt-1">当前连续打卡 <span className="font-semibold text-orange-500">{streak}</span> 天</p>
          </div>
        </Card>
      </div>

      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)} title="确认清空">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-amber-600 bg-amber-50 p-3 rounded-lg">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm">此操作将清除所有打卡记录，无法恢复！</span>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1" onClick={() => setResetDialogOpen(false)}>
              取消
            </Button>
            <Button className="flex-1 bg-red-500 hover:bg-red-600" onClick={handleReset}>
              确认清空
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};