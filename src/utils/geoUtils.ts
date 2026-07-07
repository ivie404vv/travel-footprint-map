/**
 * 地理工具函数
 * 处理 GeoJSON 要素属性提取、日期格式化等
 */

import type { TravelRecord, TravelStats, Achievement } from '../types';

/**
 * 从 GeoJSON Feature 中提取国家名称
 * 兼容多种 GeoJSON 数据源的字段命名
 */
export function getCountryName(feature: any): string {
  return (
    feature?.properties?.name ||
    feature?.properties?.NAME ||
    feature?.properties?.ADMIN ||
    feature?.properties?.admin ||
    '未知地区'
  );
}

/**
 * 从 GeoJSON Feature 中提取国家代码 (ISO 3166-1 alpha-3)
 */
export function getCountryCode(feature: any): string {
  return (
    feature?.properties?.code ||
    feature?.properties?.ISO_A3 ||
    feature?.properties?.ADM0_A3 ||
    feature?.properties?.iso_a3 ||
    getCountryName(feature) // 回退使用国家名称作为代码
  );
}

/**
 * 格式化日期为中文显示格式
 * @param dateStr YYYY-MM 格式
 * @returns 如 "2026年5月"
 */
export function formatDateChinese(dateStr: string): string {
  if (!dateStr) return '日期未知';
  const [year, month] = dateStr.split('-');
  if (!year || !month) return dateStr;
  return `${year}年${parseInt(month, 10)}月`;
}

/**
 * 格式化日期为简短显示格式
 * @param dateStr YYYY-MM 格式
 * @returns 如 "2026.05"
 */
export function formatDateShort(dateStr: string): string {
  if (!dateStr) return '----';
  const [year, month] = dateStr.split('-');
  if (!year || !month) return dateStr;
  return `${year}.${month.padStart(2, '0')}`;
}

/**
 * 计算旅行统计数据
 */
export function calculateStats(records: TravelRecord[]): TravelStats {
  const countries = new Set(records.map((r) => r.countryCode));
  const cities = new Set(records.map((r) => r.city.toLowerCase()));
  const years = new Set(records.map((r) => r.date.split('-')[0]));

  // 按日期排序找出最近一次旅行
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));

  return {
    countryCount: countries.size,
    cityCount: cities.size,
    lastTravel: sorted[0] || null,
    totalTravels: records.length,
    yearCount: years.size,
  };
}

/**
 * 计算成就列表
 */
export function calculateAchievements(records: TravelRecord[]): Achievement[] {
  const countries = new Set(records.map((r) => r.countryCode)).size;
  const cities = new Set(records.map((r) => r.city.toLowerCase())).size;
  const total = records.length;

  return [
    {
      id: 'first-step',
      title: '第一步',
      description: '记录你的第一次旅行',
      icon: '👣',
      unlocked: total >= 1,
    },
    {
      id: 'explorer-3',
      title: '初级探索者',
      description: '探索 3 个国家',
      icon: '🧭',
      unlocked: countries >= 3,
      progress: { current: countries, target: 3 },
    },
    {
      id: 'explorer-5',
      title: '世界旅行家',
      description: '探索 5 个国家',
      icon: '🌍',
      unlocked: countries >= 5,
      progress: { current: countries, target: 5 },
    },
    {
      id: 'explorer-10',
      title: '环球达人',
      description: '探索 10 个国家',
      icon: '🌎',
      unlocked: countries >= 10,
      progress: { current: countries, target: 10 },
    },
    {
      id: 'city-explorer-10',
      title: '城市打卡者',
      description: '访问 10 座城市',
      icon: '🏙️',
      unlocked: cities >= 10,
      progress: { current: cities, target: 10 },
    },
    {
      id: 'city-explorer-20',
      title: '城市漫步者',
      description: '访问 20 座城市',
      icon: '🌃',
      unlocked: cities >= 20,
      progress: { current: cities, target: 20 },
    },
    {
      id: 'storyteller',
      title: '旅行故事家',
      description: '记录 15 段旅行',
      icon: '📖',
      unlocked: total >= 15,
      progress: { current: total, target: 15 },
    },
  ];
}

/**
 * 生成唯一 ID
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}
