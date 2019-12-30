import * as fromFilter from './filter.actions';

const estadoInicial: fromFilter.filtrosValidos = 'todos';

export function filterReducer(state = estadoInicial, action: fromFilter.acciones): fromFilter.filtrosValidos {
    switch (action.type) {
        case fromFilter.SET_FILTER:
            return action.filtro;
        default:
            return state;
    }
}
