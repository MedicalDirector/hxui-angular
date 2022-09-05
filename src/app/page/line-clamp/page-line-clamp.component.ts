import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageLineClampCode } from './page-line-clamp.code';

@Component({
  selector: 'app-page-line-clamp',
  templateUrl: './page-line-clamp.component.html',
  styles: [':host { display: contents; }'],
})
export class PageLineClampComponent {
  code = new PageLineClampCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'API reference', link: 'api' },
  ];
}
