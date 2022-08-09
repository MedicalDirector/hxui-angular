import { BreakpointObserver } from '@angular/cdk/layout';
import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';
import { CoreBaseComponent } from '../core-base.component';
import { TabsCode } from './tabs.code';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }'],
})
export class TabsPageComponent extends CoreBaseComponent {
  code = new TabsCode();

  tabs = [
    { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
    { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
    { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true },
    {
      title: 'Dynamic Title 4',
      content: 'Dynamic content 4',
      customClass: 'customClass',
    },
  ];

  constructor(
    protected pageScrollService: PageScrollService,
    protected breakpointObserver: BreakpointObserver,
    @Inject(DOCUMENT) protected document: Document
  ) {
    super(pageScrollService, breakpointObserver, document);
  }

  alertMe(): void {
    alert("You've selected the alert tab!");
  }

  selectTab(tab): void {
    console.log('Selected:', tab);
  }

  deselectTab(tab): void {
    console.log('Deselected:', tab);
  }

  async confirmBeforeSwitch() {
    return confirmDialog('proceed?');

    function confirmDialog(msg) {
      return new Promise(function (resolve) {
        const confirmed = window.confirm(msg);

        return confirmed ? resolve(true) : resolve(false);
      });
    }
  }
}
