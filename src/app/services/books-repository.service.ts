import { BooksAction } from '../models/actions/books-action';
import { Action } from '../models/action';
import { Observable } from 'rxjs/Rx';
import { Book } from '../models/book';
import { StateStoreService } from './state-store.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BooksRepositoryService {

  constructor(private store: StateStoreService) { }

  getAllBooks(): Observable<Book[]> {
    const books: Book[] = [
      {
        id: 1,
        name: 'Parry Hopper'
      }
    ];
    const action = { ...(new BooksAction()), books: books };
    this.store.dispatch(action);
    return this.store.getRecordObservable()
      .filter(record => record.changeCause === action)
      .map(record => record.state.books);
  }
}