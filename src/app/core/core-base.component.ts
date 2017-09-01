import {ElementRef, Inject, ViewChild} from '@angular/core';
import {PageScrollInstance, PageScrollService} from 'ng2-page-scroll';
import {DOCUMENT} from '@angular/platform-browser';
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
    this.pageScrollService.start(pageScrollInstance);
  }


}
