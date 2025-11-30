import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoStore } from '../../../store/todo.store';

@Component({
  selector: 'app-todo-add',
  imports: [FormsModule],
  templateUrl: './todo-add.html',
  styleUrl: './todo-add.css'
})
export class TodoAdd {

  private readonly todoStore = inject(TodoStore);
  newTitle: string = '';
  addTodo(title:string){
    this.todoStore.addToDo(title);
  }
}
