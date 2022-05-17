import { Overlay } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { DatepickerModule } from '../datepicker/datepicker.module';
import { DropdownConfig } from '../dropdown/dropdown.config';
import { DropdownModule } from '../dropdown/dropdown.module';
import { TabsModule } from '../tabs/tabs.module';
import { DateRangePickerCustomComponent } from './date-range-picker-custom/date-range-picker-custom.component';
import { DateRangePickerIntervalComponent } from './date-range-picker-interval/date-range-picker-interval.component';
import { DateRangePickerComponent } from './date-range-picker.component';
import { DateRangePickerConfig } from './date-range-picker.config';
import { DateRange, DateSelectionType } from './date-range-picker.model';
import { IntervalItem } from './interval-option-model';

describe('DateRangePickerComponent', () => {
  let component: DateRangePickerComponent;
  let fixture: ComponentFixture<DateRangePickerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        TabsModule,
        DatepickerModule,
        DropdownModule,
        NgxMaskModule
      ],
      declarations: [
        DateRangePickerComponent,
        DateRangePickerIntervalComponent,
        DateRangePickerCustomComponent
      ],
      providers: [Overlay, DropdownConfig, DatePipe, DateRangePickerConfig],
      teardown: { destroyAfterEach: false }
    }).compileComponents();
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
    jest.spyOn(component.dropdown, 'hide');
    component.hide(true);
    expect(component.dropdown.hide).toHaveBeenCalled();
  });

  describe('OnInit', () => {
    it('should generate  IntervalOptionItems when intervalOptions is provided', () => {
      jest.spyOn(component, 'generateIntervalOptionItems');
      const mockIntervalOptions = ['today', 'yesterday', 'tomorrow'];
      component.intervalOptions = mockIntervalOptions;
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.generateIntervalOptionItems).toHaveBeenCalledWith(
        mockIntervalOptions
      );
    });
  });

  describe('onCustomDateSelection', () => {
    let mockNewCustomDate: Date[];
    beforeEach(() => {
      mockNewCustomDate = [
        new Date('2019-05-29T00:00:00'),
        new Date('2019-05-31T00:00:00')
      ];
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
      jest.spyOn(component.onDateRangeSelected, 'emit');
      component.onCustomDateSelection(mockNewCustomDate);
      expect(component.onDateRangeSelected.emit).toHaveBeenCalledWith(<
        DateRange
      >{
        fromDate: component.fromDate,
        toDate: component.toDate
      });
    });

    it('should not emit onDateRangeSelected if contains null element', () => {
      const dateNullEl: Date[] = [null, new Date('2019-05-29T00:00:00')];
      jest.spyOn(component.onDateRangeSelected, 'emit');
      component.onCustomDateSelection(dateNullEl);
      expect(component.onDateRangeSelected.emit).not.toHaveBeenCalledWith(<
        DateRange
      >{
        fromDate: component.fromDate,
        toDate: component.toDate
      });
    });

    it('should not emit onDateRangeSelected if from > to', () => {
      const dateFromAfterTo: Date[] = [
        new Date('2019-05-31T00:00:00'),
        new Date('2019-05-29T00:00:00')
      ];
      jest.spyOn(component.onDateRangeSelected, 'emit');
      component.onCustomDateSelection(dateFromAfterTo);
      expect(component.onDateRangeSelected.emit).not.toHaveBeenCalledWith(<
        DateRange
      >{
        fromDate: component.fromDate,
        toDate: component.toDate
      });
    });
  });

  describe('onIntervalSelection', () => {
    let mockIntervalSelection;
    beforeEach(() => {
      mockIntervalSelection = new IntervalItem(
        'Yesterdy',
        'day',
        -1,
        'yesterday'
      );
    });

    it('should update fromDate and toDate onIntervalSelection ', () => {
      const today: Date = new Date();
      const other: Date = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() - 1
      );
      component.onIntervalSelection(mockIntervalSelection);
      expect(component.fromDate).toEqual(other);
      expect(component.toDate).toEqual(today);
    });

    it('should update tab selection onIntervalSelection ', () => {
      component.onIntervalSelection(mockIntervalSelection);
      expect(component.currentTab).toEqual(DateSelectionType.interval);
    });

    it('should emit onDateRangeSelected ', () => {
      jest.spyOn(component.onDateRangeSelected, 'emit');
      component.onIntervalSelection(mockIntervalSelection);
      expect(component.onDateRangeSelected.emit).toHaveBeenCalledWith(<
        DateRange
      >{
        fromDate: component.fromDate,
        toDate: component.toDate
      });
    });
  });

  describe('createDateRange', () => {
    const today: Date = new Date();
    const datepipe = new DatePipe(`en-US`);
    beforeEach(() => {
      component.fromDate = today;
    });
    it('should return a date only when fromDate is equal to toDate', () => {
      expect(component.createDateRange()).toEqual(
        datepipe.transform(component.fromDate, component.dateFormat)
      );
    });

    it('should return date range only when fromDate is different from toDate', () => {
      component.toDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate() + 1
      );
      const fromDateString = datepipe.transform(
        component.fromDate,
        component.dateFormat
      );
      const toDateString = datepipe.transform(
        component.toDate,
        component.dateFormat
      );
      expect(component.createDateRange()).toEqual(
        `${fromDateString} - ${toDateString}`
      );
    });
  });
});
