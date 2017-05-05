import { RecordableSate } from '../models/recordable-state';
import { State } from '../models/state';
import { RecordableStateService } from './recordable-state.service';
import { TestBed, inject } from '@angular/core/testing';


describe('StateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecordableStateService]
    });
  });

  it('should record and retrive states', inject([RecordableStateService], (service: RecordableStateService) => {
    // Arrange
    const repetitions = new Array(10).fill(0);
    const states = repetitions.map(() => Math.random());

    // Act
    const record = states
      .reduce((previousRecord, state) => service.record(previousRecord, state), new RecordableSate<number>());

    // Assert
    const recordStates = repetitions.map((_, index) => service.getAncestor(record, index).state);
    expect(recordStates.length).toEqual(states.length);
    expect(recordStates).toEqual(states.reverse());
  }));

  it('should forget ancestors', inject([RecordableStateService], (service: RecordableStateService) => {
    // Arrange
    const ancestorDistance = 5;
    const repetitions = new Array(10).fill(0);
    const states = repetitions.map(() => Math.random());
    let record = states
      .reduce((previousRecord, state) => service.record(previousRecord, state), new RecordableSate<number>());

    // Act
    record = service.forgetAncestor(record, ancestorDistance);

    // Assert
    const recordStates = repetitions
      .map((_, index) => service.getAncestor(record, index))
      .filter(r => r != null)
      .map(r => r.state);
    expect(recordStates.length).toEqual(ancestorDistance);
    expect(recordStates).toEqual(states.splice(ancestorDistance).reverse());
  }));
});
