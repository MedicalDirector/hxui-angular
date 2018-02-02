import { ControlValueAccessor } from '@angular/forms';

export abstract class DateValueAccessor implements ControlValueAccessor {
  private onChanged = new Array<(value: Date) => void>();
  private onTouched = new Array<() => void>();

  abstract setDate(date: Date): void;

  public writeValue(value: Date) {    
    this.setDate(value);
  }

  public registerOnChange(fn: (value: Date) => void) {
    this.onChanged.push(fn);
  }

  public registerOnTouched(fn: () => void) {
    this.onTouched.push(fn);
  }

  public propogateTouched() {
    this.onTouched.forEach(fn => fn());
  }

  public propogateChange(value) {
    this.onChanged.forEach(fn => fn(value));
  }
}