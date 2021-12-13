import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { State } from 'src/app/store';

@Injectable({
  providedIn: 'root',
})
export class TransactionStateFacade {
  constructor(private store: Store<State>) {}
}
