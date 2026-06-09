import React, { useState, useEffect } from 'react';
import { DashboardState, Note, Task, Link } from './types';
import { WidgetHost } from './components/WidgetHost';
import { NotesWidget } from './widgets/NotesWidget';
import { TasksWidget } from './widgets/TasksWidget';
import { LinksWidget } from './widgets/LinksWidget';
import { CommandPalette } from './widgets/CommandPalette';

const STORAGE_KEY = 'poke-dashboard-v2';

const App: React.FC = () => {
  const [state, setState] = useState<DashboardState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : {
      notes: [],
      tasks: [],
      links: [],
      lastSaved: new Date().toISOString()
    };
  });

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...state, lastSaved: new Date().toISOString() }));
  }, [state]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
  const addNote = (content: string) => {
    const newNote: Note = { id: crypto.randomUUID(), content, createdAt: new Date().toISOString() };
    setState(prev => ({ ...prev, notes: [newNote, ...prev.notes] }));
  };

  const deleteNote = (id: string) => {
    setState(prev => ({ ...prev, notes: prev.notes.filter(n => n.id !== id) }));
  };

  const updateNote = (id: string, content: string) => {
    setState(prev => ({ ...prev, notes: prev.notes.map(n => n.id === id ? { ...n, content } : n) }));
  };

  const addTask = (text: string, priority: Task['priority'] = 'medium') => {
    const newTask: Task = { id: crypto.randomUUID(), text, completed: false, priority };
    setState(prev => ({ ...prev, tasks: [newTask, ...prev.tasks] }));
  };

  const toggleTask = (id: string) => {
    setState(prev => ({ ...prev, tasks: prev.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t) }));
  };

  const deleteTask = (id: string) => {
    setState(prev => ({ ...prev, tasks: prev.tasks.filter(t => t.id !== id) }));
  };

  const addLink = (title: string, url: string) => {
    const newLink: Link = { id: crypto.randomUUID(), title, url };
    setState(prev => ({ ...prev, links: [newLink, ...prev.links] }));
  };

  const deleteLink = (id: string) => {
    setState(prev => ({ ...prev, links: prev.links.filter(l => l.id !== id) }));
  };

  return (
    <div className="min-h-screen bg-black text-zinc-400 font-sans selection:bg-zinc-800">
      <header className="border-b border-[#161616] bg-black/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-zinc-100 rounded-lg flex items-center justify-center font-bold text-black">P</div>
            <h1 className="text-sm font-bold tracking-tight text-zinc-100">Poke</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-zinc-500 text-[10px] uppercase tracking-widest font-medium">
              <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
              {new Date(state.lastSaved).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-[10px] text-zinc-500 border border-[#161616] px-2 py-1 rounded font-mono">
              CMD+K
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WidgetHost 
            title="Notes" 
            onClear={() => setState(p => ({ ...p, notes: [] }))}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15.5 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8.5L15.5 3Z"/><path d="M15 3v6h6"/></svg>}
          >
            <NotesWidget notes={state.notes} onAdd={addNote} onDelete={deleteNote} onUpdate={updateNote} />
          </WidgetHost>

          <WidgetHost 
            title="Tasks" 
            onClear={() => setState(p => ({ ...p, tasks: [] }))}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>}
          >
            <TasksWidget tasks={state.tasks} onAdd={addTask} onToggle={toggleTask} onDelete={deleteTask} />
          </WidgetHost>

          <WidgetHost 
            title="Links" 
            onClear={() => setState(p => ({ ...p, links: [] }))}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>}
          >
            <LinksWidget links={state.links} onAdd={addLink} onDelete={deleteLink} />
          </WidgetHost>
        </div>
      </main>

      <CommandPalette 
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        notes={state.notes}
        tasks={state.tasks}
        links={state.links}
        onAddNote={addNote}
        onAddTask={addTask}
      />
    </div>
  );
};

export default App;
