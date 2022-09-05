import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageTooltipCode } from './page-tooltip.code';

@Component({
  selector: 'app-page-tooltip',
  templateUrl: './page-tooltip.component.html',
  styles: [':host { display: contents; }'],
})
export class PageTooltipComponent {
  code = new PageTooltipCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic examples', link: 'example-basic' },
    { text: 'Custom example', link: 'example-custom' },
    { text: 'API reference', link: 'api' },
  ];
}
