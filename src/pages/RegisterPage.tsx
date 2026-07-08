import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== passwordConfirm) {
      setError('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      setError('密码长度至少 6 位');
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
      });

      if (authError) throw authError;

      // 检查是否返回了 session
      // session 为 null 说明需要邮箱验证（Supabase 默认开启）
      if (data.session) {
        // 邮箱验证已关闭，直接登录成功
        navigate('/app', { replace: true });
      } else if (data.user) {
        // 需要邮箱验证 — 显示成功提示
        setSuccess(`注册成功！我们已向 ${email.trim()} 发送了验证邮件，请查收并点击验证链接后重新登录。`);
      } else {
        setError('注册失败，请稍后重试');
      }
    } catch (err: any) {
      const msg = err.message || '';
      if (msg.includes('already registered') || msg.includes('already exists')) {
        setError('该邮箱已被注册，请直接登录或使用其他邮箱');
      } else if (msg.includes('rate') || msg.includes('too many')) {
        setError('请求过于频繁，请稍后再试');
      } else if (msg.includes('signups not allowed')) {
        setError('当前不允许新注册，请联系管理员');
      } else {
        setError(msg || '注册失败，请检查网络后重试');
      }
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
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">加入旅行足迹</h1>
          <p className="text-sm text-gray-400 mt-1">创建账号，开始记录旅程</p>
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
              placeholder="密码（至少6位）"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all text-sm"
              autoComplete="new-password"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="确认密码"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl text-gray-800 placeholder-gray-300 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all text-sm"
              autoComplete="new-password"
            />
          </div>

          {error && (
            <div className="px-4 py-2.5 bg-red-50 border border-red-100 rounded-xl text-red-500 text-xs text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs leading-relaxed">
              <div className="flex items-start gap-2">
                <span className="text-base mt-0.5 shrink-0">📧</span>
                <span>{success}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email.trim() || !password || !passwordConfirm}
            className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-white font-medium rounded-xl transition-all text-sm shadow-sm shadow-amber-200"
          >
            {loading ? '注册中...' : '注册并开始'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          已有账号？
          <Link to="/login" className="text-amber-600 hover:text-amber-700 ml-1 font-medium">
            登录
          </Link>
        </p>
      </div>
    </div>
  );
}
