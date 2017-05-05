import { Action } from 'redux';

export class RecordableSate<T> {
    state: T;
    changeCause: Action;
    previousRecord: RecordableSate<T>;
}