import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Visibility } from '../enums';
import { DatepickerViewModeEnum } from './datepicker.model';

@Component({
  selector: 'hxa-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit, OnChanges {
  @HostBinding('class')
  get classes() {
    return 'hxui-reset hx-card hxa-datepicker-calendar';
  }

  @Input()
  selectedDate: Date;

  @Input()
  validators: Array<(date: Date) => boolean>;

  @Output()
  update = new EventEmitter<Date>();

  viewMode$ = new BehaviorSubject<DatepickerViewModeEnum>(
    DatepickerViewModeEnum.Days
  );
  DatepickerViewModeEnum = DatepickerViewModeEnum;
  visibilityEnum = Visibility;
  visibility: Visibility = Visibility.Hidden;
  viewDate: Date;
  days: Array<Date> = new Array<Date>();
  week: Array<string> = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];
  months: Array<string> = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
  ];
  years: Array<number> = new Array<number>();
  private presentDate: Date;
  private cellCount = 41;
  private yearCellCount = 20;

  ngOnInit(): void {
    const date: Date = this.selectedDate ? this.selectedDate : new Date();
    this.presentDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    this.viewDate =
      this.viewDate || new Date(date.getFullYear(), date.getMonth());
    this.renderCalendar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // update view date
    if (changes.selectedDate && changes.selectedDate.currentValue) {
      this.viewDate = new Date(
        this.selectedDate.getFullYear(),
        this.selectedDate.getMonth()
      );
    }
  }

  /** update and emit selected date  */
  public setSelectedDate(date: Date): void {
    if (!this.isInvalidDay(date)) {
      this.selectedDate = date;
      this.update.emit(date);
    }
  }

  // Populates the days array with the current month, and completes the view with partial dates from sibling months
  public renderCalendar(): void {
    for (let i = 0; i <= this.cellCount; i++) {
      // date will be set to the first day of the month set in this.viewDate
      const date: Date = new Date(
        this.viewDate.getFullYear(),
        this.viewDate.getMonth()
      );
      // Shifts the week to start from Monday, rather than Sunday, this causes the index to start at 1
      const dayOffset = date.getDay() === 0 ? 7 : date.getDay();
      this.days[i] = new Date(date.setDate(2 - dayOffset + i));
    }
  }

  public next() {
    if (this.viewMode$.value === DatepickerViewModeEnum.Days) {
      this.nextMonth();
    } else if (this.viewMode$.value === DatepickerViewModeEnum.Years) {
      this.nextYear();
    }
  }

  public previous() {
    if (this.viewMode$.value === DatepickerViewModeEnum.Days) {
      this.previousMonth();
    } else if (this.viewMode$.value === DatepickerViewModeEnum.Years) {
      this.previousYear();
    }
  }

  public previousMonth(): void {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() - 1
    );
    this.renderCalendar();
  }

  public nextMonth(): void {
    this.viewDate = new Date(
      this.viewDate.getFullYear(),
      this.viewDate.getMonth() + 1
    );
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
    return this.validators
      .map(fn => fn(inputDate))
      .reduce((prev, next) => prev || next, false);
  }

  public isCurrentYear(year: number): boolean {
    return year === this.presentDate.getFullYear();
  }

  public isSelectedYear(year: number): boolean {
    return year === this.viewDate.getFullYear();
  }

  public isInvalidYear(year: number): boolean {
    const newDate = new Date(
      new Date(this.viewDate.getTime()).setFullYear(year)
    );
    return this.validators
      .map(fn => fn(newDate))
      .reduce((prev, next) => prev || next, false);
  }

  public isCurrentMonthByIndex(month: number): boolean {
    return month === this.presentDate.getMonth();
  }

  public isSelectedMonthByIndex(month: number): boolean {
    return month === this.viewDate.getMonth();
  }

  public isInvalidMonthByIndex(month: number): boolean {
    const newDate = new Date(new Date(this.viewDate.getTime()).setMonth(month));
    return this.validators
      .map(fn => fn(newDate))
      .reduce((prev, next) => prev || next, false);
  }

  public previousYear(): void {
    this.getYearCollection(this.years[0] - this.yearCellCount);
  }

  public nextYear(): void {
    this.getYearCollection(this.years[0] + this.yearCellCount);
  }

  public setYear(year) {
    if (!this.isInvalidYear(year)) {
      this.viewDate.setFullYear(year);
      this.renderCalendar();
      this.toggleYear();
    }
  }

  public setMonth(month) {
    if (!this.isInvalidMonthByIndex(month)) {
      this.viewDate.setMonth(month);
      this.renderCalendar();
      this.viewMode$.next(DatepickerViewModeEnum.Days);
    }
  }

  public toggleYear() {
    this.viewMode$.next(
      this.viewMode$.value === DatepickerViewModeEnum.Years
        ? DatepickerViewModeEnum.Months
        : DatepickerViewModeEnum.Years
    );
    if (this.viewMode$.value === DatepickerViewModeEnum.Years) {
      this.getYearCollection();
    }
  }

  private getYearCollection(startFrom = null) {
    const yearsBeforeActive = 7;
    const activeYear = startFrom
      ? startFrom
      : this.viewDate.getFullYear() - yearsBeforeActive;
    this.years = [];
    for (let i = 0; i < this.yearCellCount; i++) {
      this.years.push(activeYear + i);
    }
  }
}
