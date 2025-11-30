import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Header } from './todo/components/header/header';
import { TodoAdd } from "./todo/components/todo-add/todo-add";
import { TodoFilter } from "./todo/components/todo-filter/todo-filter";
import { TodoList } from "./todo/components/todo-list/todo-list";
import { TodoStore } from './store/todo.store';

@Component({
  selector: 'app-root',
  imports: [FormsModule, Header, TodoAdd, TodoFilter, TodoList],
  providers: [TodoStore],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  //protected readonly title = signal('angular-project CI/CD');
  protected readonly title = signal('To-do Application');

}
