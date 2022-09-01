import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageFilterCode } from './page-filter.code';

@Component({
  selector: 'app-page-filter',
  templateUrl: './page-filter.component.html',
  styles: [':host { display: contents; }'],
})
export class PageFilterComponent {
  code = new PageFilterCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'API reference', link: 'api' },
  ];

  /**
   * toggle for version 8 documentation
   *
   * **NOTE:** this is an interim solution dated 07/03/2022
   */
  isVersion8 = false;

  toggleVersions() {
    this.isVersion8 = !this.isVersion8;
  }
}
