import { createStore, Store, Reducer, Action } from 'redux';
import deepFrezze = require('deep-freeze');

export class StoreService<T> {
  private store: Store<T>;
  private reducers: Reducer<T>[];

  constructor() {
    this.reducers = [];
    const aggregateReducer: Reducer<T> = (initialState: T, action: Action) => {
      console.log(this.reducers);

      return this.reducers.reduce((state, reducer) => deepFrezze(reducer(state, action)), initialState);
    }

    this.store = createStore(aggregateReducer);
  }

  addReducer(reducer: Reducer<T>) {
    // this.reducers = [ ...this.reducers, reducer ];
    this.reducers = this.reducers.concat([reducer]);
  }

  getState() {
    return this.store.getState();
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
