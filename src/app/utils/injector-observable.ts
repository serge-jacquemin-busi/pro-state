import { Injector, NgModuleRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

console.log('injector-observable');

const injectorSubject = new BehaviorSubject<Injector>(null);

export function observeInjection<T>(module: NgModuleRef<T>): NgModuleRef<T> {
    injectorSubject.next(module.injector);

    return module;
}
export let injectorObservable = injectorSubject.filter(v => v != null);
