import { OnInit, EventEmitter, SimpleChanges } from '@angular/core';
export declare class DatepickerComponent implements OnInit {
    onDateSelected: EventEmitter<Date>;
    selectedDate: Date;
    viewDate: Date;
    days: Array<Date>;
    week: Array<string>;
    private presentDate;
    private cellCount;
    constructor();
    renderCalendar(): void;
    previousMonth(): void;
    nextMonth(): void;
    isCurrentMonth(inputDate: Date): boolean;
    isCurrentDay(inputDate: Date): boolean;
    isSelectedDay(inputDate: Date): boolean;
    setSelectedDate(date: Date): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
}
