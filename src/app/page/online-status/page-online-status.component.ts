import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageOnlineStatusCode } from './page-online-status.code';

@Component({
  selector: 'app-page-online-status',
  templateUrl: './page-online-status.component.html',
  styles: [':host { display: contents; }'],
})
export class PageOnlineStatusComponent {
  code = new PageOnlineStatusCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'API reference', link: 'api' },
  ];
}
