import { RecordableSate } from '../models/recordable-state';
import { Observable } from 'rxjs/Rx';
import { TypeLessStoreService } from '../services/store.service';
import { StateStoreService } from '../services/state-store.service';
import { injectorObservable } from '../../main'

import 'rxjs/add/operator/switchMap';

type GetFromStore<T> = (T) => any;

export function fromStore<T>(
    fnState: GetFromStore<T>
) {
console.log('from store');

    let accessObservable = function<T>(): Observable<RecordableSate<T>> {
console.log('access');

        const resultb = injectorObservable.subscribe(injector => {
            let service = injector.get(TypeLessStoreService) as TypeLessStoreService;
            console.log('injector');
            // return service.getRecordObservableForType<T>().filter(record => record != null && record.state != null);
        });//.switch();

            let result = Observable.empty<RecordableSate<T>>();
        

        return (accessObservable = () => result)();
    }

    return (target: any, key: string) => {
        try {
            Object.defineProperty(target, key, {
                get: () => accessObservable().map(record => fnState(record.state)) // fnState(storeSource.store.getState())
            });
        }
        catch (e) { };
    }
}