import { BooksModule } from './books/books.module';
import { AppRoutingModule } from './app-routing.module';
import { RecordableStateService } from './services/recordable-state.service';
import { StateStoreService } from './services/state-store.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BooksModule,
    AppRoutingModule
  ],
  providers: [
    StateStoreService,
    RecordableStateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
