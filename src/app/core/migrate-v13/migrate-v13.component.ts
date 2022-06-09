import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { CoreBaseComponent } from '../core-base.component';

@Component({
  selector: 'app-migrate-v13',
  templateUrl: './migrate-v13.component.html',
  styleUrls: ['./migrate-v13.component.scss']
})
export class MigrateV13Component extends CoreBaseComponent {
  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: any
  ) {
    super(pageScrollService, breakpointObserver, document);
  }
}
