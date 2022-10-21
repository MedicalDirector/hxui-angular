import {
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { isInteger, isNumber, padNumber, toInteger } from '../utils/util';
import { HxaTime } from './hxa-time';
import { HxaTimeAdapter } from './hxa-time-adapter';
import { TimepickerConfig } from './timepicker-config';
import { TimepickerI18n } from './timepicker-i18n';

const FILTER_REGEX = /[^0-9]/g;

/**
 * A directive that helps with wth picking hours, minutes and seconds.
 */
@Component({
  selector: 'hxa-timepicker',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./timepicker.scss'],
  template: `
    <fieldset [disabled]="disabled" [class.disabled]="disabled">
      <div class="ngb-tp">
        <div class="ngb-tp-input-container ngb-tp-hour">
          <button
            *ngIf="spinners"
            tabindex="-1"
            type="button"
            aria-label="Increment hours"
            (click)="changeHour(hourStep)"
            class="hx-button is-flat"
            [class.is-small]="isSmallSize"
            [class.is-large]="isLargeSize"
            [class.disabled]="disabled"
            [disabled]="disabled"
          >
            <span class="hx-icon icon-angle-up is-medium is-info"></span>
            <span
              class="sr-only is-hidden"
              i18n="@@ngb.timepicker.increment-hours"
              >Increment hours</span
            >
          </button>
          <div class="hx-input-control">
            <input
              type="text"
              class="hx-input is-text-center"
              [class.is-small]="isSmallSize"
              [class.is-large]="isLargeSize"
              maxlength="2"
              inputmode="numeric"
              placeholder="HH"
              i18n-placeholder="@@ngb.timepicker.HH"
              [value]="formatHour(model?.hour)"
              (change)="updateHour($any($event).target.value)"
              [readOnly]="readonlyInputs"
              [disabled]="disabled"
              aria-label="Hours"
              i18n-aria-label="@@ngb.timepicker.hours"
              (input)="formatInput($any($event).target)"
              (keydown.ArrowUp)="changeHour(hourStep); $event.preventDefault()"
              (keydown.ArrowDown)="
                changeHour(-hourStep); $event.preventDefault()
              "
              hxaTextInput
            />
            <label class="hx-label"></label>
            <div class="hx-help"></div>
          </div>
          <button
            *ngIf="spinners"
            tabindex="-1"
            type="button"
            aria-label="Decrement hours"
            (click)="changeHour(-hourStep)"
            class="hx-button is-flat mt-2"
            [class.is-small]="isSmallSize"
            [class.is-large]="isLargeSize"
            [class.disabled]="disabled"
            [disabled]="disabled"
          >
            <span class="hx-icon icon-angle-down is-medium is-info"></span>
            <span
              class="sr-only is-hidden"
              i18n="@@ngb.timepicker.decrement-hours"
              >Decrement hours</span
            >
          </button>
        </div>
        <div class="ngb-tp-spacer">:</div>
        <div class="ngb-tp-input-container ngb-tp-minute">
          <button
            *ngIf="spinners"
            tabindex="-1"
            type="button"
            aria-label="Increment minutes"
            (click)="changeMinute(minuteStep)"
            class="hx-button is-flat"
            [class.is-small]="isSmallSize"
            [class.is-large]="isLargeSize"
            [class.disabled]="disabled"
            [disabled]="disabled"
          >
            <span class="hx-icon icon-angle-up is-medium is-info"></span>
            <span
              class="sr-only is-hidden"
              i18n="@@ngb.timepicker.increment-minutes"
              >Increment minutes</span
            >
          </button>
          <div class="hx-input-control">
            <input
              type="text"
              class="hx-input is-text-center"
              [class.is-small]="isSmallSize"
              [class.is-large]="isLargeSize"
              maxlength="2"
              inputmode="numeric"
              placeholder="MM"
              i18n-placeholder="@@ngb.timepicker.MM"
              [value]="formatMinSec(model?.minute)"
              (change)="updateMinute($any($event).target.value)"
              [readOnly]="readonlyInputs"
              [disabled]="disabled"
              aria-label="Minutes"
              i18n-aria-label="@@ngb.timepicker.minutes"
              (input)="formatInput($any($event).target)"
              (keydown.ArrowUp)="
                changeMinute(minuteStep); $event.preventDefault()
              "
              (keydown.ArrowDown)="
                changeMinute(-minuteStep); $event.preventDefault()
              "
            />
            <label class="hx-label"></label>
            <div class="hx-help"></div>
          </div>
          <button
            *ngIf="spinners"
            tabindex="-1"
            type="button"
            aria-label="Decrement minutes"
            (click)="changeMinute(-minuteStep)"
            class="hx-button is-flat mt-2"
            [class.is-small]="isSmallSize"
            [class.is-large]="isLargeSize"
            [class.disabled]="disabled"
            [disabled]="disabled"
          >
            <span class="hx-icon icon-angle-down is-medium is-info"></span>
            <span
              class="sr-only is-hidden"
              i18n="@@ngb.timepicker.decrement-minutes"
              >Decrement minutes</span
            >
          </button>
        </div>
        <div *ngIf="seconds" class="ngb-tp-spacer">:</div>
        <div *ngIf="seconds" class="ngb-tp-input-container ngb-tp-second">
          <button
            *ngIf="spinners"
            tabindex="-1"
            type="button"
            aria-label="Increment seconds"
            (click)="changeSecond(secondStep)"
            class="hx-button is-flat"
            [class.btn-sm]="isSmallSize"
            [class.btn-lg]="isLargeSize"
            [class.disabled]="disabled"
            [disabled]="disabled"
          >
            <span class="hx-icon icon-angle-up is-medium is-info"></span>
            <span
              class="sr-only is-hidden"
              i18n="@@ngb.timepicker.increment-seconds"
              >Increment seconds</span
            >
          </button>
          <div class="hx-input-control">
            <input
              type="text"
              class="hx-input is-text-center"
              [class.is-small]="isSmallSize"
              [class.is-large]="isLargeSize"
              maxlength="2"
              inputmode="numeric"
              placeholder="SS"
              i18n-placeholder="@@ngb.timepicker.SS"
              [value]="formatMinSec(model?.second)"
              (change)="updateSecond($any($event).target.value)"
              [readOnly]="readonlyInputs"
              [disabled]="disabled"
              aria-label="Seconds"
              i18n-aria-label="@@ngb.timepicker.seconds"
              (input)="formatInput($any($event).target)"
              (keydown.ArrowUp)="
                changeSecond(secondStep); $event.preventDefault()
              "
              (keydown.ArrowDown)="
                changeSecond(-secondStep); $event.preventDefault()
              "
            />
            <label class="hx-label"></label>
            <div class="hx-help"></div>
          </div>
          <button
            *ngIf="spinners"
            tabindex="-1"
            type="button"
            aria-label="Decrement seconds"
            (click)="changeSecond(-secondStep)"
            class="hx-button mt-2"
            [class.is-small]="isSmallSize"
            [class.is-large]="isLargeSize"
            [class.disabled]="disabled"
            [disabled]="disabled"
          >
            <span class="hx-icon icon-angle-down is-medium is-info"></span>
            <span
              class="sr-only is-hidden"
              i18n="@@ngb.timepicker.decrement-seconds"
              >Decrement seconds</span
            >
          </button>
        </div>
        <div *ngIf="meridian" class="ngb-tp-spacer"></div>
        <div *ngIf="meridian" class="ngb-tp-meridian">
          <button
            type="button"
            class="hx-button mb-1"
            aria-label="Toggle meridian"
            [class.is-small]="isSmallSize"
            [class.is-large]="isLargeSize"
            [disabled]="disabled"
            [class.disabled]="disabled"
            (click)="toggleMeridian()"
          >
            <ng-container
              *ngIf="model && model.hour >= 12; else am"
              i18n="@@ngb.timepicker.PM"
              >{{ i18n.getAfternoonPeriod() }}</ng-container
            >
            <ng-template #am i18n="@@ngb.timepicker.AM">{{
              i18n.getMorningPeriod()
            }}</ng-template>
          </button>
        </div>
      </div>
    </fieldset>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Timepicker),
      multi: true,
    },
  ],
})
// TODO: rename to TimePickerComponent
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class Timepicker implements ControlValueAccessor, OnChanges {
  static ngAcceptInputType_size: string;

  public model: HxaTime;

  private _hourStep: number;
  private _minuteStep: number;
  private _secondStep: number;

  /**
   * Whether to display 12H or 24H mode.
   */
  @Input() meridian: boolean;

  /**
   * If `true`, the spinners above and below inputs are visible.
   */
  @Input() spinners: boolean;

  /**
   * If `true`, it is possible to select seconds.
   */
  @Input() seconds: boolean;

  /**
   * The number of hours to add/subtract when clicking hour spinners.
   */
  @Input()
  set hourStep(step: number) {
    this._hourStep = isInteger(step) ? step : this._config.hourStep;
  }

  get hourStep(): number {
    return this._hourStep;
  }

  /**
   * The number of minutes to add/subtract when clicking minute spinners.
   */
  @Input()
  set minuteStep(step: number) {
    this._minuteStep = isInteger(step) ? step : this._config.minuteStep;
  }

  get minuteStep(): number {
    return this._minuteStep;
  }

  /**
   * The number of seconds to add/subtract when clicking second spinners.
   */
  @Input()
  set secondStep(step: number) {
    this._secondStep = isInteger(step) ? step : this._config.secondStep;
  }

  get secondStep(): number {
    return this._secondStep;
  }

  /**
   * If `true`, the time-picker is readonly and can't be changed.
   */
  @Input() readonlyInputs: boolean;

  /**
   * If `true`, the timepicker input is disabled.
   */
  @Input() disabled: boolean;

  /**
   * The size of inputs and buttons.
   */
  @Input() size: 'small' | 'medium' | 'large';

  constructor(
    private readonly _config: TimepickerConfig,
    private _ngbTimeAdapter: HxaTimeAdapter<any>,
    private _cd: ChangeDetectorRef,
    public i18n: TimepickerI18n
  ) {
    this.meridian = _config.meridian;
    this.spinners = _config.spinners;
    this.seconds = _config.seconds;
    this.hourStep = _config.hourStep;
    this.minuteStep = _config.minuteStep;
    this.secondStep = _config.secondStep;
    this.disabled = _config.disabled;
    this.readonlyInputs = _config.readonlyInputs;
    this.size = _config.size;
  }

  /* eslint-disable @typescript-eslint/no-empty-function */
  onChange = (_: any) => {};
  onTouched = () => {};
  /* eslint-disable @typescript-eslint/no-empty-function */

  writeValue(value) {
    const structValue = this._ngbTimeAdapter.fromModel(value);
    this.model = structValue
      ? new HxaTime(structValue.hour, structValue.minute, structValue.second)
      : new HxaTime();
    if (!this.seconds && (!structValue || !isNumber(structValue.second))) {
      this.model.second = 0;
    }
    this._cd.markForCheck();
  }

  registerOnChange(fn: (value: any) => any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  changeHour(step: number) {
    this.model.changeHour(step);
    this.propagateModelChange();
  }

  changeMinute(step: number) {
    this.model.changeMinute(step);
    this.propagateModelChange();
  }

  changeSecond(step: number) {
    this.model.changeSecond(step);
    this.propagateModelChange();
  }

  updateHour(newVal: string) {
    const isPM = this.model.hour >= 12;
    const enteredHour = toInteger(newVal);
    if (
      this.meridian &&
      ((isPM && enteredHour < 12) || (!isPM && enteredHour === 12))
    ) {
      this.model.updateHour(enteredHour + 12);
    } else {
      this.model.updateHour(enteredHour);
    }
    this.propagateModelChange();
  }

  updateMinute(newVal: string) {
    this.model.updateMinute(toInteger(newVal));
    this.propagateModelChange();
  }

  updateSecond(newVal: string) {
    this.model.updateSecond(toInteger(newVal));
    this.propagateModelChange();
  }

  toggleMeridian() {
    if (this.meridian) {
      this.changeHour(12);
    }
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_REGEX, '');
  }

  formatHour(value?: number) {
    if (isNumber(value)) {
      if (this.meridian) {
        return padNumber(value % 12 === 0 ? 12 : value % 12);
      } else {
        return padNumber(value % 24);
      }
    } else {
      return padNumber(NaN);
    }
  }

  formatMinSec(value?: number) {
    return padNumber(isNumber(value) ? value : NaN);
  }

  get isSmallSize(): boolean {
    return this.size === 'small';
  }

  get isLargeSize(): boolean {
    return this.size === 'large';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['seconds'] &&
      !this.seconds &&
      this.model &&
      !isNumber(this.model.second)
    ) {
      this.model.second = 0;
      this.propagateModelChange(false);
    }
  }

  private propagateModelChange(touched = true) {
    if (touched) {
      this.onTouched();
    }
    if (this.model.isValid(this.seconds)) {
      this.onChange(
        this._ngbTimeAdapter.toModel({
          hour: this.model.hour,
          minute: this.model.minute,
          second: this.model.second,
        })
      );
    } else {
      this.onChange(this._ngbTimeAdapter.toModel(null));
    }
  }
}
