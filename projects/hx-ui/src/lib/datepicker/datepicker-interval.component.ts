import { Component, OnInit, Input } from '@angular/core';
import {DatepickerFormComponent} from './datepicker-form.component';
import * as moment from 'moment';
import {DatepickerComponent} from './datepicker.component';

@Component({
  selector: 'hxa-datepicker-interval',
  templateUrl: './datepicker-interval.component.html',
  styleUrls: ['./datepicker-interval.component.scss']
})
export class DatepickerIntervalComponent implements OnInit {

  protected onCancelled: Function;
  protected close: Function;
  protected Duration: any = 'days';
  protected dropdownNumber: any = 1;
  public text: any =   moment().add(this.dropdownNumber , this.Duration);
  public _DueDate: string = (this.text).format('ddd DD/MM/YYYY');

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  constructor(private _datepickerForm: DatepickerFormComponent,
    private _datepickerComponent: DatepickerComponent) { }

  ngOnInit() {
  }

  onCancel = () => {
    console.log('onCancel clicked');
    this._datepickerComponent.OpenDiv = false;
  }
  onSelect = () => {
    console.log('onSelect clicked');
    if (this.dropdownNumber && this.Duration) {
      this.text = moment().add(this.dropdownNumber , this.Duration);
    this._DueDate = (this.text).format('ddd DD/MM/YYYY');

     return this._DueDate;
     }
  }
  onChoose() {
    this._datepickerForm.date =  new Date(this.text);
    console.log('onChoose clicked');
    this._datepickerComponent.OpenDiv = false;

  }

}
