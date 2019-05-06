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
import { DateRangePickerConfig } from './date-range-picker.config';

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

  @Output() onDateRangeSelected =  new EventEmitter<DateRange>();

  constructor(private datePipe: DatePipe,private dateRangePickerConfig: DateRangePickerConfig) {}

  public OpenDiv: Boolean = true;
  fromDate: Date = new Date();
  toDate: Date = new Date();
  _displayRange: string = this.datePipe.transform(new Date(), 'dd/MM/yyyy');

  showIntervalOnly: boolean;
  showCustomOnly: boolean;
  showTab: boolean;

  selectedInterval = new IntervalItem('Today','day',0,'today');

  public fullIntervalList: IntervalItem[] = [
    new IntervalItem('Today','day',0,'today'),
    new IntervalItem('Yesterdy','day', -1,'yesterday'),
    new IntervalItem('Tomorrow','day',1,'tomorrow'),
    new IntervalItem('Last Year','year',-1,'lastyear'),
    new IntervalItem('Next Year','year',1,'nextyear'),
    new IntervalItem('Last 6 Months','month',-6,'last6month'),
    new IntervalItem('Next 6 Months','month',6,'next6months'),
    new IntervalItem('Last 3 Months','month',-3,'last3months'),
    new IntervalItem('Next 3 Months','month',3,'next3months'),
    new IntervalItem('Last Month','month',-1,'lastmonth'),
    new IntervalItem('Next Month','month',1,'nextmonth'),
    new IntervalItem('Last Week','day',-1*7,'lastweek'),
    new IntervalItem('Next Week','day',1*7,'nextweek'),
    new IntervalItem('Last Fortnight','day',-1*14,'lastfortnight'),
    new IntervalItem('Next Fortnight','day',1*14,'nextfortnight')
];

  intervalList: IntervalItem[];

  ngOnInit() {
    this.showTab = this.displayMode === DisplayMode.showTab? true: false;
    this.showIntervalOnly = this.displayMode === DisplayMode.showIntervalOnly? true: false;
    this.showCustomOnly = this.displayMode === DisplayMode.showCustomOnly? true: false;
    this.generateIntervalOptionItems(this.intervalOptions);
  }

  generateIntervalOptionItems(itemList:string[]){
    this.intervalList = this.fullIntervalList.filter(item => itemList.includes(item.displayName));
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
      this._displayRange = this.fromDate.valueOf() === this.toDate.valueOf() ? this.datePipe.transform(this.fromDate, 'dd/MM/yyyy') : this.datePipe.transform(this.fromDate, 'dd/MM/yyyy') + ' - ' + this.datePipe.transform(this.toDate, 'dd/MM/yyyy');
      this.onDateRangeSelected.emit(<DateRange>{fromDate:this.fromDate, toDate:this.toDate});
    }
  }

  
  onIntervalSelection(selectedItem: IntervalItem){
    if(selectedItem) {
      this.selectedInterval = selectedItem;
      const today: Date = new Date();
      let calculatedDate: Date;
      if(selectedItem.unit==='day')
        {
          calculatedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + selectedItem.count);
        }
        else if(selectedItem.unit==='month')
        {
           calculatedDate = new Date(today.getFullYear(), today.getMonth()+ selectedItem.count, today.getDate());
        }
        else if(selectedItem.unit==='year')
        {
           calculatedDate = new Date(today.getFullYear()+ selectedItem.count, today.getMonth(), today.getDate());
        }

        if(calculatedDate >= today){
          if(calculatedDate == today){
            this._displayRange = this.datePipe.transform(today, 'dd/MM/yyyy');
          }
          else {
          this._displayRange = this.datePipe.transform(today, 'dd/MM/yyyy') + ' - ' + this.datePipe.transform(calculatedDate, 'dd/MM/yyyy');
          }
          this.fromDate = today;
          this.toDate = calculatedDate;
        }
        else {
          this._displayRange = this.datePipe.transform(calculatedDate, 'dd/MM/yyyy') + ' - ' + this.datePipe.transform(today, 'dd/MM/yyyy');
          this.fromDate = calculatedDate;
          this.toDate = today;
        }
        this.onDateRangeSelected.emit(<DateRange>{fromDate:this.fromDate, toDate:this.toDate});
       }
    }
  
  onTabSelect(tabname: String) {
     this.dateRangePickerConfig.tabSelected = tabname;
  }
}
