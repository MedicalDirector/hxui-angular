import { Component } from '@angular/core';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageTabCode } from './page-tab.code';

@Component({
  selector: 'app-page-tab',
  templateUrl: './page-tab.component.html',
  styles: [':host { display: contents; }'],
})
export class PageTabComponent {
  code = new PageTabCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'Custom example', link: 'example-custom' },
    { text: 'API Reference', link: 'api' },
  ];

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

    function confirmDialog(msg: string) {
      return new Promise(function (resolve) {
        const confirmed = window.confirm(msg);

        return confirmed ? resolve(true) : resolve(false);
      });
    }
  }
}
