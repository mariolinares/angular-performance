import { Route } from "@angular/router";
import { DelayGuard } from "./core/guards/delay.guard";
import { News } from "./pages/news";
import { Ruta1 } from "./pages/ruta1";

export const appRoutes: Route[] = [
  {
    path: "ruta1",
    component: Ruta1,
    canActivate: [DelayGuard],
  },
  {
    path: "news",
    component: News,
    canActivate: [DelayGuard],
  },
];
