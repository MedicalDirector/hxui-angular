import { ControlValueAccessor } from '@angular/forms';
export declare abstract class DateValueAccessor implements ControlValueAccessor {
    private onChanged;
    private onTouched;
    abstract setDate(date: Date): void;
    writeValue(value: Date): void;
    registerOnChange(fn: (value: Date) => void): void;
    registerOnTouched(fn: () => void): void;
    propogateTouched(): void;
    propogateChange(value: any): void;
}
