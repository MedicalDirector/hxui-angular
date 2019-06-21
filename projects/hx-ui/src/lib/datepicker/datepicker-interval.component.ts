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
  public selectedDuration: string;
  private presentDate: Date;
  viewDate: Date;

  @Input()
  selectedDateInterval: Date;

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  constructor(private _datepickerForm: DatepickerFormComponent, private datePickerConfig: DatepickerConfig,
    private _datepickerComponent: DatepickerComponent) {
     }

  ngOnInit() {
    const selectedDueDateInterval = this.datePickerConfig.selectedDueDateInterval === undefined ?
     (this._datepickerComponent.selectedDueDateInterval ? this._datepickerComponent.selectedDueDateInterval.split(' ') : undefined) :
      this.datePickerConfig.selectedDueDateInterval.split(' ');
    if (selectedDueDateInterval && selectedDueDateInterval.length > 1) {
      this.dropdownNumber = selectedDueDateInterval[0];
      this.Duration = this.resetDurationText(selectedDueDateInterval[1]);
      if (this.datePickerConfig && this.datePickerConfig.tabSelected === 'tab1') {
        this.durationText1 = this.SelectElement(this.durationText, this.Duration);
        this.numberText1 = this.SelectElement(this.numberText, this.dropdownNumber);
        this._DueDate = this.onSelectoptions(this.numberText1, this.durationText1);
      } else if (this.datePickerConfig && this.datePickerConfig.tabSelected === 'tab2') {
        this.text = moment().add(this.dropdownNumber, this.Duration.replace('(s)', 's'));
        this._DueDate = (this.text).format('ddd DD/MM/YYYY');
        this.durationText1 = this.Duration;
        this.numberText1 = this.dropdownNumber;
      }
    }
  }

  onCancel = () => { 
    this.text = moment().add(this.numberText1 , this.durationText1.replace('(s)', 's'));
    this._DueDate = this.onSelectoptions(this.numberText1, this.durationText1);
    this._datepickerForm.dueDateInterval = this.numberText1 + ' ' + this.durationText1;
    this._datepickerComponent.selectedDueDateInterval = this.numberText1 + ' ' + this.durationText1;
    this._datepickerComponent.OpenDiv = false;
    this._datepickerForm._detach();
  }
  onSelect = () => {
    if (this.dropdownNumber && this.Duration && this.dropdownNumber > 0) {
      this.text = moment().add(this.dropdownNumber , this.Duration.replace('(s)', 's'));
    } else if (this.dropdownNumber === 0 || this.dropdownNumber < 0) {
      this.dropdownNumber = 0;  
        this.text = moment(new Date());
    }
      this._DueDate = (this.text).format('ddd DD/MM/YYYY');
      this._dueDatestring = (this.text).format('DD/MM/YYYY');
      this._datepickerForm.dueDateInterval = this.dropdownNumber + ' ' + this.Duration;
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
    this._datepickerComponent.selectedDueDateInterval = undefined;
    this._datepickerForm.dueDateInterval = this.dropdownNumber + ' ' + this.Duration;
    this._datepickerForm._detach();
  }

  public SelectElement(id , valueToSelect) {
    (id.nativeElement).value = valueToSelect;
    return ((id.nativeElement).value);
  }
  public resetDurationText(duration: string): string {
    if (duration === 'day' || duration === 'week' || duration === 'month' || duration === 'year') {
      return duration + '(s)';
    } else if (duration === 'days' || duration === 'weeks' || duration === 'months' || duration === 'years') {
      return duration.replace('s', '(s)');
    } else {
      return duration;
    }
  }
}
