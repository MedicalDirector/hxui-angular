import {ElementRef, Inject, Injectable, ViewChild} from '@angular/core';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/common';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Injectable()
export class CoreBaseComponent {

  @ViewChild('container')
  protected container: ElementRef;
  protected contentsNav = true;

  constructor(protected pageScrollService: PageScrollService,
              protected breakpointObserver: BreakpointObserver,
              @Inject(DOCUMENT) protected document: any) {

    breakpointObserver.observe([
      Breakpoints.Handset
    ]).subscribe(result => {
      this.contentsNav = (!result.matches);
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
