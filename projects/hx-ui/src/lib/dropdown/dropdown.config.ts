import { Injectable } from '@angular/core';

/** Default dropdown configuration */
@Injectable()
export class DropdownConfig {
  /** default dropdown auto closing behavior */
  autoClose = true;
  /** delay in ms before showing the dropdown after show is called */
  public showDelay = 0;
  /** delay in ms before hiding the dropdown after hide is called */
  public hideDelay = 0;
}
