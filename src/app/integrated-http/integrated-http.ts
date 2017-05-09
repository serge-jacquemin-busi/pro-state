import { Http, ConnectionBackend, RequestOptions } from '@angular/http';

export class IntegratedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);

        console.log('IntegratedHttp');
    }
}