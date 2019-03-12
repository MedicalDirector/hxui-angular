import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Input, ViewChild, ElementRef , AfterViewInit} from '@angular/core';
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
export class DatepickerIntervalComponent implements OnInit , AfterViewInit {

  @ViewChild('durationText') durationText: ElementRef;
  @ViewChild('numberText') numberText: ElementRef;
  protected close: Function;
 // public Duration: any  = 'days';
   public Duration: any ; // = 'days';
  // public dropdownNumber: any = 0;
   public dropdownNumber: any ; // = 0;
  // public text: any =  moment().add(this.dropdownNumber , this.Duration);
  public text: any ; // =  moment().add(this.dropdownNumber , this.Duration);
  // public _DueDate: string  = (this.text).format('ddd DD/MM/YYYY');
  public _DueDate: string ; // = (this.text).format('ddd DD/MM/YYYY');
  public _dueDatestring: string; // = (this.text).format('DD/MM/YYYY');
 // public _dueDatestring: string = (this.text).format('DD/MM/YYYY');
 public durationText1: any;
 public numberText1: any;
 public
  @Input()
  selectedDateInterval: Date;

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  constructor(private _datepickerForm: DatepickerFormComponent, private datePickerConfig: DatepickerConfig,
    private _datepickerComponent: DatepickerComponent) { }

  ngOnInit() {
    this.Duration = this.datePickerConfig.interval_duration;
    this.dropdownNumber = this.datePickerConfig.interval_number;
    // this._DueDate = this.datePickerConfig.selected_interval;
    this.durationText1 = this.SelectElement(this.durationText , this.Duration);
    this.numberText1 = this.SelectElement(this.numberText, this.dropdownNumber);
    this._DueDate = this.onSelectoptions(this.numberText1 , this.durationText1);
    // this._datepickerForm.onChange(this._dueDatestring);
    // this._datepickerForm.setDate(new Date(this.text));
    // this._datepickerForm.date =  new Date(this.text);
  }

  ngAfterViewInit() {
    console.log(this.durationText.nativeElement);
    console.log(this.numberText.nativeElement);
  }
  onCancel = () => {
    this._datepickerComponent.OpenDiv = false;
  }
  onSelect = () => {
    if (this.dropdownNumber && this.Duration) {
      this.text = moment().add(this.dropdownNumber , this.Duration);
      this._DueDate = (this.text).format('ddd DD/MM/YYYY');
      this._dueDatestring = (this.text).format('DD/MM/YYYY');
     return this._DueDate;
     }
  }
  onSelectoptions(numbervalue , durationValue) {
      this.text = moment().add(numbervalue , durationValue);
      this._DueDate = (this.text).format('ddd DD/MM/YYYY');
      this._dueDatestring = (this.text).format('DD/MM/YYYY');
      return this._DueDate;
  }
  public onChoose() {
    this.datePickerConfig.interval_duration = this.Duration;
    this.datePickerConfig.interval_number = this.dropdownNumber;
    // this.datePickerConfig.selected_interval = this._DueDate;
    this._datepickerForm.date =  new Date(this.text);
    this._datepickerForm.setDate(new Date(this.text));
    this._datepickerComponent.OpenDiv = false;
    this._datepickerForm.onChange(this._dueDatestring);
  }

  public SelectElement(id , valueToSelect) {
    (id.nativeElement).value = valueToSelect;
    return ((id.nativeElement).value);
  }
}
