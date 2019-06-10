import {
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import {
  DatePipe
} from '@angular/common';
import {
  DropdownDirective
} from '../dropdown/dropdown.directive';
import {
  IntervalItem
} from './interval-option-model';
import {
  DateRangePickerConfig
} from './date-range-picker.config';
import {
  fullIntervalList
} from './interval-option-model';
import { identifierModuleUrl } from '@angular/compiler';

export enum DisplayMode {
  showTab = 1,
    showCustomOnly,
    showIntervalOnly
}

export interface DateRange {
  fromDate: Date;
  toDate: Date;
}

//expanded when more tabs be added
export enum DateSelectionType {
  interval,
  custom
}

@Component({
  selector: 'hxa-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {

  @ViewChild('dropdown') dropdown: DropdownDirective;

  @Input() intervalOptions: string[];
  @Input() placeholder: string = 'Date';
  @Input() disabled: boolean = false;
  @Input() autoClose: boolean = true;
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() displayMode: DisplayMode = DisplayMode.showTab;
  @Input() dateFormat: string = 'dd/MM/yyyy';
  @Input() defaultDateRange: DateRange = {fromDate:new Date(), toDate:new Date()};
  @Input() id: number;
  @Input() showCaretDown: boolean = true;

  @Output() onDateRangeSelected = new EventEmitter < DateRange > ();

  constructor(private datePipe: DatePipe, private dateRangePickerConfig: DateRangePickerConfig) {}

  // import to DateSElectionType into the instance of this class
  DateSelectionType = DateSelectionType;
  currentTab: DateSelectionType = DateSelectionType.interval
  fromDate: Date;
  toDate: Date;
  _displayRange: string;

  showIntervalOnly: boolean;
  showCustomOnly: boolean;
  showTab: boolean;

  selectedInterval = new IntervalItem('Today', 'day', 0, 'today');

  intervalList: IntervalItem[];

  ngOnInit() {
    this.setInitialDateRange();
    this.showTab = this.displayMode === DisplayMode.showTab ? true : false;
    this.showIntervalOnly = this.displayMode === DisplayMode.showIntervalOnly ? true : false;
    this.showCustomOnly = this.displayMode === DisplayMode.showCustomOnly ? true : false;
    this.generateIntervalOptionItems(this.intervalOptions || []);
  }

  setInitialDateRange(){
    this.defaultDateRange = this.defaultDateRange || {fromDate:new Date(), toDate:new Date()};
    this.dateFormat = this.dateFormat || 'dd/MM/yyyy';
    this.fromDate = this.defaultDateRange.fromDate;
    this.toDate =  this.defaultDateRange.toDate;
    this._displayRange = this.createDateRange();
  }

  resetDateRange() {
    this.fromDate = new Date();
    this.toDate = new Date();
    this._displayRange = this.createDateRange();
  }

  generateIntervalOptionItems(itemList: string[]) {
    this.intervalList = fullIntervalList.filter(item => itemList.includes(item.displayName));
  }

  hide(closeDropdown: boolean) {
    if (closeDropdown) {
      this.dropdown.hide();
    }
  }

  toggle(){
    this.dropdown.toggle(); 
  }

  onCustomDateSelection(newCustomDate: Date[]) {
    if (newCustomDate) {
      this.fromDate = newCustomDate[0];
      this.toDate = newCustomDate[1];
      this._displayRange = this.createDateRange();
      this.onDateRangeSelected.emit( < DateRange > {
        fromDate: this.fromDate,
        toDate: this.toDate
      });
      this.currentTab = DateSelectionType.custom;
      this.selectedInterval = null;
    }
  }

  onIntervalSelection(selectedItem: IntervalItem) {
    if (selectedItem) {
      this.selectedInterval = selectedItem;
      const today: Date = new Date();
      let calculatedDate: Date;
      if (selectedItem.unit === 'day') {
        calculatedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + selectedItem.count);
      } else if (selectedItem.unit === 'month') {
        calculatedDate = new Date(today.getFullYear(), today.getMonth() + selectedItem.count, today.getDate());
      } else if (selectedItem.unit === 'year') {
        calculatedDate = new Date(today.getFullYear() + selectedItem.count, today.getMonth(), today.getDate());
      }

      if (calculatedDate >= today) {
        this.fromDate = today;
        this.toDate = calculatedDate;
      } else {
        this.fromDate = calculatedDate;
        this.toDate = today;
      }
      this._displayRange = this.createDateRange();

      this.onDateRangeSelected.emit( < DateRange > {
        fromDate: this.fromDate,
        toDate: this.toDate
      });
      this.currentTab = DateSelectionType.interval;
    }
  }

  createDateRange(): string {
    const fromDateStr = this.datePipe.transform(this.fromDate, this.dateFormat);
    const toDateStr = this.datePipe.transform(this.toDate, this.dateFormat);
    if (fromDateStr === toDateStr) {
      return fromDateStr;
    }
    return `${fromDateStr} - ${toDateStr}`;
  }
}
