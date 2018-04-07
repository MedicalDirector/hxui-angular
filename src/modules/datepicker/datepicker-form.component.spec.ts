import {} from 'jasmine';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerFormComponent } from './datepicker-form.component';
import { DatepickerComponent } from './datepicker.component';


describe('DatepickerFormComponent', () => {
  let component: DatepickerFormComponent;
  let fixture: ComponentFixture<DatepickerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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

    it('should not set component.date to the Date object passed to it if it does not pass validation', () => {
      component.registerValidator(() => false);

      component.onChange("11/01/1993");

      expect(component.setDate).not.toHaveBeenCalled();
    });
  });

  describe("validateIsNotBeforeDate", () => {
    let presentDate: Date;

    beforeEach(() => {
      presentDate = new Date('11 Jan 1993');
    })

    it('should return true if passed the current date', () => {
      const result: boolean = component.validateIsNotBeforeDate(presentDate)(new Date('11 Jan 1993'));

      expect(result).toEqual(true);
    });

    it('should return true if passed a future date', () => {
      const result: boolean = component.validateIsNotBeforeDate(presentDate)(new Date('12 Jan 1993'));

      expect(result).toEqual(true);
    });

    it('should return false if passed a past date', () => {
      const result: boolean = component.validateIsNotBeforeDate(presentDate)(new Date('10 Jan 1993'));

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

  describe('validate', () => {
    let date: Date

    beforeEach(() => {
      date = new Date('11 Jan 1993');
    });

    it('should return true if all validators return true', () => {
      component.registerValidator(() => true);
      component.registerValidator(() => true);
      component.registerValidator(() => true);

      let result = component.validate(date);

      expect(result).toBe(true);
    });

    it('should return false if all validators return false', () => {
      component.registerValidator(() => false);
      component.registerValidator(() => false);
      component.registerValidator(() => false);

      let result = component.validate(date);

      expect(result).toBe(false);
    });

    it('should return false if at least 1 validator returns false', () => {
      component.registerValidator(() => true);
      component.registerValidator(() => true);
      component.registerValidator(() => false);

      let result = component.validate(date);

      expect(result).toBe(false);
    });
  });

});
