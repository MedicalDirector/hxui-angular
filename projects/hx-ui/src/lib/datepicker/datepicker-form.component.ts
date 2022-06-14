import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  OriginConnectionPosition,
  Overlay,
  OverlayConnectionPosition,
  OverlayRef,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormGroupDirective,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator
} from '@angular/forms';
import * as moment_ from 'moment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TextInputDirective } from '../text-input/text-input.directive';
import { DatepickerConfig } from './datepicker.config';
import { DatePickerInterval } from './datepicker.model';
const moment = moment_;

@Component({
  selector: 'hxa-datepicker-input',
  templateUrl: './datepicker-form.component.html',
  styleUrls: ['./datepicker-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatepickerFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatepickerFormComponent),
      multi: true
    }
  ]
})
export class DatepickerFormComponent
  implements OnInit, ControlValueAccessor, Validator, OnDestroy, DoCheck
{
  @HostBinding('class')
  get classes() {
    return 'hx-input-group hxa-datepicker';
  }

  /** for controlling input label positioning */
  @ViewChild(TextInputDirective, { static: true })
  datePickerFormInput: TextInputDirective;

  /** for managing form input state */
  @ViewChild('datePickerForm', { static: true })
  datePickerForm: FormGroupDirective;

  @ViewChild('menuRef', { read: TemplateRef })
  private _menuRef: TemplateRef<unknown>;

  @ViewChild('originRef', { read: ElementRef })
  private _originRef: ElementRef;

  public _overlayRef: OverlayRef | null;
  private _portal: TemplatePortal;
  private readonly _destroyed = new Subject();
  public isOpen = false;
  public isInputFocus = false;

  /** The timeout ID of any current timer set to show the calendar */
  private _showTimeoutId: number;

  /** The timeout ID of any current timer set to hide the calendar */
  private _hideTimeoutId: number;

  public activeTabIndex = 0;

  public selectedInterval: DatePickerInterval;
  public date: Date = null;
  public presentDate: Date;
  public isValid: boolean;
  public dateValidators = new Array<(date: Date) => boolean>();
  private onChanged = new Array<(value: Date) => void>();
  private onTouched = new Array<() => void>();

  private validateDateRange: (date: Date) => boolean;

  /** Adds the disabled html attribute to the components input element */
  @Input()
  disabled = false;

  /** Adds the readonly html attribute to the components input element. */
  @Input()
  readonly = false;

  /**
   * Adds the required html attribute to the components input element
   * and a required asterisk on the input label.
   */
  @Input()
  required = false;

  /** Initializes the component with a value of the present date. */
  @Input()
  defaultToPresentDate = true;

  /**
   * Setting to false will disallow the user from selecting dates
   * before the present date
   */
  @Input()
  allowPreviousDates = true;

  /**
   * Setting to false will disallow the user from selecting dates
   * after the present date.
   */
  @Input()
  allowFutureDates = true;

  /**
   * A JavaScript Date object formatting string, formats the display
   * of components current value.
   */
  @Input()
  dateFormat = 'dd/MM/y';

  /**
   * This attribute specifies the placeholder value of the components
   * input element.
   */
  @Input()
  placeholder = 'Date';

  /** This attribute specifies the text value of input helper. */
  @Input()
  helpText = 'Please select a valid date';

  /** Specifies visibility of input help text */
  @Input()
  helpTextVisible = false;

  /** Warning state of input */
  @Input()
  isWarning = false;

  /** Danger state of input */
  @Input()
  isDanger = false;

  /** This attribute specifies the font icon name. */
  @Input()
  icon = 'hx-icon icon-calendar-outline';

  /** This attribute specifies the icon placement. */
  @Input()
  iconPlacement = 'right';

  /** Specifies the position the datepicker opens against the input element */
  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = this._config.placement;

  /** delay in ms before showing the calendar after show is called */
  @Input()
  showDelay = this._config.showDelay;

  /** delay in ms before hiding the calendar after hide is called */
  @Input()
  hideDelay = this._config.hideDelay;

  /** Specifies the inclusive beginning date for allowed date values */
  @Input()
  from = '';

  /** Specifies the inclusive end date for allowed date values */
  @Input()
  to = '';

  /** Enables interval selection */
  @Input()
  interval = false;

  @Input()
  dueDateInterval = '0 day(s)';

  /** Mask pattern for date picker text input */
  @Input()
  maskPattern = '00/00/0000'; //'d0/M0/0000';

  /** Emits a Date is selected from the Datepicker or a valid date string is entered into input field */
  @Output()
  dateChange: EventEmitter<Date> = new EventEmitter<Date>();

  /** Emits a boolean if date picker input field is in focus */
  @Output()
  inputFocus: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private _viewContainerRef: ViewContainerRef,
    public overlay: Overlay,
    private _config: DatepickerConfig,
    private _cd: ChangeDetectorRef
  ) {}

  /** Listen to keyboard events to trigger changes to overlay state */
  @HostListener('document:keydown', ['$event'])
  public onKeydown($event: KeyboardEvent) {
    if ($event.key === 'Escape' && this.isOpen) {
      this._hide();
    }
  }

  ngOnInit(): void {
    // if interval is not allowed, go to 'specific date' tab
    if (!this.interval) {
      this.activeTabIndex = 1;
      this.selectedInterval = {
        interval: this.dueDateInterval,
        isSelectedFromInterval: false
      };
    } else {
      this.selectedInterval = {
        interval: this.dueDateInterval,
        isSelectedFromInterval: true
      };
    }

    const date: Date = new Date();
    this.presentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (this.defaultToPresentDate) {
      setTimeout(() => {
        this.setDate(this.presentDate);
      });
    }

    // Close to the minimum and maxium possible dates, but still normalisable
    // http://ecma-international.org/ecma-262/5.1/#sec-15.9.1.1
    const from = this.parseDate(this.from) || new Date(-8630000000000000);
    const to = this.parseDate(this.to) || new Date(8630000000000000);

    if (!!this.from || !!this.to) {
      this.validateDateRange = this.createDateRangeValidator(from, to);
      this.dateValidators.push(this.validateDateRange.bind(this));
    }

    if (!this.allowPreviousDates) {
      this.dateValidators.push(this.validateIsNotBeforeDate.bind(this));
    }
    if (!this.allowFutureDates) {
      this.dateValidators.push(this.validateIsNotAfterDate.bind(this));
    }
  }

  ngDoCheck(): void {
    const from = this.parseDate(this.from) || new Date(-8630000000000000);
    const to = this.parseDate(this.to) || new Date(8630000000000000);

    if (!!this.from || !!this.to) {
      this.validateDateRange = this.createDateRangeValidator(from, to);
      this.dateValidators = [this.validateDateRange.bind(this)];
    }
  }

  ngOnDestroy() {
    // dispose the overlay ref and subscriptions
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }

    this._destroyed.next(true);
    this._destroyed.complete();
  }

  public setDate(date: Date): void {
    this.date = date;
    this.propogateChange(date);
    this.dateChange.emit(date);
    this._updateLabelStyle();
  }

  public onDateSelection($event: Date): void {
    this._hide();
    this.selectedInterval['isSelectedFromInterval'] = false;
    this.setDate($event);
  }

  public onIntervalSelection(
    $event: DatePickerInterval & { date: Date }
  ): void {
    this._hide();
    const { date, ...rest } = $event;
    this.selectedInterval = rest;
    this.setDate(date);
  }

  public onChange($event: Event): void {
    const inputDate = ($event.target as HTMLInputElement).value;
    const date: Date = this.parseDate(inputDate);

    if (inputDate === '' || date === null) {
      this.setDate(null);
    } else if (date) {
      this.setDate(date);
    } else {
      this.propogateChange(inputDate);
    }
  }

  public onFocused($event: FocusEvent): void {
    this.isInputFocus = true;
    this.propogateTouched();
    this.inputFocus.emit();
  }

  public onBlur($event: FocusEvent): void {
    this.isInputFocus = false;
  }

  public onButtonClick($event: Event): void {
    if (this.isOpen) {
      this._hide();
    } else {
      this._show();
    }
  }

  public onIntervalCancel($event: Event): void {
    this._hide();
  }

  public onKeydownTab($event: Event): void {
    this.onChange($event);
    this._hide();
    this.propogateTouched();
  }

  public onKeydownSpace($event: Event): void {
    this._show();
  }

  public onTabSelect(index: number): void {
    if (!index) {
      return;
    }

    if (index === 0) {
      this.activeTabIndex = 0;
    } else {
      this.activeTabIndex = 1;
    }
  }

  public parseDate(inputDate: string | Date): Date {
    if (typeof inputDate === 'string') {
      // eslint-disable-next-line no-useless-escape
      const dateArray = (inputDate as string).split(/[.,\/ -]/);

      if (dateArray.length === 3 && dateArray[2].length !== 0) {
        const allowedFormats = [
          'DD/MM/YYYY',
          'D/M/YY',
          'DD/MM/YY',
          'DD-MM-YYYY',
          'D-M-YY',
          'DD-MM-YY',
          'DD.MM.YYYY',
          'D.M.YY',
          'DD.MM.YY'
        ];
        const momentDate = moment(inputDate, allowedFormats, true);

        if (momentDate.isValid()) {
          return momentDate.toDate();
        }
      }
      return null;
    } else {
      return <Date>inputDate;
    }
  }
  public validateIsNotBeforeDate(date: Date): boolean {
    const normalisedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    return normalisedDate.getTime() < this.presentDate.getTime();
  }

  public validateIsNotAfterDate(date: Date): boolean {
    const normalisedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    return normalisedDate.getTime() > this.presentDate.getTime();
  }

  public createDateRangeValidator(
    from: Date,
    to: Date
  ): (date: Date) => boolean {
    const normalisedFromDate = new Date(
      from.getFullYear(),
      from.getMonth(),
      from.getDate()
    );
    const normalisedToDate = new Date(
      to.getFullYear(),
      to.getMonth(),
      to.getDate()
    );

    return (date: Date) => {
      if (date instanceof Date) {
        const normalisedDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        return !(
          normalisedFromDate.getTime() <= normalisedDate.getTime() &&
          normalisedDate.getTime() <= normalisedToDate.getTime()
        );
      } else {
        return false;
      }
    };
  }

  public writeValue(value: Date): void {
    if (value !== this.date && value !== undefined) {
      if (value && this.date && value.valueOf() === this.date.valueOf()) {
        return;
      }
      this.setDate(value);
    }
  }

  public registerOnChange(fn: (value: Date) => void): void {
    this.onChanged.push(fn);
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched.push(fn);
  }

  public propogateTouched(): void {
    this.onTouched.forEach(fn => fn());
  }

  public propogateChange = value => {
    this.onChanged.forEach(fn => fn(value));
  };

  validate(control: AbstractControl): { [key: string]: any } {
    const date = Date.parse(control.value);

    if (
      !this.required &&
      (control.value === null || control.value === undefined)
    ) {
      this.isValid = true;
      return null;
    }

    if (isNaN(date)) {
      this.isValid = false;
      return {
        dateParseError: {
          valid: false
        }
      };
    }

    if (!this.allowPreviousDates && this.validateIsNotBeforeDate(this.date)) {
      this.isValid = false;
      return {
        previousDateError: {
          valid: false
        }
      };
    }

    if (!this.allowFutureDates && this.validateIsNotAfterDate(this.date)) {
      this.isValid = false;
      return {
        futureDateError: {
          valid: false
        }
      };
    }

    if (this.validateDateRange && this.validateDateRange(this.date)) {
      this.isValid = false;
      return {
        dateRangeError: {
          valid: false
        }
      };
    }

    if (this.required && !this.date) {
      this.isValid = false;
      return {
        dateRequiredError: {
          valid: false
        }
      };
    }

    this.isValid = true;
    return null;
  }

  /** open overlay */
  private _show(delay: number = this.showDelay) {
    if (this.disabled || this.isOpen) {
      return;
    }

    const overlayRef = this._createOverlay();

    this._detach();
    overlayRef.attach(this._portal);

    // Cancel the delayed hide if it is scheduled
    if (this._hideTimeoutId) {
      clearTimeout(this._hideTimeoutId);
    }
    this._showTimeoutId = window.setTimeout(() => {
      this.isOpen = true;

      // Schedule for change detection incase the tooltip is used within a
      // component with OnPush change detection
      this._cd.markForCheck();
    }, delay);
  }

  /** close overlay */
  private _hide(delay: number = this.hideDelay) {
    this._detach();

    // Cancel the delayed show if it is scheduled
    if (this._showTimeoutId) {
      clearTimeout(this._showTimeoutId);
    }

    this._hideTimeoutId = window.setTimeout(() => {
      this.isOpen = false;

      this._destroyed.next(true);
    }, delay);
  }

  private _createOverlay(): OverlayRef {
    if (this._overlayRef) {
      return this._overlayRef;
    }

    this._portal = new TemplatePortal(this._menuRef, this._viewContainerRef);

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this._originRef)
      .withTransformOriginOn('.hxa-datepicker__control')
      .withFlexibleDimensions(false);

    this._overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      panelClass: 'hxa-datepicker__overlay',
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    this._updatePosition();

    this._overlayRef
      .detachments()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    this._overlayRef.backdropClick().subscribe(() => this._hide());

    const position = this._overlayRef.getConfig()
      .positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this._destroyed)).subscribe(pos => {
      if (pos.connectionPair.originX === 'start') {
        this.placement = 'left';
      } else if (pos.connectionPair.originX === 'end') {
        this.placement = 'right';
      }
    });

    return this._overlayRef;
  }

  private _updatePosition() {
    const position = this._overlayRef!.getConfig()
      .positionStrategy as FlexibleConnectedPositionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();

    position.withPositions([
      { ...origin.main, ...overlay.main },
      { ...origin.fallback, ...overlay.fallback }
    ]);
  }

  /**
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. `'bottom' -> 'top'`).
   */
  private _getOrigin(): {
    main: OriginConnectionPosition;
    fallback: OriginConnectionPosition;
  } {
    const placement = this.placement;
    let originPlacement: OriginConnectionPosition;

    if (placement === 'top' || placement === 'bottom') {
      originPlacement = {
        originX: 'start',
        originY: placement === 'top' ? 'top' : 'bottom'
      };
    } else if (placement === 'left') {
      originPlacement = { originX: 'start', originY: 'center' };
    } else if (placement === 'right') {
      originPlacement = { originX: 'end', originY: 'center' };
    } else {
      console.error('Position error', placement);
    }

    const { x, y } = this._invertPosition(
      originPlacement.originX,
      originPlacement.originY
    );

    return {
      main: originPlacement,
      fallback: { originX: x, originY: y }
    };
  }

  /** Returns the overlay position and a fallback position based on the user's preference */
  private _getOverlayPosition(): {
    main: OverlayConnectionPosition;
    fallback: OverlayConnectionPosition;
  } {
    const placement = this.placement;
    let overlayPlacement: OverlayConnectionPosition;

    if (placement === 'top') {
      overlayPlacement = { overlayX: 'start', overlayY: 'bottom' };
    } else if (placement === 'bottom') {
      overlayPlacement = { overlayX: 'start', overlayY: 'top' };
    } else if (placement === 'left') {
      overlayPlacement = { overlayX: 'end', overlayY: 'center' };
    } else if (placement === 'right') {
      overlayPlacement = { overlayX: 'start', overlayY: 'center' };
    } else {
      console.error('Could not find a position', placement);
    }

    const { x, y } = this._invertPosition(
      overlayPlacement.overlayX,
      overlayPlacement.overlayY
    );

    return {
      main: overlayPlacement,
      fallback: { overlayX: x, overlayY: y }
    };
  }

  private _invertPosition(
    x: HorizontalConnectionPos,
    y: VerticalConnectionPos
  ) {
    if (this.placement === 'top' || this.placement === 'bottom') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }

    return { x, y };
  }

  public _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
  }

  // only applicable if hxaInputDirective is present
  private _updateLabelStyle() {
    if (this.datePickerFormInput) {
      this.datePickerFormInput.styleLabel(true);
    }
  }
}
