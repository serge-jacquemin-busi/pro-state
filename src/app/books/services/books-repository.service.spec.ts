import { StateStoreService } from '../../services/state-store.service';
import { TestBed, inject } from '@angular/core/testing';

import { BooksRepositoryService } from './books-repository.service';

describe('BooksRepositoryService', () => {
  this.stateStoreService = jasmine.createSpyObj('StateStoreService', [
    'dispatch',
    'getRecordObservable'
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksRepositoryService, { provide: StateStoreService, useValue: this.stateStoreService }]
    });
  });

  it('should ...', inject([BooksRepositoryService], (service: BooksRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
