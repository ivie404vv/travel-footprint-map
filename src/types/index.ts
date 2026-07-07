/**
 * 旅行足迹地图 - 类型定义
 */

/** 地理坐标 */
export interface LatLng {
  lat: number;
  lng: number;
}

/** 旅行记录数据结构 */
export interface TravelRecord {
  /** 唯一标识 */
  id: string;
  /** 经纬度坐标 */
  location: LatLng;
  /** 国家名称 */
  country: string;
  /** 国家代码 (ISO 3166-1 alpha-3) */
  countryCode: string;
  /** 城市名称 */
  city: string;
  /** 旅行日期 (YYYY-MM 格式) */
  date: string;
  /** 旅行感受/笔记 */
  note: string;
  /** 照片列表 (base64 数据 URL 或 URL) */
  photos: string[];
  /** 创建时间 */
  created_at: string;
  /** 更新时间 */
  updated_at: string;
}

/** 成就 */
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress?: {
    current: number;
    target: number;
  };
}

/** 旅行统计 */
export interface TravelStats {
  countryCount: number;
  cityCount: number;
  lastTravel: TravelRecord | null;
  totalTravels: number;
  yearCount: number;
}

/** 表单初始数据 */
export interface FormInitialData {
  country?: string;
  countryCode?: string;
  city?: string;
  location?: LatLng;
  /** 编辑模式时的记录 ID */
  editId?: string;
  /** 编辑模式时的已有数据 */
  existingRecord?: TravelRecord;
}
