import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Task {
  id: string;
  title: string;
}
export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

@Injectable({ providedIn: 'root' })
export class TaskStateService {
  private columnsSubject = new BehaviorSubject<Column[]>([
    { id: 'todo', title: 'To Do', tasks: [] },
    { id: 'inprogress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] }
  ]);

  columns$ = this.columnsSubject.asObservable();

  addTask(columnId: string, task: Task) {
    const columns = this.columnsSubject.value.map(col =>
      col.id === columnId
        ? { ...col, tasks: [...col.tasks, task] }
        : col
    );
    this.columnsSubject.next(columns);
  }

  deleteTask(columnId: string, taskId: string) {
    const columns = this.columnsSubject.value.map(col =>
      col.id === columnId
        ? { ...col, tasks: col.tasks.filter(t => t.id !== taskId) }
        : col
    );
    this.columnsSubject.next(columns);
  }

  moveTask(fromCol: string, toCol: string, task: Task, index: number) {
    const cols = this.columnsSubject.value;
    const source = cols.find(c => c.id === fromCol)!;
    const dest = cols.find(c => c.id === toCol)!;

    const updatedSource = { ...source, tasks: source.tasks.filter(t => t.id !== task.id) };
    const updatedDest = { ...dest };
    updatedDest.tasks.splice(index, 0, task);

    const newState = cols.map(c => {
      if (c.id === fromCol) return updatedSource;
      if (c.id === toCol) return updatedDest;
      return c;
    });

    this.columnsSubject.next(newState);
  }
}
