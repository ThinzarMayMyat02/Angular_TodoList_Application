import { Component, inject } from '@angular/core';
import { TodoStatus } from "../todo-status/todo-status";
import { TodoStore } from '../../../store/todo.store';

@Component({
  selector: 'app-todo-list',
  imports: [TodoStatus],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css'
})
export class TodoList {
  private readonly todoStore = inject(TodoStore);
  protected readonly todos = this.todoStore.filteredTodos;
  protected readonly status = this.todoStore.status;

  removeTodo(id:string){
    this.todoStore.removeTodo(id);
  }
  renameTodo(id:string,title:string){
    this.todoStore.renameTodo(id,title);
  }

  toggleTodo(id:string){
    this.todoStore.toggleTodo(id);
  }
}
