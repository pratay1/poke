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
    <div className="bg-[#0a0a0a] border border-[#161616] rounded-xl overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#161616]">
        <div className="flex items-center gap-2.5">
          <span className="text-zinc-600">{icon}</span>
          <h2 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{title}</h2>
        </div>
        <div className="flex items-center gap-1">
          {onClear && (
            <button 
              onClick={onClear}
              className="p-1.5 hover:bg-zinc-900 rounded-md text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-zinc-900 rounded-md text-zinc-600 hover:text-zinc-400 transition-colors"
          >
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            )}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto max-h-[450px]">
          {children}
        </div>
      )}
    </div>
  );
};
