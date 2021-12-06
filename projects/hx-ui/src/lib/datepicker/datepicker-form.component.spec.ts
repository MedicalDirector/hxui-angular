import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerFormComponent } from './datepicker-form.component';
import {DatepickerModule} from './datepicker.module';
import {OverlayModule} from '@angular/cdk/overlay';
import {NgxMaskModule} from 'ngx-mask';


describe('DatepickerFormComponent', () => {
  let component: DatepickerFormComponent;
  let fixture: ComponentFixture<DatepickerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [DatepickerModule.forRoot(), OverlayModule, NgxMaskModule.forRoot()]
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

    xit('should parse a valid dd/mm/yy date then return a new Date object with a value of that date', () => {
      const parsedDate: Date = component.parseDate('11/01/93');

      expect(parsedDate.getTime()).toEqual(date.getTime());
    });

    xit('should parse a valid d/m/y date then return a new Date object with a value of that date', () => {
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
      component.onChange({ target: { value: '11/01/1993' }});

      expect(component.setDate).toHaveBeenCalled();
    });

    it('should try to call setDate(null) if passed an invalid date', () => {
      component.onChange({ target: { value: 'abc' }});

      expect(component.setDate).toHaveBeenCalledWith(null);
    });
  });

  describe("validateIsNotBeforeDate", () => {
    let date: Date;

    beforeEach(() => {
      /*
      * ECMAScript Spec states that the below is the minimum possible date
      * http://ecma-international.org/ecma-262/5.1/#sec-15.9.1.1
      */
     date = new Date(-8640000000000000);
    })

    xit('should return true if passed the current date', () => {
      const result: boolean = component.validateIsNotBeforeDate(date);

      expect(result).toEqual(true);
    });

    xit('should return true if passed a future date', () => {
      const result: boolean = component.validateIsNotBeforeDate(date);

      expect(result).toEqual(true);
    });

    xit('should return false if passed a past date', () => {
      const result: boolean = component.validateIsNotBeforeDate(date);

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

    xit('should return false if passed a past date', () => {
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
