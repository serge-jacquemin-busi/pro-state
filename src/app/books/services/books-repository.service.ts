import { Http } from '@angular/http';
import { BooksAction } from '../actions/books-action';
import { Action } from '../../actions/action';
import { Observable } from 'rxjs/Rx';
import { Book } from '../models/book';
import { StateStoreService } from '../../services/state-store.service';
import { Injectable } from '@angular/core';

@Injectable()
export class BooksRepositoryService {

  constructor(private store: StateStoreService, private http: Http) { }

  getAllBooks(): Observable<Book[]> {
    this.store.dispatch({
      type: 'LOADING'
    });
    const action = { ...(new BooksAction()) };
    this.http.get(`http://localhost:46898/api/books`)
      .subscribe(resp => {
        action.books = resp.json().data;
        this.store.dispatch(action)
      });
    return this.store.getRecordObservable()
      .first(record => record.changeCause === action)
      .map(record => record.state.moduleBooks.books);
  }
}