import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'hxa-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Output() public onDateSelected: EventEmitter<Date> = new EventEmitter<Date>();

  // The month/year that the view binds to
  @Input() public selectedDate: Date;

  public viewDate: Date;
  public days: Array<Date> = new Array<Date>();
  public week: Array<string> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  private presentDate: Date;
  private cellCount: number = 41;

  constructor() {
  }

  // Populates the days array with the current month, and completes the view with partial dates from sibling months
  public renderCalendar() {
    for (let i = 0; i <= this.cellCount; i++) {
      // date will be set to the first day of the month set in this.viewDate
      let date: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth());
      // Shifts the week to start from Monday, rather than Sunday, this causes the index to start at 1
      let dayOffset = date.getDay() == 0 ? 7 : date.getDay();
      this.days[i] = new Date(date.setDate(2 - dayOffset + i));
    }
  }

  public previousMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1);
    this.renderCalendar();
  }

  public nextMonth() {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1);
    this.renderCalendar();
  }

  public isCurrentMonth(inputDate: Date): boolean {
    return inputDate.getMonth() == this.viewDate.getMonth();
  }

  public isCurrentDay(inputDate: Date): boolean {
    return inputDate.getTime() == this.presentDate.getTime();
  }

  public isSelectedDay(inputDate: Date): boolean {
    if (this.selectedDate)
      return inputDate.getTime() == this.selectedDate.getTime();

    return false;
  }

  public setSelectedDate(date: Date): void {
    this.selectedDate = date;
    this.onDateSelected.emit(date);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.selectedDate.currentValue) {
      this.viewDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
    }
  }

  ngOnInit() {
    let date: Date = new Date();
    this.presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.viewDate = this.viewDate || new Date(date.getFullYear(), date.getMonth());
    this.renderCalendar();
  }
}