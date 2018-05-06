import { OnInit, EventEmitter, SimpleChanges, OnChanges, ElementRef } from '@angular/core';
import { PositioningService } from '../positioning';
export declare class DatepickerComponent implements OnInit, OnChanges {
    private hostElement;
    private positioningService;
    onDateSelected: EventEmitter<Date>;
    selectedDate: Date;
    viewDate: Date;
    days: Array<Date>;
    week: Array<string>;
    private presentDate;
    private cellCount;
    constructor(hostElement: ElementRef, positioningService: PositioningService);
    renderCalendar(): void;
    private positionCalendar();
    previousMonth(): void;
    nextMonth(): void;
    isCurrentMonth(inputDate: Date): boolean;
    isCurrentDay(inputDate: Date): boolean;
    isSelectedDay(inputDate: Date): boolean;
    setSelectedDate(date: Date): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
}
