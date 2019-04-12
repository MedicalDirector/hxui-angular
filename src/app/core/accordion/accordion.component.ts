import { Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { PageScrollService } from 'ngx-page-scroll';
import { CoreBaseComponent } from '../core-base.component';
import { AccordionCode } from './accordion.code';
import {BreakpointObserver} from '@angular/cdk/layout';
import { Alert } from 'selenium-webdriver';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styles: [':host { display: flex; flex: 1; min-width: 0; }']
})
export class AccordionComponent extends CoreBaseComponent {

  public code = new AccordionCode();
  public items: {'header': string, 'body': string}[] = [];

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointObserver, document);

    this.items.push({header: 'This is the first header', body: 'This is the body of the first accordion component'});
    this.items.push({header: 'Drug reference for Paracetamole', body: 'Paracetamole is a drug'});
  }

  public someFunction($event: number) {
    alert($event);
  }
}
