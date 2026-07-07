/**
 * MapSearch 组件 - 地图浮动搜索栏
 *
 * 允许用户在地图上直接搜索城市并飞行定位
 * 选中城市后可快速添加旅行记录
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { searchCities, type CityData } from '../data/cities';
import type { LatLng } from '../types';

interface MapSearchProps {
  /** 搜索选择城市后的回调 */
  onCitySelect: (
    city: string,
    country: string,
    countryCode: string,
    location: LatLng
  ) => void;
}

export const MapSearch: React.FC<MapSearchProps> = ({ onCitySelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [isExpanded, setIsExpanded] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 处理输入
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);

    if (val.trim().length > 0) {
      const results = searchCities(val, 6);
      setSuggestions(results);
      setIsOpen(results.length > 0);
      setHighlightIndex(-1);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, []);

  // 选择城市
  const handleSelect = useCallback(
    (cityData: CityData) => {
      setQuery(cityData.name);
      setIsOpen(false);
      setIsExpanded(false);
      setSuggestions([]);
      onCitySelect(
        cityData.name,
        cityData.country,
        cityData.countryCode,
        { lat: cityData.lat, lng: cityData.lng }
      );
    },
    [onCitySelect]
  );

  // 键盘导航
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || suggestions.length === 0) {
        if (e.key === 'Enter' && query.trim()) {
          // 尝试用输入文本直接搜索
          const results = searchCities(query, 1);
          if (results.length > 0) {
            handleSelect(results[0]);
          }
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightIndex >= 0 && highlightIndex < suggestions.length) {
            handleSelect(suggestions[highlightIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setIsExpanded(false);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, suggestions, highlightIndex, handleSelect, query]
  );

  // 点击外部关闭
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        if (!query) setIsExpanded(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [query]);

  return (
    <div ref={containerRef} className="relative z-[800]">
      {/* 搜索栏 */}
      <div
        className={`flex items-center bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 transition-all duration-300 ${
          isExpanded ? 'w-56 sm:w-64' : 'w-10 h-10'
        }`}
      >
        {/* 搜索图标按钮 */}
        <button
          onClick={() => {
            setIsExpanded(true);
            setTimeout(() => inputRef.current?.focus(), 150);
          }}
          className={`flex-shrink-0 w-10 h-10 flex items-center justify-center ${
            isExpanded ? '' : 'hover:bg-gray-50 rounded-2xl'
          }`}
        >
          <svg
            className="w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>

        {/* 输入框 */}
        {isExpanded && (
          <>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="搜索城市..."
              className="flex-1 text-sm bg-transparent outline-none text-gray-700 placeholder-gray-300 py-2 pr-2"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setSuggestions([]);
                  setIsOpen(false);
                  inputRef.current?.focus();
                }}
                className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-gray-300 hover:text-gray-500"
              >
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      {/* 自动补全下拉列表 */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute top-12 left-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden animate-fade-in">
          {suggestions.map((cityData, index) => (
            <div
              key={`${cityData.name}-${cityData.countryCode}`}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(cityData);
              }}
              className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${
                index === highlightIndex ? 'bg-travel-50' : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg className="w-3 h-3 text-travel-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {cityData.name}
                  <span className="text-gray-400 font-normal ml-1">{cityData.nameZh}</span>
                </p>
                <p className="text-xs text-gray-400 truncate">{cityData.countryZh}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
