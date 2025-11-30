import {computed, effect, Injectable, signal} from '@angular/core';
import {Todo} from '../model/todo.model';

export type Filter = 'all' | 'active' | 'completed'

const TODO_Key = 'todos'
export interface States{
  total : number,
  active: number,
  completed: number
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private readonly todos = signal<Todo[]>(this.load());
  readonly filter = signal<Filter>('all');
  readonly filteredTodos = computed(()=> {
    const f = this.filter();
    const items = this.todos();
    if(f === 'active') return items.filter(item => !item.completed);
    if(f === 'completed') return items.filter(item => item.completed);
    return items;
  });

  readonly status = computed(() => {
    const items = this.todos();
    return {
      total : items.length,
      active : items.filter( item => !item.completed).length,
      completed: items.filter(item => item.completed).length,
    };
  });

  constructor(){
    effect(()=> {
      localStorage.setItem(TODO_Key,JSON.stringify(this.todos()));
    });
  }

  addTodo(title: string){
    const t = title.trim();
    if(t==='') return;
    this.todos.update((item) => [
      ...item,
      {id: crypto.randomUUID(), title, completed: false, createdAt: new Date()}
    ]);
  console.log(this.todos());
  }

  removeTodo(id:string){
    this.todos.update((item) => item.filter((item) => item.id !== id));
  }

  renameTodo(id: string, title: string) {
  this.todos.update((items) =>
    items.map((item) =>
      item.id === id ? { ...item, title } : item
    )
  );
}

  toggleButton(id:string){
    this.todos.update((item)=>
      item.map((item) => (item.id === id ? {...item, completed: !item.completed} : item)))
  }

  private load(): Todo[]{
    console.log('In load function..');

    try{
      const raw = localStorage.getItem(TODO_Key);
      return raw ? (JSON.parse(raw) as Todo[]) : [];
    }catch {
      return [];
    }
  }

  // private save(todos: Todo[]) {
  //   localStorage.setItem(TODO_Key, JSON.stringify(todos));
  // }

//   addTodo(title: string){
//   this.todos.update((items) => {
//     const updated = [
//       ...items,
//       { id: crypto.randomUUID(), title, completed: false, createdAt: new Date() }
//     ];
//     this.save(updated);
//     return updated;
//   });
// }

//   removeTodo(id: string) {
//   this.todos.update((items) => {
//     const updated = items.filter(item => item.id !== id);
//     this.save(updated);
//     return updated;
//   });
// }

//   toggleButton(id: string) {
//   this.todos.update((items) => {
//     const updated = items.map(item =>
//       item.id === id ? { ...item, completed: !item.completed } : item
//     );
//     this.save(updated);
//     return updated;
//   });
// }
}
