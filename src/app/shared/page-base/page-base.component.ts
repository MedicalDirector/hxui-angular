import { Component, Input } from '@angular/core';
import { Contents } from './page-base.model';

@Component({
  selector: 'app-page-base',
  template: `
    <aside
      class="is-hidden-tablet hx-sidebar is-right is-active is-medium-width is-scrollable hx-bg-white"
      *ngIf="items?.length"
    >
      <ul class="hx-nav hx-nav-vertical">
        <li class="hx-nav-heading">
          <h6>Contents</h6>
        </li>

        <li class="hx-nav-item" *ngFor="let item of items">
          <a class="hx-nav-link" routerLink="./" [fragment]="item.link">
            <span>{{ item.text }}</span>
          </a>
        </li>
      </ul>
    </aside>

    <article>
      <ng-content></ng-content>
    </article>
  `,
  styles: [
    `
      .h2,
      .h3 {
        margin: 1.25em 0 0.5em;
      }

      :host {
        display: contents;
      }

      article {
        grid-area: main;
        padding: 3rem;
        overflow: auto;
        min-height: 100vh;
      }

      aside {
        grid-area: toc;
        position: sticky;
        display: block;
        max-height: 100vh;
        top: 0;
        overflow: auto;
      }
    `,
  ],
})
export class PageBaseComponent {
  @Input() items: Contents[] | undefined;
}
