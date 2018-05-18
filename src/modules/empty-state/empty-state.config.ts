import { Injectable } from '@angular/core';
import {Size} from '../enums';


/** Default empty state configuration */
@Injectable()
export class EmptyStateConfig {
  size = Size.Default;
}
