import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { ngModuleJitUrl } from '@angular/compiler/compiler';
import { enableProdMode, Injector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'rxjs/add/observable/fromPromise';

if (environment.production) {
  enableProdMode();
}



const injectorSubject = new BehaviorSubject<Injector>(null);
export let injectorObservable = injectorSubject.filter(v => v != null);

console.log('main');


platformBrowserDynamic().bootstrapModule(AppModule).then(ngModule => 
  injectorSubject.next(ngModule.injector)
);

injectorSubject.subscribe(x => console.log('??'));