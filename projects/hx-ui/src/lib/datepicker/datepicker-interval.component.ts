import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as moment_ from 'moment';
import { Subscription } from 'rxjs';
import { DatePickerInterval } from './datepicker.model';
const moment = moment_;

@Component({
  selector: 'hxa-datepicker-interval',
  templateUrl: './datepicker-interval.component.html',
  styleUrls: ['./datepicker-interval.component.scss']
})
export class DatepickerIntervalComponent implements OnInit, OnDestroy {
  public durationOptions = ['day', 'week', 'month', 'year'];
  public duration = 'days';
  public increment = 0;
  public text: moment_.Moment;
  public dateLabel: string;
  public _dueDatestring: string;

  private value$: Subscription = new Subscription();
  public form: FormGroup;

  @HostBinding('class')
  get classes() {
    return 'hx-card hxa-datepicker-interval';
  }

  @Input()
  selectedDate: Date;

  @Input()
  selectedInterval: DatePickerInterval;

  @Output()
  update = new EventEmitter<DatePickerInterval & { date: Date }>();

  @Output()
  cancel = new EventEmitter<void>();

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    // date selected from interval
    if (
      this.selectedInterval &&
      this.selectedInterval.isSelectedFromInterval &&
      this.selectedInterval.interval
    ) {
      const intervalArr = this.selectedInterval.interval.split(' ');

      if (intervalArr && intervalArr.length > 1) {
        this.increment = parseInt(intervalArr[0], 10);
        this.duration = this.normaliseDurationString(intervalArr[1]);
      }

      // date is typed or calendar picker
    } else if (this.selectedDate) {
      const selected = moment(this.selectedDate);
      const today = moment().startOf('day');
      const duration = 'days';

      const daysBetween: number = selected.diff(today, duration);

      if (daysBetween && daysBetween > 0) {
        this.increment = daysBetween;
        this.duration = duration;
      }
    }

    this.onSelectoptions(this.increment, this.duration);

    this.form = this.fb.group({
      number: [this.increment, Validators.min(0)],
      duration: [this.duration]
    });

    this.onValueChanges();
  }

  ngOnDestroy(): void {
    this.value$.unsubscribe();
  }

  public onValueChanges(): void {
    this.value$ = this.form.valueChanges.subscribe(val => {
      this.onSelectoptions(val.number, val.duration);
    });
  }

  /** on cancel of interval form */
  public onCancel(): void {
    this.cancel.emit();
  }

  public onSelectoptions(numberValue: number, durationValue: string): void {
    this.text = moment().add(
      numberValue as moment_.DurationInputArg1,
      durationValue as moment_.DurationInputArg2
    );
    this.dateLabel = this.text.format('ddd DD/MM/YYYY');
    this._dueDatestring = this.text.format('YYYY-MM-DD');
  }

  /** on submission of interval form */
  public onChoose($event: SubmitEvent) {
    $event.preventDefault();
    // check form is valid
    if (this.form.valid) {
      const intervalSubmitted =
        this.form.value.number.toString() +
        ' ' +
        this.normaliseDurationString(this.form.value.duration, 'optional');

      const dateSubmitted = new Date(this._dueDatestring);

      const result = {
        interval: intervalSubmitted,
        isSelectedFromInterval: true,
        date: dateSubmitted
      };

      // emit result
      this.update.emit(result);
    }
  }

  /** normalise duration string */
  public normaliseDurationString(
    duration: string,
    output: 'singular' | 'plural' | 'optional' = 'plural'
  ): string {
    const singular = this.durationOptions;
    const plural = singular.map(val => val + 's');
    const optional = singular.map(val => val + '(s)');

    const current = currentFormat(duration);

    let result = [`${output}`][0] || 'days';

    if (output === 'singular') {
      result = toSingular(duration);
    } else if (output === 'plural') {
      result = toPlural(duration);
    } else if (output === 'optional') {
      result = toOptional(duration);
    }

    return result;

    function currentFormat(str: string): string | undefined {
      if (singular.includes(str)) {
        return 'singular';
      } else if (plural.includes(str)) {
        return 'plural';
      } else if (optional.includes(str)) {
        return 'optional';
      } else {
        return undefined;
      }
    }

    function toSingular(str: string): string {
      let result = singular[0];
      if (current === 'singular') {
        result = str;
      } else if (current === 'plural') {
        result = str.replace('s', '');
      } else if (current === 'optional') {
        result = str.replace('(s)', '');
      }
      return result;
    }

    function toPlural(str: string): string {
      let result = plural[0];
      if (current === 'singular') {
        result = str + 's';
      } else if (current === 'plural') {
        result = str;
      } else if (current === 'optional') {
        result = str.replace('(s)', 's');
      }
      return result;
    }

    function toOptional(str: string): string {
      let result = optional[0];
      if (current === 'singular') {
        result = str + '(s)';
      } else if (current === 'plural') {
        result = str.replace('s', '(s)');
      } else if (current === 'optional') {
        result = str;
      }
      return result;
    }
  }
}
