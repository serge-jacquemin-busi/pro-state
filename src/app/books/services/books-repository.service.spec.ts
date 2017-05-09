import { Http } from '@angular/http';
import { StateStoreService } from '../../services/state-store.service';
import { TestBed, inject } from '@angular/core/testing';

import { BooksRepositoryService } from './books-repository.service';

describe('BooksRepositoryService', () => {
  this.stateStoreService = jasmine.createSpyObj('StateStoreService', [
    'dispatch',
    'getRecordObservable'
  ]);
  this.http = jasmine.createSpyObj('http', [
    'get'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BooksRepositoryService,
        { provide: StateStoreService, useValue: this.stateStoreService },
        { provide: Http, useValue: this.http }
      ]
    });
  });

  it('should ...', inject([BooksRepositoryService], (service: BooksRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
