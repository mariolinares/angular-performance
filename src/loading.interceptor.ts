import {
  HttpInterceptorFn,
  HttpRequest,
  HttpEvent,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { inject } from '@angular/core';
import { MultiLoadingService } from './multiloading.service';

export const loadingInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const multiLoadingService = inject(MultiLoadingService);
  multiLoadingService.show('http');
  return next(req).pipe(finalize(() => multiLoadingService.hide('http')));
};
