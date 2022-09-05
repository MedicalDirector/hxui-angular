import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PagePaginationCode } from './page-pagination.code';

@Component({
  selector: 'app-page-pagination',
  templateUrl: './page-pagination.component.html',
  styles: [':host { display: contents; }'],
})
export class PagePaginationComponent {
  code = new PagePaginationCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Examples', link: 'example' },
    { text: 'API reference', link: 'api' },
  ];
}
