import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  Output,
  TemplateRef,
} from '@angular/core';
import { TabsetComponent } from './tabset.component';

// eslint-disable-next-line @angular-eslint/directive-selector
@Directive({ selector: 'hx-tab, [hx-tab]' })
export class TabDirective implements OnDestroy {
  /** tab header text */
  @Input() heading: string;
  /** tab id */
  @Input() id: string;
  /** if true tab can not be activated */
  @Input() disabled: boolean;
  /** if true tab can be removable, additional button will appear */
  @Input() removable: boolean;
  /** if set, will be added to the tab's class atribute */
  @Input() customClass: string;

  @Input()
  get active(): boolean {
    return this._active;
  }

  set active(active: boolean) {
    if ((this.disabled && active) || !active) {
      if (!active) {
        this._active = active;
      }

      this.deselect.emit(this);
      return;
    }

    this._active = active;
    this.select.emit(this);
  }

  /** tab active state toggle */
  @HostBinding('class.is-active')
  get _() {
    return !!this._active;
  }

  /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
  // TODO: change output name
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public select: EventEmitter<TabDirective> = new EventEmitter();
  /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
  @Output() public deselect: EventEmitter<TabDirective> = new EventEmitter();
  /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
  @Output() public removed: EventEmitter<TabDirective> = new EventEmitter();

  @HostBinding('class.hx-tab-pane') addClasn = true;

  headingRef: TemplateRef<any>;
  tabset: TabsetComponent;
  protected _active: boolean;

  // TODO: refactor so that ref to parent 'TabsetComponent' is removed, causing circular refs
  constructor(tabset: TabsetComponent, public elementRef: ElementRef) {
    this.tabset = tabset;
    this.tabset.addTab(this);
  }

  ngOnDestroy(): void {
    this.tabset.removeTab(this, { reselect: false, emit: false });
  }
}
