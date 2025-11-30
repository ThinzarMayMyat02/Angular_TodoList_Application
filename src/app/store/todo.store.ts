
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Todo } from "../model/todo.model";
import { Filter } from "../service/todo";
import { filter, identity } from 'rxjs';
import { effect } from '@angular/core';



const TODO_Key = 'todo_v1';

function loadFromStorage(): Todo[] {
  try {
    const rawdata = localStorage.getItem(TODO_Key);
    if(!rawdata) return [];
    const data = JSON.parse(rawdata) as Todo[];
    return data;
  } catch {
    return [];
  }
}
export interface TodoState {
  todos: Todo[];
  filter: Filter
}

export const intialState: TodoState = {
  todos: [],
  filter: 'all'
};

export const TodoStore = signalStore(withState(intialState),
  withComputed((store)=> ({
    filteredTodos: () => {
      const f = store.filter();
      const items = store.todos();
      if(f === 'active') return items.filter(item => !item.completed);
      if(f === 'completed') return items.filter(item => item.completed);
      return items;
    }
  })),
  withMethods((store) => ({
    addToDo: (title: string) => {
      const t = title.trim();
      if (t === '') return;
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title,
        completed: false,
        createdAt: new Date()
      };
      patchState(
        store, {
        todos: [...store.todos(), newTodo]
      });
    },
    status: () => {
      const items = store.todos();
      return {
        total: items.length,
        active: items.filter((item) => !item.completed === false).length,
        completed: items.filter((item) => item.completed === true).length
      }
    },
    removeTodo: (id: string) => {
      patchState(store, {
        todos: store.todos().filter(item => item.id !== id)
      });
    },
    renameTodo: (id: string, title: string) => {
      patchState(store, {
        todos: store.todos().map((todo)=>
          todo.id === id ? { ...todo, title } : todo)
      });
    },
    toggleTodo: (id:string)=> {
      patchState(store,
        {todos: store.todos().map((todo)=> todo.id === id ? { ...todo, completed: !todo.completed } : todo)}
      )
    },
    setFilter(filter: Filter){
      patchState(store, { filter });
    }
})),
  withHooks((store) => ({
    onInit: () => {
      effect(() => {
        const todo = store.todos();
        if(todo.length === 0) return;
        localStorage.setItem(TODO_Key, JSON.stringify(store.todos()));
      })
    }
  }))
);
