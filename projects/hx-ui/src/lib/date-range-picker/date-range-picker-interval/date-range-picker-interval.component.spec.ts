import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IntervalItem } from '../interval-option-model';
import { DateRangePickerIntervalComponent } from './date-range-picker-interval.component';

describe('DateRangePickerIntervalComponent', () => {
  let component: DateRangePickerIntervalComponent;
  let fixture: ComponentFixture<DateRangePickerIntervalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DateRangePickerIntervalComponent]
    }).compileComponents();
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
    const selectedItem = new IntervalItem('Yesterdy', 'day', -1, 'yesterday');

    it('should emit newSelectedCustomDate and closeDropdown', () => {
      jest.spyOn(component.closeDropdown, 'emit');
      jest.spyOn(component.newSelectedInterval, 'emit');
      component.sendSelection(selectedItem);
      fixture.detectChanges();
      expect(component.closeDropdown.emit).toHaveBeenCalled();
      expect(component.newSelectedInterval.emit).toHaveBeenCalledWith(
        selectedItem
      );
    });
  });
});
