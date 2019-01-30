import { Component, OnInit, Input } from '@angular/core';
import {DatepickerFormComponent} from './datepicker-form.component';
import * as moment from 'moment';
import {DatepickerConfig} from './datepicker.config';
import {DatepickerComponent} from './datepicker.component';

@Component({
  selector: 'hxa-datepicker-interval',
  templateUrl: './datepicker-interval.component.html',
  styleUrls: ['./datepicker-interval.component.scss']
})
export class DatepickerIntervalComponent implements OnInit {

  protected close: Function;
  public Duration: any = 'days';
  public dropdownNumber: any = 0;
  public text: any =  moment().add(this.dropdownNumber , this.Duration);
  public _DueDate: string = (this.text).format('ddd DD/MM/YYYY');

  @Input()
  selectedDateInterval: Date;

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  constructor(private _datepickerForm: DatepickerFormComponent, private datePickerConfig: DatepickerConfig,
    private _datepickerComponent: DatepickerComponent) { }

  ngOnInit() {
    this.Duration = this.datePickerConfig.interval_duration;
    this.dropdownNumber = this.datePickerConfig.interval_number;
    this._DueDate = this.datePickerConfig.selected_interval;
  }

  onCancel = () => {
    this._datepickerComponent.OpenDiv = false;
  }
  onSelect = () => {
    if (this.dropdownNumber && this.Duration) {
      this.text = moment().add(this.dropdownNumber , this.Duration);
    this._DueDate = (this.text).format('ddd DD/MM/YYYY');

     return this._DueDate;
     }
  }
  onChoose() {
    this.datePickerConfig.interval_duration = this.Duration;
    this.datePickerConfig.interval_number = this.dropdownNumber;
    this.datePickerConfig.selected_interval = this._DueDate;
    this._datepickerForm.date =  new Date(this.text);
    this._datepickerComponent.OpenDiv = false;

  }

}
