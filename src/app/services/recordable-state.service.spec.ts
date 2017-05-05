import { RecordableStateService } from './recordable-state.service';
import { TestBed, inject } from '@angular/core/testing';


describe('StateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordableStateService]
    });
  });

  it('should add history', inject([RecordableStateService], (service: RecordableStateService) => {
    

    expect(service).toBeTruthy();
  }));
});
