import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageTabCode } from './page-tab.code';

@Component({
  selector: 'app-page-tab',
  templateUrl: './page-tab.component.html',
  styles: [':host { display: contents; }'],
})
export class PageTabComponent {
  code = new PageTabCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'Custom example', link: 'example-custom' },
    { text: 'API Reference', link: 'api' },
  ];
}
