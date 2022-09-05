import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageTypeaheadCode } from './page-typeahead.code';

@Component({
  selector: 'app-page-typeahead',
  templateUrl: './page-typeahead.component.html',
  styles: [':host { display: contents; }'],
})
export class PageTypeaheadComponent {
  code = new PageTypeaheadCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'Predefined example', link: 'example-predefined' },
    { text: 'API reference', link: 'api' },
  ];
}
