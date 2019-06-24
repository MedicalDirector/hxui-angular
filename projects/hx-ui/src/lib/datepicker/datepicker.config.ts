import { Injectable } from '@angular/core';
import { AppRoutingModule } from 'app/app-routing.module';


/** Default values provider for calendar */
@Injectable()
export class DatepickerConfig {
  /** calendar placement, supported positions: 'top', 'bottom', 'left', 'right' */
  public placement: 'top'|'bottom'|'left'|'right' = 'bottom';
  /** delay in ms before showing the calendar after show is called */
  public showDelay = 0;
  /** delay in ms before hiding the calendar after hide is called */
  public hideDelay = 0;
  public tabSelected: String ;
  public selectedDueDateConfiguration: ISelectedDueDateConfig = {
    selectedDueDateInterval: '0 day(s)',
    selectedDueDate: new Date(),
    isSelectedFromInterval: true
  }
}

export interface ISelectedDueDateConfig {
  selectedDueDateInterval: string;
  selectedDueDate: Date;
  isSelectedFromInterval: boolean;
}
