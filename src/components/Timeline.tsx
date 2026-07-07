/**
 * Timeline 组件 - 底部旅行时间线
 *
 * 按时间顺序展示所有旅行记录，水平滚动
 */

import React from 'react';
import type { TravelRecord } from '../types';
import { formatDateShort, formatDateChinese } from '../utils/geoUtils';

interface TimelineProps {
  records: TravelRecord[];
  onCityClick: (record: TravelRecord) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ records, onCityClick }) => {
  // 按日期升序排列 (时间线从左到右)
  const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));

  if (sorted.length === 0) {
    return (
      <div className="h-20 lg:h-24 flex items-center justify-center bg-white border-t border-gray-200/60">
        <p className="text-xs text-gray-300 font-medium">⏳ 旅行时间线将在此显示</p>
      </div>
    );
  }

  return (
    <div className="bg-white border-t border-gray-200/60 h-24 lg:h-28 overflow-hidden">
      <div className="h-full overflow-x-auto overflow-y-hidden">
        <div className="flex items-center h-full px-4 gap-0 min-w-min">
          {sorted.map((record, index) => (
            <React.Fragment key={record.id}>
              {/* 连接线 */}
              {index > 0 && (
                <div className="flex-shrink-0 w-6 lg:w-10 h-px bg-gradient-to-r from-travel-300 to-travel-300 self-center" />
              )}

              {/* 时间线卡片 */}
              <div
                onClick={() => onCityClick(record)}
                className="group flex-shrink-0 cursor-pointer relative"
              >
                {/* 上方日期 */}
                <div className="text-center mb-1">
                  <span className="text-[10px] font-bold text-travel-500 tabular-nums">
                    {formatDateShort(record.date)}
                  </span>
                </div>

                {/* 圆点 */}
                <div className="flex justify-center mb-1">
                  <div className="w-3 h-3 rounded-full bg-travel-500 ring-4 ring-travel-100 group-hover:ring-travel-200 group-hover:scale-110 transition-all" />
                </div>

                {/* 下方信息 */}
                <div className="text-center min-w-[60px] max-w-[100px]">
                  <p className="text-xs font-semibold text-gray-700 group-hover:text-travel-600 transition-colors truncate">
                    {record.city}
                  </p>
                  <p className="text-[10px] text-gray-400 truncate">{record.country}</p>
                </div>

                {/* 悬浮提示 */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap bg-gray-900 text-white text-xs rounded-lg px-2.5 py-1 shadow-lg">
                  {record.city} · {formatDateChinese(record.date)}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
