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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url) {
      onAdd(title, url);
      setTitle('');
      setUrl('');
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
          className="w-full bg-[#0d0d0d] border border-[#161616] rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-800 transition-colors placeholder:text-zinc-700"
        />
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="w-full bg-[#0d0d0d] border border-[#161616] rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-800 transition-colors placeholder:text-zinc-700"
        />
        <button type="submit" className="hidden"></button>
      </form>

      <div className="space-y-2">
        {links.map((link) => (
          <div key={link.id} className="group flex items-center justify-between bg-[#0d0d0d] border border-[#161616] rounded-lg p-3 hover:border-zinc-800 transition-colors">
            <a 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex-1 truncate"
            >
              <p className="text-sm text-zinc-300 truncate">{link.title}</p>
              <p className="text-[10px] text-zinc-700 truncate">{new URL(link.url).hostname}</p>
            </a>
            <button 
              onClick={() => onDelete(link.id)}
              className="text-zinc-700 hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
