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

export enum DisplayMode {
  showTab = 1,
    showCustomOnly,
    showIntervalOnly
}

export interface DateRange {
  fromDate: Date;
  toDate: Date;
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
  @Input() placement: string;
  @Input() displayMode: DisplayMode = DisplayMode.showTab;
  @Input() dateFormat: string = 'dd/MM/yyyy';

  @Output() onDateRangeSelected = new EventEmitter < DateRange > ();

  constructor(private datePipe: DatePipe, private dateRangePickerConfig: DateRangePickerConfig) {}

  public OpenDiv: Boolean = true;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  _displayRange: string;

  showIntervalOnly: boolean;
  showCustomOnly: boolean;
  showTab: boolean;

  selectedInterval = new IntervalItem('Today', 'day', 0, 'today');

  intervalList: IntervalItem[];

  ngOnInit() {
    this._displayRange = this.datePipe.transform(new Date(), this.dateFormat);
    this.showTab = this.displayMode === DisplayMode.showTab ? true : false;
    this.showIntervalOnly = this.displayMode === DisplayMode.showIntervalOnly ? true : false;
    this.showCustomOnly = this.displayMode === DisplayMode.showCustomOnly ? true : false;
    this.generateIntervalOptionItems(this.intervalOptions || []);
  }

  generateIntervalOptionItems(itemList: string[]) {
    this.intervalList = fullIntervalList.filter(item => itemList.includes(item.displayName));
  }

  hide(closeDropdown: boolean) {
    if (closeDropdown) {
      this.dropdown.hide();
    }
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
    }
  }

  createDateRange(): string {
    const fromDateStr = this.datePipe.transform(this.fromDate, this.dateFormat);
    const toDateStr = this.datePipe.transform(this.toDate, this.dateFormat);
    if(fromDateStr === toDateStr) {
      return fromDateStr;
    }
    return `${fromDateStr} - ${toDateStr}`;
  }

  onTabSelect(tabname: String) {
    this.dateRangePickerConfig.tabSelected = tabname;
  }
}
