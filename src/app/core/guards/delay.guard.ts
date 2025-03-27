import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DelayGuard implements CanActivate {
  canActivate(): Observable<boolean> {
    // Simula un retardo de 3 segundos antes de permitir la navegación.
    return of(true).pipe(delay(500));
  }
}
