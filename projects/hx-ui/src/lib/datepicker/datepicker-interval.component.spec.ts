import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerIntervalComponent } from './datepicker-interval.component';
import { DatepickerFormComponent } from './datepicker-form.component';

describe('DatepickerIntervalComponent', () => {
  let component: DatepickerIntervalComponent;
  let fixture: ComponentFixture<DatepickerIntervalComponent>;
  let formComponent: DatepickerFormComponent;

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
  describe('onChoose', () => {
    beforeEach(() => {
      spyOn(component, 'onSelect')
    });
    it('should set component.date to the Date object passed to it and invoke onSelect', () => {
      expect(formComponent.date).toBe(new Date(component.text));
      expect(component.onSelect).toHaveBeenCalledWith();
    });
  });
});
