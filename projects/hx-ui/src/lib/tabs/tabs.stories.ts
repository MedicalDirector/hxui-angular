import { CommonModule } from '@angular/common';
import { action } from '@storybook/addon-actions';
import { Meta, moduleMetadata, Story } from '@storybook/angular';
import { NgTranscludeDirective } from './ng-transclude.directive';
import { TabHeadingDirective } from './tab-heading.directive';
import { TabDirective } from './tab.directive';
import { TabsetComponent } from './tabset.component';
import { TabsetConfig } from './tabset.config';

export default {
  title: 'Component/Tabs',
  decorators: [
    moduleMetadata({
      imports: [CommonModule],
      declarations: [
        TabDirective,
        TabsetComponent,
        TabHeadingDirective,
        NgTranscludeDirective,
      ],
      providers: [TabsetConfig],
    }),
  ],
  excludeStories: /.*Data$/,
} as Meta;

const tabs = [
  { title: 'Dynamic Title 1', content: 'Dynamic content 1' },
  { title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true },
  { title: 'Dynamic Title 3', content: 'Dynamic content 3', removable: true },
  {
    title: 'Dynamic Title 4',
    content: 'Dynamic content 4',
    customClass: 'customClass',
  },
];

const longText =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

const actionsData = {
  onSelect: $event => action('tab selected')($event),
  onDeselect: $event => action('tab deselected')($event),
};

export const Simple: Story = args => {
  return {
    props: {
      tabs,
      ...args,
      ...actionsData,
    },
    template: `
      <hx-tabset>
        <hx-tab heading="Static title">
          Static content
        </hx-tab>
        <hx-tab 
          *ngFor="let tab of tabs"
          [heading]="tab.title"
          [active]="tab.active"
          (select)="onSelect(tab)"
          (deselect)="onDeselect(tab)"
          [disabled]="tab.disabled"
          [removable]="tab.removable"
          (removed)="removeTabHandler(tab)"
          [customClass]="tab.customClass"
        >
          {{tab?.content}}
        </hx-tab>
      </hx-tabset>
    `,
  };
};

export const WithIcons: Story = () => {
  return {
    props: {
      longText,
      tabs,
      ...actionsData,
    },
    template: `
      <hx-tabset>
        <hx-tab heading="Static title">
          Static content
        </hx-tab>
        <hx-tab 
          *ngFor="let tab of tabs"
          [heading]="tab.title"
          [active]="tab.active"
          (select)="onSelect(tab)"
          (deselect)="onDeselect(tab)"
          [disabled]="tab.disabled"
          [removable]="tab.removable"
          (removed)="removeTabHandler(tab)"
          [customClass]="tab.customClass"
        >
          {{tab?.content}}
        </hx-tab>
        <hx-tab>
          <ng-template hxTabHeading>
            <i class="icon icon-bell is-small"></i> Alert!
          </ng-template>
          {{ longText }}
        </hx-tab>
      </hx-tabset>
    `,
  };
};

export const Complex: Story = () => {
  return {
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
};
