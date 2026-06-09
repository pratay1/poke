export type WidgetType = 'notes' | 'tasks' | 'links';

export interface Note {
  id: string;
  content: string;
  createdAt: string;
  tags?: string[];
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  priority?: 'high' | 'medium' | 'low';
}

export interface Link {
  id: string;
  title: string;
  url: string;
  category?: string;
}

export interface DashboardState {
  notes: Note[];
  tasks: Task[];
  links: Link[];
  lastSaved: string;
}
