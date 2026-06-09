import React, { useState } from 'react';
import { Note } from '../types';

interface NotesWidgetProps {
  notes: Note[];
  onAdd: (content: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
}

export const NotesWidget: React.FC<NotesWidgetProps> = ({ notes, onAdd, onDelete, onUpdate }) => {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && newNote.trim()) {
      e.preventDefault();
      onAdd(newNote.trim());
      setNewNote('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative group">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={handleSubmit}
          placeholder="Jot something down..."
          className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl p-4 text-sm text-zinc-300 focus:outline-none focus:border-zinc-100/20 transition-all resize-none h-24 placeholder:text-zinc-600 shadow-inner"
        />
        <div className="absolute bottom-3 right-3 text-[9px] font-bold text-zinc-700 tracking-widest uppercase opacity-0 group-focus-within:opacity-100 transition-opacity">
          Press Enter
        </div>
      </div>
      
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className="group relative bg-[#1a1a1a] border border-[#262626] rounded-xl p-4 transition-all hover:border-zinc-100/10">
            <textarea
              value={note.content}
              onChange={(e) => onUpdate(note.id, e.target.value)}
              className="w-full bg-transparent text-sm text-zinc-300 focus:outline-none resize-none leading-relaxed"
              rows={Math.max(1, note.content.split('\n').length)}
            />
            <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-all">
              <span className="text-[9px] text-zinc-600 font-bold tracking-widest uppercase">{new Date(note.createdAt).toLocaleDateString()}</span>
              <div className="flex gap-1">
                <button 
                  onClick={() => navigator.clipboard.writeText(note.content)}
                  className="p-1.5 text-zinc-600 hover:text-zinc-300 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                </button>
                <button 
                  onClick={() => onDelete(note.id)}
                  className="p-1.5 text-zinc-600 hover:text-red-400/80 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
