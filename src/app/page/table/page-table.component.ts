import { Component } from '@angular/core';
import { Contents } from '../../shared/page-base/page-base.model';
import { PageTableCode } from './page-table.code';

@Component({
  selector: 'app-page-table',
  templateUrl: './page-table.component.html',
  styles: [':host { display: contents; }'],
})
export class PageTableComponent {
  code = new PageTableCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Kitchen-sink example', link: 'example-kitchen' },
    { text: 'API reference', link: 'api' },
  ];
}
