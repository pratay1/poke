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
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('URL must start with http/https');
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
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Site title..."
          className="w-full bg-[#121212] border border-[#262626] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            setError('');
          }}
          placeholder="https://..."
          className={`w-full bg-[#121212] border ${error ? 'border-red-500/50' : 'border-[#262626]'} rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50`}
        />
        {error && <p className="text-[10px] text-red-400 px-1">{error}</p>}
        <button type="submit" className="w-full text-xs bg-[#222] hover:bg-[#2a2a2a] text-gray-300 px-3 py-2 rounded-lg transition-colors border border-[#333]">
          Save Bookmark
        </button>
      </form>

      <div className="grid grid-cols-1 gap-2">
        {links.map((link) => (
          <div key={link.id} className="group flex items-center justify-between bg-[#121212] border border-[#262626] rounded-lg p-3 hover:border-[#333] transition-all">
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 flex-1 min-w-0"
            >
              <div className="w-8 h-8 bg-[#1d1d1d] rounded flex items-center justify-center text-gray-500 shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
              <div className="truncate">
                <p className="text-sm text-gray-200 truncate">{link.title}</p>
                <p className="text-[10px] text-gray-500 truncate">{new URL(link.url).hostname}</p>
              </div>
            </a>
            <button 
              onClick={() => onDelete(link.id)}
              className="p-1 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
