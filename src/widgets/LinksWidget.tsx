import React, { useState } from 'react';
import { Link } from '../types';

interface LinksWidgetProps {
  links: Link[];
  onAdd: (title: string, url: string) => void;
  onDelete: (id: string) => void;
}

export const LinksWidget: React.FC<LinksWidgetProps> = ({ links, onDelete, onAdd }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url && !url.startsWith('http://') && !url.startsWith('https://')) {
      setError('Invalid protocol');
      return;
    }
    if (title && url) {
      onAdd(title, url);
      setTitle('');
      setUrl('');
      setError('');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="grid grid-cols-1 gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Resource title..."
            className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-100/20 transition-all placeholder:text-zinc-600 shadow-inner"
          />
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError('');
            }}
            placeholder="https://..."
            className={`w-full bg-[#1a1a1a] border ${error ? 'border-rose-500/50' : 'border-[#262626]'} rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-100/20 transition-all placeholder:text-zinc-600 shadow-inner`}
          />
        </div>
        <button type="submit" className="w-full text-[10px] font-black uppercase tracking-widest bg-zinc-900 hover:bg-zinc-800 text-zinc-200 py-3 rounded-xl transition-all border border-zinc-800 active:scale-[0.98]">
          Link Resource
        </button>
      </form>

      <div className="space-y-2">
        {links.map((link) => (
          <div key={link.id} className="group flex items-center justify-between bg-[#1a1a1a] border border-[#262626] rounded-xl p-4 hover:border-zinc-100/10 transition-all">
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 flex-1 min-w-0"
            >
              <div className="w-10 h-10 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-600 group-hover:text-zinc-300 transition-colors shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
              <div className="truncate">
                <p className="text-sm font-semibold text-zinc-200 truncate group-hover:text-white transition-colors">{link.title}</p>
                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest truncate">{new URL(link.url).hostname}</p>
              </div>
            </a>
            <button 
              onClick={() => onDelete(link.id)}
              className="p-1.5 text-zinc-700 hover:text-red-400/80 opacity-0 group-hover:opacity-100 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
