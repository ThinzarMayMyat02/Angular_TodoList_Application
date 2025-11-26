import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from '../../../service/todo';

@Component({
  selector: 'app-todo-add',
  imports: [FormsModule],
  templateUrl: './todo-add.html',
  styleUrl: './todo-add.css'
})
export class TodoAdd {

  private readonly todoService = inject(TodoService);
  newTitle: string = '';
  addTodo(title:string){
    this.todoService.addTodo(title);
  }
}
