/**
 * TravelForm 组件 - 添加/编辑旅行记录的表单弹窗
 *
 * 集成城市搜索自动补全，支持精确定位到城市级别
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { TravelRecord, FormInitialData, LatLng } from '../types';
import { compressImages } from '../utils/imageUtils';
import { uploadPhoto } from '../services/supabase';
import { CitySearch } from './CitySearch';
import type { CitySelectResult } from './CitySearch';

export interface TravelFormProps {
  initialData: FormInitialData | null;
  onClose: () => void;
  onSave: (data: Omit<TravelRecord, 'id' | 'created_at' | 'updated_at'>) => void;
}

export const TravelForm: React.FC<TravelFormProps> = ({ initialData, onClose, onSave }) => {
  const isEdit = !!initialData?.editId;
  const existing = initialData?.existingRecord;

  // 初始值：编辑模式用现有数据，否则用地图点击的初始数据
  const initialCountry = existing?.country || initialData?.country || '';
  const initialCountryCode = existing?.countryCode || initialData?.countryCode || '';
  const initialCity = existing?.city || initialData?.city || '';
  const initialLocation = existing?.location || initialData?.location || { lat: 0, lng: 0 };

  const [country, setCountry] = useState(initialCountry);
  const [countryCode, setCountryCode] = useState(initialCountryCode);
  const [city, setCity] = useState(initialCity);
  const [location, setLocation] = useState<LatLng>(initialLocation);
  const [date, setDate] = useState(existing?.date || '');
  const [note, setNote] = useState(existing?.note || '');
  const [photos, setPhotos] = useState<string[]>(existing?.photos || []);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState<{ city?: string; country?: string; date?: string }>({});
  const [countryLocked, setCountryLocked] = useState(!!initialCountry || !!initialData?.city);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);

  // 聚焦第一个输入框
  useEffect(() => {
    setTimeout(() => cityInputRef.current?.focus(), 100);
  }, []);

  // ESC 关闭
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // 处理城市搜索选择
  const handleCitySelect = useCallback((result: CitySelectResult) => {
    setCity(result.city);
    setCountry(result.country);
    setCountryCode(result.countryCode);
    setLocation(result.location);
    setCountryLocked(true);
  }, []);

  // 处理城市手动输入 (未选择建议时)
  const handleCityChange = useCallback((val: string) => {
    setCity(val);
  }, []);

  // 处理照片上传（优先上传到 Supabase Storage，回退到 base64）
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(file => uploadPhoto(file));
      const results = await Promise.all(uploadPromises);
      setPhotos((prev) => [...prev, ...results]);
    } catch (err) {
      console.error('照片上传失败:', err);
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // 删除照片
  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // 保存
  const handleSave = () => {
    const newErrors: { city?: string; country?: string; date?: string } = {};
    if (!city.trim()) newErrors.city = '请输入或搜索城市名称';
    if (!country.trim()) newErrors.country = '请输入国家名称';
    if (!date) newErrors.date = '请选择旅行日期';

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSave({
      country: country.trim() || '未知地区',
      countryCode: countryCode || country.trim(),
      city: city.trim(),
      date,
      note: note.trim(),
      photos,
      location: location || { lat: 0, lng: 0 },
    });
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 animate-fade-in">
      {/* 遮罩层 */}
      <div
        className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 表单卡片 */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-slide-up max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 sticky top-0 bg-white rounded-t-2xl z-10">
          <h2 className="text-base font-bold text-gray-900">
            {isEdit ? '编辑旅行' : '添加旅行'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 表单内容 */}
        <div className="p-5 space-y-4">
          {/* 城市搜索 (核心字段，支持自动补全) */}
          <CitySearch
            value={city}
            country={country}
            onCityChange={handleCityChange}
            onCitySelect={handleCitySelect}
            autoFocus={true}
            inputRef={cityInputRef}
          />
          {errors.city && (
            <p className="-mt-3 text-xs text-red-400">{errors.city}</p>
          )}

          {/* 国家 / 地区 */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              国家 / 地区 <span className="text-red-400">*</span>
              {countryLocked && (
                <span className="ml-2 text-[10px] text-travel-500 bg-travel-50 px-1.5 py-0.5 rounded-full">
                  已自动填充
                </span>
              )}
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
                setCountryLocked(false);
              }}
              placeholder="选择城市后自动填充，或手动输入"
              className={`w-full px-3 py-2.5 text-sm bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-travel-400/30 transition-all ${
                errors.country ? 'border-red-300' : 'border-gray-200 focus:border-travel-400'
              }`}
            />
            {errors.country && (
              <p className="mt-1 text-xs text-red-400">{errors.country}</p>
            )}
            <p className="mt-1 text-[10px] text-gray-300">
              城市搜索选择后会自动填充，也可手动修改
            </p>
          </div>

          {/* 日期 */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              旅行日期 <span className="text-red-400">*</span>
            </label>
            <input
              type="month"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-3 py-2.5 text-sm bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-travel-400/30 transition-all ${
                errors.date ? 'border-red-300' : 'border-gray-200 focus:border-travel-400'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-xs text-red-400">{errors.date}</p>
            )}
          </div>

          {/* 旅行感受 */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              旅行感受
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="记录一段难忘的回忆..."
              rows={3}
              className="w-full px-3 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-travel-400/30 focus:border-travel-400 transition-all resize-none"
            />
          </div>

          {/* 照片上传 */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              旅行照片
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />

            {/* 已上传照片预览 */}
            {photos.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group w-16 h-16 rounded-lg overflow-hidden">
                    <img src={photo} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-0 right-0 w-5 h-5 bg-black/60 text-white rounded-bl-lg rounded-tr-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 上传按钮 */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 hover:border-travel-300 hover:text-travel-500 transition-colors text-xs font-medium disabled:opacity-50"
            >
              {uploading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 border-2 border-travel-400 border-t-transparent rounded-full animate-spin" />
                  上传中...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  添加照片
                </span>
              )}
            </button>
            <p className="mt-1 text-[10px] text-gray-300 text-center">
              照片将上传到云端存储
            </p>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center gap-2 px-5 py-4 border-t border-gray-100 sticky bottom-0 bg-white rounded-b-2xl">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors active:scale-[0.98]"
          >
            {isEdit ? '保存修改' : '添加记录'}
          </button>
        </div>
      </div>
    </div>
  );
};
