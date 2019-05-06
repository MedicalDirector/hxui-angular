import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangePickerIntervalComponent } from './date-range-picker-interval.component';

describe('DateRangePickerIntervalComponent', () => {
  let component: DateRangePickerIntervalComponent;
  let fixture: ComponentFixture<DateRangePickerIntervalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRangePickerIntervalComponent ]
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
});
