import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  TemplateRef,
} from "@angular/core";
import { Observable } from "rxjs";

import { AsyncPipe, CommonModule, NgIf, NgSwitch } from "@angular/common";
import { LoaderService } from "../../services/loader.service";
@Component({
  selector: "app-loader",
  templateUrl: "./loader.html",
  styleUrls: ["./loader.css"],
  imports: [CommonModule, AsyncPipe, NgIf, NgSwitch],
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    if (!this.loaderKey) {
      throw new Error(
        "Debe proporcionar una clave para el loader (loaderKey)."
      );
    }
    this.loading$ = this.loaderService.getLoading$(this.loaderKey);
  }
}
