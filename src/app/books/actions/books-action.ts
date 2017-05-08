import { Book } from '../models/book';
import { Action } from '../../actions/action';

export class BooksAction implements Action {
    static TYPE = 'RECEIVE_BOOKS';

    type = BooksAction.TYPE;
    books: Book[];
};