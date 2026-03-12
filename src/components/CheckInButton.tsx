import React from 'react';
import { CheckIn } from '@/types';
import { Card } from './ui/Card';

interface CheckInButtonProps {
  checkIns: CheckIn[];
  onRemove: (id: number) => void;
}

export const CheckInButton: React.FC<CheckInButtonProps> = ({
  checkIns,
  onRemove,
}) => {
  if (checkIns.length === 0) return null;

  return (
    <Card className="mt-2">
      <h4 className="text-sm font-medium text-gray-700 mb-2">今日记录</h4>
      <div className="space-y-2">
        {checkIns.map((ci) => (
          <div
            key={ci.id}
            className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">
                {new Date(ci.timestamp).toLocaleTimeString('zh-CN', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
              {ci.note && <span className="text-sm text-gray-500">{ci.note}</span>}
            </div>
            <button
              onClick={() => ci.id && onRemove(ci.id)}
              className="text-sm text-red-500 hover:text-red-600"
            >
              撤销
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};