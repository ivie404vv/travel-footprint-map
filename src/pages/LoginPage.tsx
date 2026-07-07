import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) throw authError;
      navigate('/app', { replace: true });
    } catch (err: any) {
      setError(err.message === 'Invalid login credentials'
        ? '邮箱或密码错误'
        : err.message || '登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f1eb] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm mb-4">
            <span className="text-2xl">🗺️</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">旅行足迹</h1>
          <p className="text-sm text-gray-400 mt-1">登录你的旅行地图</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="邮箱地址"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all text-sm"
              autoFocus
              autoComplete="email"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all text-sm"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl text-red-500 text-xs text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email.trim() || !password}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-medium rounded-xl transition-all text-sm shadow-sm shadow-amber-200"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          还没有账号？
          <Link to="/register" className="text-amber-600 hover:text-amber-700 ml-1 font-medium">
            注册
          </Link>
        </p>
      </div>
    </div>
  );
}
