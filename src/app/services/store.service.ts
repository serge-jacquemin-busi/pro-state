import { ForgetAncestorAction } from '../models/actions/forget-ancestor-action';
import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { RecordableStateService } from './recordable-state.service';
import { RecordableSate } from '../models/recordable-state';
import { createStore, Store, Reducer } from 'redux';
import { Action } from '../models/action';
import * as  deepFrezze from 'deep-freeze';


@Injectable()
export class StoreService<T> {

  private store: Store<RecordableSate<T>>;
  private reducers: Reducer<T>[];
  private recordObservable: BehaviorSubject<RecordableSate<T>>;
  
  constructor(private recordableStateService: RecordableStateService) {
    this.reducers = [];
    this.recordObservable = new BehaviorSubject<RecordableSate<T>>(null);

    this.store = createStore((...args) => this.recordReduce.apply(this, args));
    this.store.subscribe(() => {
      this.recordObservable.next(this.getRecord());
    });

    // this.recordObservable.subscribe(console.log);
  }

  private recordReduce(initialRecord: RecordableSate<T>, action: Action): RecordableSate<T> {
    if (initialRecord == null) {
      initialRecord = new RecordableSate<T>();
    }

    if ((action.type === ForgetAncestorAction.TYPE)) {
      initialRecord = this.recordableStateService.forgetAncestor(initialRecord, (<ForgetAncestorAction>action).distance);
    }

    const finalState = this.reducers.reduce((state, reducer) => deepFrezze(reducer(state, action)), initialRecord.state);

    return this.recordableStateService.record(initialRecord, finalState, action);
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
    return this.recordObservable.asObservable();
  }
}
