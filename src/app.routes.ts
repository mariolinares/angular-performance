import { Route } from '@angular/router';
import { Ruta1 } from './ruta1';
import { Ruta2 } from './ruta2';
import { DelayGuard } from './delay.guard';

export const appRoutes: Route[] = [
  {
    path: 'ruta1',
    component: Ruta1,
    canActivate: [DelayGuard],
  },
  {
    path: 'ruta2',
    component: Ruta2,
    canActivate: [DelayGuard],
  },
];
