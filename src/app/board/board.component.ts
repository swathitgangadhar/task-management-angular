import { Component } from '@angular/core';
import { TaskStateService, Task } from '../services/task-state.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {

  constructor(private taskService: TaskStateService) {}
  get columns$() {
    return this.taskService.columns$;
  }
  drop(event: CdkDragDrop<Task[]>) {
    const task = event.previousContainer.data[event.previousIndex];
    const fromCol = event.previousContainer.id;
    const toCol = event.container.id;

    this.taskService.moveTask(fromCol, toCol, task, event.currentIndex);
  }

  addTask(columnId: string) {
    const title = prompt('Enter task title');
    if (title) {
      this.taskService.addTask(columnId, { id: uuidv4(), title });
    }
  }

  deleteTask(columnId: string, taskId: string) {
    this.taskService.deleteTask(columnId, taskId);
  }
}
