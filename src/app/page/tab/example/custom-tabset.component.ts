import { Component } from '@angular/core';

@Component({
  selector: 'eg-custom-tabset',
  template: `
    <hx-tabset [justified]="true" [hasInfo]="true">
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
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleCustomTabsetComponent {}
