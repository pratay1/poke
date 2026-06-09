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

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="space-y-4">
      <textarea
        value={newNote}
        onChange={(e) => setNewNote(e.target.value)}
        onKeyDown={handleSubmit}
        placeholder="Add a note... (Enter to save)"
        className="w-full bg-[#121212] border border-[#262626] rounded-lg p-3 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors resize-none h-20"
      />
      
      <div className="space-y-3">
        {notes.map((note) => (
          <div key={note.id} className="group relative bg-[#121212] border border-[#262626] rounded-lg p-3 transition-all hover:border-[#333]">
            <textarea
              value={note.content}
              onChange={(e) => onUpdate(note.id, e.target.value)}
              className="w-full bg-transparent text-sm text-gray-300 focus:outline-none resize-none"
              rows={Math.max(1, note.content.split('\n').length)}
            />
            <div className="flex justify-between items-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-gray-600 font-mono">{new Date(note.createdAt).toLocaleDateString()}</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => copyToClipboard(note.content)}
                  className="p-1 text-gray-500 hover:text-blue-400 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                </button>
                <button 
                  onClick={() => onDelete(note.id)}
                  className="p-1 text-gray-500 hover:text-red-400 transition-colors"
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
