import { ModuleBooks } from './models/module-books';
import { Book } from './models/book';
import { BooksAction } from './actions/books-action';
import { State } from '../models/state';
import { Action } from '../actions/action';

export function BooksReducer(state: State, action: Action): State {
    if (state == null) {
        state = new State();
    }

    switch(action.type) {
        case BooksAction.TYPE:
            state = {...state, moduleBooks:
                { ...(state.moduleBooks), books: ((action as BooksAction).books) }
            };
            break;
    }

    return state;
}