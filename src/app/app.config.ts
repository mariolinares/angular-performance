import { registerLocaleData } from "@angular/common";
import { provideHttpClient, withInterceptors } from "@angular/common/http";
import localeEnGb from "@angular/common/locales/en-GB";
import { ApplicationConfig } from "@angular/core";
import { provideAnimations } from "@angular/platform-browser/animations";
import {
  provideRouter,
  withInMemoryScrolling,
  withViewTransitions
} from "@angular/router";
import { appRoutes } from "./app.routes";
import { loaderInterceptor } from "./core/services/loader.interceptor";

registerLocaleData(localeEnGb, "es-ES");

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loaderInterceptor])),
    provideAnimations(),
    provideRouter(
      appRoutes,
      withViewTransitions(),
      withInMemoryScrolling({ scrollPositionRestoration: "enabled" })
    ),
  ],
};
