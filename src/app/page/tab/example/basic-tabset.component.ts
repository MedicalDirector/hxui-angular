import { Component, isDevMode } from '@angular/core';

@Component({
  selector: 'eg-basic-tabset',
  template: `
    <button
      type="button"
      class="hx-button is-primary mb-4"
      (click)="tabs[1].disabled = !tabs[1].disabled"
    >
      Enable / Disable forth tab
    </button>

    <hx-tabset
      [stickyHeader]="true"
      [stickyHeaderOffset]="-1"
      [changeFn]="confirmBeforeSwitch"
    >
      <hx-tab heading="Static title">Static content</hx-tab>
      <hx-tab
        *ngFor="let tab of tabs"
        [heading]="tab.title"
        [active]="tab.active"
        (select)="selectTab(tab)"
        (deselect)="deselectTab(tab)"
        [disabled]="tab.disabled"
        [removable]="tab.removable"
        [customClass]="tab.customClass"
      >
        {{ tab?.content }}
      </hx-tab>
      <hx-tab (select)="alertMe()">
        <ng-template hxTabHeading>
          <i class="icon icon-bell is-small" style="height: 20px"></i>
          Alert!
        </ng-template>
        Html tab heading and callback! Html tab heading and callback!Html tab
        heading and callback!Html tab heading and callback! Html tab heading and
        callback! Html tab heading and callback!Html tab heading and callback!
        Html tab heading and callback!Html tab heading and callback!
        <br />
        Html tab heading and callback!Html tab heading and callback! Html tab
        heading and callback! Html tab heading and callback!Html tab heading and
        callback!Html tab heading and callback! Html tab heading and callback!
        Html tab heading and callback!Html tab heading and callback! Html tab
        heading and callback!Html tab heading and callback!
        <br />
        Html tab heading and callback!Html tab heading and callback!
      </hx-tab>
    </hx-tabset>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleBasicTabsetComponent {
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
    isDevMode() && console.log('Selected:', tab);
  }

  deselectTab(tab): void {
    isDevMode() && console.log('Deselected:', tab);
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
