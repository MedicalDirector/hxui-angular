import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="main-wrapper">
      <app-sidebar></app-sidebar>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }

      main {
        display: contents;
      }

      .main-wrapper {
        display: grid;
        grid-template-areas: 'sidebar main toc';
        grid-template-columns: auto 1fr auto;
      }

      @media screen and (max-width: 999px) {
        .main-wrapper {
          grid-template-areas: 'sidebar main';
          grid-template-columns: auto 1fr;
        }
      }
    `,
  ],
})
export class AppComponent {}
