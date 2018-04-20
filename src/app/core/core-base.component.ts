import {ElementRef, Inject, Injectable, ViewChild} from '@angular/core';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable()
export class CoreBaseComponent {

  @ViewChild('container')
  protected container: ElementRef;

  constructor(protected pageScrollService: PageScrollService,
              @Inject(DOCUMENT) protected document: any) {
  }

  scrollTo = (target: string) => {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
          document: this.document,
          scrollTarget: target,
          scrollingViews: [
            this.container.nativeElement
          ]
    });
    //this.pageScrollService.start(pageScrollInstance);
  }


}
