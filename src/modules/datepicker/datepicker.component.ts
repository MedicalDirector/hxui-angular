import {Component, OnInit, EventEmitter, Output, Input, SimpleChanges, OnChanges, ElementRef} from '@angular/core';
import {PositioningService} from '../positioning';

@Component({
  selector: 'hxa-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, OnChanges {  
  @Input() public selectedDate: Date;
  @Input() public validators: Array<(date: Date) => boolean>;
  
  @Output() public onDateSelected: EventEmitter<Date> = new EventEmitter<Date>();

  public viewDate: Date;
  public days: Array<Date> = new Array<Date>();
  public week: Array<string> = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  private presentDate: Date;
  private cellCount = 41;

  constructor(
    private hostElement: ElementRef,
    private positioningService: PositioningService) { }

  // Populates the days array with the current month, and completes the view with partial dates from sibling months
  public renderCalendar(): void {
    for (let i = 0; i <= this.cellCount; i++) {
      // date will be set to the first day of the month set in this.viewDate
      const date: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth());
      // Shifts the week to start from Monday, rather than Sunday, this causes the index to start at 1
      const dayOffset = date.getDay() === 0 ? 7 : date.getDay();
      this.days[i] = new Date(date.setDate(2 - dayOffset + i));
    }
  }

  // TODO: Maybe we should move all of this logic into the positioning service?
  private positionCalendar(): void {
    const rect = this.hostElement.nativeElement.getBoundingClientRect();
    const buffer = 10;
    if (this.positioningService.isElementBelowTheFold(this.hostElement.nativeElement)) {
      this.hostElement.nativeElement.style.top = (rect.top - (rect.top + rect.height + buffer)) + 'px';
    }
  }

  public previousMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1);
    this.renderCalendar();
  }

  public nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1);
    this.renderCalendar();
  }

  public isCurrentMonth(inputDate: Date): boolean {
    return inputDate.getMonth() === this.viewDate.getMonth();
  }

  public isCurrentDay(inputDate: Date): boolean {
    return inputDate.getTime() === this.presentDate.getTime();
  }

  public isSelectedDay(inputDate: Date): boolean {
    if (this.selectedDate) {
      return inputDate.getTime() === this.selectedDate.getTime();
    }

    return false;
  }

  public isInvalidDay(inputDate: Date): boolean {
    return this.validators.map((fn) => fn(inputDate)).reduce((prev, next) => prev || next, false);
  }

  public setSelectedDate(date: Date): void {
    if (!this.isInvalidDay(date)) {
      this.selectedDate = date;
      this.onDateSelected.emit(date);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!changes.selectedDate.currentValue) {
      this.viewDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
    }
  }

  ngOnInit(): void {
    const date: Date = new Date();
    this.presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.viewDate = this.viewDate || new Date(date.getFullYear(), date.getMonth());
    this.renderCalendar();
    this.positionCalendar();
  }
}
