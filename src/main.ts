import { BehaviorSubject, Observable } from 'rxjs/Rx';
import { ngModuleJitUrl } from '@angular/compiler/compiler';
import { enableProdMode, Injector } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { observeInjection } from './app/utils/injector-observable';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'rxjs/add/observable/fromPromise';

if (environment.production) {
  enableProdMode();
}

console.log('main');

platformBrowserDynamic().bootstrapModule(AppModule).then(observeInjection);