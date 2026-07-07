/**
 * CitySearch 组件 - 城市搜索自动补全
 *
 * 支持中英文模糊搜索，选择城市后自动填充：
 * - 城市名、国家名、国家代码、经纬度坐标
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { searchCities, type CityData } from '../data/cities';
import type { LatLng } from '../types';

export interface CitySelectResult {
  city: string;
  country: string;
  countryCode: string;
  location: LatLng;
}

interface CitySearchProps {
  /** 当前城市名 */
  value: string;
  /** 当前国家名 */
  country: string;
  /** 值变化回调 (当用户手动输入时) */
  onCityChange: (city: string) => void;
  /** 选择城市回调 (从建议中选择时) */
  onCitySelect: (result: CitySelectResult) => void;
  /** 是否自动聚焦 */
  autoFocus?: boolean;
  /** 输入框引用 */
  inputRef?: React.RefObject<HTMLInputElement>;
}

export const CitySearch: React.FC<CitySearchProps> = ({
  value,
  country,
  onCityChange,
  onCitySelect,
  autoFocus = false,
  inputRef: externalInputRef,
}) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  const internalInputRef = useRef<HTMLInputElement>(null);
  const inputRef = externalInputRef || internalInputRef;
  const containerRef = useRef<HTMLDivElement>(null);

  // 同步外部 value 到内部 query
  useEffect(() => {
    if (value !== query) {
      setQuery(value);
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  // 处理输入变化
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setQuery(val);
      onCityChange(val);

      if (val.trim().length > 0) {
        const results = searchCities(val);
        setSuggestions(results);
        setIsOpen(results.length > 0);
        setHighlightIndex(-1);
      } else {
        setSuggestions([]);
        setIsOpen(false);
        setHighlightIndex(-1);
      }
    },
    [onCityChange]
  );

  // 选择城市
  const handleSelect = useCallback(
    (cityData: CityData) => {
      setQuery(cityData.name);
      setIsOpen(false);
      setSuggestions([]);
      onCitySelect({
        city: cityData.name,
        country: cityData.country,
        countryCode: cityData.countryCode,
        location: { lat: cityData.lat, lng: cityData.lng },
      });
    },
    [onCitySelect]
  );

  // 键盘导航
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || suggestions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev < suggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightIndex((prev) =>
            prev > 0 ? prev - 1 : suggestions.length - 1
          );
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
          break;
      }
    },
    [isOpen, suggestions, highlightIndex, handleSelect]
  );

  // 失焦时关闭 (延迟以允许点击建议)
  const handleBlur = useCallback(() => {
    setTimeout(() => setIsOpen(false), 150);
  }, []);

  // 聚焦时重新搜索
  const handleFocus = useCallback(() => {
    if (query.trim().length > 0) {
      const results = searchCities(query);
      setSuggestions(results);
      setIsOpen(results.length > 0);
    }
  }, [query]);

  return (
    <div ref={containerRef} className="relative">
      <label className="block text-xs font-semibold text-gray-500 mb-1.5">
        城市 <span className="text-red-400">*</span>
      </label>

      {/* 输入框 */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-300"
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
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="搜索城市名，如：东京、巴黎..."
          autoFocus={autoFocus}
          className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-travel-400/30 focus:border-travel-400 transition-all"
        />
        {query && (
          <button
            onMouseDown={(e) => {
              e.preventDefault();
              setQuery('');
              onCityChange('');
              setSuggestions([]);
              setIsOpen(false);
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 flex items-center justify-center rounded-full text-gray-300 hover:text-gray-500 transition-colors"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* 自动补全下拉列表 */}
      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-fade-in max-h-56 overflow-y-auto">
          {suggestions.map((cityData, index) => (
            <div
              key={`${cityData.name}-${cityData.countryCode}`}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(cityData);
              }}
              className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors ${
                index === highlightIndex
                  ? 'bg-travel-50'
                  : 'hover:bg-gray-50'
              }`}
            >
              {/* 位置图标 */}
              <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center">
                <svg
                  className="w-3.5 h-3.5 text-travel-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>

              {/* 城市信息 */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {cityData.name}
                  {cityData.nameZh && (
                    <span className="text-gray-400 font-normal ml-1">
                      {cityData.nameZh}
                    </span>
                  )}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {cityData.country} · {cityData.countryZh}
                </p>
              </div>

              {/* 国家代码 */}
              <span className="flex-shrink-0 text-[10px] font-medium text-gray-300 bg-gray-50 px-1.5 py-0.5 rounded">
                {cityData.countryCode}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
