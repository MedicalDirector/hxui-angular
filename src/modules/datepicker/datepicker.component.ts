import { Component, OnInit, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'hx-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  @Output() public onDateSelected: EventEmitter<Date> = new EventEmitter<Date>();

  // The month/year that the view binds to
  @Input() public selectedDate: Date;
  @Input() public validate: (date: Date) => boolean = (date: Date) => true;

  public viewDate: Date;
  public days: Array<Date> = new Array<Date>();
  private week: Array<string> = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  private presentDate: Date;
  private cellCount: number = 41;

  constructor() { 
  }

  // Populates the days array with the current month, days not in the current month that are in the same week,
  // for example, look at the windows calendar, rather than display blank spaces, days from sibling months are populated as well
  public renderCalendar() {
    for (let i = 0; i <= this.cellCount; i++) {
      // date will be set to the first day of the month held in this.viewDate
      let date: Date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth());
      // Shifts the week to start from Monday at index 1, rather than Sunday at index 0
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
    if (this.validate(date)) {
      this.selectedDate = date;
      this.onDateSelected.emit(date);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!!changes.selectedDate)
      this.viewDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
  }

  ngOnInit() {
    let date: Date = new Date();
    this.presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    this.viewDate = this.viewDate || new Date(date.getFullYear(), date.getMonth());
    this.renderCalendar();
  }

}
