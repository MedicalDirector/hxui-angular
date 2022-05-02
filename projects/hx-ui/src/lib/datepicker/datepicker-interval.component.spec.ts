import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerIntervalComponent } from './datepicker-interval.component';
import { DatepickerFormComponent } from './datepicker-form.component';
import {FormsModule} from '@angular/forms';
import {TabsModule} from '../tabs/tabs.module';
import {DatepickerComponent} from './datepicker.component';
import {Overlay} from '@angular/cdk/overlay';
import {DatepickerConfig} from './datepicker.config';

// describe('DatepickerIntervalComponent', () => {
//   let component: DatepickerIntervalComponent;
//   let fixture: ComponentFixture<DatepickerIntervalComponent>;
//   let formComponent: DatepickerFormComponent;
//
//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [ FormsModule, TabsModule ],
//       declarations: [ DatepickerFormComponent, DatepickerComponent, DatepickerIntervalComponent ],
//       providers: [ Overlay, DatepickerConfig, DatepickerFormComponent ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(DatepickerIntervalComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   describe('onChoose', () => {
//     beforeEach(() => {
//       spyOn(component, 'onSelect')
//     });
//     it('should set component.date to the Date object passed to it and invoke onSelect', () => {
//       expect(formComponent.date).toBe(new Date(component.text));
//       expect(component.onSelect).toHaveBeenCalledWith();
//     });
//   });
// });
