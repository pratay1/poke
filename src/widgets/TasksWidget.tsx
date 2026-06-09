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

  const priorityColors = {
    high: 'text-red-400',
    medium: 'text-yellow-400',
    low: 'text-green-400'
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="New task..."
          className="bg-[#121212] border border-[#262626] rounded-lg px-3 py-2 text-sm text-gray-300 focus:outline-none focus:border-blue-500/50 transition-colors"
        />
        <div className="flex justify-between items-center">
          <select 
            value={priority}
            onChange={(e) => setPriority(e.target.value as Task['priority'])}
            className="bg-[#121212] border border-[#262626] rounded-md px-2 py-1 text-xs text-gray-400 focus:outline-none"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button type="submit" className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded-md transition-colors">Add Task</button>
        </div>
      </form>

      <div className="space-y-2">
        {tasks.map((task) => (
          <div 
            key={task.id} 
            className={`group flex items-center justify-between bg-[#121212] border border-[#262626] rounded-lg p-3 transition-all ${task.completed ? 'opacity-50' : 'hover:border-[#333]'}`}
          >
            <div className="flex items-center gap-3 flex-1">
              <button 
                onClick={() => onToggle(task.id)}
                className={`w-5 h-5 rounded border transition-colors flex items-center justify-center ${task.completed ? 'bg-blue-600 border-blue-600' : 'border-[#444] hover:border-blue-500'}`}
              >
                {task.completed && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M20 6 9 17l-5-5"/></svg>}
              </button>
              <div className="flex flex-col">
                <span className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>
                  {task.text}
                </span>
                {task.priority && (
                  <span className={`text-[10px] font-medium uppercase tracking-tighter ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                )}
              </div>
            </div>
            <button 
              onClick={() => onDelete(task.id)}
              className="p-1 text-gray-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
