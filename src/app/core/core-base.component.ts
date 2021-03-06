import { ElementRef, Inject, Injectable, ViewChild, Directive } from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { PageScrollService } from 'ngx-page-scroll-core';

@Directive()
@Injectable()
export class CoreBaseComponent {

  @ViewChild('container', { static: true })
  protected container: ElementRef;
  public contentsNav = true;

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
    this.pageScrollService.scroll({
      document: this.document,
      scrollTarget: target,
      scrollViews: [
        this.container.nativeElement
      ]
    });
  }


}
