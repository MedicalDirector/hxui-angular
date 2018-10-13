import {Component, ElementRef, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {PageScrollService} from 'ngx-page-scroll';
import {CoreBaseComponent} from '../core-base.component';
import {DOCUMENT} from '@angular/common';
import {DropdownsCode} from './dropdowns.code';
import {DropdownDirective} from '../../../../projects/hx-ui/src/lib/dropdown/dropdown.directive';

@Component({
  selector: 'app-dropdowns',
  templateUrl: './dropdowns.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class DropdownsComponent extends CoreBaseComponent {

  @ViewChild('dropdown') dropdown: DropdownDirective;

  code = new DropdownsCode();
  constructor(protected pageScrollService: PageScrollService,
              @Inject(DOCUMENT) protected document: any) {
    super(pageScrollService, document);
  }

  toggle($event) {
    $event.stopPropagation();
    this.dropdown.toggle();
  }

  show($event) {
    $event.stopPropagation();
    this.dropdown.show();
  }

  hide($event) {
    $event.stopPropagation();
    this.dropdown.hide();
  }


}
