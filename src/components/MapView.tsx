/**
 * MapView 组件 - 世界地图核心视图
 *
 * 功能：
 * 1. 展示世界地图 (CartoDB Positron 瓦片 - 简洁风格)
 * 2. 加载国家边界 GeoJSON 数据
 * 3. 已访问国家高亮显示 (琥珀色)
 * 4. 城市标记点
 * 5. 旅行轨迹连线
 * 6. 点击国家添加旅行记录
 * 7. 点击城市标记查看详情
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { TravelRecord, LatLng } from '../types';
import { getCountryName, getCountryCode } from '../utils/geoUtils';
import { MapSearch } from './MapSearch';

// GeoJSON 数据源 (多个备用源)
const GEOJSON_URLS = [
  'https://cdn.jsdelivr.net/gh/johan/world.geo.json@master/countries.geo.json',
  'https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json',
];

/** 主题颜色配置 */
const THEME = {
  visited: {
    fillColor: '#F59E0B',
    fillOpacity: 0.3,
    color: '#D97706',
    weight: 1,
  },
  unvisited: {
    fillColor: '#E5E7EB',
    fillOpacity: 0.03,
    color: '#D1D5DB',
    weight: 0.5,
  },
  hover: {
    fillColor: '#FCD34D',
    fillOpacity: 0.15,
    color: '#9CA3AF',
    weight: 1.5,
  },
  visitedHover: {
    fillColor: '#F59E0B',
    fillOpacity: 0.45,
    color: '#B45309',
    weight: 1.5,
  },
  marker: {
    color: '#ffffff',
    weight: 2,
    fillColor: '#F59E0B',
    fillOpacity: 1,
  },
  route: {
    color: '#F59E0B',
    weight: 2,
    opacity: 0.35,
    dashArray: '5, 10',
  },
};

// ============================================
// 子组件: 国家 GeoJSON 图层
// ============================================

interface CountryLayerProps {
  records: TravelRecord[];
  onCountryClick: (country: string, countryCode: string, lat: number, lng: number) => void;
}

function CountryLayer({ records, onCountryClick }: CountryLayerProps) {
  const map = useMap();
  const layerRef = useRef<L.GeoJSON | null>(null);
  const recordsRef = useRef(records);
  recordsRef.current = records;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // 获取国家样式 (基于是否已访问)
  const getStyle = useCallback((feature: any) => {
    const code = getCountryCode(feature);
    const visitedCodes = new Set(recordsRef.current.map((r) => r.countryCode));
    return visitedCodes.has(code) ? THEME.visited : THEME.unvisited;
  }, []);

  // 加载 GeoJSON 数据
  useEffect(() => {
    let cancelled = false;

    async function loadGeoJSON() {
      for (const url of GEOJSON_URLS) {
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const data = await res.json();
          if (cancelled) return;

          const layer = L.geoJSON(data, {
            style: getStyle,
            onEachFeature: (feature, lyr: L.Layer) => {
              const name = getCountryName(feature);
              const code = getCountryCode(feature);

              // 鼠标悬停提示
              lyr.bindTooltip(name, {
                sticky: true,
                className: 'country-tooltip',
              });

              // 点击事件 - 添加旅行记录
              lyr.on('click', (e: L.LeafletMouseEvent) => {
                L.DomEvent.stopPropagation(e);
                onCountryClick(name, code, e.latlng.lat, e.latlng.lng);
              });

              // 悬停高亮效果
              lyr.on('mouseover', (e: L.LeafletMouseEvent) => {
                const target = e.target as L.Path;
                const visitedCodes = new Set(recordsRef.current.map((r) => r.countryCode));
                const isVisited = visitedCodes.has(code);
                target.setStyle(isVisited ? THEME.visitedHover : THEME.hover);
                target.bringToFront();
              });

              // 移出恢复样式
              lyr.on('mouseout', (e: L.LeafletMouseEvent) => {
                const target = e.target as L.Path;
                const visitedCodes = new Set(recordsRef.current.map((r) => r.countryCode));
                const isVisited = visitedCodes.has(code);
                target.setStyle(isVisited ? THEME.visited : THEME.unvisited);
              });
            },
          });

          layer.addTo(map);
          layerRef.current = layer;
          setLoading(false);
          return; // 成功加载，退出循环
        } catch (err) {
          console.warn(`GeoJSON 加载失败 (${url}):`, err);
        }
      }

      // 所有源都失败
      if (!cancelled) {
        setError(true);
        setLoading(false);
      }
    }

    loadGeoJSON();

    return () => {
      cancelled = true;
      if (layerRef.current) {
        map.removeLayer(layerRef.current);
      }
    };
  }, [map, getStyle, onCountryClick]);

  // 当记录变化时更新国家样式
  useEffect(() => {
    if (layerRef.current) {
      layerRef.current.setStyle(getStyle);
    }
  }, [records, getStyle]);

  if (loading) {
    return (
      <div className="absolute inset-0 z-[500] flex items-center justify-center bg-gray-50/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-3 border-travel-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">正在加载世界地图...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute inset-0 z-[500] flex items-center justify-center bg-gray-50/90">
        <div className="text-center max-w-xs px-6">
          <div className="text-3xl mb-2">🗺️</div>
          <p className="text-sm font-semibold text-gray-700 mb-1">地图数据加载失败</p>
          <p className="text-xs text-gray-400">请检查网络连接后刷新页面</p>
        </div>
      </div>
    );
  }

  return null;
}

