import { Action } from '../models/action';

export class RecordableSate<T> {
    state: T;
    changeCause: Action;
    previousRecord: RecordableSate<T>;
}