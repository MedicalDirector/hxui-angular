import { Overlay } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxMaskModule } from 'ngx-mask';
import { DatepickerConfig } from '../../../public_api';
import { DatepickerModule } from '../../datepicker/datepicker.module';
import { DropdownConfig } from '../../dropdown/dropdown.config';
import { DropdownModule } from '../../dropdown/dropdown.module';
import { TabsModule } from '../../tabs/tabs.module';
import { DateRangePickerIntervalComponent } from '../date-range-picker-interval/date-range-picker-interval.component';
import { DateRangePickerComponent } from '../date-range-picker.component';
import { DateRangePickerConfig } from '../date-range-picker.config';
import { DateRangePickerCustomComponent } from './date-range-picker-custom.component';

describe('DateRangePickerCustomComponent', () => {
  let component: DateRangePickerCustomComponent;
  let fixture: ComponentFixture<DateRangePickerCustomComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [
        FormsModule,
        TabsModule,
        DatepickerModule,
        DropdownModule,
        NgxMaskModule.forRoot()
    ],
    declarations: [
        DateRangePickerComponent,
        DateRangePickerIntervalComponent,
        DateRangePickerCustomComponent
    ],
    providers: [
        Overlay,
        DropdownConfig,
        DatePipe,
        DatepickerConfig,
        DateRangePickerConfig
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangePickerCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('OnInit', () => {
    it('should update fromDate and toDate with input', () => {
      component.currentFromDate = new Date('2019-05-29T00:00:00');
      component.currentToDate = new Date('2019-05-31T00:00:00');
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.newFromDate).toEqual(component.currentFromDate);
      expect(component.newToDate).toEqual(component.currentToDate);
    });

    it('should not update fromDate and toDate without input', () => {
      component.ngOnInit();
      fixture.detectChanges();
      expect(component.newFromDate).toEqual(component.newToDate);
    });
  });

  describe('Click Cancel', () => {
    it('should emit closeDropdown', () => {
      const button = fixture.debugElement.query(By.css('#custom_cancel'));
      jest.spyOn(component.closeDropdown, 'emit');
      button.nativeElement.click();
      fixture.detectChanges();
      expect(component.closeDropdown.emit).toHaveBeenCalled();
    });
  });

  describe('Click Selected', () => {
    it('should emit newSelectedCustomDate and closeDropdown', () => {
      const button = fixture.debugElement.query(By.css('#custom_select'));
      jest.spyOn(component.closeDropdown, 'emit');
      jest.spyOn(component.newSelectedCustomDate, 'emit');
      button.nativeElement.click();
      fixture.detectChanges();
      expect(component.closeDropdown.emit).toHaveBeenCalled();
      expect(component.newSelectedCustomDate.emit).toHaveBeenCalledWith([
        component.newFromDate,
        component.newToDate
      ]);
    });

    it('should not emit anything if contains null', () => {
      component.ngOnInit();

      component.newFromDate = null;
      component.newToDate = new Date('2019-05-31T00:00:00');

      const button = fixture.debugElement.query(By.css('#custom_select'));
      jest.spyOn(component.closeDropdown, 'emit');
      jest.spyOn(component.newSelectedCustomDate, 'emit');
      button.nativeElement.click();

      fixture.detectChanges();
      expect(component.closeDropdown.emit).not.toHaveBeenCalled();
      expect(component.newSelectedCustomDate.emit).not.toHaveBeenCalledWith([
        component.newFromDate,
        component.newToDate
      ]);
    });

    it('should not emit anything if from > to', () => {
      component.ngOnInit();

      component.newFromDate = new Date('2019-05-31T00:00:00');
      component.newToDate = new Date('2019-05-29T00:00:00');

      const button = fixture.debugElement.query(By.css('#custom_select'));
      jest.spyOn(component.closeDropdown, 'emit');
      jest.spyOn(component.newSelectedCustomDate, 'emit');
      button.nativeElement.click();

      fixture.detectChanges();
      expect(component.closeDropdown.emit).not.toHaveBeenCalled();
      expect(component.newSelectedCustomDate.emit).not.toHaveBeenCalledWith([
        component.newFromDate,
        component.newToDate
      ]);
    });
  });
});
