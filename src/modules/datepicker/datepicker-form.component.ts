import { Component, OnInit, ElementRef, HostListener, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { DateValueAccessor } from './datevalue.accessor'
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'hx-datepicker-form',
  templateUrl: './datepicker-form.component.html',
  styleUrls: ['./datepicker-form.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatepickerFormComponent),
    multi: true
  }]
})
export class DatepickerFormComponent extends DateValueAccessor implements OnInit {

  @Output() onDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  @Input() isDisabled: boolean = false;
  @Input() allowTextEntry: boolean = true;
  @Input() defaultToPresentDate: boolean = true;
  @Input() allowPreviousDates: boolean = true;
  @Input() dateFormat: string = "dd/MM/y";
  @Input() placeholder: string = "Date";

  public visible: boolean = false;
  public date: Date;
  public presentDate: Date;
  public isValid: boolean = true;
  private validators: Array<(date: Date) => boolean> = new Array<(date: Date) => boolean>();

  constructor(private element: ElementRef) {
    super();
   }

  public setVisible(): void {
      this.visible = true;
  }

  public setDate(date: Date): void {
    let isValid: boolean = this.validate(date);    

    if (isValid) {
      this.date = date;
      this.onDateChange.emit(date);
      this.propogateChange(date);
    }
  }

  @HostListener('document:click', ['$event.target'])
  public unsetVisible(targetElement: HTMLElement): void {
    if (!this.element.nativeElement.contains(targetElement)) {
      this.visible = false;
    }
  }

  // The method bound to the event emitted by the date picker component
  public onDateSelectEvent(inputDate: Date): void {
    this.visible = false;
    this.setDate(inputDate);
  }

  public onChange(inputDate: string): void {
    let date: Date = this.parseDate(inputDate);
    if (!!date) {
      this.setDate(date);
    } else {
      this.isValid = false;
    }
  }

  public onClick(): void {
    this.setVisible();
    this.propogateTouched();
  }

  public onFocus(): void {
    this.propogateTouched();
  }

  public parseDate(inputDate: string): Date {
    // Since Date.Parse() cannot read d/m/y dates, we have to swap the day and month
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
    this.isValid = isValid;
    return isValid;
  }

  public registerValidator(fn: (date: Date) => boolean): void {
    this.validators.push(fn);
  }

  public validateIsNotBeforeDate(presentDate: Date): (date: Date) => boolean {
    return (date: Date) => {
      return date.getTime() >= presentDate.getTime();
    }
  }

  ngOnInit() {
    if (this.defaultToPresentDate) {
      let date: Date = new Date();
      this.date = this.presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    if (!this.allowPreviousDates) {
      this.registerValidator(this.validateIsNotBeforeDate(this.presentDate));
    }
  }
}
