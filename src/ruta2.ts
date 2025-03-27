import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { computed, Resource } from '@angular/core';

@Component({
  selector: 'app-ruta2',
  template: `
    <div class="container">
  <header>
    <h1>Blog Posts</h1>
  </header>

  @if (posts.isLoading()) {
    <div class="loading">
      <p>Loading posts...</p>
      <div class="spinner"></div>
    </div>
  } @else {
    @if (error()) {
      <div class="error">
        <p>Error loading posts: {{ error() }}</p>
      </div>
    } @else {
      <div class="posts-grid">
        @for (post of posts.value(); track post.id) {
          <article class="post-card">
            <h2>{{ post.title }}</h2>
            <p>{{ post.body }}</p>
            <footer>
              <small>Post ID: {{ post.id }}</small>
            </footer>
          </article>
        }
      </div>
    }
  }
</div>
  `,
})
export class Ruta2 implements OnInit, OnDestroy {
  apiUrl = 'https://jsonplaceholder.typicode.com';
  posts = httpResource<any[]>(`${this.apiUrl}/posts`);

  error = computed(() => {
    if (!this.posts.error()) return;
    const error: HttpErrorResponse = this.posts.error() as HttpErrorResponse;
    console.log(error);
    return error ? error.url : null;
  });

  ngOnInit() {
    console.log('entra Ruta 2');
  }

  ngOnDestroy() {
    console.log('Destruye Ruta 2');
  }
}
