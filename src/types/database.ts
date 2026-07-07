/**
 * Supabase 数据库类型定义
 * 与 supabase/migrations/001_init.sql 中的表结构保持一致
 */

export interface Database {
  public: {
    Tables: {
      travel_records: {
        Row: {
          id: string;
          user_id: string;
          country: string;
          country_code: string;
          city: string;
          latitude: number;
          longitude: number;
          date: string;
          note: string;
          photos: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          country: string;
          country_code: string;
          city?: string;
          latitude: number;
          longitude: number;
          date: string;
          note?: string;
          photos?: string[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          country?: string;
          country_code?: string;
          city?: string;
          latitude?: number;
          longitude?: number;
          date?: string;
          note?: string;
          photos?: string[];
          updated_at?: string;
        };
      };
    };
  };
}
