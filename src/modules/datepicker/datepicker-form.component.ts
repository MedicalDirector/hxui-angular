import { Component, OnInit, ElementRef, HostListener, Input, Output, EventEmitter, forwardRef, SimpleChanges, DoCheck } from '@angular/core';
import { DateValueAccessor } from './datevalue.accessor'
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hxa-datepicker-input, hxa-datepicker-form',
  templateUrl: './datepicker-form.component.html',
  styleUrls: ['./datepicker-form.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerFormComponent),
    multi: true
  }]
})
export class DatepickerFormComponent extends DateValueAccessor implements OnInit, DoCheck {

  @Output() onDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  @Input() disabled = false;
  @Input() readonly = false;
  @Input() required = true;
  @Input() allowTextEntry = true;
  @Input() defaultToPresentDate = true;
  @Input() allowPreviousDates = true;
  @Input() dateFormat = "dd/MM/y";
  @Input() placeholder = "Date";
  @Input() align: "top" | "bottom" = "bottom";

  public date: Date;
  public visible: boolean = false;
  public presentDate: Date;
  public isValid: boolean = true;
  private hasInitialised: boolean = false;
  private validators: Array<(date: Date) => boolean> = new Array<(date: Date) => boolean>();

  constructor(private element: ElementRef) {
    super();
  }

  public setDate(date: Date): void {
    this.date = date;
    this.onDateChange.emit(date);
    this.propogateChange(date);
    this.isValid = true;
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

  // The method bound to the event emitted by the date picker component
  public onDateSelectEvent(inputDate: Date): void {
    this.unsetVisible();
    this.setDate(inputDate);
  }

  public onChange(inputDate: string): void {
    const date: Date = this.parseDate(inputDate);
    const isValid: boolean = this.validate(date);

    if (inputDate === "") {
      this.setDate(null);
    } else if (isValid) {
      this.setDate(date);
    } else {
      this.isValid = false;
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

  public validate(date: Date): boolean {
    let isValid: boolean = true;
    this.validators.forEach((validator) => {
      isValid = isValid && validator(date);
    });
    return isValid;
  }

  public registerValidator(fn: (date: Date) => boolean): void {
    this.validators.push(fn);
  }

  public validateIsNotBeforeDate(presentDate: Date): (date: Date) => boolean {
    return (date: Date) => {
      return date.getTime() >= presentDate.getTime();
    };
  }

  public validateIsNotNullOrUndefined(date: Date): boolean {
    return !!date;
  }

  ngDoCheck() {
    // this.date is set to null after NgModel is bound, we want this to run only once after NgModel has run
    if (this.defaultToPresentDate && !this.hasInitialised && this.date === null) {
      this.setDate(this.presentDate);
      this.hasInitialised = true;
    }
  }

  ngOnInit() {
    const date: Date = new Date();
    this.presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (!this.allowPreviousDates) {
      this.registerValidator(this.validateIsNotBeforeDate(this.presentDate));
    }
    this.registerValidator(this.validateIsNotNullOrUndefined);
  }
}
