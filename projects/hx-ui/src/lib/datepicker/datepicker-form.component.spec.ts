import {} from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerFormComponent } from './datepicker-form.component';
import { DatepickerComponent } from './datepicker.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatepickerConfig} from './datepicker.config';
import {OverlayModule} from '@angular/cdk/overlay';


describe('DatepickerFormComponent', () => {
  let component: DatepickerFormComponent;
  let fixture: ComponentFixture<DatepickerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule, OverlayModule],
      providers: [DatepickerConfig],
      declarations: [ DatepickerFormComponent, DatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('parseDate', () => {
    let date: Date;

    beforeEach(() => {
     date = new Date('11 Jan 1993');
    });

    it('should parse a valid dd/mm/yyyy date then return a new Date object with a value of that date', () => {
      const parsedDate: Date = component.parseDate('11/01/1993');

      expect(parsedDate.getTime()).toEqual(date.getTime());
    });

    it('should parse a valid dd/mm/yy date then return a new Date object with a value of that date', () => {
      const parsedDate: Date = component.parseDate('11/01/93');

      expect(parsedDate.getTime()).toEqual(date.getTime());
    });

    it('should parse a valid d/m/y date then return a new Date object with a value of that date', () => {
      const parsedDate: Date = component.parseDate('1/1/2018');

      expect(parsedDate.getTime()).toBeTruthy();
    });

    it('should not parse an invalid date with letters then return null', () => {
      const parsedDate: Date = component.parseDate('aa/bb/cc');

      expect(parsedDate).toBeNull();
    });

    it('should not parse a date in a mm/dd/y format', () => {
      const parsedDate: Date = component.parseDate('10/25/2018');

      expect(parsedDate).toBeNull();
    });
  });

  describe("onChange", () => {
    beforeEach(() => {
      spyOn(component, "setDate");
    });

    it('should try to call setDate() if passed a valid date', () => {
      component.onChange("11/01/1993");

      expect(component.setDate).toHaveBeenCalled();
    });

    it('should not try to call setDate() if passed an invalid date', () => {
      component.onChange("abc");

      expect(component.setDate).not.toHaveBeenCalled();
    });
  });

  describe("validateIsNotBeforeDate", () => {
    let date: Date;
    let currentDate: Date;
    let pastDate: Date;
    let futureDate: Date;

    beforeEach(() => {
     // yesterdays date from now
     date = new Date();
     pastDate = date;
     pastDate.setDate(pastDate.getDate() - 1);
     currentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
     futureDate.setDate(futureDate.getDate() + 1);
    });

    it('should return true if passed the current date', () => {
      const result: boolean = component.validateIsNotBeforeDate(currentDate);
      console.log(date);
      expect(result).toEqual(true);
    });

    it('should return true if passed a future date', () => {
      const result: boolean = component.validateIsNotBeforeDate(futureDate);

      expect(result).toEqual(true);
    });

    it('should return false if passed a past date', () => {
      const result: boolean = component.validateIsNotBeforeDate(pastDate);
      console.log(date);
      expect(result).toEqual(false);
    });
  });

  describe("validateIsNotAfterDate", () => {
    let date: Date;

    beforeEach(() => {
      date = new Date(8640000000000000);
    })

    it('should return true if passed the current date', () => {
      const result: boolean = component.validateIsNotAfterDate(date);

      expect(result).toEqual(true);
    });

    it('should return true if passed a future date', () => {
      const result: boolean = component.validateIsNotAfterDate(date);

      expect(result).toEqual(true);
    });

    it('should return false if passed a past date', () => {
      const result: boolean = component.validateIsNotAfterDate(date);

      expect(result).toEqual(false);
    });
  });

  describe('setDate', () => {
    let date: Date

    beforeEach(() => {
      date = new Date('11 Jan 1993');
      spyOn(component.onDateChange, "emit");
      spyOn(component, "propogateChange");
    });

    it('should set component.date to the Date object passed to it and invoke onDateChange.emit() and propogateChange()', () => {
      component.setDate(date);

      expect(component.date).toBe(date);
      expect(component.onDateChange.emit).toHaveBeenCalledWith(date);
      expect(component.propogateChange).toHaveBeenCalledWith(date);
    });
  });
});
