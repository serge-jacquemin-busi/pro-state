import { RecordableSate } from '../models/recordable-state';
import { RecordableStateService } from './recordable-state.service';
import { State } from '../models/state';
import { TestBed, inject } from '@angular/core/testing';
import { Action } from '../actions/action';

import { StoreService } from './store.service';

describe('StoreService', () => {
  beforeEach(() => {
    this.recordableStateService = jasmine.createSpyObj('RecordableStateService', [
      'record',
      'forgetAncestor'
    ]) as RecordableStateService;

    TestBed.configureTestingModule({
      // Not a true unit test yes since it uses RecordableStateService directly
      providers: [StoreService, { provide: RecordableStateService, useValue: this.recordableStateService }]
    });
  });

  describe('getState', () => {
    it('should return lattest recorded state', inject([StoreService], (service: StoreService<number>) => {
      // Arrangeks
      const state = Math.random();
      this.recordableStateService.record.and.returnValue({
        state: state
      });
      service.dispatch({ type: null });

      // Act
      const result = service.getState();

      // Assert
      expect(result).toBe(state);
    }));
  });

  describe('getRecord', () => {
    it('should return lattest recorded record', inject([StoreService], (service: StoreService<number>) => {
      // Arrange
      const record = new RecordableSate<number>();
      this.recordableStateService.record.and.returnValue(record);
      service.dispatch({ type: null });

      // Act
      const result = service.getRecord();

      // Assert
      expect(result).toBe(record);
    }));
  });

  describe('dispatch', () => {
    it('should reduce states through reducers in order', inject([StoreService], (service: StoreService<number>) => {
      // Arrange
      const repetitions = new Array(10).fill(0);
      const states = repetitions.map(() => new Object());
      const reducers = states.map(newState => 
        jasmine.createSpy('reducer').and.returnValue(newState)
      );
      reducers.forEach(reducer => service.addStateReducer(reducer));

      // Act
      service.dispatch({ type: null });

      // Assert
      expect(reducers.map(reducer => reducer.calls.count())).toEqual(repetitions.map(() => 1));
      expect(reducers.map(reducer => reducer.calls.argsFor(0)[0])).toEqual([undefined, ...(states.slice(0, -1))]);
    }));

    it('should record the lattest state after reduce', inject([StoreService], (service: StoreService<number>) => {
      // Arrange
      const repetitions = new Array(10).fill(0);
      const states = repetitions.map(() => new Object());
      const reducers = states.map(newState => 
        jasmine.createSpy('reducer').and.returnValue(newState)
      );
      reducers.forEach(reducer => service.addStateReducer(reducer));

      // Act
      service.dispatch({ type: null });

      // Assert
      expect(this.recordableStateService.record.calls.argsFor(1)[1]).toBe(states[states.length - 1]);
    }));

    it('should always manage frozen state', inject([StoreService], (service: StoreService<Object>) => {
      // Arrange
      const repetitions = new Array(10).fill(0);
      const reducers = repetitions.map(() =>
        jasmine.createSpy('reducer').and.returnValue(new Object())
      );

      // Act
      service.dispatch({ type: null });

      // Assert
      expect(reducers.map(reducer => Object.isFrozen(reducer.calls.argsFor(0)[0]))).not.toContain(false);
    }));

    it('should pass previous record to record', inject([StoreService], (service: StoreService<number>) => {
      // Arrangeks
      const previousRecord = new RecordableSate<number>();
      this.recordableStateService.record.and.returnValue(previousRecord);
      service.dispatch({ type: null });

      // Act
      service.dispatch({ type: null });

      // Assert
      expect(this.recordableStateService.record.calls.argsFor(2)[0]).toBe(previousRecord);
    }));
  });

  describe('forgetAncestor', () => {
    it('should pass distance to forgetAncestor', inject([StoreService], (service: StoreService<Object>) => {
      // Arrange
      const distance = Math.trunc(Math.random() * 1000);
      const amnesicRecord = new RecordableSate<Object>();
      this.recordableStateService.forgetAncestor.and.returnValue(amnesicRecord);      

      // Act
      service.forgetAncestor(distance);

      // Assert
      expect(this.recordableStateService.forgetAncestor.calls.count()).toBe(1);
      expect(this.recordableStateService.forgetAncestor.calls.argsFor(0)[1]).toBe(distance);
    }));

    it('should pass amnesic previous record to record', inject([StoreService], (service: StoreService<Object>) => {
      // Arrange
      const distance = Math.trunc(Math.random() * 1000);
      const amnesicRecord = new RecordableSate<Object>();
      this.recordableStateService.forgetAncestor.and.returnValue(amnesicRecord);

      // Act
      service.forgetAncestor(distance);

      // Assert
      expect(this.recordableStateService.record.calls.argsFor(1)[0]).toBe(amnesicRecord);
    }));
  });

  describe('import', () => {
    it('should properly set lattest record', inject([StoreService], (service: StoreService<Object>) => {
      // Arrange
      const record = new RecordableSate<Object>();

      // Act
      service.import(record);

      // Assert
      expect(service.getRecord()).toBe(record);
    }));
  });
});