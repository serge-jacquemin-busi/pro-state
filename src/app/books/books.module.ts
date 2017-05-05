import { BooksReducer } from './books-reducer';
import { BooksRepositoryService } from '../services/books-repository.service';
import { StateStoreService } from '../services/state-store.service';
import { RouterModule } from '@angular/router';
import { BooksRoutingModule } from './books-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';

@NgModule({
  imports: [
    CommonModule,
    BooksRoutingModule
  ],
  providers: [
    BooksRepositoryService
  ],
  declarations: [ListComponent]
})
export class BooksModule {
  constructor(store: StateStoreService) {
    store.addStateReducer(BooksReducer);
  }
}
