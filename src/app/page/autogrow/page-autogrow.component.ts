import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageAutoGrowCode } from './page-autogrow.code';

@Component({
  selector: 'app-page-autogrow',
  templateUrl: './page-autogrow.component.html',
  styles: [':host { display: contents; }'],
})
export class PageAutoGrowComponent {
  code = new PageAutoGrowCode();

  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
  ];
}
