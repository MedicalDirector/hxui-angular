import { Component, ViewChild } from '@angular/core';
import { DropdownDirective } from '@hxui/angular';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageDropdownCode } from './page-dropdown.code';

@Component({
  selector: 'app-page-dropdown',
  templateUrl: './page-dropdown.component.html',
  styles: [':host { display: contents; }'],
})
export class PageDropdownComponent {
  code = new PageDropdownCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'Max width example', link: 'example-max-width' },
    { text: 'Manual trigger example', link: 'example-manual' },
    { text: 'Clip path example', link: 'example-clip-path' },
    { text: 'API Reference', link: 'api' },
  ];

  @ViewChild('dropdown', { static: true }) dropdown: DropdownDirective;

  toggle($event: Event) {
    $event.stopPropagation();
    this.dropdown.toggle();
  }

  show($event: Event) {
    $event.stopPropagation();
    this.dropdown.show();
  }

  hide($event: Event) {
    $event.stopPropagation();
    this.dropdown.hide();
  }
}
