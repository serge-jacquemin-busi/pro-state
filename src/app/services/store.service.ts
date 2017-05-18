import { RecordImportAction } from '../actions/record-import-action';
import { ForgetAncestorAction } from '../actions/forget-ancestor-action';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { RecordableStateService } from './recordable-state.service';
import { RecordableSate } from '../models/recordable-state';
import { createStore, Store, Reducer } from 'redux';
import { Action } from '../actions/action';
import * as  deepFrezze from 'deep-freeze';

export abstract class TypeLessStoreService {
  abstract getRecordObservableForType<U>(): Observable<RecordableSate<U>>;
};

@Injectable()
export class StoreService<T> extends TypeLessStoreService {
  private store: Store<RecordableSate<T>>;
  private reducers: Reducer<T>[];
  private recordSubject: BehaviorSubject<RecordableSate<T>>;
  private recordObservable: Observable<RecordableSate<T>>;

  constructor(private recordableStateService: RecordableStateService) {
    super();

    this.reducers = [];
    this.recordSubject = new BehaviorSubject<RecordableSate<T>>(null);
    this.recordObservable = this.recordSubject.asObservable();

    this.store = createStore((...args) => this.recordReduce.apply(this, args));
    this.store.subscribe(() => {
      this.recordSubject.next(this.getRecord());
    });
    this.recordSubject.next(this.getRecord());
  }

  private recordReduce(initialRecord: RecordableSate<T>, action: Action): RecordableSate<T> {
    if (action.type === RecordImportAction.TYPE) {
      return deepFrezze((action as RecordImportAction<T>).record);
    }

    if (initialRecord == null) {
      initialRecord = new RecordableSate<T>();
    }

    if ((action.type === ForgetAncestorAction.TYPE)) {
      initialRecord = this.recordableStateService.forgetAncestor(initialRecord, (<ForgetAncestorAction>action).distance);
    }

    const errors = [];
    const finalState = this.reducers.reduce((state, reducer) => {
      try {
        return deepFrezze(reducer(state, action));
      }
      catch (e) {
        errors.push(deepFrezze(e));
        return state;
      }
    }, initialRecord.state);

    return this.recordableStateService.record(initialRecord, finalState, action, Object.freeze(errors));
  }

  addStateReducer(reducer: Reducer<T>) {
    this.reducers = this.reducers.concat([reducer]);
  }

  getRecord() {
    return this.store.getState();
  }

  getState() {
    return this.getRecord().state;
  }

  dispatch<T extends Action>(action: T): Action {
    return this.store.dispatch(action);
  }

  forgetAncestor(distance: number): Action {
    return this.dispatch({ ...(new ForgetAncestorAction()), distance: distance });
  }

  getRecordObservable(): Observable<RecordableSate<T>> {
    return this.recordObservable;
  }

  import(record: RecordableSate<T>): Action {
    const action = { ...(new RecordImportAction()), record: record };
    return this.dispatch(action);
  }

  getRecordObservableForType<U>(): Observable<RecordableSate<U>> {
    try {
      return  (this.getRecordObservable() as any) as Observable<RecordableSate<U>>;
    }
    catch (e) {
      return Observable.empty<RecordableSate<U>>();
    }
  }  
}
