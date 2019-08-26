import {
  Component, Input, Output, OnInit, ElementRef, HostListener, EventEmitter, forwardRef,
  OnDestroy, NgZone, ComponentFactoryResolver, ViewContainerRef, Optional, ViewChild, ContentChild, OnChanges, SimpleChanges, DoCheck
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl } from '@angular/forms';
import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  OriginConnectionPosition, Overlay, OverlayConnectionPosition, OverlayRef,
  ScrollDispatcher, VerticalConnectionPos
} from '@angular/cdk/overlay';
import {ComponentPortal} from '@angular/cdk/portal';
import {Subject} from 'rxjs/index';
import {DatepickerComponent} from './datepicker.component';
import {take, takeUntil} from 'rxjs/operators';
import {Directionality} from '@angular/cdk/bidi';
import {DatepickerConfig} from './datepicker.config';
import { DatepickerIntervalComponent } from './datepicker-interval.component';

@Component({
  selector: 'hxa-datepicker-input, hxa-datepicker-form',
  templateUrl: './datepicker-form.component.html',
  styleUrls: ['./datepicker-form.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerFormComponent),
    multi: true
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => DatepickerFormComponent),
    multi: true,
  }]
})
export class DatepickerFormComponent implements OnInit, ControlValueAccessor, Validator, OnDestroy, DoCheck {

  ngDoCheck(): void {
    const from = this.parseDate(this.from) || new Date(-8630000000000000);
    const to = this.parseDate(this.to) || new Date(8630000000000000);

    if (!!this.from || !!this.to) {
      this.validateDateRange = this.createDateRangeValidator(from, to);
      this.dateValidators = [this.validateDateRange.bind(this)];
    }
  }
  _overlayRef: OverlayRef | null;
  _calendarInstance: DatepickerComponent | null;
  _intervalInstance: DatepickerIntervalComponent | null;
  private _portal: ComponentPortal<DatepickerComponent>;
  private readonly _destroyed = new Subject();

  @Input()
  disabled = false;

  @Input()
  readonly = false;

  @Input()
  required = false;

  @Input()
  defaultToPresentDate = true;

  @Input()
  allowPreviousDates = true;

  @Input()
  allowFutureDates = true;

  @Input()
  dateFormat = 'dd/MM/y';

  @Input()
  placeholder = 'Date';

  @Input()
  helpText = 'Please select a date';

  @Input()
  icon = 'hx-icon icon-calendar-outline';

  @Input()
  iconPlacement = 'right';

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @Input()
  showDelay = this._config.showDelay;

  @Input()
  hideDelay = this._config.hideDelay;

  @Input()
  from = '';

  @Input()
  to = '';

  @Input()
  interval = false;

  @Input()
  dueDateInterval = '0 day(s)'; // '1 week(s)' | '2 month(s)' | '3 year(s)'

  @Output()
  onDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  @Output()
  onFocus: EventEmitter<void> = new EventEmitter<void>();

  public date: Date = null;
  public visible = false;
  public presentDate: Date;
  public isValid: boolean;
  public dateValidators = new Array<(date: Date) => boolean>();
  private onChanged = new Array<(value: Date) => void>();
  private onTouched = new Array<() => void>();

  private validateDateRange: (date: Date) => boolean;
  private _elementHtmlRef: Element;
  private _elementHtmlCollection: HTMLCollection;

  constructor(private _elementRef: ElementRef,
              private _viewContainerRef: ViewContainerRef,
              public overlay: Overlay,
              private _ngZone: NgZone,
              private _scrollDispatcher: ScrollDispatcher,
              private _componentFactoryResolver: ComponentFactoryResolver,
              private _config: DatepickerConfig,
              @Optional() private _dir: Directionality) {

    // get input reference
    this._elementHtmlCollection = this._elementRef.nativeElement.getElementsByTagName('input');
  }

