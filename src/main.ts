import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {
  Router,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
} from '@angular/router';
import { Loader } from './loader';
import { MultiLoadingService } from './multiloading.service';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, Loader, AsyncPipe, CommonModule],
  template: `

    <button routerLink="/ruta1">Ruta 1</button>
    <button routerLink="/ruta2">Ruta 2</button>
    <!-- Loader para rutas: se muestra mientras se navega -->
    <app-loader loaderKey="router"></app-loader>

    <!-- Se muestra el contenido de la ruta solo cuando no está cargando -->
    <div *ngIf="!(routerLoading$ | async)">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class App implements OnInit {
  routerLoading$: Observable<boolean>;

  constructor(
    private router: Router,
    private multiLoadingService: MultiLoadingService
  ) {
    this.routerLoading$ = this.multiLoadingService.getLoading$('router');
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.multiLoadingService.show('router');
      }
      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.multiLoadingService.hide('router');
      }
    });
  }
}

bootstrapApplication(App, appConfig);
