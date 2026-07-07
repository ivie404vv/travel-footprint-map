/**
 * DetailCard 组件 - 旅行记录详情卡片弹窗
 *
 * 展示：
 * - 城市名 + 国家
 * - 旅行日期
 * - 旅行感受
 * - 照片画廊
 * - 编辑 / 删除操作
 */

import React, { useEffect, useState } from 'react';
import type { TravelRecord } from '../types';
import { formatDateChinese } from '../utils/geoUtils';

export interface DetailCardProps {
  record: TravelRecord;
  onClose: () => void;
  onEdit: (record: TravelRecord) => void;
  onDelete: (id: string) => void;
}

export const DetailCard: React.FC<DetailCardProps> = ({ record, onClose, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [activePhoto, setActivePhoto] = useState(0);

  // ESC 关闭
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showDeleteConfirm) {
          setShowDeleteConfirm(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, showDeleteConfirm]);

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 animate-fade-in">
      {/* 遮罩层 */}
      <div
        className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* 详情卡片 */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-slide-up overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* 头部渐变背景 */}
        <div className="relative h-32 bg-gradient-to-br from-travel-400 via-travel-500 to-amber-500 overflow-hidden">
          {/* 装饰图案 */}
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
              <circle cx="350" cy="50" r="60" fill="white" />
              <circle cx="50" cy="150" r="40" fill="white" />
              <circle cx="200" cy="100" r="80" fill="white" opacity="0.5" />
            </svg>
          </div>

          {/* 关闭按钮 */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md hover:bg-white/30 transition-colors"
          >
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 城市名 */}
          <div className="absolute bottom-3 left-5 right-5">
            <h2 className="text-2xl font-bold text-white tracking-tight">{record.city}</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <svg className="w-3.5 h-3.5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm text-white/90 font-medium">{record.country}</p>
            </div>
          </div>
        </div>

        {/* 内容区 */}
        <div className="p-5 space-y-4">
          {/* 日期 */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-travel-50 flex items-center justify-center">
              <svg className="w-5 h-5 text-travel-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">旅行日期</p>
              <p className="text-sm font-semibold text-gray-700">{formatDateChinese(record.date)}</p>
            </div>
          </div>

          {/* 旅行感受 */}
          {record.note && (
            <div className="p-4 bg-gray-50/70 rounded-xl border border-gray-100">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                旅行感受
              </p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                {record.note}
              </p>
            </div>
          )}

          {/* 照片画廊 */}
          {record.photos.length > 0 && (
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                旅行照片 · {record.photos.length} 张
              </p>

              {/* 大图预览 */}
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-100 mb-2">
                <img
                  src={record.photos[activePhoto]}
                  alt={`照片 ${activePhoto + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* 缩略图列表 */}
              {record.photos.length > 1 && (
                <div className="flex gap-1.5 overflow-x-auto">
                  {record.photos.map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setActivePhoto(index)}
                      className={`flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all ${
                        activePhoto === index
                          ? 'ring-2 ring-travel-500 ring-offset-1'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={photo} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 底部操作栏 */}
        <div className="flex items-center gap-2 px-5 py-4 border-t border-gray-100">
          {!showDeleteConfirm ? (
            <>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                删除
              </button>
              <div className="flex-1" />
              <button
                onClick={() => onEdit(record)}
                className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-colors active:scale-[0.98]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                编辑
              </button>
            </>
          ) : (
            <>
              <p className="text-sm text-gray-600 font-medium">确认删除这条记录？</p>
              <div className="flex-1" />
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-xl transition-colors"
              >
                取消
              </button>
              <button
                onClick={() => onDelete(record.id)}
                className="px-4 py-2.5 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-xl transition-colors active:scale-[0.98]"
              >
                删除
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
