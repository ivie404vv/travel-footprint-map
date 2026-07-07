import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Supabase 客户端单例
 * 通过 .env 中的 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY 配置
 *
 * 如果缺少环境变量，createClient 仍会创建客户端，
 * 但所有 API 调用会返回错误提示用户配置环境变量。
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);