// ============================================
// 子组件: 城市标记
// ============================================

interface CityMarkersProps {
  records: TravelRecord[];
  onCityClick: (record: TravelRecord) => void;
}

function CityMarkers({ records, onCityClick }: CityMarkersProps) {
  return (
    <>
      {records.map((record) => (
        <CircleMarker
          key={record.id}
          center={[record.location.lat, record.location.lng]}
          radius={6}
          pathOptions={THEME.marker}
          eventHandlers={{
            click: () => onCityClick(record),
            mouseover: (e: any) => {
              e.target.setStyle({ radius: 8, weight: 3 });
            },
            mouseout: (e: any) => {
              e.target.setStyle({ radius: 6, weight: 2 });
            },
          }}
        >
          <Tooltip direction="top" offset={[0, -8]} opacity={1}>
            <span className="font-medium">{record.city}</span>
            <span className="text-gray-400 ml-1">{record.country}</span>
          </Tooltip>
        </CircleMarker>
      ))}
    </>
  );
}

// ============================================
// 子组件: 旅行轨迹连线
// ============================================

function TravelRoute({ records }: { records: TravelRecord[] }) {
  if (records.length < 2) return null;

  // 按日期排序连接轨迹
  const sorted = [...records].sort((a, b) => a.date.localeCompare(b.date));
  const positions: [number, number][] = sorted.map((r) => [r.location.lat, r.location.lng]);

  return (
    <Polyline positions={positions} pathOptions={THEME.route} />
  );
}

// ============================================
// 子组件: 飞行到目标位置
// ============================================

function FlyController({ target }: { target: LatLng | null }) {
  const map = useMap();

  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 5, { duration: 1.2 });
    }
  }, [target, map]);

  return null;
}

// ============================================
// 子组件: 地图尺寸自适应
// ============================================

function MapResizer() {
  const map = useMap();

  useEffect(() => {
    const resize = () => map.invalidateSize();
    // 延迟触发以确保布局完成
    const timer = setTimeout(resize, 100);
    window.addEventListener('resize', resize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', resize);
    };
  }, [map]);

  return null;
}

// ============================================
// 主组件: MapView
// ============================================

export interface MapViewProps {
  records: TravelRecord[];
  flyTarget: LatLng | null;
  onCountryClick: (country: string, countryCode: string, lat: number, lng: number) => void;
  onCityClick: (record: TravelRecord) => void;
  onMapClick: () => void;
  onCitySearch: (city: string, country: string, countryCode: string, location: LatLng) => void;
}

export const MapView: React.FC<MapViewProps> = ({
  records,
  flyTarget,
  onCountryClick,
  onCityClick,
  onMapClick,
  onCitySearch,
}) => {
  return (
    <div className="relative flex-1 min-h-[300px] lg:min-h-0 overflow-hidden">
      <MapContainer
        center={[25, 10]}
        zoom={2}
        minZoom={2}
        maxZoom={18}
        worldCopyJump
        attributionControl={false}
        className="w-full h-full"
        style={{ background: '#F8FAFC' }}
      >
        {/* 瓦片图层 - CartoDB Positron (简洁风格) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={20}
        />

        {/* 国家边界图层 */}
        <CountryLayer records={records} onCountryClick={onCountryClick} />

        {/* 旅行轨迹连线 */}
        <TravelRoute records={records} />

        {/* 城市标记 */}
        <CityMarkers records={records} onCityClick={onCityClick} />

        {/* 飞行控制器 */}
        <FlyController target={flyTarget} />

        {/* 地图尺寸自适应 */}
        <MapResizer />

        {/* 点击空白区域 */}
        <MapClickHandler onClick={onMapClick} />
      </MapContainer>

      {/* 地图左上角搜索栏 */}
      <div className="absolute top-3 left-3 z-[600]">
        <MapSearch onCitySelect={onCitySearch} />
      </div>

      {/* 地图右上角图例 */}
      <div className="absolute top-3 right-3 z-[500] bg-white/80 backdrop-blur-md rounded-xl px-3 py-2 shadow-sm border border-gray-200/50 pointer-events-none">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-sm bg-travel-500/30 border border-travel-600" />
          <span className="text-gray-600 font-medium">已探索</span>
        </div>
      </div>

      {/* 空状态提示 */}
      {records.length === 0 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[500] bg-white/90 backdrop-blur-md rounded-2xl px-5 py-3 shadow-lg border border-gray-200/50 pointer-events-none animate-fade-in">
          <p className="text-sm text-gray-600 font-medium text-center">
            🗺️ 点击地图上的国家，开始记录你的旅行足迹
          </p>
        </div>
      )}
    </div>
  );
};

// 地图空白点击处理
function MapClickHandler({ onClick }: { onClick: () => void }) {
  const map = useMap();

  useEffect(() => {
    const handler = () => onClick();
    map.on('click', handler);
    return () => {
      map.off('click', handler);
    };
  }, [map, onClick]);

  return null;
}
