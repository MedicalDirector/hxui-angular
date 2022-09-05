import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageDateRangePickersCode } from './page-date-range-picker.code';

@Component({
  selector: 'app-page-date-range-picker',
  templateUrl: './page-date-range-picker.component.html',
  styles: [':host { display: contents; }'],
})
export class PageDateRangePickerComponent {
  code = new PageDateRangePickersCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Calendar example', link: 'example-calendar' },
    { text: 'Interval example', link: 'example-interval' },
    { text: 'Choice example', link: 'example-choice' },
    { text: 'API reference', link: 'api' },
  ];

  /**
   * toggle for version 8 documentation
   *
   * **NOTE:** this is an interim solution dated 11/03/2022
   */
  isVersion8 = false;

  toggleVersions() {
    this.isVersion8 = !this.isVersion8;
  }
}
