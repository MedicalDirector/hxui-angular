import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageTimepickerCode } from './page-timepicker.code';

@Component({
  selector: 'app-page-timepicker',
  templateUrl: './page-timepicker.component.html',
  styles: [
    `
      :host {
        display: contents;
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
export class PageTimepickerComponent {
  code = new PageTimepickerCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Examples', link: 'example' },
    { text: 'API reference', link: 'api' },
  ];
}
