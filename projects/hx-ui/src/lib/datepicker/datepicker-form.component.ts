import { Component, Input, Output, OnInit, ElementRef, HostListener, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, ControlValueAccessor, Validator, AbstractControl } from '@angular/forms';

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
export class DatepickerFormComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = false;
  @Input() defaultToPresentDate = true;
  @Input() allowPreviousDates = true;
  @Input() allowFutureDates = true;
  @Input() dateFormat = "dd/MM/y";
  @Input() placeholder = "Date";
  @Input() helpText = "Please select a date";
  @Input() align: "top" | "bottom" = "bottom";
  @Input() from = '';
  @Input() to = '';

  @Output() onDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  public date: Date;
  public visible: boolean = false;
  public presentDate: Date;
  public isValid: boolean;
  public dateValidators = new Array<(date: Date) => boolean>();
  private onChanged = new Array<(value: Date) => void>();
  private onTouched = new Array<() => void>();

  private validateDateRange: (date: Date) => boolean;

  constructor(private element: ElementRef) { }

  ngOnInit(): void {
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

    if (!this.allowPreviousDates)
      this.dateValidators.push(this.validateIsNotBeforeDate.bind(this));
    if (!this.allowFutureDates)
      this.dateValidators.push(this.validateIsNotAfterDate.bind(this));
  }

  public setDate(date: Date): void {
    this.date = date;
    this.onDateChange.emit(date);
    this.propogateChange(date);
  }

  public setVisible(): void {
    this.visible = true;
  }

  public unsetVisible(): void {
    this.visible = false;
  }

  @HostListener('document:click', ['$event.target'])
  public onClickOutsideComponent(targetElement: HTMLElement): void {
    if (!this.element.nativeElement.firstChild.contains(targetElement)) {
      this.unsetVisible();
    }
  }

  public onDateSelectEvent(inputDate: Date): void {
    this.unsetVisible();
    this.setDate(inputDate);
  }

  public onChange(inputDate: string): void {
    const date: Date = this.parseDate(inputDate);

    if (inputDate == "") {
      this.setDate(null);
    } else if (!!date) {
      this.setDate(date);
    } else {
      this.propogateChange(inputDate);
    }
  }

  public onFocus(): void {
    this.setVisible();
    this.propogateTouched();
  }

  public onTab(inputDate: string): void {
    this.onChange(inputDate);
    this.unsetVisible();
    this.propogateTouched();
  }

  public parseDate(inputDate: string): Date {
    // Since Date.Parse() only acceps m/d/y dates, we have to swap the day and month
    let dateArray = inputDate.split(/[.,\/ -]/);
    if (dateArray.length == 3 && dateArray[2].length != 0) {
      let day: string = dateArray.shift();
      dateArray.splice(1, 0, day);

      let parseInput: number = Date.parse(dateArray.join("/"));
      if (!isNaN(parseInput)) {
        return new Date(parseInput);
      }
    }
    return null;
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
    this.setDate(value);
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
      }
    }

    if (!this.allowPreviousDates && this.validateIsNotBeforeDate(this.date)) {
      this.isValid = false;
      return {
        previousDateError: {
          valid: false
        }
      }
    }

    if (!this.allowFutureDates && this.validateIsNotAfterDate(this.date)) {
      this.isValid = false;
      return {
        futureDateError: {
          valid: false
        }
      }
    }

    if (this.validateDateRange && this.validateDateRange(this.date)) {
      this.isValid = false;
      return {
        dateRangeError: {
          valid: false
        }
      }
    }

    if (this.required && !this.date) {
      this.isValid = false;
      return {
        dateRequiredError: {
          valid: false
        }
      }
    }

    this.isValid = true;
    return null;
  }
}
