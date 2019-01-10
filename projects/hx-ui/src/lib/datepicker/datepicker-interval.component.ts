import { Component, OnInit, Input } from '@angular/core';
import {DatepickerFormComponent} from './datepicker-form.component';
import * as moment from 'moment';

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
  public _DueDate: string = moment().add(this.dropdownNumber , this.Duration).format('ddd DD/MM/YYYY');
  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  constructor(private _datepickerForm: DatepickerFormComponent) { }

  ngOnInit() {
  }

  onCancel = () => {
    // this._datepickerForm1.opendiv = false;
    console.log('onCancel clicked');
  }
  onSelect = () => {
    console.log('onSelect clicked');
    if (this.dropdownNumber && this.Duration) {
     this._DueDate = moment().add(this.dropdownNumber , this.Duration).format('ddd DD/MM/YYYY');
     return this._DueDate;
     }
  }
  onChoose() {
    this._datepickerForm._ChoosedDueDate = this.dropdownNumber + ' ' + this.Duration + '   ' + this._DueDate.substring(4 , this._DueDate.length);
    // this._datepickerForm.opendiv = false;
    console.log('onChoose clicked');
  }

}
