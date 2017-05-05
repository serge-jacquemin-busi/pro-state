export class RecordableSate<T> {
    state: T;
    previousRecord: RecordableSate<T>;
}