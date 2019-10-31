import {Component, Inject, OnInit} from '@angular/core';
import {AutoGrowCode} from './auto-grow.code';
import {CoreBaseComponent} from '../core-base.component';
import { PageScrollService } from 'ngx-page-scroll-core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-auto-grow',
  templateUrl: './auto-grow.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class AutoGrowComponent extends CoreBaseComponent implements OnInit {

  code = new AutoGrowCode();

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  ngOnInit() {
  }

}
