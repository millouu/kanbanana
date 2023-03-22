import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent, TaskDialogResult } from './components/task-dialog/task-dialog.component';
import { Task } from './components/task/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kanbanana';
  todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    }
  ]

  inProgress: Task[] = [];
  done: Task[] = [];

  drop(event: CdkDragDrop<Task[]>): void{
    if (event.previousContainer === event.container)
      return;
    if (!event.container.data || !event.previousContainer.data)
      return;
    
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    )
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void{}

  constructor(private dialog: MatDialog) { }
  
  newTask(): void{

    //to open a dialog box
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        this.todo.push(result.task);
    })
  }


}
