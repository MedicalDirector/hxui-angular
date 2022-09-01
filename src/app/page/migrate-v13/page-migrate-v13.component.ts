import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';

@Component({
  selector: 'app-page-migrate-v13',
  templateUrl: './page-migrate-v13.component.html',
  styles: [
    `
      :host {
        display: contents;
      }

      .h2,
      .h3 {
        margin: 1.25em 0 0.5em;
      }

      aside {
        order: 2;
      }

      kbd {
        display: inline-block;
        background-color: #f5f5f5;
        padding: 0 2px;
        border: 1px solid #ccc;
        border-radius: 3px;
        line-height: 16px;
        white-space: nowrap;
      }
    `,
  ],
})
export class PageMigrateV13Component {
  contents: Contents[] = [
    { text: 'Date picker', link: 'date-picker' },
    { text: 'Selectize', link: 'selectize' },
  ];
}
