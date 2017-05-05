import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { State } from '../models/state';

@Injectable()
export class StateStoreService extends StoreService<State> {}