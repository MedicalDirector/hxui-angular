import { OnInit, OnChanges, SimpleChanges, DoCheck, EventEmitter, IterableDiffers, Renderer2 } from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';
import { SelectizeConfig } from './selectize.config';
export declare const SELECTIZE_VALUE_ACCESSOR: any;
export declare class SelectizeComponent implements OnInit, OnChanges, DoCheck, ControlValueAccessor {
    private _differs;
    private renderer;
    private _options;
    private _options_differ;
    private _optgroups;
    private _optgroups_differ;
    config: SelectizeConfig;
    id: string;
    placeholder: string;
    hasOptionsPlaceholder: string;
    noOptionsPlaceholder: string;
    enabled: boolean;
    value: string[];
    formControl: FormControl;
    errorClass: string;
    onBlur: EventEmitter<void>;
    selectizeInput: any;
    private selectize;
    private onTouchedCallback;
    private onChangeCallback;
    constructor(_differs: IterableDiffers, renderer: Renderer2);
    ngOnInit(): void;
    reset(): void;
    /**
     * Change detection for primitive types.
     */
    ngOnChanges(changes: SimpleChanges): void;
    /**
     * Implementing deep check for option comparison
     *
     * FIXME -> Implement deep check to only compare against label and value fields.
     */
    ngDoCheck(): void;
    private _applyOptionsChanges(changes);
    private _applyOptionGroupChanges(changes);
    onBlurEvent(): void;
    onSelectizeOptGroupAdd(optgroup: any): void;
    onSelectizeOptGroupRemove(optgroup: any): void;
    /**
     * Refresh selected values when options change.
     */
    onSelectizeOptionAdd(option: any): void;
    onSelectizeOptionRemove(option: any): void;
    evalHasError(): void;
    /**
     * Update the current placeholder based on the given input parameter.
     */
    updatePlaceholder(): void;
    /**
     * Called when a change is detected in the 'enabled' input field.
     * Sets the selectize state based on the new value.
     */
    onEnabledStatusChange(): void;
    /**
     * Dispatches change event when a value change is detected.
     * @param $event
     */
    onSelectizeValueChange($event: any): void;
    /**
     * Returns the applicable placeholder.
     */
    getPlaceholder(): string;
    /**
     * Implementation from ControlValueAccessor
     *
     * Empty check on 'obj' removed due to restriction on resetting the field.
     * From testing, async should still function appropriately.
     *
     * FIXME This might not be necessary anymore..
     *
     * @param obj
     */
    writeValue(obj: any): void;
    /**
     * Implementation from ControlValueAccessor, callback for (ngModelChange)
     * @param fn
     */
    registerOnChange(fn: any): void;
    /**
     * Implementation from ControlValueAccessor
     * @param fn
     */
    registerOnTouched(fn: any): void;
    getOptgroupField(): string;
    options: any[];
    optgroups: any[];
}
