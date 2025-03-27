import { AsyncPipe, CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from "@angular/router";
import { Observable } from "rxjs";
import { HeaderComponent } from "./core/components/header/header.component";
import { Loader } from "./core/components/loader/loader";
import { LoaderService } from "./core/services/loader.service";

@Component({
  selector: "app-root",
  imports: [HeaderComponent, RouterOutlet, Loader, AsyncPipe, CommonModule],
  template: `
    <!-- Loader para rutas: se muestra mientras se navega -->

    <app-header></app-header>
    <div class="absolute top-0 left-0 right-0 botton-0">
      <app-loader loaderKey="router"></app-loader>
    </div>
    <!-- Se muestra el contenido de la ruta solo cuando no está cargando -->
    <div *ngIf="!(routerLoading$ | async)">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class App implements OnInit {
  routerLoading$: Observable<boolean>;

  constructor(private router: Router, private loaderService: LoaderService) {
    this.routerLoading$ = this.loaderService.getLoading$("router");
  }

  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show("router");
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loaderService.hide("router");
      }
    });
  }
}
