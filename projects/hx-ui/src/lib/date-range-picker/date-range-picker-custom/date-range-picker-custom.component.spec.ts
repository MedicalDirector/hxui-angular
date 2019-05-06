import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangePickerCustomComponent } from './date-range-picker-custom.component';

describe('DateRangePickerCustomComponent', () => {
  let component: DateRangePickerCustomComponent;
  let fixture: ComponentFixture<DateRangePickerCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRangePickerCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
