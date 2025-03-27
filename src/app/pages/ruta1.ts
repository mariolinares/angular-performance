import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { UserService } from "../../user.service";

@Component({
  selector: "app-ruta1",
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
    /* interval(1000)
      .pipe(
        tap(console.log),
        map((val) => val + 1)
      )
      .subscribe(); */
  }

  ngOnDestroy() {
    console.log("Destruye Ruta 1");
    this.cancelarOBS$.next({});
    this.cancelarOBS$.complete();
  }
}
