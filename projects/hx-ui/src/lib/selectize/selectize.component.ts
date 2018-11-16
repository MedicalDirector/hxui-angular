import {
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  DoCheck,
  forwardRef,
  Component,
  ViewChild,
  Output,
  EventEmitter,
  IterableDiffers,
  IterableDiffer,
  IterableChangeRecord,
  IterableChanges,
  ViewEncapsulation,
  Renderer2,
  OnDestroy
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormControl
} from '@angular/forms';

import * as _ from 'lodash';
import { SelectizeConfig } from './selectize.config';
import {ISelectizeItem} from './selectize-item.interface';

declare var $: any;

export const SELECTIZE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectizeComponent),
  multi: true
};

@Component({
  selector: 'hxa-selectize',
  template: `<div class="hx-input-control" [ngClass]="config.inputControlClasses" [class.is-focused]="isFocused" [class.is-valid]="isValid">
                  <select #selectizeInput></select>
                  <label for="{{id}}" class="hx-label">{{config.label}} <sup *ngIf="config.mandatory">*</sup></label>
                  <div class="hx-help">{{config.help}}</div>
              </div>`,
  providers: [SELECTIZE_VALUE_ACCESSOR],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['selectize.component.scss']
})
export class SelectizeComponent
  implements OnInit, OnChanges, DoCheck, ControlValueAccessor, OnDestroy {
  private _options: any[];
  private _options_differ: IterableDiffer<any>;
  private _optgroups: any[];
  private _optgroups_differ: IterableDiffer<any>;

  @Input() config: SelectizeConfig;
  @Input() id: string;
  @Input() placeholder: string;
  @Input() hasOptionsPlaceholder: string;
  @Input() noOptionsPlaceholder: string;
  @Input() enabled = true;
  @Input() value: ISelectizeItem[] = [];
  @Input() formControl: FormControl;
  @Input() errorClass: string;
  isFocused = false;
  isValid = false;

  @Output() onBlur: EventEmitter<void> = new EventEmitter<void>(false);
  @Output() onFocus: EventEmitter<void> = new EventEmitter<void>(false);

  @ViewChild('selectizeInput') selectizeInput: any;

  private selectize: any;

  // Control value accessors.
  private onTouchedCallback: () => {};
  private onChangeCallback: (_: any) => {};

  constructor(private _differs: IterableDiffers, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (this.id && this.id.length > 0) {
      this.renderer.setAttribute(
        this.selectizeInput.nativeElement,
        'id',
        this.id
      );
    }
    this.reset();
  }

  reset() {
    this.selectize = $(this.selectizeInput.nativeElement).selectize(
      this.config
    )[0].selectize;
    this.selectize.on('change', this.onSelectizeValueChange.bind(this));
    this.selectize.on('blur', this.onBlurEvent.bind(this));
    this.selectize.on('focus', this.onFocusEvent.bind(this));
    this.selectize.on('type', this.onSelectizeType.bind(this));
    this.selectize.on('item_add', this.onSelectizeItemSelected.bind(this));
    this.updatePlaceholder();
    this.onEnabledStatusChange();
    this.hasCaret();
  }

  ngOnDestroy() {
    this.selectize.off('change');
    this.selectize.off('blur');
    this.selectize.off('focus');
    this.selectize.off('type');
  }

  /**
   * Change detection for primitive types.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (this.selectize) {
      if (
        changes.hasOwnProperty('placeholder') ||
        changes.hasOwnProperty('hasOptionsPlaceholder') ||
        changes.hasOwnProperty('noOptionsPlaceholder')
      ) {
        this.updatePlaceholder();
      }
      if (changes.hasOwnProperty('enabled')) {
        this.onEnabledStatusChange();
      }
    }
  }

  /**
   * Implementing deep check for option comparison
   *
   * FIXME -> Implement deep check to only compare against label and value fields.
   */
  ngDoCheck(): void {
    if (this._options_differ) {
      const changes = this._options_differ.diff(this._options);
      if (changes) {
        this._applyOptionsChanges(changes);
      }
    }
    if (this._optgroups_differ) {
      const changes = this._optgroups_differ.diff(this._optgroups);
      if (changes) {
        this._applyOptionGroupChanges(changes);
      }
    }
  }

  private _applyOptionsChanges(changes: IterableChanges<any>): void {
    changes.forEachRemovedItem((record: IterableChangeRecord<any>) => {
      this.onSelectizeOptionRemove(record.item);
    });
    changes.forEachAddedItem((record: IterableChangeRecord<any>) => {
      this.onSelectizeOptionAdd(record.item);
    });
    this.updatePlaceholder();
    this.evalHasError();
  }

  private _applyOptionGroupChanges(changes: any): void {
    changes.forEachRemovedItem((record: IterableChangeRecord<any>) => {
      this.onSelectizeOptGroupRemove(record.item);
    });
    changes.forEachAddedItem((record: IterableChangeRecord<any>) => {
      this.onSelectizeOptGroupAdd(record.item);
    });
    this.updatePlaceholder();
    this.evalHasError();
  }

  private clearhighlight(): void {
    // remove highlight to help selectize bug
    // https://github.com/selectize/selectize.js/issues/1141
    this.selectize.$dropdown_content.removeHighlight();
  }

  onBlurEvent() {
    if (this.formControl) {
      this.formControl.markAsTouched();
    }
    this.onBlur.emit();
    this.evalHasError();
    this.isFocused = false;
    this.isValid = (this.selectize.getValue().length > 0);
  }

  onFocusEvent() {
    if (this.formControl) {
      this.formControl.markAsTouched();
    }
    this.onFocus.emit();
    this.evalHasError();
    this.isFocused = true;
  }

  onSelectizeOptGroupAdd(optgroup: any): void {
    this.selectize.addOptionGroup(optgroup[this.getOptgroupField()], optgroup);
  }

  onSelectizeOptGroupRemove(optgroup: any): void {
    this.selectize.removeOptionGroup(optgroup[this.getOptgroupField()]);
  }

  /**
   * Refresh selected values when options change.
   */
  onSelectizeOptionAdd(option: any): void {
    this.selectize.addOption(_.cloneDeep(option));
    const valueField = this.config.valueField;
    if (this.value) {
      const items =
        typeof this.value === 'string' || typeof this.value === 'number'
          ? [this.value]
          : this.value;
      if (
        items &&
        items instanceof Array &&
        items.find(value => value === option[valueField])
      ) {
        this.selectize.addItem(option[valueField], true);
      }
    }
  }

  onSelectizeOptionRemove(option: any): void {
    this.selectize.removeOption(option[this.config.valueField]);
  }

  evalHasError() {
    const parent = $(this.selectize.$control).parent();
    if (this.formControl) {
      if (this.formControl.touched && this.formControl.invalid) {
        parent.addClass(this.errorClass || 'has-error');
      } else if (parent.hasClass('has-error')) {
        parent.removeClass(this.errorClass || 'has-error');
      }
    }
  }


  updateLabel() {
  }

  /**
   * Update the current placeholder based on the given input parameter.
   */
  updatePlaceholder(): void {
    if (
      this.selectize.items.length === 0 &&
      this.selectize.settings.placeholder !== this.getPlaceholder()
    ) {
      this.selectize.settings.placeholder = this.getPlaceholder();
      this.selectize.updatePlaceholder();
      this.selectize.showInput(); // Without this, when options are cleared placeholder only appears after focus.
    }
  }

  /**
   * Called when a change is detected in the 'enabled' input field.
   * Sets the selectize state based on the new value.
   */
  onEnabledStatusChange(): void {
    this.enabled ? this.selectize.enable() : this.selectize.disable();
  }


  hasCaret() {
    if (this.config.hasCaret) {
      const parent = $(this.selectize.$control).parent();
      parent.addClass('hasCaret');
    }
  }

  /**
   * Dispatches change event when a value change is detected.
   * @param $event
   */
  onSelectizeValueChange($event: any): void {
    // In some cases this gets called before registerOnChange.
    if (this.onChangeCallback) {
      // Map selectize's value collection back to original ISelectizeItem object
      const data = this.selectize.items.map(v => {
        return this.selectize.options[v];
      });

      this.onChangeCallback(data);
    }
  }

  /**
   * Invoked when the user types while filtering options.
   * @param str
   */
  onSelectizeType(str: string): void {
    if (str.length === 0) {
      this.clearhighlight();
      this.selectize.close();
    }
  }

  onSelectizeItemSelected($event: any): void {
    this.clearhighlight();

    if (this.config.closeAfterSelect) {
      this.selectize.close();
    }
  }

  /**
   * Invoked anytime a key is pressed down on the selectize search field
   * @param e
   */
  onKeydown = e => {
    console.log(e);
    const TABKEY = 9;
    if (e.keyCode === TABKEY) {
      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();
    }
  }

  /**
   * Returns the applicable placeholder.
   */
  getPlaceholder(): string {
    if (this.hasOptionsPlaceholder) {
      if (this.options && this.options.length > 0) {
        return this.hasOptionsPlaceholder;
      }
    }
    if (this.noOptionsPlaceholder) {
      if (!this.options || this.options.length === 0) {
        return this.noOptionsPlaceholder;
      }
    }
    return this.placeholder;
  }

  /**
   * Implementation from ControlValueAccessor
   *
   * @param obj
   */
  writeValue(obj: ISelectizeItem[]): void {
    if (obj === this.value) {
      return;
    }

    this.value = obj;

    if (!obj || obj.length === 0) {
      this.selectize.setValue('');
      return;
    }

    const stringValue = obj.map(v => {
      if (!Object.keys(this.selectize.options).some(x => x === v.value)) {
        this.selectize.addOption(v);
      }
      return v.value;
    });

    this.selectize.setValue(stringValue);
    this.evalHasError();
    this.isValid = (this.selectize.getValue().length > 0);
  }

  /**
   * Implementation from ControlValueAccessor, callback for (ngModelChange)
   * @param fn
   */
  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  /**
   * Implementation from ControlValueAccessor
   * @param fn
   */
  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  getOptgroupField(): string {
    return this.config['optgroupField']
      ? this.config['optgroupField']
      : 'optgroup';
  }

  @Input()
  set options(value: any[]) {
    this._options = value;
    if (!this._options_differ && value) {
      this._options_differ = this._differs.find(value).create();
    }
  }

  get options(): any[] {
    return this._options;
  }

  @Input()
  set optgroups(value: any[]) {
    this._optgroups = value;
    if (!this._optgroups_differ && value) {
      this._optgroups_differ = this._differs.find(value).create();
    }
  }

  get optgroups(): any[] {
    return this._optgroups;
  }
}
