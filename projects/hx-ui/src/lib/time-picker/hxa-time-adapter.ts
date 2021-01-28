import {Injectable} from '@angular/core';
import {HxaTimeStruct} from './hxa-time-struct';
import {isInteger} from '../utils/util';

export function NGB_DATEPICKER_TIME_ADAPTER_FACTORY() {
  return new NgbTimeStructAdapter();
}

/**
 * An abstract service that does the conversion between the internal time-picker `HxaTimeStruct` model and
 * any provided user time model `T`, ex. a string, a native date, etc.
 *
 * The adapter is used **only** for conversion when binding time-picker to a form control,
 * ex. `[(ngModel)]="userTimeModel"`. Here `userTimeModel` can be of any type.
 *
 * The default time-picker implementation assumes we use `HxaTimeStruct` as a user model.
 *
 * See the [custom time adapter demo](#/components/time-picker/examples#adapter) for an example.
 *
 * @since 2.2.0
 */
@Injectable({providedIn: 'root', useFactory: NGB_DATEPICKER_TIME_ADAPTER_FACTORY})
export abstract class HxaTimeAdapter<T> {
  /**
   * Converts a user-model time of type `T` to an `HxaTimeStruct` for internal use.
   */
  abstract fromModel(value: T | null): HxaTimeStruct | null;

  /**
   * Converts an internal `HxaTimeStruct` time to a user-model time of type `T`.
   */
  abstract toModel(time: HxaTimeStruct | null): T | null;
}

@Injectable()
export class NgbTimeStructAdapter extends HxaTimeAdapter<HxaTimeStruct> {
  /**
   * Converts a HxaTimeStruct value into HxaTimeStruct value
   */
  fromModel(time: HxaTimeStruct | null): HxaTimeStruct | null {
    return (time && isInteger(time.hour) && isInteger(time.minute)) ?
        {hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : <any>null} :
        null;
  }

  /**
   * Converts a HxaTimeStruct value into HxaTimeStruct value
   */
  toModel(time: HxaTimeStruct | null): HxaTimeStruct | null {
    return (time && isInteger(time.hour) && isInteger(time.minute)) ?
        {hour: time.hour, minute: time.minute, second: isInteger(time.second) ? time.second : <any>null} :
        null;
  }
}
