/**
 * RecentTravels 组件 - 右侧最近旅行记录列表
 */

import React from 'react';
import type { TravelRecord } from '../types';
import { formatDateShort } from '../utils/geoUtils';

interface RecentTravelsProps {
  records: TravelRecord[];
  onCityClick: (record: TravelRecord) => void;
}

export const RecentTravels: React.FC<RecentTravelsProps> = ({ records, onCityClick }) => {
  // 按日期降序排列，取最近 8 条
  const recent = [...records]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 8);

  return (
    <aside className="w-full lg:w-72 lg:flex-shrink-0 bg-white border-l border-gray-200/60 overflow-y-auto max-h-[200px] lg:max-h-none order-3">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
            旅行列表
          </h3>
          <span className="text-xs text-gray-300 font-medium tabular-nums">
            {records.length} 条
          </span>
        </div>

        {recent.length === 0 ? (
          <div className="py-8 text-center">
            <div className="text-3xl mb-2 opacity-40">🧳</div>
            <p className="text-xs text-gray-400">还没有旅行记录</p>
          </div>
        ) : (
          <div className="space-y-1.5">
            {recent.map((record) => (
              <div
                key={record.id}
                onClick={() => onCityClick(record)}
                className="group flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
              >
                {/* 左侧时间线圆点 */}
                <div className="relative flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-travel-500 ring-2 ring-travel-100 group-hover:ring-travel-200 transition-all" />
                </div>

                {/* 中间内容 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-travel-600 transition-colors">
                      {record.city}
                    </p>
                    <span className="text-[10px] text-gray-300 font-medium tabular-nums flex-shrink-0">
                      {formatDateShort(record.date)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">
                    {record.country}
                    {record.note && ` · ${record.note.slice(0, 20)}${record.note.length > 20 ? '...' : ''}`}
                  </p>
                </div>

                {/* 右侧箭头 */}
                <svg
                  className="w-3.5 h-3.5 text-gray-300 group-hover:text-travel-400 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}

            {records.length > 8 && (
              <div className="pt-2 text-center">
                <span className="text-[10px] text-gray-300 font-medium">
                  还有 {records.length - 8} 条记录
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
