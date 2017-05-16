import { RecordableSate } from '../models/recordable-state';
import { Observable } from 'rxjs/Rx';
import { TypeLessStoreService } from '../services/store.service';
import { StateStoreService } from '../services/state-store.service';
import { injectorObservable } from '../utils/injector-observable';

import 'rxjs/add/operator/switchMap';

type GetFromStore<T> = (T) => any;

export function fromStore<T>(
    fnState: GetFromStore<T>
) {
    const result = injectorObservable
        .switchMap(injector => {
            const service = injector.get(TypeLessStoreService, null) as TypeLessStoreService;
            if (service == null) {
                return Observable.empty<RecordableSate<T>>();
            }
            return service.getRecordObservableForType<T>()
                .filter(record => record != null && record.state != null);
        })
        .map(record => fnState(record.state))
        .catch(err =>  { console.log('error:', err); return Observable.from([]); })
        .distinctUntilChanged();

    return (target: any, key: string) => {
        Object.defineProperty(target, key, {
            get: () => result
        });
    }
}