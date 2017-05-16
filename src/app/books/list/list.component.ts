import { StateStoreService } from '../../services/state-store.service';
import { State } from '../../models/state';
import { fromStore } from '../../decorators/from-store-decorator';
import { Book } from '../models/book';
import { Observable } from 'rxjs/Rx';
import { BooksRepositoryService } from '../services/books-repository.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  @fromStore((state: State) => { alert('1'); return state.moduleBooks.books; }) readonly nBooks: Observable<Book[]>;
  books: Observable<Book[]>;

  constructor(
    public store: StateStoreService,
    private  booksRepositoryService: BooksRepositoryService
  ) {}

  ngOnInit() {
    this.books = this.booksRepositoryService.getAllBooks();
    this.nBooks.subscribe(x => console.log(x));
  }
}
