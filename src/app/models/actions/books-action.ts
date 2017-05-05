import { Book } from '../book';
import { Action } from '../action';

export class BooksAction implements Action {
    static TYPE = 'RECEIVE_BOOKS';

    type = BooksAction.TYPE;
    books: Book[];
};