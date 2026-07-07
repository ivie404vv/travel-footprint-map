/**
 * 旅行记录服务 — 基于 Supabase
 * 所有数据库操作均受 RLS 保护，用户只能访问自己的记录
 */

import { supabase } from '../lib/supabase';
import { compressImage } from '../utils/imageUtils';
import type { TravelRecord, LatLng } from '../types';

// ─── 内部工具 ────────────────────────────────────────────

/** 将 Supabase 行数据转换为前端 TravelRecord */
function rowToRecord(row: Record<string, any>): TravelRecord {
  return {
    id: row.id,
    country: row.country,
    countryCode: row.country_code,
    city: row.city || '',
    date: row.date,
    note: row.note || '',
    photos: row.photos || [],
    location: { lat: row.latitude, lng: row.longitude } as LatLng,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
}

/** 将前端 TravelRecord 转换为 Supabase 行数据 */
function recordToRow(record: Partial<TravelRecord> & { location?: LatLng }): Record<string, any> {
  const row: Record<string, any> = {};
  if (record.country !== undefined) row.country = record.country;
  if (record.countryCode !== undefined) row.country_code = record.countryCode;
  if (record.city !== undefined) row.city = record.city;
  if (record.date !== undefined) row.date = record.date;
  if (record.note !== undefined) row.note = record.note;
  if (record.photos !== undefined) row.photos = record.photos;
  if (record.location) {
    row.latitude = record.location.lat;
    row.longitude = record.location.lng;
  }
  return row;
}

// ─── 获取所有旅行记录 ──────────────────────────────────────

export async function getRecords(): Promise<TravelRecord[]> {
  const { data, error } = await supabase
    .from('travel_records')
    .select('*')
    .order('date', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) throw new Error(`获取记录失败: ${error.message}`);
  return (data || []).map(rowToRecord);
}

// ─── 创建旅行记录 ──────────────────────────────────────────

export async function createRecord(
  record: Omit<TravelRecord, 'id' | 'created_at' | 'updated_at'>
): Promise<TravelRecord> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('请先登录');

  const row: Record<string, any> = {
    ...recordToRow(record),
    user_id: user.id,
  };

  const { data, error } = await supabase
    .from('travel_records')
    .insert(row)
    .select()
    .single();

  if (error) throw new Error(`创建记录失败: ${error.message}`);
  return rowToRecord(data);
}

// ─── 更新旅行记录 ──────────────────────────────────────────

export async function updateRecord(
  id: string,
  updates: Partial<TravelRecord>
): Promise<TravelRecord> {
  const row: Record<string, any> = {
    ...recordToRow(updates),
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('travel_records')
    .update(row)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(`更新记录失败: ${error.message}`);
  return rowToRecord(data);
}

// ─── 删除旅行记录 ──────────────────────────────────────────

export async function deleteRecord(id: string): Promise<void> {
  const { error } = await supabase
    .from('travel_records')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`删除记录失败: ${error.message}`);
}

// ─── 照片上传 ──────────────────────────────────────────────

/**
 * 上传照片到 Supabase Storage
 * 优先上传到云端，失败时回退到 base64 本地存储
 */
export async function uploadPhoto(file: File): Promise<string> {
  // 尝试上传到 Supabase Storage
  try {
    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const { error } = await supabase.storage
      .from('travel-photos')
      .upload(fileName, file, {
        contentType: file.type || 'image/jpeg',
        upsert: false,
      });

    if (error) throw error;

    const { data: urlData } = supabase.storage
      .from('travel-photos')
      .getPublicUrl(fileName);

    return urlData.publicUrl;
  } catch {
    // 回退：压缩后保存为 base64 data URL
    return compressImage(file, 800, 0.8);
  }
}

/**
 * 从 Supabase Storage 删除照片
 */
export async function deletePhoto(url: string): Promise<void> {
  // 仅处理 Supabase Storage 的 URL
  if (url.includes('supabase.co/storage/v1/object/public/travel-photos/')) {
    const path = url.split('/travel-photos/').pop();
    if (path) {
      await supabase.storage.from('travel-photos').remove([path]);
    }
  }
}
