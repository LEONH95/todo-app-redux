import { Component, OnInit } from '@angular/core';
import * as fromFilter from '../../filter/filter.actions';
import { AppState } from '../../app.reducer';
import { Store } from '@ngrx/store';
import { Todo } from '../model/todo.model';
import { BorrarAllTodoActions } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFilter.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: fromFilter.filtrosValidos;
  pendientes: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.contarPendientes(state.todos);
    });

  }

  cambiarFiltro(nuevoFiltro: fromFilter.filtrosValidos) {

    const accion = new fromFilter.SetFilterAction(nuevoFiltro);
    this.store.dispatch( accion );

  }

  contarPendientes( todos: Todo[] ) {

    this.pendientes = todos.filter(todo => !todo.completado ).length;

  }

  eliminarCompletados(){
    const accion = new BorrarAllTodoActions();
    this.store.dispatch( accion );
  }

}
