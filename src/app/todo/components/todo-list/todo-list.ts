import { Component, inject } from '@angular/core';
import { TodoService } from '../../../service/todo';
import { TodoStatus } from "../todo-status/todo-status";

@Component({
  selector: 'app-todo-list',
  imports: [TodoStatus],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  private readonly todoService = inject(TodoService);
  protected readonly todos = this.todoService.filteredTodos;
  protected readonly status = this.todoService.status;

  removeTodo(id:string){
    this.todoService.removeTodo(id);
  }
  renameTodo(id:string,title:string){
    this.todoService.renameTodo(id,title);
  }

  toggleTodo(id:string){
    this.todoService.toggleButton(id);
  }
}
