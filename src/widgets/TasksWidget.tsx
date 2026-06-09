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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), 'medium');
      setText('');
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task..."
          className="w-full bg-[#0d0d0d] border border-[#161616] rounded-lg px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-800 transition-colors placeholder:text-zinc-700"
        />
      </form>

      <div className="space-y-1.5">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className="group flex items-center justify-between bg-[#0d0d0d] border border-[#161616] rounded-lg px-3 py-2.5 hover:border-zinc-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onToggle(task.id)}
                className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${task.completed ? 'bg-zinc-200 border-zinc-200' : 'border-zinc-800'}`}
              >
                {task.completed && <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>}
              </button>
              <span className={`text-sm ${task.completed ? 'line-through text-zinc-600' : 'text-zinc-300'}`}>
                {task.text}
              </span>
            </div>
            <button 
              onClick={() => onDelete(task.id)}
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
