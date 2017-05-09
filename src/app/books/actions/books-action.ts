import { Book } from '../models/book';
import { Action } from '../../actions/action';

export class BooksAction implements Action {
    static TYPE = 'BOOKSACTION';

    type = BooksAction.TYPE;
    books: Book[];
};