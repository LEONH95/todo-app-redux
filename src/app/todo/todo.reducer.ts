import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';
import { filter } from 'rxjs/operators';


const todo1 = new Todo('Comprar un perro');
const todo2 = new Todo('Ir de compras');
const todo3 = new Todo('Ir de peda');
todo2.completado = true;


const estadoInicial: Todo[] = [todo1, todo2, todo3];

export function todoReducer(
    state = estadoInicial,
    action: fromTodo.Acciones): Todo[] {

    switch (action.type) {

        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            return [...state, todo]; // ecma script 6

        case fromTodo.TOGGLE_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit, // Ecma script clona los datosOperador spread
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });

        case fromTodo.TOGGLE_ALL_TODO:
            return state.map( todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                };
            });

        case fromTodo.EDITAR_TODO:
            return state.map(todoEdit => {
                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit, // Ecma script clona los datosOperador spread
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
            });
        case fromTodo.BORRAR_TODO:
            return state.filter( todoEdit => todoEdit.id !== action.id );

        case fromTodo.BORRAR_ALL_TODO:
            return  state.filter( todoEdit => !todoEdit.completado);


        default:
            return state;
    }

}
