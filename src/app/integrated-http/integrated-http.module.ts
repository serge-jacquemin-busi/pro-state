import { IntegratedHttp } from './integrated-http';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
  return new IntegratedHttp(xhrBackend, requestOptions);
}

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  providers: [
    { provide: Http, useFactory: httpFactory, deps: [XHRBackend, RequestOptions] }
  ],
  declarations: []
})
export class IntegratedHttpModule { }
