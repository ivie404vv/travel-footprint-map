-- =============================================================================
-- 旅行足迹地图 - Supabase 数据库初始化迁移
-- 在 Supabase SQL Editor 中运行此文件即可完成数据库初始化
-- =============================================================================

-- 1. 创建旅行记录表
CREATE TABLE IF NOT EXISTS travel_records (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  country     TEXT NOT NULL,
  country_code TEXT NOT NULL,
  city        TEXT DEFAULT '',
  latitude    DOUBLE PRECISION NOT NULL,
  longitude   DOUBLE PRECISION NOT NULL,
  date        TEXT NOT NULL,
  note        TEXT DEFAULT '',
  photos      TEXT[] DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- 2. 创建索引
CREATE INDEX IF NOT EXISTS idx_travel_records_user_id ON travel_records(user_id);
CREATE INDEX IF NOT EXISTS idx_travel_records_date ON travel_records(date DESC);

-- 3. 启用 Row Level Security
ALTER TABLE travel_records ENABLE ROW LEVEL SECURITY;

-- 4. RLS 策略：用户只能访问自己的记录

-- 查看自己的记录
CREATE POLICY "Users can view own records"
  ON travel_records
  FOR SELECT
  USING (auth.uid() = user_id);

-- 创建新记录
CREATE POLICY "Users can create own records"
  ON travel_records
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 更新自己的记录
CREATE POLICY "Users can update own records"
  ON travel_records
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 删除自己的记录
CREATE POLICY "Users can delete own records"
  ON travel_records
  FOR DELETE
  USING (auth.uid() = user_id);

-- 5. 自动更新 updated_at 字段
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON travel_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================================================
-- 6. 创建 Storage 存储桶（用于旅行照片）
-- =============================================================================
-- 注意：Storage 桶需要通过 Supabase Dashboard 或 API 创建
-- 请在 Dashboard → Storage 中手动创建名为 "travel-photos" 的公开存储桶
-- 或者取消注释下面的 SQL（需要 superuser 权限）：
--
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('travel-photos', 'travel-photos', true);
--
-- -- Storage RLS 策略
-- CREATE POLICY "Anyone can view photos"
--   ON storage.objects FOR SELECT
--   USING (bucket_id = 'travel-photos');
--
-- CREATE POLICY "Authenticated users can upload photos"
--   ON storage.objects FOR INSERT
--   WITH CHECK (bucket_id = 'travel-photos' AND auth.role() = 'authenticated');
--
-- CREATE POLICY "Users can update own photos"
--   ON storage.objects FOR UPDATE
--   USING (bucket_id = 'travel-photos' AND auth.uid() = owner);
--
-- CREATE POLICY "Users can delete own photos"
--   ON storage.objects FOR DELETE
--   USING (bucket_id = 'travel-photos' AND auth.uid() = owner);
