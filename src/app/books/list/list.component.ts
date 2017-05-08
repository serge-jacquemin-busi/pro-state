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
  books: Observable<Book[]>;

  constructor(private booksRepositoryService: BooksRepositoryService) {}

  ngOnInit() {
    this.books = this.booksRepositoryService.getAllBooks()
  }
}
