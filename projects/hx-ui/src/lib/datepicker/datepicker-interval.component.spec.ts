import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerIntervalComponent } from './datepicker-interval.component';

describe('DatepickerIntervalComponent', () => {
  let component: DatepickerIntervalComponent;
  let fixture: ComponentFixture<DatepickerIntervalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerIntervalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
