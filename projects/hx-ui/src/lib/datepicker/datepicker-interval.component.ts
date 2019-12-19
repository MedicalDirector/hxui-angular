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

  @ViewChild('durationText', { static: true }) durationText: ElementRef;
  @ViewChild('numberText', { static: true }) numberText: ElementRef;
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

  constructor(private _datepickerForm: DatepickerFormComponent, private datePickerConfig: DatepickerConfig, private _datepickerComponent: DatepickerComponent) {
     }

     ngOnInit() {
       if (this.datePickerConfig.selectedDueDateConfiguration.isSelectedFromInterval) {
        if (this._datepickerComponent.selectedDueDateInterval && this._datepickerComponent.selectedDueDateInterval.split(' ')){
          const selectedDueDateInterval = this._datepickerComponent.selectedDueDateInterval.split(' ');
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
      } else {
        if (this.datePickerConfig.selectedDueDateConfiguration.selectedDueDate) {
          const selectedDueDate = this.datePickerConfig.selectedDueDateConfiguration.selectedDueDate.toString();
          this.dropdownNumber = this._datepickerComponent.selectedDueDateInterval.split(' ')[0];
          this.Duration = this.resetDurationText(this._datepickerComponent.selectedDueDateInterval.split(' ')[1]);
          this.text = moment().add(this.dropdownNumber, this.Duration.replace('(s)', 's'));
          this._DueDate = (this.text).format('ddd DD/MM/YYYY');
        }
      }
    }
  onCancel = () => {
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
      this.datePickerConfig.selectedDueDateConfiguration.selectedDueDate = new Date( this._DueDate);
  }
  
  onSelectoptions(numbervalue , durationValue) {
      this.text = moment().add(numbervalue , durationValue.replace('(s)', 's'));
      this._DueDate = (this.text).format('ddd DD/MM/YYYY');
      this._dueDatestring = (this.text).format('DD/MM/YYYY');
      this.datePickerConfig.selectedDueDateConfiguration.isSelectedFromInterval = true;

      return this._DueDate;
  }
  public onChoose($event) {
    this._datepickerForm.date =  new Date(this.text);
    this._datepickerForm.setDate(new Date(this.text));
    this._dueDatestring = (this.text).format('DD/MM/YYYY');
    $event.target.value = this._dueDatestring
    this._datepickerForm.onChange($event);
    this.datePickerConfig.selectedDueDateConfiguration.selectedDueDate = new Date(this.text);
    this._datepickerComponent.OpenDiv = false;
    this._datepickerComponent.selectedDueDateInterval = this.dropdownNumber + ' ' + this.Duration;
    this._datepickerForm.dueDateInterval = this.dropdownNumber + ' ' + this.Duration;
    this._datepickerForm._detach();
    this.datePickerConfig.selectedDueDateConfiguration.isSelectedFromInterval = true;
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
