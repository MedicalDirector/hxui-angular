import {ElementRef, Inject, Injectable, ViewChild} from '@angular/core';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {BreakpointEvent, BreakpointsService} from '../../../projects/hx-ui/src/lib/utils/breakpoint.service';

@Injectable()
export class CoreBaseComponent {

  @ViewChild('container')
  protected container: ElementRef;
  protected contentsNav = true;

  constructor(protected pageScrollService: PageScrollService,
              protected breakpointsService: BreakpointsService,
              @Inject(DOCUMENT) protected document: any) {

    this.breakpointsService.changes.subscribe((data: BreakpointEvent) => {
      this.contentsNav = (data.name !== 'mobile');
    });
  }

  scrollTo = (target: string) => {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
          document: this.document,
          scrollTarget: target,
          scrollingViews: [
            this.container.nativeElement
          ]
    });
    this.pageScrollService.start(pageScrollInstance);
  }


}
