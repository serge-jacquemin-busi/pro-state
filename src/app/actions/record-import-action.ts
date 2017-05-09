import { RecordableSate } from '../models/recordable-state';
import { Action } from './action';

export class RecordImportAction<T> implements Action {
    static TYPE = 'RECORDIMPORTACTION';

    type = RecordImportAction.TYPE;
    record: RecordableSate<T>;
}