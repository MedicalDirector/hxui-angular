import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  DateRangePickerComponent,
  DateSelectionType,
  DateRange
} from './date-range-picker.component';
import {
  FormsModule
} from '@angular/forms';
import {
  TabsModule
} from '../tabs/tabs.module';
import {
  DatepickerModule
} from '../datepicker/datepicker.module';
import {
  DropdownModule
} from '../dropdown/dropdown.module';
import {
  DateRangePickerIntervalComponent
} from './date-range-picker-interval/date-range-picker-interval.component';
import {
  DateRangePickerCustomComponent
} from './date-range-picker-custom/date-range-picker-custom.component';
import {
  DatePipe
} from '@angular/common';
import {
  DateRangePickerConfig
} from './date-range-picker.config';
import {
  Overlay
} from '@angular/cdk/overlay';
import {
  DropdownStubDirective
} from './dropdown-stub.component.spec';
import {
  DropdownConfig
} from '../dropdown/dropdown.config';
import {
  IntervalItem
} from './interval-option-model';
import {
  inject
} from '@angular/core';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture < DateRangePickerComponent > ;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
        imports: [FormsModule, TabsModule, DatepickerModule, DropdownModule],
        declarations: [DateRangePickerComponent, DateRangePickerIntervalComponent, DateRangePickerCustomComponent, DropdownStubDirective],
        providers: [
          Overlay,
          DropdownConfig,
          DatePipe,
          DateRangePickerConfig
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call hide from dropdown directive', () => {
    spyOn(component.dropdown, 'hide');
    component.hide(true);
    expect(component.dropdown.hide).toHaveBeenCalled();
  });

  describe('OnInit', () => {
    it('should generate  IntervalOptionItems when intervalOptions is provided', () => {
      spyOn(component, 'generateIntervalOptionItems');
      let mockIntervalOptions = ['today', 'yesterday', 'tomorrow'];
      component.intervalOptions = mockIntervalOptions;
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.generateIntervalOptionItems).toHaveBeenCalledWith(mockIntervalOptions);
    });
  })

  describe('onCustomDateSelection', () => {
    let mockNewCustomDate: Date[];
    beforeEach(() => {
      mockNewCustomDate = [new Date('2019-05-29T00:00:00'), new Date('2019-05-31T00:00:00')];
    });

    it('should update fromDate and toDate', () => {
      component.onCustomDateSelection(mockNewCustomDate);
      expect(component.fromDate).toEqual(mockNewCustomDate[0]);
      expect(component.toDate).toEqual(mockNewCustomDate[1]);
    });

    it('should update tab selection onCustomDateSelection ', () => {
      component.onCustomDateSelection(mockNewCustomDate);
      expect(component.currentTab).toEqual(DateSelectionType.custom);
    });

    it('should emit onDateRangeSelected ', () => {
      spyOn(component.onDateRangeSelected, 'emit');
      component.onCustomDateSelection(mockNewCustomDate);
      expect(component.onDateRangeSelected.emit).toHaveBeenCalledWith( < DateRange > {
        fromDate: component.fromDate,
        toDate: component.toDate
      });
    });
  })

  describe('onCustomDateSelection', () => {
    let mockIntervalSelection
    beforeEach(() => {
      mockIntervalSelection = new IntervalItem('Yesterdy', 'day', -1, 'yesterday');
    });

    it('should update fromDate and toDate onIntervalSelection ', () => {
      const today: Date = new Date();
      component.onIntervalSelection(mockIntervalSelection);
      expect(component.fromDate).toEqual(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1));
      expect(component.toDate).toEqual(today);
    });

    it('should update tab selection onIntervalSelection ', () => {
      component.onIntervalSelection(mockIntervalSelection);
      expect(component.currentTab).toEqual(DateSelectionType.interval);
    });

    it('should emit onDateRangeSelected ', () => {
      spyOn(component.onDateRangeSelected, 'emit');
      component.onIntervalSelection(mockIntervalSelection);
      expect(component.onDateRangeSelected.emit).toHaveBeenCalledWith( < DateRange > {
        fromDate: component.fromDate,
        toDate: component.toDate
      });
    });
  })

  describe('createDateRange', () => {
    const today: Date = new Date();
    let datepipe = new DatePipe(`en-US`);
    beforeEach(() => {
      component.fromDate = today;
    });
    it('should return a date only when fromDate is equal to toDate', () => {
      expect(component.createDateRange()).toEqual(datepipe.transform(component.fromDate, component.dateFormat));
    });

    it('should return date range only when fromDate is different from toDate', () => {
      component.toDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
      let fromDateString = datepipe.transform(component.fromDate, component.dateFormat);
      let toDateString = datepipe.transform(component.toDate, component.dateFormat);
      expect(component.createDateRange()).toEqual(`${fromDateString} - ${toDateString}`);
    });
  })
});
