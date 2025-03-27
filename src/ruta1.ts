import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { UserService } from './user.service';

import { Subject, Observable, tap } from 'rxjs';
import { timeInterval, takeUntil, map } from 'rxjs/operators';
import { repeat } from 'rxjs/operators';
import { of } from 'rxjs';
import { interval } from 'rxjs';

@Component({
  selector: 'app-ruta1',
  template: `<h1>Ruta 1</h1>`,
  standalone: true,
  imports: [],
  providers: [],
})
export class Ruta1 implements OnInit, OnDestroy {
  private cancelarOBS$ = new Subject();
  private userService = inject(UserService);
  count = 0;
  counter$ = new Observable<number>();

  ngOnInit(): void {
    interval(1000)
      .pipe(
        tap(console.log),
        map((val) => val + 1)
      )
      .subscribe();
  }

  ngOnDestroy() {
    console.log('Destruye Ruta 1');
    this.cancelarOBS$.next({});
    this.cancelarOBS$.complete();
  }
}
