import { State } from './models/state';
import { StoreService, TypeLessStoreService } from './services/store.service';
import { IntegratedHttpModule } from './integrated-http/integrated-http.module';
import { BooksModule } from './books/books.module';
import { AppRoutingModule } from './app-routing.module';
import { RecordableStateService } from './services/recordable-state.service';
import { StateStoreService } from './services/state-store.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { fromStore } from './decorators/from-store-decorator';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IntegratedHttpModule,
    BooksModule,
    AppRoutingModule
  ],
  providers: [
    StateStoreService,
    RecordableStateService,
    { provide: TypeLessStoreService, useClass: StateStoreService, multi: false }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
