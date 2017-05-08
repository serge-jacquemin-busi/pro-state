import { BooksAction } from '../actions/books-action';
import { Action } from '../../actions/action';
import { Observable } from 'rxjs/Rx';
import { Book } from '../models/book';
import { StateStoreService } from '../../services/state-store.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BooksRepositoryService {

  constructor(private store: StateStoreService) { }

  getAllBooks(): Observable<Book[]> {
    this.store.dispatch({
      type: 'LOADING'
    });
    const books: Book[] = [
      {
        id: 1,
        name: 'Parry Hopper'
      }
    ];
    const action = { ...(new BooksAction()), books: books };
    setTimeout(() => 
      this.store.dispatch(action),
      2000
    );
    return this.store.getRecordObservable()
      .filter(record => record.changeCause === action)
      .map(record => record.state.moduleBooks.books);
  }
}