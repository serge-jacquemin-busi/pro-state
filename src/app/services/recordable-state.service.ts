import { Action } from 'redux';
import { RecordableSate } from '../models/recordable-state';
import { Injectable } from '@angular/core';

@Injectable()
export class RecordableStateService {

  constructor() { }

 record<T>(entry: T, changeCause: Action, previousRecord: RecordableSate<T>): RecordableSate<T> {
    return Object.freeze(<RecordableSate<T>>
    {
      state: entry,
      changeCause: changeCause,
      previousRecord: previousRecord
    });
  }

  getAncestor<T>(record: RecordableSate<T>, distance: number): RecordableSate<T> {
    if (distance < 0 || record == null) {
      return null;
    }

    if (distance === 0) {
      return record;
    }

    return this.getAncestor(record.previousRecord, distance - 1);
  }

  forgetAncestor<T>(record: RecordableSate<T>, distance: number): RecordableSate<T> {
    if (distance < 1 || record == null) {
      return null;
    }

    return Object.freeze({
      ...record,
      previousRecord: this.forgetAncestor(record.previousRecord, distance - 1)}
    );
  }
}
