import {Component, Inject, OnInit} from '@angular/core';
import {Context, Size} from '../../../../projects/hx-ui/src/lib/enums';
import {LoadersCode} from './loaders.code';
import {CoreBaseComponent} from '../core-base.component';
import {DOCUMENT} from '@angular/common';
import {PageScrollService} from 'ngx-page-scroll';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-loaders',
  templateUrl: './loaders.component.html',
  styles: [':host { display: flex; flex: 1; min-width: 0; }']
})
export class LoadersComponent extends CoreBaseComponent {

  code = new LoadersCode();

  /** Enums to be used in the template **/
  contextEnum = Context;
  sizeEnum = Size;

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

}
