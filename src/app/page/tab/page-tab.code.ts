import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageTabCode {
  usage: Code = {
    lang: ['ts'],
    text: `import {TabsModule} from "@hxui/angular";

@NgModule({
  imports: [TabsModule.forRoot(),...]
})
export class AppModule {}
`,
  };

  egBasicHTML: Code = {
    lang: ['xml'],
    text: `<div>
  <p>Select an option:</p>
  <button
    type="button"
    class="hx-button is-primary"
    (click)="tabs[1].disabled = ! tabs[1].disabled"
  >
    Enable / Disable forth tab
  </button>

  <br />

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
      {{tab?.content}}
    </hx-tab>
    <hx-tab (select)="alertMe()">
      <ng-template hxTabHeading>
        <i class="icon icon-bell is-small" style="height: 20px"></i>
        Alert!
      </ng-template>
      Html tab heading and callback! Html tab heading and callback!Html
      tab heading and callback!Html tab heading and callback! Html tab
      heading and callback! Html tab heading and callback!Html tab heading
      and callback! Html tab heading and callback!Html tab heading and
      callback!
      <br />
      Html tab heading and callback!Html tab heading and callback! Html
      tab heading and callback! Html tab heading and callback!Html tab
      heading and callback!Html tab heading and callback! Html tab heading
      and callback! Html tab heading and callback!Html tab heading and
      callback! Html tab heading and callback!Html tab heading and
      callback!
      <br />
      Html tab heading and callback!Html tab heading and callback!
    </hx-tab>
  </hx-tabset>
</div>`,
  };

  egBasicTS: Code = {
    lang: ['ts'],
    text: `import { Component } from '@angular/core';

@Component({
  selector: 'app-myfeature',
  templateUrl: './app-myfeature.component.html'
})
export class MyFeatureComponent {

  tabs: any[] = [
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

    function confirmDialog(msg) {
      return new Promise(function (resolve) {
        const confirmed = window.confirm(msg);

        return confirmed ? resolve(true) : resolve(false);
      });
    }
  }
}
`,
  };

  egCustomHTML: Code = {
    lang: ['xml'],
    text: `<hx-tabset [justified]="true" [hasInfo]="true">
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Overdue</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">10 <small>in April</small></h6>
          <h6 class="mt-0 mb-0">13 <small>in total</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 1 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Upcoming</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">23 <small>in April/May</small></h6>
          <h6 class="mt-0 mb-0">300 <small>claims</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 2 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Assigned/New</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">40 <small>total</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 3 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Plan Started</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">23 <small>awaiting recall</small></h6>
          <h6 class="mt-0 mb-0">40 <small>recalled</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 4 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Team Participation</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">23 <small>participating</small></h6>
          <h6 class="mt-0 mb-0">11 <small>no response</small></h6>
          <h6 class="mt-0 mb-0">5 <small>declined</small></h6>
        </div>
      </div>
    </ng-template>
    Tab 5 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Awaiting Billing</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">23 <small>in April</small></h6>
          <h6 class="mt-0 mb-0">40 <small>in total</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 6 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Completed</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">23 <small>in April</small></h6>
          <h6 class="mt-0 mb-0">40 <small>in total</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 7 content
  </hx-tab>
</hx-tabset>
`,
  };
}
