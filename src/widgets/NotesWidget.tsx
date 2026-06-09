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
    <div className="space-y-4">
      <textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        onKeyDown={handleSubmit}
        placeholder="New note..."
        className="w-full bg-[#0d0d0d] border border-[#161616] rounded-lg p-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-800 transition-colors resize-none h-20 placeholder:text-zinc-700"
      />
      
      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="group bg-[#0d0d0d] border border-[#161616] rounded-lg p-3 hover:border-zinc-800 transition-colors">
            <textarea
              value={note.content}
              onChange={(e) => onUpdate(note.id, e.target.value)}
              className="w-full bg-transparent text-sm text-zinc-300 focus:outline-none resize-none leading-relaxed"
              rows={Math.max(1, note.content.split('\n').length)}
            />
            <div className="flex justify-between items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[9px] text-zinc-700 font-mono">{new Date(note.createdAt).toLocaleDateString()}</span>
              <button 
                onClick={() => onDelete(note.id)}
                className="text-zinc-700 hover:text-zinc-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
