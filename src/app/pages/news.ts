import { HttpErrorResponse, httpResource } from "@angular/common/http";
import { Component, OnDestroy, OnInit, computed } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "news",
  imports: [RouterLink],
  templateUrl: "./news.html",
})
export class News implements OnInit, OnDestroy {
  apiUrl = "https://jsonplaceholder.typicode.com";
  posts = httpResource<any[]>(`${this.apiUrl}/posts`);
  error = computed(() => {
    if (!this.posts.error()) return;
    const error: HttpErrorResponse = this.posts.error() as HttpErrorResponse;
    console.log(error);
    return error ? error.url : null;
  });

  ngOnInit() {
    console.log("entra Ruta 2");
  }

  ngOnDestroy() {
    console.log("Destruye Ruta 2");
  }
}
