import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageSelectCode } from './page-select.code';

@Component({
  selector: 'app-page-select',
  templateUrl: './page-select.component.html',
  styles: [
    `
      :host {
        display: contents;
      }

      .text-sub {
        font-size: 1.25rem;
        line-height: 2rem;
      }
    `,
  ],
})
export class PageSelectComponent {
  code = new PageSelectCode();
  contents: Contents[] = [
    { text: 'Installation', link: 'install' },
    { text: 'Usage', link: 'usage' },
    { text: 'Multi-select example', link: 'example-multi' },
    { text: 'Single-select example', link: 'example-single' },
    { text: 'Custom template example', link: 'example-template-custom' },
    { text: 'API reference', link: 'api' },
    { text: 'Styles changelog', link: 'changelog' },
  ];
}
