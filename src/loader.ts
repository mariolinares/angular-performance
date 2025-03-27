import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs';

import { trigger, transition, style, animate } from '@angular/animations';
import { MultiLoadingService } from './multiloading.service';

import { AsyncPipe, CommonModule, NgIf, NgSwitch } from '@angular/common';
@Component({
  selector: 'app-loader',
  templateUrl: './loader.html',
  styleUrls: ['./loader.css'],
  imports: [CommonModule, AsyncPipe, NgIf, NgSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [],
})
export class Loader implements OnInit {
  /**
   * Clave para identificar el loader (por ejemplo, 'router', 'http', 'default').
   */
  @Input() loaderKey!: string;

  /**
   * Permite inyectar un template personalizado.
   */
  @Input() customTemplate?: TemplateRef<any>;

  /**
   * Permite definir un mensaje personalizado.
   */
  @Input() message?: string;

  loading$!: Observable<boolean>;

  constructor(private multiLoadingService: MultiLoadingService) {}

  ngOnInit(): void {
    if (!this.loaderKey) {
      throw new Error(
        'Debe proporcionar una clave para el loader (loaderKey).'
      );
    }
    this.loading$ = this.multiLoadingService.getLoading$(this.loaderKey);
  }
}
