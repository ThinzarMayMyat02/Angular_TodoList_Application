import { Component, inject } from '@angular/core';
import { TodoStore } from '../../../store/todo.store';
import { Filter } from '../../../service/todo';

@Component({
  selector: 'app-todo-filter',
  imports: [],
  templateUrl: './todo-filter.html',
  styleUrl: './todo-filter.css'
})
export class TodoFilter {
  private readonly todoStore = inject(TodoStore);
  protected readonly filter = this.todoStore.filter;

  setFilter(filter: Filter){
    this.todoStore.setFilter(filter);
  }
}
