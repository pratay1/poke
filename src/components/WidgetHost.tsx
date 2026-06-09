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
    <div className="bg-[#1a1a1a] border border-[#262626] rounded-xl overflow-hidden flex flex-col shadow-2xl relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-white/5" />
      
      <div className="flex items-center justify-between p-4 border-b border-[#262626] bg-[#1d1d1d]">
        <div className="flex items-center gap-3">
          <span className="text-gray-400">{icon}</span>
          <h2 className="text-sm font-semibold text-gray-200 tracking-wide uppercase">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {onClear && (
            <button 
              onClick={onClear}
              className="p-1.5 hover:bg-white/5 rounded-md text-gray-500 hover:text-red-400 transition-colors"
              title="Clear all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-white/5 rounded-md text-gray-500 hover:text-gray-300 transition-colors"
          >
            {isCollapsed ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
            )}
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="p-4 flex-1 flex flex-col gap-4 overflow-y-auto max-h-[400px]">
          {children}
        </div>
      )}
    </div>
  );
};
