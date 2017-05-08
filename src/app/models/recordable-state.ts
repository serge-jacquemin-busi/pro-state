import { Action } from '../actions/action';

export class RecordableSate<T> {
    state: T;
    changeCause: Action;
    previousRecord: RecordableSate<T>;
}