import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle, ExternalLink } from 'lucide-react';

export default function App() {
  const [notes, setNotes] = useState<{ id: number; text: string }[]>([]);
  const [tasks, setTasks] = useState<{ id: number; text: string; completed: boolean }[]>([]);
  const [links, setLinks] = useState<{ id: number; text: string; url: string }[]>([]);

  const addItem = (type: 'notes' | 'tasks' | 'links', val: string, extra?: string) => {
    if (!val) return;
    const id = Date.now();
    if (type === 'notes') setNotes([...notes, { id, text: val }]);
    if (type === 'tasks') setTasks([...tasks, { id, text: val, completed: false }]);
    if (type === 'links') setLinks([...links, { id, text: val, url: extra || '#' }]);
  };

  return (
    <div className="min-h-screen bg-near-black p-8 font-sans selection:bg-zinc-800 selection:text-white">
      <header className="mb-12">
        <h1 className="text-3xl font-bold text-zinc-100 tracking-tight">Poke Dashboard</h1>
        <p className="text-zinc-500 mt-2">Monday, June 8, 2026</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Notes Widget */}
        <div className="bg-gunpowder border border-zinc-800 rounded-2xl p-6 transition-all hover:border-zinc-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-200">Notes</h2>
            <button 
              onClick={() => {
                const text = prompt('Enter note:');
                if (text) addItem('notes', text);
              }}
              className="p-2 bg-dark-ash hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-700"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {notes.map(note => (
              <div key={note.id} className="group flex items-start justify-between p-3 bg-dark-ash/50 rounded-xl border border-transparent hover:border-zinc-700 transition-all">
                <p className="text-sm text-zinc-400 leading-relaxed">{note.text}</p>
                <button 
                  onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
                  className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {notes.length === 0 && <p className="text-zinc-600 text-sm italic">No notes yet.</p>}
          </div>
        </div>

        {/* Tasks Widget */}
        <div className="bg-gunpowder border border-zinc-800 rounded-2xl p-6 transition-all hover:border-zinc-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-200">Tasks</h2>
            <button 
              onClick={() => {
                const text = prompt('Enter task:');
                if (text) addItem('tasks', text);
              }}
              className="p-2 bg-dark-ash hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-700"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-3">
            {tasks.map(task => (
              <div key={task.id} className="group flex items-center justify-between p-3 bg-dark-ash/50 rounded-xl border border-transparent hover:border-zinc-700 transition-all">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t))}
                    className={`transition-colors ${task.completed ? 'text-emerald-500' : 'text-zinc-600 hover:text-zinc-400'}`}
                  >
                    <CheckCircle size={20} />
                  </button>
                  <span className={`text-sm ${task.completed ? 'text-zinc-600 line-through' : 'text-zinc-400'}`}>
                    {task.text}
                  </span>
                </div>
                <button 
                  onClick={() => setTasks(tasks.filter(t => t.id !== task.id))}
                  className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {tasks.length === 0 && <p className="text-zinc-600 text-sm italic">Clean slate.</p>}
          </div>
        </div>

        {/* Links Widget */}
        <div className="bg-gunpowder border border-zinc-800 rounded-2xl p-6 transition-all hover:border-zinc-700 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-zinc-200">Links</h2>
            <button 
              onClick={() => {
                const name = prompt('Link name:');
                const url = prompt('URL:');
                if (name && url) addItem('links', name, url);
              }}
              className="p-2 bg-dark-ash hover:bg-zinc-700 rounded-lg transition-colors border border-zinc-700"
            >
              <Plus size={18} />
            </button>
          </div>
          <div className="space-y-3">
            {links.map(link => (
              <div key={link.id} className="group flex items-center justify-between p-3 bg-dark-ash/50 rounded-xl border border-transparent hover:border-zinc-700 transition-all">
                <a 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-zinc-400 hover:text-zinc-200 flex items-center gap-2 group/link"
                >
                  {link.text}
                  <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition-all" />
                </a>
                <button 
                  onClick={() => setLinks(links.filter(l => l.id !== link.id))}
                  className="opacity-0 group-hover:opacity-100 text-zinc-600 hover:text-red-400 transition-all"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
            {links.length === 0 && <p className="text-zinc-600 text-sm italic">No quick links.</p>}
          </div>
        </div>
      </div>
    </div>
  );
}