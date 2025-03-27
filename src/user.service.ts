import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { repeat } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: BehaviorSubject<any | null> = new BehaviorSubject<any | null>({
    name: 'Marta',
    role: 'jefa',
    token: 'asdasdasd',
  });

  user$ = of({
    name: 'Marta',
    role: 'jefa',
    token: 'asdasdasd',
  });

  /* public user$ = this._user.asObservable(); */

  setUser(user: any) {
    this._user.next(user);
  }
}
