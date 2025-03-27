import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoaderService {
  private loaders: Map<string, BehaviorSubject<boolean>> = new Map();
  private counters: Map<string, number> = new Map();

  getLoading$(key: string): Observable<boolean> {
    if (!this.loaders.has(key)) {
      this.loaders.set(key, new BehaviorSubject<boolean>(false));
      this.counters.set(key, 0);
    }
    return this.loaders.get(key)!.asObservable();
  }

  show(key: string): void {
    if (!this.loaders.has(key)) {
      this.loaders.set(key, new BehaviorSubject<boolean>(false));
      this.counters.set(key, 0);
    }
    const current = this.counters.get(key)!;
    this.counters.set(key, current + 1);
    if (current === 0) {
      this.loaders.get(key)!.next(true);
    }
  }

  hide(key: string): void {
    if (!this.loaders.has(key)) return;
    const current = this.counters.get(key)!;
    if (current <= 1) {
      this.counters.set(key, 0);
      this.loaders.get(key)!.next(false);
    } else {
      this.counters.set(key, current - 1);
    }
  }
}
