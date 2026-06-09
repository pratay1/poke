import React, { useState } from 'react';

interface WidgetHostProps {
  title: string;
  icon: React.ReactNode;
  onClear?: () => void;
  children: React.ReactNode;
}

export const WidgetHost: React.FC<WidgetHostProps> = ({ title, icon, onClear, children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-[#1a1a1a] border border-[#262626] rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)] group">
      <div className="flex items-center justify-between p-5 border-b border-[#262626]">
        <div className="flex items-center gap-3.5">
          <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors duration-500">{icon}</span>
          <h2 className="text-[11px] font-black text-zinc-500 tracking-[0.2em] uppercase group-hover:text-zinc-200 transition-colors duration-500">{title}</h2>
        </div>
        <div className="flex items-center gap-1">
          {onClear && (
            <button 
              onClick={onClear}
              className="p-2 hover:bg-white/5 rounded-xl text-zinc-600 hover:text-red-400/80 transition-all active:scale-95"
              title="Clear all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-white/5 rounded-xl text-zinc-600 hover:text-zinc-300 transition-all active:scale-95"
          >
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            )}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-5 flex-1 flex flex-col gap-5 overflow-y-auto max-h-[500px] scrollbar-hide">
          {children}
        </div>
      )}
    </div>
  );
};
