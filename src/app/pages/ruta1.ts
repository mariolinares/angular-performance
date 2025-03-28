import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Observable, Subject, interval, map, tap } from "rxjs";
import { UserService } from "../../user.service";

@Component({
  selector: "app-ruta1",
  template: `<h1>Ruta 1</h1>`,
  standalone: true,
  imports: [],
  providers: [],
})
export class Ruta1 implements OnInit, OnDestroy {
  private cancelarOBS$ = new Subject<void>();
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
    this.cancelarOBS$.next();
    this.cancelarOBS$.complete();
  }
}
