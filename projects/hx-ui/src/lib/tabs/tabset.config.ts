import { Injectable } from '@angular/core';

@Injectable()
export class TabsetConfig {
  /** provides default navigation context class */
  public type: 'tabs' | 'pills' = 'tabs';
}
