import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  DateRangePickerIntervalComponent
} from './date-range-picker-interval.component';
import {
  By
} from '@angular/platform-browser';
import {
  IntervalItem
} from '../interval-option-model';

fdescribe('DateRangePickerIntervalComponent', () => {
  let component: DateRangePickerIntervalComponent;
  let fixture: ComponentFixture < DateRangePickerIntervalComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        declarations: [DateRangePickerIntervalComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Call sendSelection', () => {
    let selectedItem = new IntervalItem('Yesterdy', 'day', -1, 'yesterday');
    beforeEach(() => {});

    it('should emit newSelectedCustomDate and closeDropdown', () => {
      spyOn(component.closeDropdown, 'emit');
      spyOn(component.newSelectedInterval, 'emit');
      component.sendSelection(selectedItem);
      fixture.detectChanges();
      expect(component.closeDropdown.emit).toHaveBeenCalled();
      expect(component.newSelectedInterval.emit).toHaveBeenCalledWith(selectedItem);
    });
  })
});
