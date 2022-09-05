import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageToastCode } from './page-toast.code';

@Component({
  selector: 'app-page-toast',
  templateUrl: './page-toast.component.html',
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
export class PageToastComponent {
  code = new PageToastCode();
  contents: Contents[] = [
    { text: 'Installation', link: 'install' },
    { text: 'Usage', link: 'usage' },
    { text: 'Examples', link: 'example' },
    { text: 'API reference', link: 'api' },
  ];
}
