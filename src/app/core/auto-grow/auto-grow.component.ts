import {Component, Inject, OnInit} from '@angular/core';
import {AutoGrowCode} from './auto-grow.code';
import {CoreBaseComponent} from '../core-base.component';
import {PageScrollService} from 'ngx-page-scroll';
import {BreakpointsService} from '../../../../projects/hx-ui/src/lib/utils/breakpoint.service';
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
    protected breakpointsService: BreakpointsService,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointsService, document);
  }

  ngOnInit() {
  }

}
