import { Component, inject } from '@angular/core';
import { TodoStore } from '../../../store/todo.store';

@Component({
  selector: 'app-todo-status',
  imports: [],
  templateUrl: './todo-status.html',
  styleUrl: './todo-status.css'
})
export class TodoStatus {
  //private readonly todoService = inject(TodoService);
  private readonly todoStore = inject(TodoStore);
  protected readonly status = this.todoStore.status;
}
