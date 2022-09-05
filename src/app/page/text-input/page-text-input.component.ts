import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageTextInputCode } from './page-text-input.code';

@Component({
  selector: 'app-page-text-input',
  templateUrl: './page-text-input.component.html',
  styles: [':host { display: contents; }'],
})
export class PageTextInputComponent {
  code = new PageTextInputCode();

  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Examples', link: 'example' },
  ];
}
