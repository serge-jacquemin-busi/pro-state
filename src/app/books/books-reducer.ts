import { BooksAction } from '../models/actions/books-action';
import { State } from '../models/state';
import { Action } from '../models/action';

export function BooksReducer(state: State, action: Action): State {
    if (state == null) {
        state = new State();
    }

    switch(action.type) {
        case BooksAction.TYPE:
            state = {...state, books: (action as BooksAction).books};
            break;
    }

    return state;
}