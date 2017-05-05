import { TestBed, inject } from '@angular/core/testing';

import { BooksRepositoryService } from './books-repository.service';

describe('BooksRepositoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BooksRepositoryService]
    });
  });

  it('should ...', inject([BooksRepositoryService], (service: BooksRepositoryService) => {
    expect(service).toBeTruthy();
  }));
});
