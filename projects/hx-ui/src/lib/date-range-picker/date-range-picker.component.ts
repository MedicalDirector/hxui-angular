import { DatePipe } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { DropdownDirective } from '../dropdown/dropdown.directive';
import { DateRangePickerConfig } from './date-range-picker.config';
import {
  DateRange,
  DateSelectionType,
  DisplayMode
} from './date-range-picker.model';
import { fullIntervalList, IntervalItem } from './interval-option-model';

@Component({
  selector: 'hxa-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss']
})
export class DateRangePickerComponent implements OnInit {
  @ViewChild('dropdown', { static: true }) dropdown: DropdownDirective;

  /** Specifies interval options displayed under interval selection tab. */
  @Input() intervalOptions: string[];

  /** This attribute specifies the placeholder value of the components input element. */
  @Input() placeholder = 'Date';

  /** Adds the disabled html attribute to the components dropdown element. */
  @Input() disabled = false;

  /**
   * Indicates that dropdown will be closed on item or document
   * click, and after pressing ESC.
   */
  @Input() autoClose = true;

  /** Specifies the position the datepicker opens against the input element */
  @Input() placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  /** Specifies how tab(s) will be displayed. */
  @Input() displayMode: DisplayMode = DisplayMode.showTab;

  /**
   * A JavaScript Date object formatting string, formats the display
   * of components current value.
   */
  @Input() dateFormat = 'dd/MM/yyyy';

  @Input() defaultDateRange: DateRange = {
    fromDate: new Date(),
    toDate: new Date()
  };

  /** Specifies whether caret down icon is displayed to right of input */
  @Input() showCaretDown = true;

  /**
   * Emits a Date Range Object containing fromDate and toDate
   * selected from the DateRangePicker.
   */
  @Output() onDateRangeSelected = new EventEmitter<DateRange>();

  constructor(
    private datePipe: DatePipe,
    private dateRangePickerConfig: DateRangePickerConfig
  ) {}

  // import to DateSElectionType into the instance of this class
  DateSelectionType = DateSelectionType;
  currentTab: DateSelectionType = DateSelectionType.interval;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  _displayRange: string;

  showIntervalOnly: boolean;
  showCustomOnly: boolean;
  showTab: boolean;

  selectedInterval = new IntervalItem('Today', 'day', 0, 'today');

  intervalList: IntervalItem[];

  ngOnInit() {
    this.setInitialDateRange();
    this.showTab = this.displayMode === DisplayMode.showTab;
    this.showIntervalOnly = this.displayMode === DisplayMode.showIntervalOnly;
    this.showCustomOnly = this.displayMode === DisplayMode.showCustomOnly;
    this.generateIntervalOptionItems(this.intervalOptions || []);
  }

  setInitialDateRange() {
    this.defaultDateRange = this.defaultDateRange || {
      fromDate: new Date(),
      toDate: new Date()
    };
    this.dateFormat = this.dateFormat || 'dd/MM/yyyy';
    this.fromDate = this.defaultDateRange.fromDate;
    this.toDate = this.defaultDateRange.toDate;
    this._displayRange = this.createDateRange();
  }

  resetDateRange() {
    this.fromDate = new Date();
    this.toDate = new Date();
    this._displayRange = this.createDateRange();
  }

  generateIntervalOptionItems(itemList: string[]) {
    this.intervalList = fullIntervalList.filter(item =>
      itemList.includes(item.displayName)
    );
  }

  hide(closeDropdown: boolean) {
    if (closeDropdown) {
      this.dropdown.hide();
    }
  }

  toggle() {
    this.dropdown.toggle();
  }

  onCustomDateSelection(newCustomDate: Date[]) {
    // do not update range if undefined, null[], from > to
    if (
      !newCustomDate ||
      newCustomDate[0] == null ||
      newCustomDate[1] == null ||
      newCustomDate[0] > newCustomDate[1]
    ) {
      return null;
    }

    this.fromDate = newCustomDate[0];
    this.toDate = newCustomDate[1];
    this._displayRange = this.createDateRange();
    this.onDateRangeSelected.emit(<DateRange>{
      fromDate: this.fromDate,
      toDate: this.toDate
    });
    this.currentTab = DateSelectionType.custom;
    this.selectedInterval = null;
  }

  onIntervalSelection(selectedItem: IntervalItem) {
    if (selectedItem) {
      this.selectedInterval = selectedItem;
      const today: Date = new Date();
      let calculatedDate: Date;
      if (selectedItem.unit === 'day') {
        calculatedDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate() + selectedItem.count
        );
      } else if (selectedItem.unit === 'month') {
        calculatedDate = new Date(
          today.getFullYear(),
          today.getMonth() + selectedItem.count,
          today.getDate()
        );
      } else if (selectedItem.unit === 'year') {
        calculatedDate = new Date(
          today.getFullYear() + selectedItem.count,
          today.getMonth(),
          today.getDate()
        );
      }

      if (calculatedDate >= today) {
        this.fromDate = today;
        this.toDate = calculatedDate;
      } else {
        this.fromDate = calculatedDate;
        this.toDate = today;
      }
      this._displayRange = this.createDateRange();

      this.onDateRangeSelected.emit(<DateRange>{
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
