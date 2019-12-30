import { Component, OnInit } from '@angular/core';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styles: []
})
export class TodoListComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  todos: Todo[] = [];
  filter: string;

  ngOnInit() {
    this.store.subscribe(state => {

      this.todos = state.todos;
      this.filter = state.filtro;

    }
    );

  }

}
