import React, { useState, useRef, useEffect } from 'react';

interface HeaderProps {
  onAddClick: () => void;
  onClearClick: () => void;
  hasRecords: boolean;
  userEmail?: string;
  onLogout: () => void;
  onRefresh?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAddClick, onClearClick, hasRecords, userEmail, onLogout }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-3 bg-white/80 backdrop-blur-xl border-b border-gray-200/60 z-[1000]">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-sm">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-8-6.5-8-12a8 8 0 1116 0c0 5.5-8 12-8 12z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
        <div>
          <h1 className="text-base sm:text-lg font-bold text-gray-900 tracking-tight">旅行足迹</h1>
          <p className="text-[10px] sm:text-xs text-gray-400 font-medium -mt-0.5">Travel Footprint Map</p>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        {hasRecords && (
          <button
            onClick={onClearClick}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            清空
          </button>
        )}
        <button
          onClick={onAddClick}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-gray-900 hover:bg-gray-800 rounded-lg transition-all active:scale-95"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden sm:inline">添加旅行</span>
          <span className="sm:hidden">添加</span>
        </button>

        {/* User menu */}
        {userEmail && (
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="flex items-center gap-2 pl-3 pr-1.5 py-1.5 bg-gray-100/80 hover:bg-gray-200/80 rounded-xl transition-colors"
            >
              <span className="text-xs font-medium text-gray-700 max-w-[100px] truncate">{userEmail}</span>
              <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-white text-xs font-bold">
                {userEmail[0].toUpperCase()}
              </div>
            </button>

            {showMenu && (
              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 animate-fade-in">
                <div className="px-3 py-2 border-b border-gray-50">
                  <p className="text-xs font-medium text-gray-800 truncate">{userEmail}</p>
                  <p className="text-[10px] text-gray-400">已登录</p>
                </div>
                <button
                  onClick={() => { setShowMenu(false); onLogout(); }}
                  className="w-full text-left px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  退出登录
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};
