import { Component, OnInit } from '@angular/core';
import { AppState } from '../app.reducer';
import { Store } from '@ngrx/store';
import { ToggleAllTodoActions } from './todo.actions';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: []
})
export class TodoComponent implements OnInit {

  completado = false;

  constructor( private store: Store<AppState>) { }

  ngOnInit() {
  }

  toggleAll(){
    const accion = new ToggleAllTodoActions(this.completado);
    this.store.dispatch( accion );
    this.completado = !this.completado;
  }

}
