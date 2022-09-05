import { Component } from '@angular/core';
import { Contents } from '../../shared/page-base/page-base.model';
import { PageAccordionCode } from './page-accordion.code';

@Component({
  selector: 'app-page-accordion',
  templateUrl: './page-accordion.component.html',
  styles: [':host { display: contents; }'],
})
export class PageAccordionComponent {
  code = new PageAccordionCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'Custom class example', link: 'example-custom-class' },
    { text: 'API Reference', link: 'api' },
  ];
}
