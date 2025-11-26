import { Component, inject } from '@angular/core';
import { TodoService } from '../../../service/todo';

@Component({
  selector: 'app-todo-status',
  imports: [],
  templateUrl: './todo-status.html',
  styleUrl: './todo-status.css'
})
export class TodoStatus {
  private readonly todoService = inject(TodoService);
  protected readonly status = this.todoService.status;
}
