import {Component, Inject, OnInit} from '@angular/core';
import {CoreBaseComponent} from '../core-base.component';
import {PageScrollService} from 'ngx-page-scroll';
import {BreakpointsService} from '../../../../projects/hx-ui/src/lib/utils/breakpoint.service';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-online-status',
  templateUrl: './online-status.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class OnlineStatusComponent extends CoreBaseComponent implements OnInit {

  constructor(protected pageScrollService: PageScrollService,
              protected breakpointsService: BreakpointsService,
              @Inject(DOCUMENT) protected document: any) {
    super(pageScrollService, breakpointsService, document);
  }

  ngOnInit() {
  }

}
