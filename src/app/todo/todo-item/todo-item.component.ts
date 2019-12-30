import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../model/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as fromTodo from '../todo.actions';
import { BorrarTodoActions } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInputFisico', {static: true}) txtInputFisico: ElementRef;

  checkField: FormControl;
  txtInput: FormControl;
  editando: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log(this.todo);
    this.checkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    console.log(this.todo);
    this.checkField.valueChanges
        .subscribe( () => {
          const accion = new fromTodo.ToggleTodoActions(this.todo.id);
          this.store.dispatch( accion );
        }

        );
  }

  editar() {
    this.editando = true;

    setTimeout( () => {
    this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {

    this.editando = false;
    if (this.txtInput.value === this.todo.texto) {
        return;
    }

    if (!this.txtInput.invalid) {

    const accion = new fromTodo.EditarTodoActions(this.todo.id, this.txtInput.value);
    this.store.dispatch( accion );

    }


  }

  borrarTodo() {
    const accion = new BorrarTodoActions(this.todo.id);
    this.store.dispatch( accion );
  }

}
