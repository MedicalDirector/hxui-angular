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

  items: { header: string; body: string }[] = [
    {
      header: 'This is the first header',
      body: 'This is the body of the first accordion component',
    },
    {
      header: 'Drug reference for Paracetamole',
      body: 'Paracetamole is a drug',
    },
    { header: 'Item with a null body', body: null },
  ];

  someFunction($event: number) {
    alert($event);
  }
}
