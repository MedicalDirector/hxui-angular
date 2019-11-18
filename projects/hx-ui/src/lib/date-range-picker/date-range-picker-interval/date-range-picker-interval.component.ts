import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import {
  IntervalItem
} from '../interval-option-model';

@Component({
  selector: 'hxa-date-range-picker-interval',
  templateUrl: './date-range-picker-interval.component.html',
  styleUrls: ['./date-range-picker-interval.component.scss']
})
export class DateRangePickerIntervalComponent implements AfterViewInit {
  @Input() intervalOptionList: IntervalItem[];
  @Input() currentSelectedInterval: IntervalItem;
  @Output() newSelectedInterval = new EventEmitter < IntervalItem > ();
  @Output() closeDropdown = new EventEmitter < boolean > ();

  constructor() {}

  ngAfterViewInit() {
    if (this.currentSelectedInterval) {
      const element = document.getElementById(this.currentSelectedInterval.id);
      element.classList.add("label-selected");
    }
  }

  sendSelection(selectedItem: IntervalItem) {
    this.newSelectedInterval.emit(selectedItem);
    this.closeDropdown.emit(true);
  }

  mouseHover(e) {
    if (this.currentSelectedInterval) {
      const element = document.getElementById(this.currentSelectedInterval.id);
      element.classList.remove("label-selected");
    }
  }
}
