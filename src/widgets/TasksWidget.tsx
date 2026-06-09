import React, { useState } from 'react';
import { Task } from '../types';

interface TasksWidgetProps {
  tasks: Task[];
  onAdd: (text: string, priority: Task['priority']) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TasksWidget: React.FC<TasksWidgetProps> = ({ tasks, onAdd, onToggle, onDelete }) => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority);
      setText('');
    }
  };

  const priorityStyles = {
    high: 'text-rose-500/80 bg-rose-500/5 border-rose-500/10',
    medium: 'text-amber-500/80 bg-amber-500/5 border-amber-500/10',
    low: 'text-emerald-500/80 bg-emerald-500/5 border-emerald-500/10'
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Mission objective..."
          className="w-full bg-[#1a1a1a] border border-[#262626] rounded-xl px-4 py-3 text-sm text-zinc-300 focus:outline-none focus:border-zinc-100/20 transition-all placeholder:text-zinc-600 shadow-inner"
        />
        <div className="flex justify-between items-center gap-3">
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'])}
            className="flex-1 bg-[#1a1a1a] border border-[#262626] rounded-lg px-3 py-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest focus:outline-none focus:border-zinc-100/10 transition-colors cursor-pointer appearance-none text-center"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button type="submit" className="bg-zinc-100 hover:bg-white text-[#1a1a1a] text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-lg transition-all active:scale-95 shadow-lg shadow-black/20">Execute</button>
        </div>
      </form>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`group flex items-center justify-between bg-[#1a1a1a] border border-[#262626] rounded-xl p-4 transition-all ${task.completed ? 'opacity-40 grayscale' : 'hover:border-zinc-100/10'}`}
          >
            <div className="flex items-center gap-4 flex-1">
              <button 
                onClick={() => onToggle(task.id)}
                className={`w-5 h-5 rounded-md border transition-all flex items-center justify-center ${task.completed ? 'bg-zinc-200 border-zinc-200' : 'border-zinc-700 hover:border-zinc-100'}`}
              >
                {task.completed && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="text-[#1a1a1a]"><path d="M20 6 9 17l-5-5"/></svg>}
              </button>
              <div className="flex flex-col gap-0.5">
                <span className={`text-sm font-medium transition-all ${task.completed ? 'line-through text-zinc-500' : 'text-zinc-200'}`}>
                  {task.text}
                </span>
                {task.priority && (
                  <span className={`text-[8px] font-black uppercase tracking-[0.2em] w-fit px-1.5 py-0.5 rounded border ${priorityStyles[task.priority]}`}>
                    {task.priority}
                  </span>
                )}
              </div>
            </div>
            <button 
              onClick={() => onDelete(task.id)}
              className="p-1.5 text-zinc-700 hover:text-red-400/80 transition-colors opacity-0 group-hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
