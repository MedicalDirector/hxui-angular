import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DropdownDirective } from '../../dropdown/dropdown.directive';

@Component({
  selector: 'hxa-date-range-picker-custom',
  templateUrl: './date-range-picker-custom.component.html',
  styleUrls: ['./date-range-picker-custom.component.scss']
})
export class DateRangePickerCustomComponent implements OnInit {
  @Input() currentFromDate: Date;
  @Input() currentToDate: Date;
  @Output() newSelectedCustomDate = new EventEmitter<Date[]>();
  @Output() closeDropdown = new EventEmitter<boolean>();
  
  constructor(private ref: ChangeDetectorRef) { }
  
  newFromDate: Date;
  newToDate: Date;
 
  ngOnInit() {
    if(this.currentFromDate){
    this.newFromDate = this.currentFromDate;
    }
    else {
    this.newFromDate = new Date();
    }
    if(this.currentToDate){
    this.newToDate = this.currentToDate;
    }
    else {
    this.newToDate = new Date();
    }
    this.ref.detectChanges();
  }

  onCancel() {
    this.closeDropdown.emit(true);
  }

  onSelected() {
    this.newSelectedCustomDate.emit([this.newFromDate,this.newToDate]);
    this.closeDropdown.emit(true);
  }
}
