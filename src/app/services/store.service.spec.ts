import { RecordableStateService } from './recordable-state.service';
import { State } from '../models/state';
import { TestBed, inject } from '@angular/core/testing';
import { Action } from '../models/action';

import { StoreService } from './store.service';

describe('StoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      // Not a true unit test yes since it uses RecordableStateService directly
      providers: [StoreService, RecordableStateService]
    });
  });

  it('should return current sate', inject([StoreService], (service: StoreService<number>) => {
    // Arrangeks
    const state = Math.random();
    service.addStateReducer(() => {
      return state;
    });

    // Act
    service.dispatch({ type: null });
    const result = service.getState();

    // Assert
    expect(result).toBe(state);
  }));

  it('should return correct sates according to action', inject([StoreService], (service: StoreService<number>) => {
    // Arrange
    const repetitions = [...new Array(10)];
    const stateEntries = repetitions.map(() => ({
      state: Math.random(),
      type: (Math.random() * 0xFFFFFFFF).toString(16)
    }));
    stateEntries.forEach(stateEntry => {
      service.addStateReducer((state: number, action: Action) => {
        if (action.type === stateEntry.type)
        {
          return stateEntry.state;
        }

        return state;
      })
    });

    // Act
    const results = stateEntries.map(stateEntry => {
      service.dispatch({ type: stateEntry.type });
      return service.getState();
    });

    // Assert
    expect(results).toEqual(stateEntries.map(stateEntry => stateEntry.state));
  }));

it('should return reduce sates through reducers', inject([StoreService], (service: StoreService<number>) => {
    // Arrange
    const initialState = Math.trunc(1000 * Math.random());
    const repetitions = new Array(10).fill(0);
    repetitions.forEach(() => {
      service.addStateReducer((state: number, action: Action) => {
        if (state == null)
        {
          state = initialState;
        }

        return state +  1;
      })
    });
    const expected = initialState + repetitions.length;

    // Act
    service.dispatch({ type: null });
    const results = service.getState();

    // Assert
    expect(results).toEqual(expected);
  }));

it('should always manage frozen state', inject([StoreService], (service: StoreService<Object>) => {
    // Arrange
    const states = new Array<Object>();
    const repetitions = new Array(10).fill(0);
    repetitions.forEach(() => {
      service.addStateReducer((state: Object, action: Action) => {
        if (state != null)
        {
          states.push(state);
        }

        return new Object();
      })
    });

    // Act
    service.dispatch({ type: null });
    states.push(service.getState());

    // Assert
    expect(states.length).toBe(repetitions.length);
    expect(states.map(state => Object.isFrozen(state))).not.toContain(false);
  }));
});