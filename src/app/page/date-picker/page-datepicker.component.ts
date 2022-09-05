import { Component } from '@angular/core';
import { Contents } from '../../shared/page-base/page-base.model';
import { PageDatepickerCode } from './page-datepicker.code';

@Component({
  selector: 'app-page-datepicker',
  templateUrl: './page-datepicker.component.html',
  styles: [':host { display: contents; }'],
})
export class PageDatepickerComponent {
  code = new PageDatepickerCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'Interval example', link: 'example-interval' },
    { text: 'API Reference', link: 'api' },
  ];
}
