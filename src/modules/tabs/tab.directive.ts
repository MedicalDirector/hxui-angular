﻿import {
  Directive, EventEmitter, HostBinding, Input, Output, TemplateRef, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { TabsetComponent } from './tabset.component';

@Directive({selector: 'hx-tab, [hx-tab]'})
export class TabDirective implements OnInit, OnDestroy {
  /** tab header text */
  @Input() public heading: string;
  /** tab id */
  @Input() public id: string;
  /** if true tab can not be activated */
  @Input() public disabled: boolean;
  /** if true tab can be removable, additional button will appear */
  @Input() public removable: boolean;
  /** if set, will be added to the tab's class atribute */
  @Input() public customClass: string;

  /** tab active state toggle */
  @HostBinding('class.is-active')
  @Input()
  public get active(): boolean {
    return this._active;
  }
  
  public set active(active: boolean) {
    if (this.disabled && active || !active) {
      if (!active) {
        this._active = active;
      }
      //if(typeof active != 'undefined')
        this.deselect.emit(this);

      return;
    }

    this._active = active;
    this.select.emit(this);
    this.tabset.tabs.forEach((tab: TabDirective) => {
      if (tab !== this) {
        tab.active = false;
      }
    });
  }

  /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
  @Output() public select: EventEmitter<TabDirective> = new EventEmitter();
  /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
  @Output() public deselect: EventEmitter<TabDirective> = new EventEmitter();
  /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
  @Output() public removed: EventEmitter<TabDirective> = new EventEmitter();

  @HostBinding('class.hx-tab-pane') public addClass: boolean = true;

  public headingRef: TemplateRef<any>;
  public tabset: TabsetComponent;
  protected _active: boolean;

  public constructor(tabset: TabsetComponent, public elementRef: ElementRef) {
    this.tabset = tabset;
    this.tabset.addTab(this);
  }

  public ngOnInit(): void {
    this.removable = this.removable;
  }

  public ngOnDestroy(): void {
    this.tabset.removeTab(this, {reselect: false, emit: false});
  }
}