  /**
   * Dispose the tooltip when destroyed.
   */
  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._calendarInstance = null;
    }

    this._destroyed.next();
    this._destroyed.complete();
  }

  ngOnInit(): void {

    // set element ref which will be used for dropdown positioning
    this._elementHtmlRef = this._elementHtmlCollection.item(0);

    const date: Date = new Date();
    this.presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

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

  public setDate(date: Date): void {
    this.date = date;
    this.propogateChange(date);
    this.onDateChange.emit(date);
  }

  public onDateSelectEvent = (inputDate: Date): void => {
    this._hide();
    this.setDate(inputDate);
  }

  public onChange($event): void {

    const inputDate = $event.target.value;
    const date: Date = this.parseDate(inputDate);

    if (inputDate === '') {
      this.setDate(null);
    } else if (!!date) {
      this.setDate(date);
    } else {
      this.propogateChange(inputDate);
    }
  }

  public onFocused($event): void {
    this._show();
    this.propogateTouched();
    this.onFocus.emit();
  }

  public onTab(inputDate: string): void {
    this.onChange(inputDate);
    this._hide();
    this.propogateTouched();
  }

  public parseDate(inputDate: string | Date): Date {
    // Since Date.Parse() only acceps m/d/y dates, we have to swap the day and month
    if((typeof inputDate) === 'string'){
      const dateArray = (inputDate as string).split(/[.,\/ -]/);
      if (dateArray.length === 3 && dateArray[2].length !== 0) {
        const day: string = dateArray.shift();
        dateArray.splice(1, 0, day);
  
        const parseInput: number = Date.parse(dateArray.join('/'));
        if (!isNaN(parseInput)) {
          return new Date(parseInput);
        }
      }
      return null;
    } else {
      return <Date>inputDate;
    }
  }
  public validateIsNotBeforeDate(date: Date): boolean {
    const normalisedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return normalisedDate.getTime() < this.presentDate.getTime();
  }

  public validateIsNotAfterDate(date: Date): boolean {
    const normalisedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return normalisedDate.getTime() > this.presentDate.getTime();
  }

  public createDateRangeValidator(from: Date, to: Date): (date: Date) => boolean {
    const normalisedFromDate = new Date(from.getFullYear(), from.getMonth(), from.getDate());
    const normalisedToDate = new Date(to.getFullYear(), to.getMonth(), to.getDate());

    return (date: Date) => {
      const normalisedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      return !(normalisedFromDate.getTime() <= normalisedDate.getTime() &&
        normalisedDate.getTime() <= normalisedToDate.getTime());
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

  public propogateChange(value): void {
    this.onChanged.forEach(fn => fn(value));
  }

  validate(control: AbstractControl): { [key: string]: any; } {
    const date = Date.parse(control.value);

    if (!this.required && (control.value === null || control.value === undefined)) {
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

  private _show(delay: number = this.showDelay) {

    if (this.disabled) { return; }

    const overlayRef = this._createOverlay();

    this._detach();
    this._portal = this._portal || new ComponentPortal(DatepickerComponent, this._viewContainerRef);
    this._calendarInstance = overlayRef.attach(this._portal).instance;
    this._calendarInstance.afterHidden()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    this._updateTooltipContent();
    this._calendarInstance!.show(delay);
  }

  private _hide(delay: number = this.hideDelay) {
    if (this._calendarInstance) {
      this._calendarInstance.hide(delay);
    }
  }

  private _createOverlay(): OverlayRef {
    if (this._overlayRef) {
      return this._overlayRef;
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(<HTMLElement>this._elementHtmlRef)
      .withTransformOriginOn('.hxa-datepicker-control')
      .withFlexibleDimensions(false);

    this._overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      panelClass: 'hxa-datepicker-calendar',
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });

    this._updatePosition();

    this._overlayRef.detachments()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    this._overlayRef.backdropClick().
    subscribe(() => this._hide());

    const position = this._overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges
      .pipe(takeUntil(this._destroyed))
      .subscribe((pos) => {
        if (pos.connectionPair.originX === 'start') {
          this.placement = 'left';
        } else if (pos.connectionPair.originX === 'end') {
          this.placement = 'right';
        }
       this._updateTooltipContent();
      });

    return this._overlayRef;
  }


  private _updatePosition() {
    const position =
      this._overlayRef!.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();

    position.withPositions([
      {...origin.main, ...overlay.main},
      {...origin.fallback, ...overlay.fallback}
    ]);
  }

  /**
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. `'bottom' -> 'top'`).
   */
  private _getOrigin(): {main: OriginConnectionPosition, fallback: OriginConnectionPosition} {
    const placement = this.placement;
    let originPlacement: OriginConnectionPosition;

    if (placement === 'top' || placement === 'bottom') {
      originPlacement = {originX: 'start', originY: placement === 'top' ? 'top' : 'bottom'};
    } else if (placement === 'left') {
      originPlacement = {originX: 'start', originY: 'center'};
    } else if (placement === 'right') {
      originPlacement = {originX: 'end', originY: 'center'};
    } else {
      console.error('Position error', placement);
    }

    const {x, y} = this._invertPosition(originPlacement.originX, originPlacement.originY);

    return {
      main: originPlacement,
      fallback: {originX: x, originY: y}
    };
  }

  /** Returns the overlay position and a fallback position based on the user's preference */
  private _getOverlayPosition(): {main: OverlayConnectionPosition, fallback: OverlayConnectionPosition} {
    const placement = this.placement;
    let overlayPlacement: OverlayConnectionPosition;

    if (placement === 'top') {
      overlayPlacement = {overlayX: 'start', overlayY: 'bottom'};
    } else if (placement === 'bottom') {
      overlayPlacement = {overlayX: 'start', overlayY: 'top'};
    } else if (placement === 'left') {
      overlayPlacement = {overlayX: 'end', overlayY: 'center'};
    } else if (placement === 'right') {
      overlayPlacement = {overlayX: 'start', overlayY: 'center'};
    } else {
      console.error('Could not find a position', placement);
    }

    const {x, y} = this._invertPosition(overlayPlacement.overlayX, overlayPlacement.overlayY);

    return {
      main: overlayPlacement,
      fallback: {overlayX: x, overlayY: y}
    };
  }


  private _invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos) {
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

    return {x, y};
  }

  public _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._calendarInstance = null;
    this._intervalInstance = null;
  }

  /** Updates the tooltip content and repositions the overlay according to the new content length */
  private _updateTooltipContent() {
    // Must wait for the content to be painted to the tooltip so that the overlay can properly
    // calculate the correct positioning based on the size of its contents.
    if (this._calendarInstance) {
      this._calendarInstance.selectedDate = this.date;
      this._calendarInstance.placement = this.placement;
      this._calendarInstance.validators = this.dateValidators;
      this._calendarInstance.onDateSelected = this.onDateSelectEvent;
      this._calendarInstance.allowInterval = this.interval;
      this._calendarInstance.selectedDueDateInterval = this.dueDateInterval;
      this._ngZone.onMicrotaskEmpty.asObservable().pipe(
        take(1),
        takeUntil(this._destroyed)
      ).subscribe(() => {
        if (this._calendarInstance) {
          this._overlayRef!.updatePosition();
        }
      });
    }
  }
}
