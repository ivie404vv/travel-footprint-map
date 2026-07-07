/**
 * StatsPanel 组件 - 左侧旅行统计面板
 *
 * 展示：
 * - 已探索国家数
 * - 已访问城市数
 * - 最近旅行信息
 * - 成就系统
 */

import React from 'react';
import type { TravelRecord } from '../types';
import { calculateStats, calculateAchievements, formatDateShort } from '../utils/geoUtils';

interface StatsPanelProps {
  records: TravelRecord[];
  onCityClick: (record: TravelRecord) => void;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ records, onCityClick }) => {
  const stats = calculateStats(records);
  const achievements = calculateAchievements(records);

  return (
    <aside className="w-full lg:w-64 lg:flex-shrink-0 bg-white border-r border-gray-200/60 overflow-y-auto max-h-[200px] lg:max-h-none order-2 lg:order-1">
      <div className="p-4 space-y-4">
        {/* 统计数字 */}
        <div className="grid grid-cols-3 lg:grid-cols-2 gap-2 lg:gap-3">
          <StatCard
            icon="🌍"
            label="国家"
            value={stats.countryCount}
            color="text-travel-600"
          />
          <StatCard
            icon="📍"
            label="城市"
            value={stats.cityCount}
            color="text-blue-500"
          />
          <StatCard
            icon="🗓️"
            label="旅行"
            value={stats.totalTravels}
            color="text-emerald-500"
            className="lg:hidden"
          />
          <StatCard
            icon="📅"
            label="年份"
            value={stats.yearCount}
            color="text-purple-500"
            className="hidden lg:block"
          />
        </div>

        {/* 最近旅行 */}
        {stats.lastTravel ? (
          <div
            onClick={() => onCityClick(stats.lastTravel!)}
            className="cursor-pointer group p-3 bg-gradient-to-br from-travel-50 to-amber-50 rounded-xl border border-travel-200/40 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-[10px] font-bold text-travel-600 uppercase tracking-wider">
                最近旅行
              </span>
              <svg
                className="w-3 h-3 text-travel-400 group-hover:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📍</span>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 text-sm truncate">
                  {stats.lastTravel.city}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {stats.lastTravel.country} · {formatDateShort(stats.lastTravel.date)}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-gray-50 rounded-xl text-center">
            <p className="text-xs text-gray-400 font-medium">
              还没有旅行记录
            </p>
            <p className="mt-1 text-[10px] text-gray-300">
              点击地图开始你的旅程
            </p>
          </div>
        )}

        {/* 成就系统 */}
        <div className="hidden lg:block">
          <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">
            成就
          </h3>
          <div className="space-y-1.5">
            {achievements.map((ach) => (
              <div
                key={ach.id}
                className={`flex items-center gap-2.5 p-2 rounded-lg transition-all ${
                  ach.unlocked
                    ? 'bg-travel-50/60 border border-travel-200/30'
                    : 'bg-gray-50/50 opacity-60'
                }`}
              >
                <span className={`text-lg ${ach.unlocked ? '' : 'grayscale'}`}>
                  {ach.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 truncate">
                    {ach.title}
                  </p>
                  {ach.progress && !ach.unlocked && (
                    <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-travel-400 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            (ach.progress.current / ach.progress.target) * 100
                          )}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
                {ach.unlocked && (
                  <svg
                    className="w-4 h-4 text-travel-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

/** 单个统计卡片 */
function StatCard({
  icon,
  label,
  value,
  color,
  className = '',
}: {
  icon: string;
  label: string;
  value: number;
  color: string;
  className?: string;
}) {
  return (
    <div className={`p-2.5 lg:p-3 bg-gray-50/70 rounded-xl ${className}`}>
      <div className="text-base lg:text-lg mb-0.5">{icon}</div>
      <div className={`text-xl lg:text-2xl font-bold ${color} tabular-nums`}>
        {value}
      </div>
      <div className="text-[10px] lg:text-xs text-gray-400 font-medium">{label}</div>
    </div>
  );
}
