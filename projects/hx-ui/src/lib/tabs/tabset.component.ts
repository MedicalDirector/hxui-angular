import {
  AfterContentInit,
  Component,
  ContentChildren,
  forwardRef,
  Input,
  OnDestroy,
  QueryList,
} from '@angular/core';
import { TabDirective } from './tab.directive';
import { TabsetConfig } from './tabset.config';

@Component({
  selector: 'hx-tabset',
  host: {
    class: 'hx-tab-container',
  },
  template: `
    <ul
      class="hx-nav hx-nav-{{ type }}"
      [ngStyle]="{
        position: getStickyHeaderPosition(),
        'top.rem': stickyHeaderOffset
      }"
      [class.is-vertical]="vertical"
      [class.is-justified]="justified"
      [class.has-info]="hasInfo"
    >
      <li
        *ngFor="let tab of tabs"
        [ngClass]="['hx-nav-item', tab.customClass || '']"
        [class.is-active]="!!tab?.active"
        [class.is-disabled]="!!tab?.disabled"
        [class.is-button]="tag === 'button'"
      >
        <button
          *ngIf="tag === 'button'"
          class="hx-nav-link"
          [class.is-active]="!!tab?.active"
          [class.is-disabled]="!!tab?.disabled"
          [attr.disabled]="!!tab?.disabled ? '' : null"
          (click)="selectTab(tab)"
        >
          <span [ngTransclude]="tab.headingRef">{{ tab.heading }}</span>
          <span *ngIf="tab.removable">
            <span
              (click)="removeTab(tab)"
              class="icon close-outline is-small"
            ></span>
          </span>
        </button>
        <a
          *ngIf="tag === 'link'"
          class="hx-nav-link"
          [class.is-active]="!!tab?.active"
          [class.is-disabled]="!!tab?.disabled"
          [attr.disabled]="!!tab?.disabled ? '' : null"
          (click)="selectTab(tab)"
        >
          <span [ngTransclude]="tab.headingRef">{{ tab.heading }}</span>
          <span *ngIf="tab.removable">
            <span
              (click)="removeTab(tab)"
              class="icon close-outline is-small"
            ></span>
          </span>
        </a>
      </li>
    </ul>
    <div class="hx-tab-content {{ contentCustomClass }}">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      :host,
      ul.hx-nav {
        background-color: inherit;
      }

      button.hx-nav-link {
        border-width: 0;
        border-bottom-width: 1px;
        border-color: transparent;
        background-color: transparent;
        line-height: 1.5;
        cursor: pointer;
      }

      :where(.is-justified) .is-button.hx-nav-item {
        display: flex;
      }

      :where(.is-justified .is-button) button.hx-nav-link {
        display: flex;
      }
    `,
  ],
})
export class TabsetComponent implements OnDestroy, AfterContentInit {
  /** if true tabs will be placed vertically */
  @Input() vertical = false;

  /** if true tabs fill the container and have a consistent width */
  @Input() justified = false;

  @Input() hasInfo = false;

  /** navigation context class: 'tabs' or 'pills' */
  @Input()
  get type(): string {
    return this._type;
  }
  set type(value: string) {
    this._type = value;
  }

  @Input() contentCustomClass: string;
  @Input() stickyHeader = false;
  @Input() stickyHeaderOffset = 0;

  @Input() tag: 'link' | 'button' = 'link';

  @Input()
  changeFn = async () => true;

  @ContentChildren(forwardRef(() => TabDirective))
  private _tabList: QueryList<TabDirective>;

  tabs: TabDirective[] = [];

  protected isDestroyed: boolean;
  protected _type: string;

  constructor(config: TabsetConfig) {
    Object.assign(this, config);
  }

  ngAfterContentInit() {
    // get all active tabs
    const activeTabs = this._tabList.filter(tab => tab.active);

    // if there is no active tab set, activate the first
    if (activeTabs.length === 0) {
      this._selectTab(this._tabList.last);
    }
  }

  private _selectTab(tab: TabDirective) {
    // deactivate all tabs
    this._tabList.toArray().forEach(tab => (tab.active = false));

    // activate the tab the user has clicked on.
    tab.active = true;
  }

  selectTab(tab: TabDirective) {
    this.changeFn().then(res => !!res && this._selectTab(tab));
  }

  ngOnDestroy(): void {
    this.isDestroyed = true;
  }

  addTab(tab: TabDirective): void {
    this.tabs.push(tab);
    tab.active = this.tabs.length === 1 && tab.active !== false;
  }

  removeTab(tab: TabDirective, options = { reselect: true, emit: true }): void {
    const index = this.tabs.indexOf(tab);
    if (index === -1 || this.isDestroyed) {
      return;
    }
    // Select a new tab if the tab to be removed is selected and not destroyed
    if (options.reselect && tab.active && this.hasAvailableTabs(index)) {
      const newActiveIndex = this.getClosestTabIndex(index);
      this.tabs[newActiveIndex].active = true;
    }
    if (options.emit) {
      tab.removed.emit(tab);
    }
    this.tabs.splice(index, 1);
    if (tab.elementRef.nativeElement && tab.elementRef.nativeElement.remove) {
      tab.elementRef.nativeElement.remove();
    }
  }

  getStickyHeaderPosition(): string {
    return this.stickyHeader ? 'sticky' : 'relative';
  }

  protected getClosestTabIndex(index: number): number {
    const tabsLength = this.tabs.length;
    if (!tabsLength) {
      return -1;
    }

    for (let step = 1; step <= tabsLength; step += 1) {
      const prevIndex = index - step;
      const nextIndex = index + step;
      if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
        return prevIndex;
      }
      if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
        return nextIndex;
      }
    }
    return -1;
  }

  protected hasAvailableTabs(index: number): boolean {
    const tabsLength = this.tabs.length;
    if (!tabsLength) {
      return false;
    }

    for (let i = 0; i < tabsLength; i += 1) {
      if (!this.tabs[i].disabled && i !== index) {
        return true;
      }
    }
    return false;
  }
}
