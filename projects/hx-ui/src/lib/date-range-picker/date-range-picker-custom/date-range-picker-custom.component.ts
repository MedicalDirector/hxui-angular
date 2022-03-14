import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  DoCheck
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { DateSelectionType } from '../date-range-picker.component';

@Component({
  selector: 'hxa-date-range-picker-custom',
  templateUrl: './date-range-picker-custom.component.html',
  styleUrls: ['./date-range-picker-custom.component.scss']
})
export class DateRangePickerCustomComponent implements OnInit, DoCheck {
  @Input() currentFromDate: Date;
  @Input() currentToDate: Date;
  @Input() dateFormat: string;
  @Output() newSelectedCustomDate = new EventEmitter<Date[]>();
  @Output() closeDropdown = new EventEmitter<boolean>();

  constructor(private ref: ChangeDetectorRef, private datePipe: DatePipe) {}

  DateSelectionType = DateSelectionType;
  newFromDate: Date;
  newToDate: Date;

  boundaryForFromDate: string;
  boundaryForToDate: string;

  ngOnInit() {
    if (this.currentFromDate) {
      this.newFromDate = this.currentFromDate;
    } else {
      this.newFromDate = new Date();
    }
    if (this.currentToDate) {
      this.newToDate = this.currentToDate;
    } else {
      this.newToDate = new Date();
    }
    this.boundaryForToDate = this.datePipe.transform(
      this.newFromDate,
      'dd/MM/yyyy'
    );
    this.boundaryForFromDate = this.datePipe.transform(
      this.newToDate,
      'dd/MM/yyyy'
    );
    this.ref.markForCheck();
  }

  ngDoCheck(): void {
    this.boundaryForToDate = this.datePipe.transform(
      this.newFromDate,
      'dd/MM/yyyy'
    );
    this.boundaryForFromDate = this.datePipe.transform(
      this.newToDate,
      'dd/MM/yyyy'
    );
  }

  onCancel() {
    this.closeDropdown.emit(true);
  }

  onSelected() {
    // do nothing against failed basic validation
    if (
      this.newFromDate == null ||
      this.newToDate == null ||
      this.newFromDate > this.newToDate ||
      this.newToDate < this.newFromDate
    )
      return null;

    this.newSelectedCustomDate.emit([this.newFromDate, this.newToDate]);
    this.closeDropdown.emit(true);
  }
}
