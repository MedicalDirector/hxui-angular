import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <app-page-base>
      <h1 class="hx-title">Page Not Found</h1>
      <p class="hx-subtitle">Opps, another 404 page</p>
    </app-page-base>
  `,
  styles: [':host { display: contents; }'],
})
export class PageNotFoundComponent {}
