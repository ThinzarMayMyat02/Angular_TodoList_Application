import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TodoService } from './service/todo';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  //protected readonly title = signal('angular-project CI/CD');
  protected readonly title = signal('To-do Application');
  protected readonly todoService = inject(TodoService);

  todos = this.todoService.filteredTodos;
  status = this.todoService.status;
  filter = this.todoService.fileter;

  newTitle = '';

  addTodo(title:string){
    this.todoService.addTodo(title);
  }

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
