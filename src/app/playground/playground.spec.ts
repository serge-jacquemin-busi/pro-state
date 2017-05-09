import { BehaviorSubject, Subject } from 'rxjs/Rx';
import { TestBed, inject } from '@angular/core/testing';

describe('playground', () => {
    it('should display messgae', inject([], () => {
        const queue = new Subject<string>();

        queue.first(s => s == 'hello').subscribe(
            console.log,
            console.log);
        queue.next('a');
        queue.next('hello');
        queue.error('oops');
        queue.next('hello');
    }));
});