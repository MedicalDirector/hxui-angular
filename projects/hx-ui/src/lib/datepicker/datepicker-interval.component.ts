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


  @Input()
  selectedDateInterval: Date;

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  constructor(private _datepickerForm: DatepickerFormComponent, private datePickerConfig: DatepickerConfig,
    private _datepickerComponent: DatepickerComponent) { }

  ngOnInit() {
    const selectedDueDateInterval = this.datePickerConfig.selectedDueDateInterval === undefined ?
      (this._datepickerComponent.selectedDueDateInterval ? this._datepickerComponent.selectedDueDateInterval.split(' ') : undefined) :
      this.datePickerConfig.selectedDueDateInterval.split(' ');
    if (selectedDueDateInterval && selectedDueDateInterval.length > 1) {
      this.dropdownNumber = selectedDueDateInterval[0];
      this.Duration = selectedDueDateInterval[1];
    }
    if (this.Duration === 'day' || this.Duration === 'week' || this.Duration === 'month' || this.Duration === 'year') {
      this.Duration = this.Duration + '(s)';
    } else if (this.Duration === 'days' || this.Duration === 'weeks' || this.Duration === 'months' || this.Duration === 'years') {
      this.Duration = this.Duration.replace('s', '(s)');
    }
    this.datePickerConfig.selectedDueDateInterval = this.dropdownNumber + ' ' + this.Duration;
    if (this.datePickerConfig && this.datePickerConfig.tabSelected === 'tab2') {
      this.text = moment().add(this.dropdownNumber, this.Duration.replace('(s)', 's'));
      this._DueDate = (this.text).format('ddd DD/MM/YYYY');
    } else {
      this.durationText1 = this.SelectElement(this.durationText, this.Duration);
      this.numberText1 = this.SelectElement(this.numberText, this.dropdownNumber);
      this._DueDate = this.onSelectoptions(this.numberText1, this.durationText1);
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
    this.datePickerConfig.selectedDueDateInterval = this.dropdownNumber + ' ' + this.Duration;
    this._datepickerForm.onChange(this._dueDatestring);
  }

  public SelectElement(id , valueToSelect) {
    (id.nativeElement).value = valueToSelect;
    return ((id.nativeElement).value);
  }
}
