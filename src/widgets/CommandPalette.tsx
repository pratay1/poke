import React, { useState, useEffect, useCallback } from 'react';
import { Note, Task, Link } from '../types';

interface CommandPaletteProps {
  notes: Note[];
  tasks: Task[];
  links: Link[];
  onAddNote: (content: string) => void;
  onAddTask: (text: string) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ 
  notes, tasks, links, onAddNote, onAddTask, onClose, isOpen 
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        isOpen ? onClose() : undefined; // Toggling is handled by parent App.tsx usually, but we ensure state
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const runCommand = useCallback(() => {
    if (query.startsWith('note:')) {
      onAddNote(query.replace('note:', '').trim());
      onClose();
      setQuery('');
    } else if (query.startsWith('task:')) {
      onAddTask(query.replace('task:', '').trim());
      onClose();
      setQuery('');
    }
  }, [query, onAddNote, onAddTask, onClose]);

  const filteredNotes = notes.filter(n => n.content.toLowerCase().includes(query.toLowerCase()));
  const filteredTasks = tasks.filter(t => t.text.toLowerCase().includes(query.toLowerCase()));
  const filteredLinks = links.filter(l => l.title.toLowerCase().includes(query.toLowerCase()));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-[#0a0a0a] border border-[#262626] rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-4 border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-500"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runCommand()}
              placeholder="Search or type 'note: ...' or 'task: ...'"
              className="w-full bg-transparent text-lg text-gray-200 outline-none placeholder:text-gray-600"
            />
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <div className="p-4 text-center">
              <p className="text-sm text-gray-500">Try typing "task: buy coffee" or search across your dashboard.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredNotes.length > 0 && (
                <div>
                  <h3 className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase">Notes</h3>
                  {filteredNotes.map(n => (
                    <div key={n.id} className="p-3 hover:bg-white/5 rounded-xl cursor-pointer flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M15 3v6h6"/></svg>
                      <span className="text-sm text-gray-300 truncate">{n.content}</span>
                    </div>
                  ))}
                </div>
              )}
              {filteredTasks.length > 0 && (
                <div>
                  <h3 className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase">Tasks</h3>
                  {filteredTasks.map(t => (
                    <div key={t.id} className="p-3 hover:bg-white/5 rounded-xl cursor-pointer flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                      <span className="text-sm text-gray-300 truncate">{t.text}</span>
                    </div>
                  ))}
                </div>
              )}
              {filteredLinks.length > 0 && (
                <div>
                  <h3 className="px-3 py-1 text-[10px] font-bold text-gray-500 uppercase">Links</h3>
                  {filteredLinks.map(l => (
                    <div key={l.id} className="p-3 hover:bg-white/5 rounded-xl cursor-pointer flex items-center gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                      <span className="text-sm text-gray-300 truncate">{l.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="p-3 bg-[#0d0d0d] border-t border-[#262626] flex justify-between items-center px-4">
          <div className="flex gap-4">
            <span className="text-[10px] text-gray-600"><kbd className="bg-[#1a1a1a] px-1 rounded border border-[#333]">ESC</kbd> to close</span>
            <span className="text-[10px] text-gray-600"><kbd className="bg-[#1a1a1a] px-1 rounded border border-[#333]">↵</kbd> to execute</span>
          </div>
          <span className="text-[10px] text-blue-500/50 font-bold tracking-widest uppercase">Poke Dashboard v2.0</span>
        </div>
      </div>
    </div>
  );
};
