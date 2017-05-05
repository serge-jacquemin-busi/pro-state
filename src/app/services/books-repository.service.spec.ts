import { RecordableStateService } from './recordable-state.service';
import { StateStoreService } from './state-store.service';
import { TestBed, inject } from '@angular/core/testing';

import { BooksRepositoryService } from './books-repository.service';

describe('BooksRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksRepositoryService, StateStoreService, RecordableStateService]
    });
  });

  it('should ...', inject([BooksRepositoryService], (service: BooksRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
