import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import {DatepickerFormComponent} from './datepicker-form.component';
import * as moment_ from 'moment';
const moment = moment_;
import {DatepickerConfig} from './datepicker.config';
import {DatepickerComponent} from './datepicker.component';

@Component({
  selector: 'hxa-datepicker-interval',
  templateUrl: './datepicker-interval.component.html',
  styleUrls: ['./datepicker-interval.component.scss']
})
export class DatepickerIntervalComponent implements OnInit {

  @ViewChild('durationText') durationText: ElementRef;
  @ViewChild('numberText') numberText: ElementRef;
  protected close: Function;
  public Duration: any ; // = 'day(s)';
  public dropdownNumber: any ; // = 0;
  public text: any ; // =  moment().add(this.dropdownNumber , this.Duration);
  public _DueDate: string ;
  public _dueDatestring: string;
  public durationText1: any;
  public numberText1: any;
  // public oldDate: Date;


  @Input()
  selectedDateInterval: Date;

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';


  constructor(private _datepickerForm: DatepickerFormComponent, private datePickerConfig: DatepickerConfig,
    private _datepickerComponent: DatepickerComponent) { }

  ngOnInit() {
   // if(this.datePickerConfig.tabSelected === 'tab1') {
     if( this._datepickerComponent.selectedDueDateInterval) {
    const selectedDueDateInterval = this._datepickerComponent.selectedDueDateInterval ? this._datepickerComponent.selectedDueDateInterval.split(' ') : undefined;
    if (selectedDueDateInterval && selectedDueDateInterval.length > 1 ) {
      this.dropdownNumber = selectedDueDateInterval[0];
      this.Duration = selectedDueDateInterval[1];
    }

    if (this.Duration === 'day' || this.Duration === 'week' || this.Duration === 'month' || this.Duration === 'year') {
      this.Duration = this.Duration + '(s)';
    } else if (this.Duration === 'days' || this.Duration === 'weeks' || this.Duration === 'months' || this.Duration === 'years') {
      this.Duration = this.Duration.replace('s', '(s)');
    }
    this.durationText1 = this.SelectElement(this.durationText , this.Duration);
    this.numberText1 = this.SelectElement(this.numberText, this.dropdownNumber);
    this._DueDate = this.onSelectoptions(this.numberText1 , this.durationText1);
   else if ( this.datePickerConfig) {
     if(this.datePickerConfig.tabSelected === 'tab1') {
    this.Duration = this.datePickerConfig.interval_duration;
    this.dropdownNumber = this.datePickerConfig.interval_number;
    this.text = moment().add(this.dropdownNumber , this.Duration.replace('(s)', 's'));
    this._DueDate = (this.text).format('ddd DD/MM/YYYY');
    this._dueDatestring = (this.text).format('DD/MM/YYYY');
    this._datepickerForm.onChange(this._dueDatestring);
     }
     else {
       if(this._datepickerComponent.selectedDate) {
         this._datepickerForm.setDate(new Date(this._datepickerComponent.selectedDate));
         this.Duration = this.datePickerConfig.interval_duration;
         this.dropdownNumber = this.datePickerConfig.interval_number;
         this.text = this.datePickerConfig.text; //moment().add(this.dropdownNumber , this.Duration.replace('(s)', 's'));
       }
     }
  }
  }

  onCancel = () => {
    this._datepickerComponent.OpenDiv = false;
  }
  onSelect = () => {
    if (this.dropdownNumber && this.Duration) {
      this.text = moment().add(this.dropdownNumber , this.Duration.replace('(s)', 's'));
      this._DueDate = (this.text).format('ddd DD/MM/YYYY');
      this._dueDatestring = (this.text).format('DD/MM/YYYY');
     return this._DueDate;
     }
  }
  onSelectoptions(numbervalue , durationValue) {
      this.text = moment().add(numbervalue , durationValue.replace('(s)', 's'));
      this._DueDate = (this.text).format('ddd DD/MM/YYYY');
      this._dueDatestring = (this.text).format('DD/MM/YYYY');
      this._datepickerForm.onChange(this._dueDatestring);
      return this._DueDate;
  }
  public onChoose() {
    this._datepickerForm.date =  new Date(this.text);
    this._datepickerForm.setDate(new Date(this.text));
    this._datepickerComponent.OpenDiv = false;
    this._datepickerForm.onChange(this._dueDatestring);

    this.datePickerConfig.interval_duration = this.Duration;
    this.datePickerConfig.interval_number = this.dropdownNumber;
    this.datePickerConfig.text = moment().add(this.datePickerConfig.interval_number , this.datePickerConfig.interval_duration.replace('(s)', 's'));
    // this.datePickerConfig.selected_interval = this._DueDate;
  }

  public SelectElement(id , valueToSelect) {
    (id.nativeElement).value = valueToSelect;
    return ((id.nativeElement).value);
  }
}
