import { Injectable, ElementRef, Component, EventEmitter, Output, Input, HostListener, forwardRef, NgModule, Directive, TemplateRef, ViewContainerRef, HostBinding, Renderer2, ReflectiveInjector, NgZone, ComponentFactoryResolver, Injector, Renderer, ViewChild, ChangeDetectorRef, ViewEncapsulation, Pipe, CUSTOM_ELEMENTS_SCHEMA, IterableDiffers, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { filter, debounceTime, mergeMap, toArray } from 'rxjs/operators';
import { __decorate } from 'tslib';
import { Observable, from } from 'rxjs';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { cloneDeep } from 'lodash';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
class Positioning {
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    position(element, round = true) {
        let /** @type {?} */ elPosition;
        let /** @type {?} */ parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
        if (this.getStyle(element, 'position') === 'fixed') {
            elPosition = element.getBoundingClientRect();
        }
        else {
            const /** @type {?} */ offsetParentEl = this.offsetParent(element);
            elPosition = this.offset(element, false);
            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }
            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }
        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;
        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }
        return elPosition;
    }
    /**
     * @param {?} element
     * @param {?=} round
     * @return {?}
     */
    offset(element, round = true) {
        const /** @type {?} */ elBcr = element.getBoundingClientRect();
        const /** @type {?} */ viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        let /** @type {?} */ elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left
        };
        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }
        return elOffset;
    }
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} placement
     * @param {?=} appendToBody
     * @return {?}
     */
    positionElements(hostElement, targetElement, placement, appendToBody) {
        const /** @type {?} */ hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        const /** @type {?} */ shiftWidth = {
            left: hostElPosition.left,
            center: hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2,
            right: hostElPosition.left + hostElPosition.width
        };
        const /** @type {?} */ shiftHeight = {
            top: hostElPosition.top,
            center: hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2,
            bottom: hostElPosition.top + hostElPosition.height
        };
        const /** @type {?} */ targetElBCR = targetElement.getBoundingClientRect();
        const /** @type {?} */ placementPrimary = placement.split(' ')[0] || 'top';
        const /** @type {?} */ placementSecondary = placement.split(' ')[1] || 'center';
        let /** @type {?} */ targetElPosition = {
            height: targetElBCR.height || targetElement.offsetHeight,
            width: targetElBCR.width || targetElement.offsetWidth,
            top: 0,
            bottom: targetElBCR.height || targetElement.offsetHeight,
            left: 0,
            right: targetElBCR.width || targetElement.offsetWidth
        };
        switch (placementPrimary) {
            case 'top':
                targetElPosition.top = hostElPosition.top - targetElement.offsetHeight;
                targetElPosition.bottom += hostElPosition.top - targetElement.offsetHeight;
                targetElPosition.left = shiftWidth[placementSecondary];
                targetElPosition.right += shiftWidth[placementSecondary];
                break;
            case 'bottom':
                targetElPosition.top = shiftHeight[placementPrimary];
                targetElPosition.bottom += shiftHeight[placementPrimary];
                targetElPosition.left = shiftWidth[placementSecondary];
                targetElPosition.right += shiftWidth[placementSecondary];
                break;
            case 'left':
                targetElPosition.top = shiftHeight[placementSecondary];
                targetElPosition.bottom += shiftHeight[placementSecondary];
                targetElPosition.left = hostElPosition.left - targetElement.offsetWidth;
                targetElPosition.right += hostElPosition.left - targetElement.offsetWidth;
                break;
            case 'right':
                targetElPosition.top = shiftHeight[placementSecondary];
                targetElPosition.bottom += shiftHeight[placementSecondary];
                targetElPosition.left = shiftWidth[placementPrimary];
                targetElPosition.right += shiftWidth[placementPrimary];
                break;
        }
        targetElPosition.top = Math.round(targetElPosition.top);
        targetElPosition.bottom = Math.round(targetElPosition.bottom);
        targetElPosition.left = Math.round(targetElPosition.left);
        targetElPosition.right = Math.round(targetElPosition.right);
        return targetElPosition;
    }
    /**
     * @param {?} element
     * @param {?} prop
     * @return {?}
     */
    getStyle(element, prop) { return (/** @type {?} */ (window.getComputedStyle(element)))[prop]; }
    /**
     * @param {?} element
     * @return {?}
     */
    isStaticPositioned(element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    }
    /**
     * @param {?} element
     * @return {?}
     */
    offsetParent(element) {
        let /** @type {?} */ offsetParentEl = /** @type {?} */ (element.offsetParent) || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = /** @type {?} */ (offsetParentEl.offsetParent);
        }
        return offsetParentEl || document.documentElement;
    }
}
const positionService = new Positioning();
/**
 * @param {?} hostElement
 * @param {?} targetElement
 * @param {?} placement
 * @param {?=} appendToBody
 * @return {?}
 */
function positionElements(hostElement, targetElement, placement, appendToBody) {
    const /** @type {?} */ pos = positionService.positionElements(hostElement, targetElement, placement, appendToBody);
    targetElement.style.top = `${pos.top}px`;
    targetElement.style.left = `${pos.left}px`;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PositioningService {
    /**
     * @param {?} options
     * @return {?}
     */
    position(options) {
        const { element, target, attachment, appendToBody } = options;
        positionElements(this._getHtmlElement(target), this._getHtmlElement(element), /** @type {?} */ (attachment), appendToBody);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    isElementBelowTheFold(element) {
        const /** @type {?} */ rect = element.getBoundingClientRect();
        return ((rect.top + rect.height) > document.body.clientHeight);
    }
    /**
     * @param {?} element
     * @return {?}
     */
    _getHtmlElement(element) {
        // it means that we got a selector
        if (typeof element === 'string') {
            return /** @type {?} */ (document.querySelector(element));
        }
        if (element instanceof ElementRef) {
            return element.nativeElement;
        }
        return /** @type {?} */ (element);
    }
}
PositioningService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class PositioningOptions {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatepickerComponent {
    /**
     * @param {?} hostElement
     * @param {?} positioningService
     */
    constructor(hostElement, positioningService) {
        this.hostElement = hostElement;
        this.positioningService = positioningService;
        this.onDateSelected = new EventEmitter();
        this.days = new Array();
        this.week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.cellCount = 41;
    }
    /**
     * @return {?}
     */
    renderCalendar() {
        for (let /** @type {?} */ i = 0; i <= this.cellCount; i++) {
            // date will be set to the first day of the month set in this.viewDate
            const /** @type {?} */ date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth());
            // Shifts the week to start from Monday, rather than Sunday, this causes the index to start at 1
            const /** @type {?} */ dayOffset = date.getDay() === 0 ? 7 : date.getDay();
            this.days[i] = new Date(date.setDate(2 - dayOffset + i));
        }
    }
    /**
     * @return {?}
     */
    positionCalendar() {
        const /** @type {?} */ rect = this.hostElement.nativeElement.getBoundingClientRect();
        const /** @type {?} */ buffer = 10;
        if (this.positioningService.isElementBelowTheFold(this.hostElement.nativeElement)) {
            this.hostElement.nativeElement.style.top = (rect.top - (rect.top + rect.height + buffer)) + 'px';
        }
    }
    /**
     * @return {?}
     */
    previousMonth() {
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1);
        this.renderCalendar();
    }
    /**
     * @return {?}
     */
    nextMonth() {
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1);
        this.renderCalendar();
    }
    /**
     * @param {?} inputDate
     * @return {?}
     */
    isCurrentMonth(inputDate) {
        return inputDate.getMonth() === this.viewDate.getMonth();
    }
    /**
     * @param {?} inputDate
     * @return {?}
     */
    isCurrentDay(inputDate) {
        return inputDate.getTime() === this.presentDate.getTime();
    }
    /**
     * @param {?} inputDate
     * @return {?}
     */
    isSelectedDay(inputDate) {
        if (this.selectedDate) {
            return inputDate.getTime() === this.selectedDate.getTime();
        }
        return false;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    setSelectedDate(date) {
        this.selectedDate = date;
        this.onDateSelected.emit(date);
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (!!changes["selectedDate"].currentValue) {
            this.viewDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ date = new Date();
        this.presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        this.viewDate = this.viewDate || new Date(date.getFullYear(), date.getMonth());
        this.renderCalendar();
        this.positionCalendar();
    }
}
DatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'hxa-datepicker',
                template: `<div class="hxui-reset">
  <div class="hx-card hxa-datepicker-container">
    <div class="hx-card-header hxa-datepicker-header">
      <div class="hxa-datepicker-month">
        <div class="hxa-datepicker-icon" title="Previous Month" (click)="previousMonth()">
            <a class="hx-button is-transparent"><i class="hx-icon icon-angle-left"></i></a>
        </div>
        <div class="hxa-datepicker-month-title">
          <span>{{viewDate.toLocaleString("en-au", { month: "long", year: "numeric" })}}</span></div>
        <div class="hxa-datepicker-icon" title="Next Month" (click)="nextMonth()">
            <a class="hx-button is-transparent"><i class="hx-icon icon-angle-right"></i></a>
        </div>
      </div>
      <div class="hxa-datepicker-week">
        <div class="hxa-datepicker-weekday" *ngFor="let weekday of week">
          {{weekday | slice:0:3}}
        </div>
      </div>
    </div>
    <div class="hxa-datepicker-contents">
      <div class="hxa-datepicker-day" *ngFor="let day of days"
      [ngClass]="{'hxa-datepicker-day-siblingmonth': !isCurrentMonth(day),
      'hxa-datepicker-day-currentday': isCurrentDay(day),
      'hxa-datepicker-day-selectedday': isSelectedDay(day)}"
      (click)="setSelectedDate(day)">
      <a class="hx-button is-transparent">{{day.getDate()}}</a>
      </div>
    </div>
  </div>
</div>`,
                styles: [`.hxa-datepicker-container{max-width:21em;width:21em;height:24em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;font-size:1rem}.hxa-datepicker-header{padding:1rem 1rem 0;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:initial;-ms-flex-align:initial;align-items:initial;-ms-flex-pack:distribute;justify-content:space-around;font-weight:100}.hxa-datepicker-icon{cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.hxa-datepicker-icon .hx-button{position:initial!important;top:initial!important}.hxa-datepicker-icon .hx-button.is-transparent:hover{color:#000}.hxa-datepicker-icon .hx-icon{font-size:2.3em;position:initial!important;top:initial!important}.hxa-datepicker-month{display:-webkit-box;display:-ms-flexbox;display:flex;text-align:center;margin-bottom:1rem}.hxa-datepicker-month-title{font-size:1.5em;-webkit-box-flex:3;-ms-flex:3;flex:3;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.hxa-datepicker-week{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;text-align:center}.hxa-datepicker-weekday{-webkit-box-flex:1;-ms-flex:1;flex:1}.hxa-datepicker-contents{padding:1rem;background-color:rgba(246,246,249,.5);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-flex:1;-ms-flex:1;flex:1;-ms-flex-pack:distribute;justify-content:space-around;-ms-flex-line-pack:distribute;align-content:space-around}.hxa-datepicker-day{-webkit-box-flex:1;-ms-flex:1 1 14%;flex:1 1 14%;height:16.666%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.hxa-datepicker-day .hx-button{position:initial;top:initial;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:100;height:100%;padding:0}.hxa-datepicker-day-siblingmonth .hx-button{color:rgba(0,0,0,.3)}.hxa-datepicker-day-selectedday .hx-button{color:#fff;background:#41b987}.hxa-datepicker-day-currentday .hx-button{border:2px solid #41b987}`]
            },] },
];
/** @nocollapse */
DatepickerComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: PositioningService, },
];
DatepickerComponent.propDecorators = {
    "onDateSelected": [{ type: Output },],
    "selectedDate": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class DateValueAccessor {
    constructor() {
        this.onChanged = new Array();
        this.onTouched = new Array();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value === null || value instanceof Date) {
            this.setDate(value);
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChanged.push(fn);
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched.push(fn);
    }
    /**
     * @return {?}
     */
    propogateTouched() {
        this.onTouched.forEach(fn => fn());
    }
    /**
     * @param {?} value
     * @return {?}
     */
    propogateChange(value) {
        this.onChanged.forEach(fn => fn(value));
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatepickerFormComponent extends DateValueAccessor {
    /**
     * @param {?} element
     */
    constructor(element) {
        super();
        this.element = element;
        this.onDateChange = new EventEmitter();
        this.disabled = false;
        this.readonly = false;
        this.required = true;
        this.allowTextEntry = true;
        this.defaultToPresentDate = true;
        this.allowPreviousDates = true;
        this.dateFormat = "dd/MM/y";
        this.placeholder = "Date";
        this.align = "bottom";
        this.visible = false;
        this.isValid = true;
        this.hasInitialised = false;
        this.validators = new Array();
    }
    /**
     * @param {?} date
     * @return {?}
     */
    setDate(date) {
        this.date = date;
        this.onDateChange.emit(date);
        this.propogateChange(date);
        this.isValid = true;
    }
    /**
     * @return {?}
     */
    setVisible() {
        this.visible = true;
    }
    /**
     * @return {?}
     */
    unsetVisible() {
        this.visible = false;
    }
    /**
     * @param {?} targetElement
     * @return {?}
     */
    onClickOutsideComponent(targetElement) {
        if (!this.element.nativeElement.firstChild.contains(targetElement)) {
            this.unsetVisible();
        }
    }
    /**
     * @param {?} inputDate
     * @return {?}
     */
    onDateSelectEvent(inputDate) {
        this.unsetVisible();
        this.setDate(inputDate);
    }
    /**
     * @param {?} inputDate
     * @return {?}
     */
    onChange(inputDate) {
        const /** @type {?} */ date = this.parseDate(inputDate);
        const /** @type {?} */ isValid = this.validate(date);
        if (inputDate === "") {
            this.setDate(null);
        }
        else if (isValid) {
            this.setDate(date);
        }
        else {
            this.isValid = false;
        }
    }
    /**
     * @return {?}
     */
    onFocus() {
        this.setVisible();
        this.propogateTouched();
    }
    /**
     * @param {?} inputDate
     * @return {?}
     */
    onTab(inputDate) {
        this.onChange(inputDate);
        this.unsetVisible();
        this.propogateTouched();
    }
    /**
     * @param {?} inputDate
     * @return {?}
     */
    parseDate(inputDate) {
        // Since Date.Parse() only acceps m/d/y dates, we have to swap the day and month
        let /** @type {?} */ dateArray = inputDate.split(/[.,\/ -]/);
        if (dateArray.length == 3 && dateArray[2].length != 0) {
            let /** @type {?} */ day = dateArray.shift();
            dateArray.splice(1, 0, day);
            let /** @type {?} */ parseInput = Date.parse(dateArray.join("/"));
            if (!isNaN(parseInput)) {
                return new Date(parseInput);
            }
        }
        return null;
    }
    /**
     * @param {?} date
     * @return {?}
     */
    validate(date) {
        let /** @type {?} */ isValid = true;
        this.validators.forEach((validator) => {
            isValid = isValid && validator(date);
        });
        return isValid;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerValidator(fn) {
        this.validators.push(fn);
    }
    /**
     * @param {?} presentDate
     * @return {?}
     */
    validateIsNotBeforeDate(presentDate) {
        return (date) => {
            return date.getTime() >= presentDate.getTime();
        };
    }
    /**
     * @param {?} date
     * @return {?}
     */
    validateIsNotNullOrUndefined(date) {
        return !!date;
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        // this.date is set to null after NgModel is bound, we want this to run only once after NgModel has run
        if (this.defaultToPresentDate && !this.hasInitialised && this.date === null) {
            this.setDate(this.presentDate);
            this.hasInitialised = true;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        const /** @type {?} */ date = new Date();
        this.presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if (!this.allowPreviousDates) {
            this.registerValidator(this.validateIsNotBeforeDate(this.presentDate));
        }
        this.registerValidator(this.validateIsNotNullOrUndefined);
    }
}
DatepickerFormComponent.decorators = [
    { type: Component, args: [{
                selector: 'hxa-datepicker-input, hxa-datepicker-form',
                template: `<div class="hx-input-group hxa-datepicker-form">
  <div class="hx-input-control" [ngClass]="{'is-danger': !isValid}">
    <input class="hx-input" type="text" #datePickerForm
    [required]="required ? true : null"
    [value]="date | date:dateFormat"
    (change)="onChange(datePickerForm.value)"
    (focus)="onFocus()"
    (keydown.Tab)="onTab(datePickerForm.value)"
    [disabled]="disabled"
    [readonly]="readonly ? true : null">
    <label class="hx-label">{{placeholder}} <sup *ngIf="required">*</sup></label>
    <div class="hx-help"></div>
    <div class="hxa-datepicker-help">Please select a date</div>
  </div>
  <i class="hx-icon icon-calendar"></i>
  <hxa-datepicker class="hxa-datepicker-calendar" *ngIf="visible" [selectedDate]="date"
   (onDateSelected)="onDateSelectEvent($event)"
   [ngClass]="{'hxa-datepicker-calendar-top': align == 'top', 'hxa-datepicker-calendar-bottom': align == 'bottom'}"></hxa-datepicker>
</div>`,
                styles: [`.hxa-datepicker-form{position:relative;max-width:21rem}.hxa-datepicker-calendar{position:absolute;z-index:99;left:0}.hxa-datepicker-calendar-top{bottom:100%}.hxa-datepicker-calendar-bottom{top:70%}.hxa-datepicker-help{font-size:.75rem;margin-top:.25rem;color:#63605f}.hxa-datepicker-form input[readonly]~.hx-label{top:-.5rem;font-size:.75rem;color:#41b987}`],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => DatepickerFormComponent),
                        multi: true
                    }]
            },] },
];
/** @nocollapse */
DatepickerFormComponent.ctorParameters = () => [
    { type: ElementRef, },
];
DatepickerFormComponent.propDecorators = {
    "onDateChange": [{ type: Output },],
    "disabled": [{ type: Input },],
    "readonly": [{ type: Input },],
    "required": [{ type: Input },],
    "allowTextEntry": [{ type: Input },],
    "defaultToPresentDate": [{ type: Input },],
    "allowPreviousDates": [{ type: Input },],
    "dateFormat": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "align": [{ type: Input },],
    "onClickOutsideComponent": [{ type: HostListener, args: ['document:click', ['$event.target'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DatepickerModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: DatepickerModule, providers: [] };
    }
}
DatepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                declarations: [DatepickerComponent, DatepickerFormComponent],
                exports: [DatepickerComponent, DatepickerFormComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DropdownState {
    constructor() {
        this.direction = 'down';
        this.isOpenChange = new EventEmitter();
        this.isDisabledChange = new EventEmitter();
        this.toggleClick = new EventEmitter();
        this.dropdownMenu = new Promise((resolve) => {
            this.resolveDropdownMenu = resolve;
        });
        this.isOpenChange.subscribe((value) => {
            this.isOpen = value;
        });
    }
}
DropdownState.decorators = [
    { type: Injectable },
];
/** @nocollapse */
DropdownState.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DropdownContainerComponent {
    /**
     * @param {?} _state
     */
    constructor(_state) {
        this._state = _state;
        this.isOpen = false;
        this._subscription = _state.isOpenChange.subscribe((value) => {
            this.isOpen = value;
        });
    }
    /**
     * @return {?}
     */
    get direction() {
        return this._state.direction;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
DropdownContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'hx-dropdown-container',
                host: {
                    style: 'display:block;position: absolute;'
                },
                template: `
    <div [class.is-dropup]="direction === 'up'"
         [class.is-dropdown]="direction === 'down'"
         [class.is-open]="isOpen"><ng-content></ng-content></div>
  `
            },] },
];
/** @nocollapse */
DropdownContainerComponent.ctorParameters = () => [
    { type: DropdownState, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DropdownMenuDirective {
    /**
     * @param {?} _state
     * @param {?} _viewContainer
     * @param {?} _templateRef
     */
    constructor(_state, _viewContainer, _templateRef) {
        _state.resolveDropdownMenu({
            templateRef: _templateRef,
            viewContainer: _viewContainer
        });
    }
}
DropdownMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[hxDropdownMenu],[dropdownMenu]',
                exportAs: 'hx-dropdown-menu'
            },] },
];
/** @nocollapse */
DropdownMenuDirective.ctorParameters = () => [
    { type: DropdownState, },
    { type: ViewContainerRef, },
    { type: TemplateRef, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DropdownToggleDirective {
    /**
     * @param {?} _state
     * @param {?} _element
     * @param {?} _renderer
     */
    constructor(_state, _element, _renderer) {
        this._state = _state;
        this._element = _element;
        this._renderer = _renderer;
        this._subscriptions = [];
        // sync is open value with state
        this._subscriptions.push(this._state
            .isOpenChange.subscribe((value) => this.isOpen = value));
        // populate disabled state
        this._subscriptions.push(this._state
            .isDisabledChange
            .subscribe((value) => this.isDisabled = value || false));
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onClick(event) {
        event.stopPropagation();
        if (this.isDisabled) {
            return;
        }
        // console.log(this._state.isOpen);
        if (!this._state.isOpen) {
            // console.log('click to open');
            this._state.toggleClick.emit();
        }
        if (this._state.isOpen || this._element.nativeElement.contains(event.target)) {
            const /** @type {?} */ removeRegisteredListener = this._renderer.listen('document', 'click', () => {
                //  console.log('the document was clicked', this._state.isOpen);
                this._state.toggleClick.emit(false);
                removeRegisteredListener();
            });
        }
    }
    /**
     * @return {?}
     */
    onEsc() {
        if (this._state.autoClose) {
            this._state.toggleClick.emit(false);
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        for (const /** @type {?} */ sub of this._subscriptions) {
            sub.unsubscribe();
        }
    }
}
DropdownToggleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[hxDropdownToggle],[dropdownToggle]',
                exportAs: 'hx-dropdown-toggle'
            },] },
];
/** @nocollapse */
DropdownToggleDirective.ctorParameters = () => [
    { type: DropdownState, },
    { type: ElementRef, },
    { type: Renderer2, },
];
DropdownToggleDirective.propDecorators = {
    "isDisabled": [{ type: HostBinding, args: ['attr.disabled',] },],
    "isOpen": [{ type: HostBinding, args: ['class.is-active',] }, { type: HostBinding, args: ['attr.aria-expanded',] },],
    "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
    "onEsc": [{ type: HostListener, args: ['keyup.esc',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Default dropdown configuration
 */
class DropdownConfig {
    constructor() {
        /**
         * default dropdown auto closing behavior
         */
        this.autoClose = true;
    }
}
DropdownConfig.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ContentRef {
    /**
     * @param {?} nodes
     * @param {?=} viewRef
     * @param {?=} componentRef
     */
    constructor(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
class Trigger {
    /**
     * @param {?} open
     * @param {?=} close
     */
    constructor(open, close) {
        this.open = open;
        this.close = close || open;
    }
    /**
     * @return {?}
     */
    isManual() { return this.open === 'manual' || this.close === 'manual'; }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const DEFAULT_ALIASES = {
    hover: ['mouseenter', 'mouseleave'],
    focus: ['focusin', 'focusout']
};
/**
 * @param {?} triggers
 * @param {?=} aliases
 * @return {?}
 */
function parseTriggers(triggers, aliases = DEFAULT_ALIASES) {
    const /** @type {?} */ trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    const /** @type {?} */ parsedTriggers = trimmedTriggers.split(/\s+/)
        .map((trigger) => trigger.split(':'))
        .map((triggerPair) => {
        const /** @type {?} */ alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    const /** @type {?} */ manualTriggers = parsedTriggers
        .filter((triggerPair) => triggerPair.isManual());
    if (manualTriggers.length > 1) {
        throw new Error('Triggers parse error: only one manual trigger is allowed');
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw new Error('Triggers parse error: manual trigger can\'t be mixed with other triggers');
    }
    return parsedTriggers;
}
/**
 * @param {?} renderer
 * @param {?} target
 * @param {?} triggers
 * @param {?} showFn
 * @param {?} hideFn
 * @param {?} toggleFn
 * @return {?}
 */
function listenToTriggers(renderer, target, triggers, showFn, hideFn, toggleFn) {
    const /** @type {?} */ parsedTriggers = parseTriggers(triggers);
    const /** @type {?} */ listeners = [];
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return Function.prototype;
    }
    parsedTriggers.forEach((trigger) => {
        if (trigger.open === trigger.close) {
            listeners.push(renderer.listen(target, trigger.open, toggleFn));
            return;
        }
        listeners.push(renderer.listen(target, /** @type {?} */ (trigger.open), showFn), renderer.listen(target, /** @type {?} */ (trigger.close), hideFn));
    });
    return () => { listeners.forEach((unsubscribeFn) => /** @type {?} */ (unsubscribeFn())); };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

/**
 * @template T
 */
class ComponentLoader {
    /**
     * Do not use this directly, it should be instanced via
     * `ComponentLoadFactory.attach`
     * \@internal
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @param {?} _elementRef
     * @param {?} _injector
     * @param {?} _componentFactoryResolver
     * @param {?} _ngZone
     * @param {?} _posService
     */
    constructor(_viewContainerRef, _renderer, _elementRef, _injector, _componentFactoryResolver, _ngZone, _posService) {
        this.onBeforeShow = new EventEmitter();
        this.onShown = new EventEmitter();
        this.onBeforeHide = new EventEmitter();
        this.onHidden = new EventEmitter();
        this._providers = [];
        this._ngZone = _ngZone;
        this._injector = _injector;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._posService = _posService;
        this._viewContainerRef = _viewContainerRef;
        this._componentFactoryResolver = _componentFactoryResolver;
    }
    /**
     * @return {?}
     */
    get isShown() {
        return !!this._componentRef;
    }
    ;
    /**
     * @param {?} compType
     * @return {?}
     */
    attach(compType) {
        this._componentFactory = this._componentFactoryResolver
            .resolveComponentFactory(compType);
        return this;
    }
    /**
     * @param {?=} container
     * @return {?}
     */
    to(container) {
        this.container = container || this.container;
        return this;
    }
    /**
     * @param {?=} opts
     * @return {?}
     */
    position(opts) {
        this.attachment = opts.attachment || this.attachment;
        this._elementRef = /** @type {?} */ (opts.target) || this._elementRef;
        return this;
    }
    /**
     * @param {?} provider
     * @return {?}
     */
    provide(provider) {
        this._providers.push(provider);
        return this;
    }
    /**
     * @param {?=} opts
     * @return {?}
     */
    show(opts = {}) {
        this._subscribePositioning();
        if (!this._componentRef) {
            this.onBeforeShow.emit();
            this._contentRef = this._getContentRef(opts.content);
            const /** @type {?} */ injector = ReflectiveInjector.resolveAndCreate(this._providers, this._injector);
            this._componentRef = this._viewContainerRef
                .createComponent(this._componentFactory, 0, injector, this._contentRef.nodes);
            this.instance = this._componentRef.instance;
            Object.assign(this._componentRef.instance, opts);
            if (this.container === 'body' && typeof document !== 'undefined') {
                document.querySelector(/** @type {?} */ (this.container))
                    .appendChild(this._componentRef.location.nativeElement);
            }
            // we need to manually invoke change detection since events registered
            // via
            // Renderer::listen() are not picked up by change detection with the
            // OnPush strategy
            this._componentRef.changeDetectorRef.markForCheck();
            this.onShown.emit(this._componentRef.instance);
        }
        return this._componentRef;
    }
    /**
     * @return {?}
     */
    hide() {
        if (this._componentRef) {
            this.onBeforeHide.emit(this._componentRef.instance);
            this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._componentRef.hostView));
            this._componentRef = null;
            if (this._contentRef.viewRef) {
                this._viewContainerRef.remove(this._viewContainerRef.indexOf(this._contentRef.viewRef));
                this._contentRef = null;
            }
            this._componentRef = null;
            this.onHidden.emit();
        }
        return this;
    }
    /**
     * @return {?}
     */
    toggle() {
        if (this.isShown) {
            this.hide();
            return;
        }
        this.show();
    }
    /**
     * @return {?}
     */
    dispose() {
        if (this.isShown) {
            this.hide();
        }
        this._unsubscribePositioning();
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
    }
    /**
     * @param {?} listenOpts
     * @return {?}
     */
    listen(listenOpts) {
        this.triggers = listenOpts.triggers || this.triggers;
        listenOpts.target = listenOpts.target || this._elementRef;
        listenOpts.show = listenOpts.show || (() => this.show());
        listenOpts.hide = listenOpts.hide || (() => this.hide());
        listenOpts.toggle = listenOpts.toggle || (() => this.isShown
            ? listenOpts.hide()
            : listenOpts.show());
        this._unregisterListenersFn = listenToTriggers(this._renderer, listenOpts.target.nativeElement, this.triggers, listenOpts.show, listenOpts.hide, listenOpts.toggle);
        return this;
    }
    /**
     * @return {?}
     */
    _subscribePositioning() {
        if (this._zoneSubscription || !this.attachment) {
            return;
        }
        this._zoneSubscription = this._ngZone
            .onStable.subscribe(() => {
            if (!this._componentRef) {
                return;
            }
            this._posService.position({
                element: this._componentRef.location,
                target: this._elementRef,
                attachment: this.attachment,
                appendToBody: this.container === 'body'
            });
        });
    }
    /**
     * @return {?}
     */
    _unsubscribePositioning() {
        if (!this._zoneSubscription) {
            return;
        }
        this._zoneSubscription.unsubscribe();
        this._zoneSubscription = null;
    }
    /**
     * @param {?} content
     * @return {?}
     */
    _getContentRef(content) {
        if (!content) {
            return new ContentRef([]);
        }
        if (content instanceof TemplateRef) {
            const /** @type {?} */ viewRef = this._viewContainerRef
                .createEmbeddedView(content);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        return new ContentRef([[this._renderer.createText(null, `${content}`)]]);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ComponentLoaderFactory {
    /**
     * @param {?} componentFactoryResolver
     * @param {?} ngZone
     * @param {?} injector
     * @param {?} posService
     */
    constructor(componentFactoryResolver, ngZone, injector, posService) {
        this._ngZone = ngZone;
        this._injector = injector;
        this._posService = posService;
        this._componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @template T
     * @param {?} _elementRef
     * @param {?} _viewContainerRef
     * @param {?} _renderer
     * @return {?}
     */
    createLoader(_elementRef, _viewContainerRef, _renderer) {
        return new ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._posService);
    }
}
ComponentLoaderFactory.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ComponentLoaderFactory.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
    { type: NgZone, },
    { type: Injector, },
    { type: PositioningService, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DropdownDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     * @param {?} _viewContainerRef
     * @param {?} _cis
     * @param {?} _config
     * @param {?} _state
     */
    constructor(_elementRef, _renderer, _viewContainerRef, _cis, _config, _state) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._viewContainerRef = _viewContainerRef;
        this._cis = _cis;
        this._config = _config;
        this._state = _state;
        this._isInlineOpen = false;
        this._isInlineRight = false;
        this._subscriptions = [];
        this._isInited = false;
        // create dropdown component loader
        this._dropdown = this._cis
            .createLoader(this._elementRef, this._viewContainerRef, this._renderer)
            .provide({ provide: DropdownState, useValue: this._state });
        this.onShown = this._dropdown.onShown;
        this.onHidden = this._dropdown.onHidden;
        this.isOpenChange = this._state.isOpenChange;
        // set initial dropdown state from config
        this._state.autoClose = this._config.autoClose;
    }
    /**
     * Indicates that dropdown will be closed on item or document click,
     * and after pressing ESC
     * @param {?} value
     * @return {?}
     */
    set autoClose(value) {
        if (typeof value === 'boolean') {
            this._state.autoClose = value;
        }
    }
    ;
    /**
     * @return {?}
     */
    get autoClose() {
        return this._state.autoClose;
    }
    /**
     * Disables dropdown toggle and hides dropdown menu if opened
     * @param {?} value
     * @return {?}
     */
    set isDisabled(value) {
        this._isDisabled = value;
        this._state.isDisabledChange.emit(value);
        if (value) {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    get isDisabled() { return this._isDisabled; }
    /**
     * Returns whether or not dropdown is position right of the toggle
     * @return {?}
     */
    get isRight() {
        return this._isInlineRight;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isRight(value) {
        this._isInlineRight = value;
    }
    /**
     * Returns whether or not the dropdown is currently being shown
     * @return {?}
     */
    get isOpen() {
        if (this._showInline) {
            return this._isInlineOpen;
        }
        return this._dropdown.isShown;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set isOpen(value) {
        if (value) {
            this.show();
        }
        else {
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // fix: seems there are an issue with `routerLinkActive`
        // which result in duplicated call ngOnInit without call to ngOnDestroy
        // read more: https://github.com/valor-software/ngx-bootstrap/issues/1885
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        this._showInline = !this.container;
        // attach DOM listeners
        this._dropdown.listen({
            triggers: this.triggers,
            show: () => this.show()
        });
        // toggle visibility on toggle element click
        this._subscriptions.push(this._state
            .toggleClick.subscribe((value) => this.toggle(value)));
        // hide dropdown if set disabled while opened
        this._subscriptions.push(this._state
            .isDisabledChange.pipe(filter((value) => value === true)).subscribe((value) => this.hide()));
        // attach dropdown menu inside of dropdown
        if (this._showInline) {
            this._state.dropdownMenu
                .then((dropdownMenu) => {
                this._inlinedMenu = dropdownMenu.viewContainer.createEmbeddedView(dropdownMenu.templateRef);
            });
        }
    }
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    show() {
        if (this.isOpen || this.isDisabled) {
            return;
        }
        if (this._showInline) {
            this._isInlineOpen = true;
            this.onShown.emit(true);
            this._state.isOpenChange.emit(true);
            return;
        }
        this._state.dropdownMenu
            .then((dropdownMenu) => {
            // check direction in which dropdown should be opened
            const /** @type {?} */ _dropup = this.dropup === true ||
                (typeof this.dropup !== 'undefined' && this.dropup !== false);
            this._state.direction = _dropup ? 'up' : 'down';
            const /** @type {?} */ _placement = this.placement ||
                (_dropup ? 'top left' : 'bottom left');
            // show dropdown
            this._dropdown
                .attach(DropdownContainerComponent)
                .to(this.container)
                .position({ attachment: _placement })
                .show({
                content: dropdownMenu.templateRef,
                placement: _placement
            });
            this._state.isOpenChange.emit(true);
        });
    }
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @return {?}
     */
    hide() {
        if (!this.isOpen) {
            return;
        }
        if (this._showInline) {
            this._isInlineOpen = false;
            this.onHidden.emit(true);
        }
        else {
            this._dropdown.hide();
        }
        this._state.isOpenChange.emit(false);
    }
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     * @param {?=} value
     * @return {?}
     */
    toggle(value) {
        if (this.isOpen || value === false) {
            return this.hide();
        }
        return this.show();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // clean up subscriptions and destroy dropdown
        for (const /** @type {?} */ sub of this._subscriptions) {
            sub.unsubscribe();
        }
        this._dropdown.dispose();
    }
}
DropdownDirective.decorators = [
    { type: Directive, args: [{
                selector: '[hxDropdown],[dropdown]',
                exportAs: 'hx-dropdown',
                providers: [DropdownState],
                host: {
                    '[class.is-dropup]': 'dropup',
                    '[class.is-open]': 'isOpen',
                    '[class.is-right]': 'isRight'
                }
            },] },
];
/** @nocollapse */
DropdownDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer, },
    { type: ViewContainerRef, },
    { type: ComponentLoaderFactory, },
    { type: DropdownConfig, },
    { type: DropdownState, },
];
DropdownDirective.propDecorators = {
    "placement": [{ type: Input },],
    "triggers": [{ type: Input },],
    "container": [{ type: Input },],
    "dropup": [{ type: Input },],
    "autoClose": [{ type: Input },],
    "isDisabled": [{ type: Input },],
    "isRight": [{ type: Input },],
    "isOpen": [{ type: Input },],
    "isOpenChange": [{ type: Output },],
    "onShown": [{ type: Output },],
    "onHidden": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class DropdownModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: DropdownModule, providers: [
                PositioningService,
                DropdownState,
                { provide: DropdownConfig, useValue: config ? config : { autoClose: true } }
            ]
        };
    }
    ;
}
DropdownModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    DropdownMenuDirective,
                    DropdownToggleDirective,
                    DropdownContainerComponent,
                    DropdownDirective
                ],
                exports: [
                    DropdownMenuDirective,
                    DropdownToggleDirective,
                    DropdownDirective
                ],
                entryComponents: [DropdownContainerComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalContainer {
    /**
     * @return {?}
     */
    close() {
        this.destroy();
    }
}
/**
 * @return {?}
 */
function Modal() {
    return function (target) {
        Object.assign(target.prototype, ModalContainer.prototype);
    };
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
let ModalBackdropComponent = class ModalBackdropComponent {
    /**
     * @return {?}
     */
    dismiss() {
        this.close();
        this.destroy();
    }
};
ModalBackdropComponent.decorators = [
    { type: Component, args: [{
                selector: 'hx-modal-backdrop',
                template: `<div class="hx-modal-backdrop fade in" (click)="dismiss()"></div>`
            },] },
];
ModalBackdropComponent = __decorate([
    Modal()
], ModalBackdropComponent);

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalService {
    /**
     * @param {?} componentFactoryResolver
     */
    constructor(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    /**
     * @param {?} vcRef
     * @return {?}
     */
    registerViewContainerRef(vcRef) {
        this.vcRef = vcRef;
    }
    /**
     * @param {?} injector
     * @return {?}
     */
    registerInjector(injector) {
        this.injector = injector;
    }
    /**
     * Create component dynamically
     * @template T
     * @param {?} component
     * @param {?=} parameters
     * @return {?}
     */
    create(component, parameters) {
        //create backdrop
        this.backdropRef = this.dynamicComponentLoader(ModalBackdropComponent);
        //create dynamic component
        return this.dynamicComponentLoader(component, parameters);
    }
    /**
     * Load dynamic component and return componentRef
     * @template T
     * @param {?} component
     * @param {?=} parameters
     * @return {?}
     */
    dynamicComponentLoader(component, parameters) {
        // compile the component based on its type and
        // create a component factory
        const /** @type {?} */ factory = this.componentFactoryResolver.resolveComponentFactory(component);
        // the injector will be needed for DI in
        // the custom component
        const /** @type {?} */ childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
        // create the actual component
        const /** @type {?} */ componentRef = this.vcRef.createComponent(factory, 0, childInjector);
        // pass the @Input parameters to the instance
        Object.assign(componentRef.instance, parameters);
        // add a destroy method to the modal instance
        componentRef.instance['destroy'] = () => {
            // this will close the backdrop
            this.backdropRef.destroy();
            // this will destroy the component
            componentRef.destroy();
        };
        return componentRef;
    }
}
ModalService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
ModalService.ctorParameters = () => [
    { type: ComponentFactoryResolver, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalPlaceholderComponent {
    /**
     * @param {?} modalService
     * @param {?} injector
     */
    constructor(modalService, injector) {
        this.modalService = modalService;
        this.injector = injector;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    }
}
ModalPlaceholderComponent.decorators = [
    { type: Component, args: [{
                selector: 'hx-modal-placeholder',
                template: `<div #modalPlaceholder></div>`
            },] },
];
/** @nocollapse */
ModalPlaceholderComponent.ctorParameters = () => [
    { type: ModalService, },
    { type: Injector, },
];
ModalPlaceholderComponent.propDecorators = {
    "viewContainerRef": [{ type: ViewChild, args: ['modalPlaceholder', { read: ViewContainerRef },] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ModalModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: ModalModule,
            providers: [ModalService]
        };
    }
}
ModalModule.decorators = [
    { type: NgModule, args: [{
                declarations: [ModalPlaceholderComponent, ModalBackdropComponent],
                exports: [ModalPlaceholderComponent],
                entryComponents: [ModalBackdropComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Provides default values for Pagination and pager components
 */
class PaginationConfig {
    constructor() {
        this.main = {
            maxSize: void 0,
            itemsPerPage: 10,
            boundaryLinks: false,
            directionLinks: true,
            firstText: 'First',
            previousText: 'Previous',
            nextText: 'Next',
            lastText: 'Last',
            pageBtnClass: '',
            rotate: true,
            sticky: false
        };
        this.pager = {
            itemsPerPage: 15,
            previousText: 'Previous',
            nextText: 'Next',
            pageBtnClass: '',
            align: true
        };
    }
}
PaginationConfig.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const PAGER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PagerComponent),
    multi: true
};
const PAGER_TEMPLATE = `
    <ul class="hx-flex hx-flex-justify-between">
      <li [class.is-disabled]="noPrevious()" [class.is-previous]="align" class="{{ pageBtnClass }}">
        <a href (click)="selectPage(page - 1, $event)">{{getText('previous')}}</a>
      </li>
      <li [class.is-disabled]="noNext()" [class.is-next]="align" class="{{ pageBtnClass }}">
        <a href (click)="selectPage(page + 1, $event)">{{getText('next')}}</a>
      </li>
  </ul>
`;
class PagerComponent {
    /**
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} paginationConfig
     */
    constructor(renderer, elementRef, paginationConfig) {
        /**
         * fired when total pages count changes, $event:number equals to total pages count
         */
        this.numPages = new EventEmitter();
        /**
         * fired when page was changed, $event:{page, itemsPerPage} equals to object with current page index and number of items per page
         */
        this.pageChanged = new EventEmitter();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.inited = false;
        this._page = 1;
        this.renderer = renderer;
        this.elementRef = elementRef;
        if (!this.config) {
            this.configureOptions(Object.assign({}, paginationConfig.main, paginationConfig.pager));
        }
    }
    /**
     * maximum number of items per page. If value less than 1 will display all items on one page
     * @return {?}
     */
    get itemsPerPage() {
        return this._itemsPerPage;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set itemsPerPage(v) {
        this._itemsPerPage = v;
        this.totalPages = this.calculateTotalPages();
    }
    /**
     * total number of items in all pages
     * @return {?}
     */
    get totalItems() {
        return this._totalItems;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set totalItems(v) {
        this._totalItems = v;
        this.totalPages = this.calculateTotalPages();
    }
    /**
     * @return {?}
     */
    get totalPages() {
        return this._totalPages;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set totalPages(v) {
        this._totalPages = v;
        this.numPages.emit(v);
        if (this.inited) {
            this.selectPage(this.page);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set page(value) {
        const /** @type {?} */ _previous = this._page;
        this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
        if (_previous === this._page || typeof _previous === 'undefined') {
            return;
        }
        this.pageChanged.emit({
            page: this._page,
            itemsPerPage: this.itemsPerPage
        });
    }
    /**
     * @return {?}
     */
    get page() {
        return this._page;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    configureOptions(config) {
        this.config = Object.assign({}, config);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
        // watch for maxSize
        this.maxSize = typeof this.maxSize !== 'undefined'
            ? this.maxSize
            : this.config.maxSize;
        this.rotate = typeof this.rotate !== 'undefined'
            ? this.rotate
            : this.config.rotate;
        this.boundaryLinks = typeof this.boundaryLinks !== 'undefined'
            ? this.boundaryLinks
            : this.config.boundaryLinks;
        this.directionLinks = typeof this.directionLinks !== 'undefined'
            ? this.directionLinks
            : this.config.directionLinks;
        this.pageBtnClass = typeof this.pageBtnClass !== 'undefined'
            ? this.pageBtnClass
            : this.config.pageBtnClass;
        // base class
        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined'
            ? this.itemsPerPage
            : this.config.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        // this class
        this.pages = this.getPages(this.page, this.totalPages);
        this.inited = true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getText(key) {
        return (/** @type {?} */ (this))[key + 'Text'] || this.config[key + 'Text'];
    }
    /**
     * @return {?}
     */
    noPrevious() {
        return this.page === 1;
    }
    /**
     * @return {?}
     */
    noNext() {
        return this.page === this.totalPages;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} page
     * @param {?=} event
     * @return {?}
     */
    selectPage(page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                const /** @type {?} */ target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.onChange(this.page);
        }
    }
    /**
     * @param {?} num
     * @param {?} text
     * @param {?} active
     * @return {?}
     */
    makePage(num, text, active) {
        return { text, number: num, active };
    }
    /**
     * @param {?} currentPage
     * @param {?} totalPages
     * @return {?}
     */
    getPages(currentPage, totalPages) {
        const /** @type {?} */ pages = [];
        // Default page limits
        let /** @type {?} */ startPage = 1;
        let /** @type {?} */ endPage = totalPages;
        const /** @type {?} */ isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                // Visible pages are paginated with maxSize
                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        // Add page number links
        for (let /** @type {?} */ num = startPage; num <= endPage; num++) {
            const /** @type {?} */ page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                const /** @type {?} */ previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                const /** @type {?} */ nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    }
    /**
     * @return {?}
     */
    calculateTotalPages() {
        const /** @type {?} */ totalPages = this.itemsPerPage < 1
            ? 1
            : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }
}
PagerComponent.decorators = [
    { type: Component, args: [{
                selector: 'hx-pager',
                template: PAGER_TEMPLATE,
                providers: [PAGER_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
PagerComponent.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
    { type: PaginationConfig, },
];
PagerComponent.propDecorators = {
    "align": [{ type: Input },],
    "maxSize": [{ type: Input },],
    "boundaryLinks": [{ type: Input },],
    "directionLinks": [{ type: Input },],
    "firstText": [{ type: Input },],
    "previousText": [{ type: Input },],
    "nextText": [{ type: Input },],
    "lastText": [{ type: Input },],
    "rotate": [{ type: Input },],
    "pageBtnClass": [{ type: Input },],
    "disabled": [{ type: Input },],
    "numPages": [{ type: Output },],
    "pageChanged": [{ type: Output },],
    "itemsPerPage": [{ type: Input },],
    "totalItems": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */

const PAGINATION_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PaginationComponent),
    multi: true
};
const PAGINATION_TEMPLATE = `
  <ul class="hx-pagination" [ngClass]="classMap" [class.is-sticky]="sticky">
    <li class="is-first"
        *ngIf="boundaryLinks"
        [class.is-disabled]="noPrevious()||disabled">
      <a href (click)="selectPage(1, $event)" [innerHTML]="getText('first')"></a>
    </li>
    <li class="is-prev"
        *ngIf="directionLinks"
        [class.is-disabled]="noPrevious()||disabled">
      <a href (click)="selectPage(page - 1, $event)" [innerHTML]="getText('previous')"></a>
      </li>
    <li *ngFor="let pg of pages"
        [class.is-current]="pg.active"
        [class.is-disabled]="disabled&&!pg.active">
      <a href (click)="selectPage(pg.number, $event)" [innerHTML]="pg.text"></a>
    </li>
    <li class="is-next"
        *ngIf="directionLinks"
        [class.is-disabled]="noNext()||disabled">
      <a class="page-link" href (click)="selectPage(page + 1, $event)" [innerHTML]="getText('next')"></a></li>
    <li class="is-last"
        *ngIf="boundaryLinks"
        [class.is-disabled]="noNext()||disabled">
      <a href (click)="selectPage(totalPages, $event)" [innerHTML]="getText('last')"></a></li>
  </ul>
  `;
class PaginationComponent {
    /**
     * @param {?} renderer
     * @param {?} elementRef
     * @param {?} paginationConfig
     */
    constructor(renderer, elementRef, paginationConfig) {
        /**
         * fired when total pages count changes, $event:number equals to total pages count
         */
        this.numPages = new EventEmitter();
        /**
         * fired when page was changed, $event:{page, itemsPerPage} equals to object with current page index and number of items per page
         */
        this.pageChanged = new EventEmitter();
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.inited = false;
        this._page = 1;
        this.renderer = renderer;
        this.elementRef = elementRef;
        if (!this.config) {
            this.configureOptions(paginationConfig.main);
        }
    }
    /**
     * maximum number of items per page. If value less than 1 will display all items on one page
     * @return {?}
     */
    get itemsPerPage() {
        return this._itemsPerPage;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set itemsPerPage(v) {
        this._itemsPerPage = v;
        this.totalPages = this.calculateTotalPages();
    }
    /**
     * total number of items in all pages
     * @return {?}
     */
    get totalItems() {
        return this._totalItems;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set totalItems(v) {
        this._totalItems = v;
        this.totalPages = this.calculateTotalPages();
    }
    /**
     * @return {?}
     */
    get totalPages() {
        return this._totalPages;
    }
    /**
     * @param {?} v
     * @return {?}
     */
    set totalPages(v) {
        this._totalPages = v;
        this.numPages.emit(v);
        if (this.inited) {
            this.selectPage(this.page);
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set page(value) {
        const /** @type {?} */ _previous = this._page;
        this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
        if (_previous === this._page || typeof _previous === 'undefined') {
            return;
        }
        this.pageChanged.emit({
            page: this._page,
            itemsPerPage: this.itemsPerPage
        });
    }
    /**
     * @return {?}
     */
    get page() {
        return this._page;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    configureOptions(config) {
        this.config = Object.assign({}, config);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
        // watch for maxSize
        this.maxSize = typeof this.maxSize !== 'undefined'
            ? this.maxSize
            : this.config.maxSize;
        this.rotate = typeof this.rotate !== 'undefined'
            ? this.rotate
            : this.config.rotate;
        this.boundaryLinks = typeof this.boundaryLinks !== 'undefined'
            ? this.boundaryLinks
            : this.config.boundaryLinks;
        this.directionLinks = typeof this.directionLinks !== 'undefined'
            ? this.directionLinks
            : this.config.directionLinks;
        this.pageBtnClass = typeof this.pageBtnClass !== 'undefined'
            ? this.pageBtnClass
            : this.config.pageBtnClass;
        // base class
        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined'
            ? this.itemsPerPage
            : this.config.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        // this class
        this.pages = this.getPages(this.page, this.totalPages);
        this.inited = true;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    }
    /**
     * @param {?} key
     * @return {?}
     */
    getText(key) {
        return (/** @type {?} */ (this))[key + 'Text'] || this.config[key + 'Text'];
    }
    /**
     * @return {?}
     */
    noPrevious() {
        return this.page === 1;
    }
    /**
     * @return {?}
     */
    noNext() {
        return this.page === this.totalPages;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChange = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    /**
     * @param {?} page
     * @param {?=} event
     * @return {?}
     */
    selectPage(page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                const /** @type {?} */ target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.onChange(this.page);
        }
    }
    /**
     * @param {?} num
     * @param {?} text
     * @param {?} active
     * @return {?}
     */
    makePage(num, text, active) {
        return { text, number: num, active };
    }
    /**
     * @param {?} currentPage
     * @param {?} totalPages
     * @return {?}
     */
    getPages(currentPage, totalPages) {
        const /** @type {?} */ pages = [];
        // Default page limits
        let /** @type {?} */ startPage = 1;
        let /** @type {?} */ endPage = totalPages;
        const /** @type {?} */ isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        // recompute if maxSize
        if (isMaxSized) {
            if (this.rotate) {
                // Current page is displayed in the middle of the visible ones
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                // Adjust if limit is exceeded
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                // Visible pages are paginated with maxSize
                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
                // Adjust last page if limit is exceeded
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        // Add page number links
        for (let /** @type {?} */ num = startPage; num <= endPage; num++) {
            const /** @type {?} */ page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                const /** @type {?} */ previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                const /** @type {?} */ nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    }
    /**
     * @return {?}
     */
    calculateTotalPages() {
        const /** @type {?} */ totalPages = this.itemsPerPage < 1
            ? 1
            : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    }
}
PaginationComponent.decorators = [
    { type: Component, args: [{
                selector: 'hx-pagination',
                template: PAGINATION_TEMPLATE,
                providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
PaginationComponent.ctorParameters = () => [
    { type: Renderer, },
    { type: ElementRef, },
    { type: PaginationConfig, },
];
PaginationComponent.propDecorators = {
    "align": [{ type: Input },],
    "maxSize": [{ type: Input },],
    "boundaryLinks": [{ type: Input },],
    "directionLinks": [{ type: Input },],
    "firstText": [{ type: Input },],
    "previousText": [{ type: Input },],
    "nextText": [{ type: Input },],
    "lastText": [{ type: Input },],
    "rotate": [{ type: Input },],
    "sticky": [{ type: Input },],
    "pageBtnClass": [{ type: Input },],
    "disabled": [{ type: Input },],
    "numPages": [{ type: Output },],
    "pageChanged": [{ type: Output },],
    "itemsPerPage": [{ type: Input },],
    "totalItems": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class PaginationModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return { ngModule: PaginationModule, providers: [PaginationConfig] };
    }
}
PaginationModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [PagerComponent, PaginationComponent],
                exports: [PagerComponent, PaginationComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgTranscludeDirective {
    /**
     * @param {?} viewRef
     */
    constructor(viewRef) {
        this.viewRef = viewRef;
    }
    /**
     * @param {?} templateRef
     * @return {?}
     */
    set ngTransclude(templateRef) {
        this._ngTransclude = templateRef;
        if (templateRef) {
            this.viewRef.createEmbeddedView(templateRef);
        }
    }
    /**
     * @return {?}
     */
    get ngTransclude() {
        return this._ngTransclude;
    }
}
NgTranscludeDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngTransclude]'
            },] },
];
/** @nocollapse */
NgTranscludeDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
];
NgTranscludeDirective.propDecorators = {
    "ngTransclude": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabsetConfig {
    constructor() {
        /**
         * provides default navigation context class: 'tabs' or 'pills'
         */
        this.type = 'tabs';
    }
}
TabsetConfig.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabsetComponent {
    /**
     * @param {?} config
     */
    constructor(config) {
        this.clazn = true;
        this.tabs = [];
        this.classMap = {};
        Object.assign(this, config);
    }
    /**
     * if true tabs will be placed vertically
     * @return {?}
     */
    get vertical() {
        return this._vertical;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set vertical(value) {
        this._vertical = value;
        this.setClassMap();
    }
    /**
     * if true tabs fill the container and have a consistent width
     * @return {?}
     */
    get justified() {
        return this._justified;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set justified(value) {
        this._justified = value;
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    get hasInfo() {
        return this._hasInfo;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set hasInfo(value) {
        this._hasInfo = value;
        this.setClassMap();
    }
    /**
     * navigation context class: 'tabs' or 'pills'
     * @return {?}
     */
    get type() {
        return this._type;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set type(value) {
        this._type = value;
        this.setClassMap();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.isDestroyed = true;
    }
    /**
     * @param {?} tab
     * @return {?}
     */
    addTab(tab) {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && tab.active !== false;
    }
    /**
     * @param {?} tab
     * @param {?=} options
     * @return {?}
     */
    removeTab(tab, options = { reselect: true, emit: true }) {
        const /** @type {?} */ index = this.tabs.indexOf(tab);
        if (index === -1 || this.isDestroyed) {
            return;
        }
        // Select a new tab if the tab to be removed is selected and not destroyed
        if (options.reselect && tab.active && this.hasAvailableTabs(index)) {
            const /** @type {?} */ newActiveIndex = this.getClosestTabIndex(index);
            this.tabs[newActiveIndex].active = true;
        }
        if (options.emit) {
            tab.removed.emit(tab);
        }
        this.tabs.splice(index, 1);
        if (tab.elementRef.nativeElement && tab.elementRef.nativeElement.remove) {
            tab.elementRef.nativeElement.remove();
        }
    }
    /**
     * @param {?} index
     * @return {?}
     */
    getClosestTabIndex(index) {
        const /** @type {?} */ tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (let /** @type {?} */ step = 1; step <= tabsLength; step += 1) {
            const /** @type {?} */ prevIndex = index - step;
            const /** @type {?} */ nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    }
    /**
     * @param {?} index
     * @return {?}
     */
    hasAvailableTabs(index) {
        const /** @type {?} */ tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }
        for (let /** @type {?} */ i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    }
    /**
     * @return {?}
     */
    setClassMap() {
        this.classMap = {
            'is-vertical': this.vertical,
            'is-justified': this.justified,
            'has-info': this.hasInfo,
            [`hx-nav-${this.type}`]: true
        };
    }
}
TabsetComponent.decorators = [
    { type: Component, args: [{
                selector: 'hx-tabset',
                template: `
    <ul class="hx-nav" [ngClass]="classMap" (click)="$event.preventDefault()">
        <li *ngFor="let tabz of tabs" [ngClass]="['hx-nav-item', tabz.customClass || '']"
          [class.is-active]="tabz.active" [class.is-disabled]="tabz.disabled">
          <a href="javascript:void(0);" class="hx-nav-link"
            [class.is-active]="tabz.active" [class.is-disabled]="tabz.disabled"
            (click)="tabz.active = true">
            <span [ngTransclude]="tabz.headingRef">{{tabz.heading}}</span>
            <span *ngIf="tabz.removable">
              <span (click)="$event.preventDefault(); removeTab(tabz);" class="icon close-outline is-small"></span>
            </span>
          </a>
        </li>
    </ul>
    <div class="hx-tab-content">
      <ng-content></ng-content>
    </div>
  `
            },] },
];
/** @nocollapse */
TabsetComponent.ctorParameters = () => [
    { type: TabsetConfig, },
];
TabsetComponent.propDecorators = {
    "vertical": [{ type: Input },],
    "justified": [{ type: Input },],
    "hasInfo": [{ type: Input },],
    "type": [{ type: Input },],
    "clazn": [{ type: HostBinding, args: ['class.hx-tab-container',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabDirective {
    /**
     * @param {?} tabset
     * @param {?} elementRef
     */
    constructor(tabset, elementRef) {
        this.elementRef = elementRef;
        /**
         * fired when tab became active, $event:Tab equals to selected instance of Tab component
         */
        this.select = new EventEmitter();
        /**
         * fired when tab became inactive, $event:Tab equals to deselected instance of Tab component
         */
        this.deselect = new EventEmitter();
        /**
         * fired before tab will be removed, $event:Tab equals to instance of removed tab
         */
        this.removed = new EventEmitter();
        this.addClasn = true;
        this.tabset = tabset;
        this.tabset.addTab(this);
    }
    /**
     * tab active state toggle
     * @return {?}
     */
    get active() {
        return this._active;
    }
    /**
     * @param {?} active
     * @return {?}
     */
    set active(active) {
        if (this.disabled && active || !active) {
            if (!active) {
                this._active = active;
            }
            //if(typeof active != 'undefined')
            this.deselect.emit(this);
            return;
        }
        this._active = active;
        this.select.emit(this);
        this.tabset.tabs.forEach((tab) => {
            if (tab !== this) {
                tab.active = false;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.removable = this.removable;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.tabset.removeTab(this, { reselect: false, emit: false });
    }
}
TabDirective.decorators = [
    { type: Directive, args: [{ selector: 'hx-tab, [hx-tab]' },] },
];
/** @nocollapse */
TabDirective.ctorParameters = () => [
    { type: TabsetComponent, },
    { type: ElementRef, },
];
TabDirective.propDecorators = {
    "heading": [{ type: Input },],
    "id": [{ type: Input },],
    "disabled": [{ type: Input },],
    "removable": [{ type: Input },],
    "customClass": [{ type: Input },],
    "active": [{ type: HostBinding, args: ['class.is-active',] }, { type: Input },],
    "select": [{ type: Output },],
    "deselect": [{ type: Output },],
    "removed": [{ type: Output },],
    "addClasn": [{ type: HostBinding, args: ['class.hx-tab-pane',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Should be used to mark <template> element as a template for tab heading
 */
class TabHeadingDirective {
    /**
     * @param {?} templateRef
     * @param {?} tab
     */
    constructor(templateRef, tab) {
        tab.headingRef = templateRef;
    }
}
TabHeadingDirective.decorators = [
    { type: Directive, args: [{ selector: '[hxTabHeading]' },] },
];
/** @nocollapse */
TabHeadingDirective.ctorParameters = () => [
    { type: TemplateRef, },
    { type: TabDirective, },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabsModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: TabsModule,
            providers: [TabsetConfig]
        };
    }
}
TabsModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NgTranscludeDirective, TabDirective, TabsetComponent, TabHeadingDirective],
                exports: [TabDirective, TabsetComponent, TabHeadingDirective, NgTranscludeDirective]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const Context = {
    None: 0,
    Success: 1,
    Warning: 2,
    Danger: 3,
};
Context[Context.None] = "None";
Context[Context.Success] = "Success";
Context[Context.Warning] = "Warning";
Context[Context.Danger] = "Danger";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TooltipContentComponent {
    /**
     * @param {?} element
     * @param {?} cdr
     */
    constructor(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.placement = 'bottom';
        this.context = Context.None;
        this.animation = true;
        this.top = -100000;
        this.left = -100000;
        this.active = false;
        this.contextEnum = Context;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.show();
        this.cdr.detectChanges();
    }
    /**
     * @return {?}
     */
    show() {
        if (!this.hostElement) {
            return;
        }
        const /** @type {?} */ p = this.positionElements(this.hostElement, this.element.nativeElement.children[0], this.placement);
        this.top = p.top;
        this.left = p.left;
        this.active = true;
    }
    /**
     * @return {?}
     */
    hide() {
        this.top = -100000;
        this.left = -100000;
        this.active = true;
    }
    /**
     * @param {?} hostEl
     * @param {?} targetEl
     * @param {?} positionStr
     * @param {?=} appendToBody
     * @return {?}
     */
    positionElements(hostEl, targetEl, positionStr, appendToBody = true) {
        const /** @type {?} */ positionStrParts = positionStr.split('-');
        const /** @type {?} */ pos0 = positionStrParts[0];
        const /** @type {?} */ pos1 = positionStrParts[1] || 'center';
        const /** @type {?} */ hostElPos = appendToBody
            ? this.offset(hostEl)
            : this.position(hostEl);
        const /** @type {?} */ targetElWidth = targetEl.offsetWidth;
        const /** @type {?} */ targetElHeight = targetEl.offsetHeight;
        const /** @type {?} */ shiftWidth = {
            center: function () {
                return hostElPos.left + hostElPos.width / 2 - targetElWidth / 2;
            },
            left: function () {
                return hostElPos.left;
            },
            right: function () {
                return hostElPos.left + hostElPos.width;
            }
        };
        const /** @type {?} */ shiftHeight = {
            center: function () {
                return hostElPos.top + hostElPos.height / 2 - targetElHeight / 2;
            },
            top: function () {
                return hostElPos.top;
            },
            bottom: function () {
                return hostElPos.top + hostElPos.height;
            }
        };
        let /** @type {?} */ targetElPos;
        switch (pos0) {
            case 'right':
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: shiftWidth[pos0]()
                };
                break;
            case 'left':
                targetElPos = {
                    top: shiftHeight[pos1](),
                    left: hostElPos.left - targetElWidth
                };
                break;
            case 'bottom':
                targetElPos = {
                    top: shiftHeight[pos0](),
                    left: shiftWidth[pos1]()
                };
                break;
            default:
                targetElPos = {
                    top: hostElPos.top - targetElHeight,
                    left: shiftWidth[pos1]()
                };
                break;
        }
        return targetElPos;
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    position(nativeEl) {
        let /** @type {?} */ offsetParentBCR = { top: 0, left: 0 };
        const /** @type {?} */ elBCR = this.offset(nativeEl);
        const /** @type {?} */ offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top +=
                offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left +=
                offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        const /** @type {?} */ boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    offset(nativeEl) {
        const /** @type {?} */ boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top +
                (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left +
                (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    }
    /**
     * @param {?} nativeEl
     * @param {?} cssProp
     * @return {?}
     */
    getStyle(nativeEl, cssProp) {
        if ((/** @type {?} */ (nativeEl)).currentStyle) {
            // IE
            return (/** @type {?} */ (nativeEl)).currentStyle[cssProp];
        }
        if (window.getComputedStyle) {
            return (/** @type {?} */ (window.getComputedStyle(nativeEl)))[cssProp];
        }
        // finally try and get inline style
        return (/** @type {?} */ (nativeEl.style))[cssProp];
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    isStaticPositioned(nativeEl) {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    }
    /**
     * @param {?} nativeEl
     * @return {?}
     */
    parentOffsetEl(nativeEl) {
        let /** @type {?} */ offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent &&
            offsetParent !== window.document &&
            this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    }
}
TooltipContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'hx-tooltip-content',
                template: `
        <div class="hx-tooltip is-{{ placement }}"
             [style.top]="top + 'px'"
             [style.left]="left + 'px'"
             [class.is-active]="active"
             [class.is-success]="context === contextEnum.Success"
             [class.is-warning]="context === contextEnum.Warning"
             [class.is-danger]="context === contextEnum.Danger"
             role="tooltip">
            <div class="hx-tooltip-content">
                <ng-content></ng-content>
                {{ content }}
            </div>
        </div>
`
            },] },
];
/** @nocollapse */
TooltipContentComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
];
TooltipContentComponent.propDecorators = {
    "hostElement": [{ type: Input },],
    "content": [{ type: Input },],
    "placement": [{ type: Input },],
    "context": [{ type: Input },],
    "animation": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Default values provider for tooltip
 */
class TooltipConfig {
    constructor() {
        /**
         * tooltip placement, supported positions: 'top', 'bottom', 'left', 'right'
         */
        this.placement = 'bottom';
        /**
         * tooltip context (colour)
         */
        this.context = Context.None;
        /**
         * should tooltip start in a disabled state
         */
        this.disabled = false;
        /**
         * animate tooltip or not
         */
        this.animation = true;
    }
}
TooltipConfig.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TooltipDirective {
    /**
     * @param {?} viewContainerRef
     * @param {?} resolver
     * @param {?} config
     */
    constructor(viewContainerRef, resolver, config) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.config = config;
        this.animation = true;
        this.placement = 'bottom';
        this.context = Context.None;
        Object.assign(this, config);
    }
    /**
     * @return {?}
     */
    show() {
        if (this.disabled || this.visible) {
            return;
        }
        this.visible = true;
        if (typeof this.content === 'string') {
            const /** @type {?} */ factory = this.resolver.resolveComponentFactory(TooltipContentComponent);
            if (!this.visible) {
                return;
            }
            this.tooltip = this.viewContainerRef.createComponent(factory);
            this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.tooltip.instance.content = /** @type {?} */ (this.content);
            this.tooltip.instance.placement = this.placement;
            this.tooltip.instance.context = this.context;
            this.tooltip.instance.animation = this.animation;
        }
        else {
            const /** @type {?} */ tooltip = /** @type {?} */ (this.content);
            tooltip.hostElement = this.viewContainerRef.element.nativeElement;
            tooltip.placement = this.placement;
            tooltip.context = this.context;
            tooltip.animation = this.animation;
            tooltip.show();
        }
    }
    /**
     * @return {?}
     */
    hide() {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this.tooltip) {
            this.tooltip.destroy();
        }
        if (this.content instanceof TooltipContentComponent) {
            (/** @type {?} */ (this.content)).hide();
        }
    }
}
TooltipDirective.decorators = [
    { type: Directive, args: [{
                selector: '[hxTooltip]'
            },] },
];
/** @nocollapse */
TooltipDirective.ctorParameters = () => [
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
    { type: TooltipConfig, },
];
TooltipDirective.propDecorators = {
    "content": [{ type: Input, args: ['hxTooltip',] },],
    "disabled": [{ type: Input },],
    "animation": [{ type: Input },],
    "placement": [{ type: Input },],
    "context": [{ type: Input },],
    "show": [{ type: HostListener, args: ['focusin',] }, { type: HostListener, args: ['mouseenter',] },],
    "hide": [{ type: HostListener, args: ['focusout',] }, { type: HostListener, args: ['mouseleave',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TooltipModule {
    /**
     * @return {?}
     */
    static forRoot() { return { ngModule: TooltipModule, providers: [TooltipConfig] }; }
}
TooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [TooltipContentComponent, TooltipDirective],
                exports: [TooltipContentComponent, TooltipDirective],
                entryComponents: [TooltipContentComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/* tslint:disable:max-file-line-count */
const latinMap = {
    'Á': 'A',
    'Ă': 'A',
    'Ắ': 'A',
    'Ặ': 'A',
    'Ằ': 'A',
    'Ẳ': 'A',
    'Ẵ': 'A',
    'Ǎ': 'A',
    'Â': 'A',
    'Ấ': 'A',
    'Ậ': 'A',
    'Ầ': 'A',
    'Ẩ': 'A',
    'Ẫ': 'A',
    'Ä': 'A',
    'Ǟ': 'A',
    'Ȧ': 'A',
    'Ǡ': 'A',
    'Ạ': 'A',
    'Ȁ': 'A',
    'À': 'A',
    'Ả': 'A',
    'Ȃ': 'A',
    'Ā': 'A',
    'Ą': 'A',
    'Å': 'A',
    'Ǻ': 'A',
    'Ḁ': 'A',
    'Ⱥ': 'A',
    'Ã': 'A',
    'Ꜳ': 'AA',
    'Æ': 'AE',
    'Ǽ': 'AE',
    'Ǣ': 'AE',
    'Ꜵ': 'AO',
    'Ꜷ': 'AU',
    'Ꜹ': 'AV',
    'Ꜻ': 'AV',
    'Ꜽ': 'AY',
    'Ḃ': 'B',
    'Ḅ': 'B',
    'Ɓ': 'B',
    'Ḇ': 'B',
    'Ƀ': 'B',
    'Ƃ': 'B',
    'Ć': 'C',
    'Č': 'C',
    'Ç': 'C',
    'Ḉ': 'C',
    'Ĉ': 'C',
    'Ċ': 'C',
    'Ƈ': 'C',
    'Ȼ': 'C',
    'Ď': 'D',
    'Ḑ': 'D',
    'Ḓ': 'D',
    'Ḋ': 'D',
    'Ḍ': 'D',
    'Ɗ': 'D',
    'Ḏ': 'D',
    'ǲ': 'D',
    'ǅ': 'D',
    'Đ': 'D',
    'Ƌ': 'D',
    'Ǳ': 'DZ',
    'Ǆ': 'DZ',
    'É': 'E',
    'Ĕ': 'E',
    'Ě': 'E',
    'Ȩ': 'E',
    'Ḝ': 'E',
    'Ê': 'E',
    'Ế': 'E',
    'Ệ': 'E',
    'Ề': 'E',
    'Ể': 'E',
    'Ễ': 'E',
    'Ḙ': 'E',
    'Ë': 'E',
    'Ė': 'E',
    'Ẹ': 'E',
    'Ȅ': 'E',
    'È': 'E',
    'Ẻ': 'E',
    'Ȇ': 'E',
    'Ē': 'E',
    'Ḗ': 'E',
    'Ḕ': 'E',
    'Ę': 'E',
    'Ɇ': 'E',
    'Ẽ': 'E',
    'Ḛ': 'E',
    'Ꝫ': 'ET',
    'Ḟ': 'F',
    'Ƒ': 'F',
    'Ǵ': 'G',
    'Ğ': 'G',
    'Ǧ': 'G',
    'Ģ': 'G',
    'Ĝ': 'G',
    'Ġ': 'G',
    'Ɠ': 'G',
    'Ḡ': 'G',
    'Ǥ': 'G',
    'Ḫ': 'H',
    'Ȟ': 'H',
    'Ḩ': 'H',
    'Ĥ': 'H',
    'Ⱨ': 'H',
    'Ḧ': 'H',
    'Ḣ': 'H',
    'Ḥ': 'H',
    'Ħ': 'H',
    'Í': 'I',
    'Ĭ': 'I',
    'Ǐ': 'I',
    'Î': 'I',
    'Ï': 'I',
    'Ḯ': 'I',
    'İ': 'I',
    'Ị': 'I',
    'Ȉ': 'I',
    'Ì': 'I',
    'Ỉ': 'I',
    'Ȋ': 'I',
    'Ī': 'I',
    'Į': 'I',
    'Ɨ': 'I',
    'Ĩ': 'I',
    'Ḭ': 'I',
    'Ꝺ': 'D',
    'Ꝼ': 'F',
    'Ᵹ': 'G',
    'Ꞃ': 'R',
    'Ꞅ': 'S',
    'Ꞇ': 'T',
    'Ꝭ': 'IS',
    'Ĵ': 'J',
    'Ɉ': 'J',
    'Ḱ': 'K',
    'Ǩ': 'K',
    'Ķ': 'K',
    'Ⱪ': 'K',
    'Ꝃ': 'K',
    'Ḳ': 'K',
    'Ƙ': 'K',
    'Ḵ': 'K',
    'Ꝁ': 'K',
    'Ꝅ': 'K',
    'Ĺ': 'L',
    'Ƚ': 'L',
    'Ľ': 'L',
    'Ļ': 'L',
    'Ḽ': 'L',
    'Ḷ': 'L',
    'Ḹ': 'L',
    'Ⱡ': 'L',
    'Ꝉ': 'L',
    'Ḻ': 'L',
    'Ŀ': 'L',
    'Ɫ': 'L',
    'ǈ': 'L',
    'Ł': 'L',
    'Ǉ': 'LJ',
    'Ḿ': 'M',
    'Ṁ': 'M',
    'Ṃ': 'M',
    'Ɱ': 'M',
    'Ń': 'N',
    'Ň': 'N',
    'Ņ': 'N',
    'Ṋ': 'N',
    'Ṅ': 'N',
    'Ṇ': 'N',
    'Ǹ': 'N',
    'Ɲ': 'N',
    'Ṉ': 'N',
    'Ƞ': 'N',
    'ǋ': 'N',
    'Ñ': 'N',
    'Ǌ': 'NJ',
    'Ó': 'O',
    'Ŏ': 'O',
    'Ǒ': 'O',
    'Ô': 'O',
    'Ố': 'O',
    'Ộ': 'O',
    'Ồ': 'O',
    'Ổ': 'O',
    'Ỗ': 'O',
    'Ö': 'O',
    'Ȫ': 'O',
    'Ȯ': 'O',
    'Ȱ': 'O',
    'Ọ': 'O',
    'Ő': 'O',
    'Ȍ': 'O',
    'Ò': 'O',
    'Ỏ': 'O',
    'Ơ': 'O',
    'Ớ': 'O',
    'Ợ': 'O',
    'Ờ': 'O',
    'Ở': 'O',
    'Ỡ': 'O',
    'Ȏ': 'O',
    'Ꝋ': 'O',
    'Ꝍ': 'O',
    'Ō': 'O',
    'Ṓ': 'O',
    'Ṑ': 'O',
    'Ɵ': 'O',
    'Ǫ': 'O',
    'Ǭ': 'O',
    'Ø': 'O',
    'Ǿ': 'O',
    'Õ': 'O',
    'Ṍ': 'O',
    'Ṏ': 'O',
    'Ȭ': 'O',
    'Ƣ': 'OI',
    'Ꝏ': 'OO',
    'Ɛ': 'E',
    'Ɔ': 'O',
    'Ȣ': 'OU',
    'Ṕ': 'P',
    'Ṗ': 'P',
    'Ꝓ': 'P',
    'Ƥ': 'P',
    'Ꝕ': 'P',
    'Ᵽ': 'P',
    'Ꝑ': 'P',
    'Ꝙ': 'Q',
    'Ꝗ': 'Q',
    'Ŕ': 'R',
    'Ř': 'R',
    'Ŗ': 'R',
    'Ṙ': 'R',
    'Ṛ': 'R',
    'Ṝ': 'R',
    'Ȑ': 'R',
    'Ȓ': 'R',
    'Ṟ': 'R',
    'Ɍ': 'R',
    'Ɽ': 'R',
    'Ꜿ': 'C',
    'Ǝ': 'E',
    'Ś': 'S',
    'Ṥ': 'S',
    'Š': 'S',
    'Ṧ': 'S',
    'Ş': 'S',
    'Ŝ': 'S',
    'Ș': 'S',
    'Ṡ': 'S',
    'Ṣ': 'S',
    'Ṩ': 'S',
    'Ť': 'T',
    'Ţ': 'T',
    'Ṱ': 'T',
    'Ț': 'T',
    'Ⱦ': 'T',
    'Ṫ': 'T',
    'Ṭ': 'T',
    'Ƭ': 'T',
    'Ṯ': 'T',
    'Ʈ': 'T',
    'Ŧ': 'T',
    'Ɐ': 'A',
    'Ꞁ': 'L',
    'Ɯ': 'M',
    'Ʌ': 'V',
    'Ꜩ': 'TZ',
    'Ú': 'U',
    'Ŭ': 'U',
    'Ǔ': 'U',
    'Û': 'U',
    'Ṷ': 'U',
    'Ü': 'U',
    'Ǘ': 'U',
    'Ǚ': 'U',
    'Ǜ': 'U',
    'Ǖ': 'U',
    'Ṳ': 'U',
    'Ụ': 'U',
    'Ű': 'U',
    'Ȕ': 'U',
    'Ù': 'U',
    'Ủ': 'U',
    'Ư': 'U',
    'Ứ': 'U',
    'Ự': 'U',
    'Ừ': 'U',
    'Ử': 'U',
    'Ữ': 'U',
    'Ȗ': 'U',
    'Ū': 'U',
    'Ṻ': 'U',
    'Ų': 'U',
    'Ů': 'U',
    'Ũ': 'U',
    'Ṹ': 'U',
    'Ṵ': 'U',
    'Ꝟ': 'V',
    'Ṿ': 'V',
    'Ʋ': 'V',
    'Ṽ': 'V',
    'Ꝡ': 'VY',
    'Ẃ': 'W',
    'Ŵ': 'W',
    'Ẅ': 'W',
    'Ẇ': 'W',
    'Ẉ': 'W',
    'Ẁ': 'W',
    'Ⱳ': 'W',
    'Ẍ': 'X',
    'Ẋ': 'X',
    'Ý': 'Y',
    'Ŷ': 'Y',
    'Ÿ': 'Y',
    'Ẏ': 'Y',
    'Ỵ': 'Y',
    'Ỳ': 'Y',
    'Ƴ': 'Y',
    'Ỷ': 'Y',
    'Ỿ': 'Y',
    'Ȳ': 'Y',
    'Ɏ': 'Y',
    'Ỹ': 'Y',
    'Ź': 'Z',
    'Ž': 'Z',
    'Ẑ': 'Z',
    'Ⱬ': 'Z',
    'Ż': 'Z',
    'Ẓ': 'Z',
    'Ȥ': 'Z',
    'Ẕ': 'Z',
    'Ƶ': 'Z',
    'Ĳ': 'IJ',
    'Œ': 'OE',
    'ᴀ': 'A',
    'ᴁ': 'AE',
    'ʙ': 'B',
    'ᴃ': 'B',
    'ᴄ': 'C',
    'ᴅ': 'D',
    'ᴇ': 'E',
    'ꜰ': 'F',
    'ɢ': 'G',
    'ʛ': 'G',
    'ʜ': 'H',
    'ɪ': 'I',
    'ʁ': 'R',
    'ᴊ': 'J',
    'ᴋ': 'K',
    'ʟ': 'L',
    'ᴌ': 'L',
    'ᴍ': 'M',
    'ɴ': 'N',
    'ᴏ': 'O',
    'ɶ': 'OE',
    'ᴐ': 'O',
    'ᴕ': 'OU',
    'ᴘ': 'P',
    'ʀ': 'R',
    'ᴎ': 'N',
    'ᴙ': 'R',
    'ꜱ': 'S',
    'ᴛ': 'T',
    'ⱻ': 'E',
    'ᴚ': 'R',
    'ᴜ': 'U',
    'ᴠ': 'V',
    'ᴡ': 'W',
    'ʏ': 'Y',
    'ᴢ': 'Z',
    'á': 'a',
    'ă': 'a',
    'ắ': 'a',
    'ặ': 'a',
    'ằ': 'a',
    'ẳ': 'a',
    'ẵ': 'a',
    'ǎ': 'a',
    'â': 'a',
    'ấ': 'a',
    'ậ': 'a',
    'ầ': 'a',
    'ẩ': 'a',
    'ẫ': 'a',
    'ä': 'a',
    'ǟ': 'a',
    'ȧ': 'a',
    'ǡ': 'a',
    'ạ': 'a',
    'ȁ': 'a',
    'à': 'a',
    'ả': 'a',
    'ȃ': 'a',
    'ā': 'a',
    'ą': 'a',
    'ᶏ': 'a',
    'ẚ': 'a',
    'å': 'a',
    'ǻ': 'a',
    'ḁ': 'a',
    'ⱥ': 'a',
    'ã': 'a',
    'ꜳ': 'aa',
    'æ': 'ae',
    'ǽ': 'ae',
    'ǣ': 'ae',
    'ꜵ': 'ao',
    'ꜷ': 'au',
    'ꜹ': 'av',
    'ꜻ': 'av',
    'ꜽ': 'ay',
    'ḃ': 'b',
    'ḅ': 'b',
    'ɓ': 'b',
    'ḇ': 'b',
    'ᵬ': 'b',
    'ᶀ': 'b',
    'ƀ': 'b',
    'ƃ': 'b',
    'ɵ': 'o',
    'ć': 'c',
    'č': 'c',
    'ç': 'c',
    'ḉ': 'c',
    'ĉ': 'c',
    'ɕ': 'c',
    'ċ': 'c',
    'ƈ': 'c',
    'ȼ': 'c',
    'ď': 'd',
    'ḑ': 'd',
    'ḓ': 'd',
    'ȡ': 'd',
    'ḋ': 'd',
    'ḍ': 'd',
    'ɗ': 'd',
    'ᶑ': 'd',
    'ḏ': 'd',
    'ᵭ': 'd',
    'ᶁ': 'd',
    'đ': 'd',
    'ɖ': 'd',
    'ƌ': 'd',
    'ı': 'i',
    'ȷ': 'j',
    'ɟ': 'j',
    'ʄ': 'j',
    'ǳ': 'dz',
    'ǆ': 'dz',
    'é': 'e',
    'ĕ': 'e',
    'ě': 'e',
    'ȩ': 'e',
    'ḝ': 'e',
    'ê': 'e',
    'ế': 'e',
    'ệ': 'e',
    'ề': 'e',
    'ể': 'e',
    'ễ': 'e',
    'ḙ': 'e',
    'ë': 'e',
    'ė': 'e',
    'ẹ': 'e',
    'ȅ': 'e',
    'è': 'e',
    'ẻ': 'e',
    'ȇ': 'e',
    'ē': 'e',
    'ḗ': 'e',
    'ḕ': 'e',
    'ⱸ': 'e',
    'ę': 'e',
    'ᶒ': 'e',
    'ɇ': 'e',
    'ẽ': 'e',
    'ḛ': 'e',
    'ꝫ': 'et',
    'ḟ': 'f',
    'ƒ': 'f',
    'ᵮ': 'f',
    'ᶂ': 'f',
    'ǵ': 'g',
    'ğ': 'g',
    'ǧ': 'g',
    'ģ': 'g',
    'ĝ': 'g',
    'ġ': 'g',
    'ɠ': 'g',
    'ḡ': 'g',
    'ᶃ': 'g',
    'ǥ': 'g',
    'ḫ': 'h',
    'ȟ': 'h',
    'ḩ': 'h',
    'ĥ': 'h',
    'ⱨ': 'h',
    'ḧ': 'h',
    'ḣ': 'h',
    'ḥ': 'h',
    'ɦ': 'h',
    'ẖ': 'h',
    'ħ': 'h',
    'ƕ': 'hv',
    'í': 'i',
    'ĭ': 'i',
    'ǐ': 'i',
    'î': 'i',
    'ï': 'i',
    'ḯ': 'i',
    'ị': 'i',
    'ȉ': 'i',
    'ì': 'i',
    'ỉ': 'i',
    'ȋ': 'i',
    'ī': 'i',
    'į': 'i',
    'ᶖ': 'i',
    'ɨ': 'i',
    'ĩ': 'i',
    'ḭ': 'i',
    'ꝺ': 'd',
    'ꝼ': 'f',
    'ᵹ': 'g',
    'ꞃ': 'r',
    'ꞅ': 's',
    'ꞇ': 't',
    'ꝭ': 'is',
    'ǰ': 'j',
    'ĵ': 'j',
    'ʝ': 'j',
    'ɉ': 'j',
    'ḱ': 'k',
    'ǩ': 'k',
    'ķ': 'k',
    'ⱪ': 'k',
    'ꝃ': 'k',
    'ḳ': 'k',
    'ƙ': 'k',
    'ḵ': 'k',
    'ᶄ': 'k',
    'ꝁ': 'k',
    'ꝅ': 'k',
    'ĺ': 'l',
    'ƚ': 'l',
    'ɬ': 'l',
    'ľ': 'l',
    'ļ': 'l',
    'ḽ': 'l',
    'ȴ': 'l',
    'ḷ': 'l',
    'ḹ': 'l',
    'ⱡ': 'l',
    'ꝉ': 'l',
    'ḻ': 'l',
    'ŀ': 'l',
    'ɫ': 'l',
    'ᶅ': 'l',
    'ɭ': 'l',
    'ł': 'l',
    'ǉ': 'lj',
    'ſ': 's',
    'ẜ': 's',
    'ẛ': 's',
    'ẝ': 's',
    'ḿ': 'm',
    'ṁ': 'm',
    'ṃ': 'm',
    'ɱ': 'm',
    'ᵯ': 'm',
    'ᶆ': 'm',
    'ń': 'n',
    'ň': 'n',
    'ņ': 'n',
    'ṋ': 'n',
    'ȵ': 'n',
    'ṅ': 'n',
    'ṇ': 'n',
    'ǹ': 'n',
    'ɲ': 'n',
    'ṉ': 'n',
    'ƞ': 'n',
    'ᵰ': 'n',
    'ᶇ': 'n',
    'ɳ': 'n',
    'ñ': 'n',
    'ǌ': 'nj',
    'ó': 'o',
    'ŏ': 'o',
    'ǒ': 'o',
    'ô': 'o',
    'ố': 'o',
    'ộ': 'o',
    'ồ': 'o',
    'ổ': 'o',
    'ỗ': 'o',
    'ö': 'o',
    'ȫ': 'o',
    'ȯ': 'o',
    'ȱ': 'o',
    'ọ': 'o',
    'ő': 'o',
    'ȍ': 'o',
    'ò': 'o',
    'ỏ': 'o',
    'ơ': 'o',
    'ớ': 'o',
    'ợ': 'o',
    'ờ': 'o',
    'ở': 'o',
    'ỡ': 'o',
    'ȏ': 'o',
    'ꝋ': 'o',
    'ꝍ': 'o',
    'ⱺ': 'o',
    'ō': 'o',
    'ṓ': 'o',
    'ṑ': 'o',
    'ǫ': 'o',
    'ǭ': 'o',
    'ø': 'o',
    'ǿ': 'o',
    'õ': 'o',
    'ṍ': 'o',
    'ṏ': 'o',
    'ȭ': 'o',
    'ƣ': 'oi',
    'ꝏ': 'oo',
    'ɛ': 'e',
    'ᶓ': 'e',
    'ɔ': 'o',
    'ᶗ': 'o',
    'ȣ': 'ou',
    'ṕ': 'p',
    'ṗ': 'p',
    'ꝓ': 'p',
    'ƥ': 'p',
    'ᵱ': 'p',
    'ᶈ': 'p',
    'ꝕ': 'p',
    'ᵽ': 'p',
    'ꝑ': 'p',
    'ꝙ': 'q',
    'ʠ': 'q',
    'ɋ': 'q',
    'ꝗ': 'q',
    'ŕ': 'r',
    'ř': 'r',
    'ŗ': 'r',
    'ṙ': 'r',
    'ṛ': 'r',
    'ṝ': 'r',
    'ȑ': 'r',
    'ɾ': 'r',
    'ᵳ': 'r',
    'ȓ': 'r',
    'ṟ': 'r',
    'ɼ': 'r',
    'ᵲ': 'r',
    'ᶉ': 'r',
    'ɍ': 'r',
    'ɽ': 'r',
    'ↄ': 'c',
    'ꜿ': 'c',
    'ɘ': 'e',
    'ɿ': 'r',
    'ś': 's',
    'ṥ': 's',
    'š': 's',
    'ṧ': 's',
    'ş': 's',
    'ŝ': 's',
    'ș': 's',
    'ṡ': 's',
    'ṣ': 's',
    'ṩ': 's',
    'ʂ': 's',
    'ᵴ': 's',
    'ᶊ': 's',
    'ȿ': 's',
    'ɡ': 'g',
    'ᴑ': 'o',
    'ᴓ': 'o',
    'ᴝ': 'u',
    'ť': 't',
    'ţ': 't',
    'ṱ': 't',
    'ț': 't',
    'ȶ': 't',
    'ẗ': 't',
    'ⱦ': 't',
    'ṫ': 't',
    'ṭ': 't',
    'ƭ': 't',
    'ṯ': 't',
    'ᵵ': 't',
    'ƫ': 't',
    'ʈ': 't',
    'ŧ': 't',
    'ᵺ': 'th',
    'ɐ': 'a',
    'ᴂ': 'ae',
    'ǝ': 'e',
    'ᵷ': 'g',
    'ɥ': 'h',
    'ʮ': 'h',
    'ʯ': 'h',
    'ᴉ': 'i',
    'ʞ': 'k',
    'ꞁ': 'l',
    'ɯ': 'm',
    'ɰ': 'm',
    'ᴔ': 'oe',
    'ɹ': 'r',
    'ɻ': 'r',
    'ɺ': 'r',
    'ⱹ': 'r',
    'ʇ': 't',
    'ʌ': 'v',
    'ʍ': 'w',
    'ʎ': 'y',
    'ꜩ': 'tz',
    'ú': 'u',
    'ŭ': 'u',
    'ǔ': 'u',
    'û': 'u',
    'ṷ': 'u',
    'ü': 'u',
    'ǘ': 'u',
    'ǚ': 'u',
    'ǜ': 'u',
    'ǖ': 'u',
    'ṳ': 'u',
    'ụ': 'u',
    'ű': 'u',
    'ȕ': 'u',
    'ù': 'u',
    'ủ': 'u',
    'ư': 'u',
    'ứ': 'u',
    'ự': 'u',
    'ừ': 'u',
    'ử': 'u',
    'ữ': 'u',
    'ȗ': 'u',
    'ū': 'u',
    'ṻ': 'u',
    'ų': 'u',
    'ᶙ': 'u',
    'ů': 'u',
    'ũ': 'u',
    'ṹ': 'u',
    'ṵ': 'u',
    'ᵫ': 'ue',
    'ꝸ': 'um',
    'ⱴ': 'v',
    'ꝟ': 'v',
    'ṿ': 'v',
    'ʋ': 'v',
    'ᶌ': 'v',
    'ⱱ': 'v',
    'ṽ': 'v',
    'ꝡ': 'vy',
    'ẃ': 'w',
    'ŵ': 'w',
    'ẅ': 'w',
    'ẇ': 'w',
    'ẉ': 'w',
    'ẁ': 'w',
    'ⱳ': 'w',
    'ẘ': 'w',
    'ẍ': 'x',
    'ẋ': 'x',
    'ᶍ': 'x',
    'ý': 'y',
    'ŷ': 'y',
    'ÿ': 'y',
    'ẏ': 'y',
    'ỵ': 'y',
    'ỳ': 'y',
    'ƴ': 'y',
    'ỷ': 'y',
    'ỿ': 'y',
    'ȳ': 'y',
    'ẙ': 'y',
    'ɏ': 'y',
    'ỹ': 'y',
    'ź': 'z',
    'ž': 'z',
    'ẑ': 'z',
    'ʑ': 'z',
    'ⱬ': 'z',
    'ż': 'z',
    'ẓ': 'z',
    'ȥ': 'z',
    'ẕ': 'z',
    'ᵶ': 'z',
    'ᶎ': 'z',
    'ʐ': 'z',
    'ƶ': 'z',
    'ɀ': 'z',
    'ﬀ': 'ff',
    'ﬃ': 'ffi',
    'ﬄ': 'ffl',
    'ﬁ': 'fi',
    'ﬂ': 'fl',
    'ĳ': 'ij',
    'œ': 'oe',
    'ﬆ': 'st',
    'ₐ': 'a',
    'ₑ': 'e',
    'ᵢ': 'i',
    'ⱼ': 'j',
    'ₒ': 'o',
    'ᵣ': 'r',
    'ᵤ': 'u',
    'ᵥ': 'v',
    'ₓ': 'x'
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?} str
 * @return {?}
 */
function latinize(str) {
    if (!str) {
        return '';
    }
    return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
        return latinMap[a] || a;
    });
}
/**
 * @param {?} queryToEscape
 * @return {?}
 */
function escapeRegexp(queryToEscape) {
    // Regex: capture the whole query string and replace it with the string
    // that will be used to match the results, for example if the capture is
    // 'a' the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}
/**
 * @param {?} str
 * @param {?=} wordRegexDelimiters
 * @param {?=} phraseRegexDelimiters
 * @return {?}
 */
function tokenize(str, wordRegexDelimiters = ' ', phraseRegexDelimiters = '') {
    /* tslint:enable */
    const /** @type {?} */ regexStr = '(?:[' + phraseRegexDelimiters + '])([^' + phraseRegexDelimiters + ']+)(?:[' + phraseRegexDelimiters + '])|([^' + wordRegexDelimiters + ']+)';
    const /** @type {?} */ preTokenized = str.split(new RegExp(regexStr, 'g'));
    const /** @type {?} */ result = [];
    const /** @type {?} */ preTokenizedLength = preTokenized.length;
    let /** @type {?} */ token;
    const /** @type {?} */ replacePhraseDelimiters = new RegExp('[' + phraseRegexDelimiters + ']+', 'g');
    for (let /** @type {?} */ i = 0; i < preTokenizedLength; i += 1) {
        token = preTokenized[i];
        if (token && token.length && token !== wordRegexDelimiters) {
            result.push(token.replace(replacePhraseDelimiters, ''));
        }
    }
    return result;
}
/**
 * @param {?} object
 * @param {?} option
 * @return {?}
 */
function getValueFromObject(object, option) {
    if (!option || typeof object !== 'object') {
        return object.toString();
    }
    if (option.endsWith('()')) {
        const /** @type {?} */ functionName = option.slice(0, option.length - 2);
        return object[functionName]().toString();
    }
    const /** @type {?} */ properties = option.replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '');
    const /** @type {?} */ propertiesArray = properties.split('.');
    for (const /** @type {?} */ property of propertiesArray) {
        if (property in object) {
            object = object[property];
        }
    }
    return object.toString();
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TypeaheadContainerComponent {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.isFocused = false;
        this._matches = [];
        this.element = element;
    }
    /**
     * @return {?}
     */
    get active() {
        return this._active;
    }
    /**
     * @return {?}
     */
    get matches() {
        return this._matches;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set matches(value) {
        this._matches = value;
        if (this._matches.length > 0) {
            this._active = this._matches[0];
            if (this._active.isHeader()) {
                this.nextActiveMatch();
            }
        }
    }
    /**
     * @return {?}
     */
    get optionsListTemplate() {
        return this.parent ? this.parent.optionsListTemplate : undefined;
    }
    /**
     * @return {?}
     */
    get itemTemplate() {
        return this.parent ? this.parent.typeaheadItemTemplate : undefined;
    }
    /**
     * @return {?}
     */
    selectActiveMatch() {
        this.selectMatch(this._active);
    }
    /**
     * @return {?}
     */
    prevActiveMatch() {
        let /** @type {?} */ index = this.matches.indexOf(this._active);
        this._active = this.matches[index - 1 < 0
            ? this.matches.length - 1
            : index - 1];
        if (this._active.isHeader()) {
            this.prevActiveMatch();
        }
    }
    /**
     * @return {?}
     */
    nextActiveMatch() {
        let /** @type {?} */ index = this.matches.indexOf(this._active);
        this._active = this.matches[index + 1 > this.matches.length - 1
            ? 0
            : index + 1];
        if (this._active.isHeader()) {
            this.nextActiveMatch();
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    selectActive(value) {
        this.isFocused = true;
        this._active = value;
    }
    /**
     * @param {?} match
     * @param {?} query
     * @return {?}
     */
    hightlight(match, query) {
        let /** @type {?} */ itemStr = match.value;
        let /** @type {?} */ itemStrHelper = (this.parent && this.parent.typeaheadLatinize
            ? latinize(itemStr)
            : itemStr).toLowerCase();
        let /** @type {?} */ startIdx;
        let /** @type {?} */ tokenLen;
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            let /** @type {?} */ queryLen = query.length;
            for (let /** @type {?} */ i = 0; i < queryLen; i += 1) {
                // query[i] is already latinized and lower case
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
                    itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
                }
            }
        }
        else if (query) {
            // query is already latinized and lower case
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
            }
        }
        return itemStr;
    }
    /**
     * @return {?}
     */
    focusLost() {
        this.isFocused = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    isActive(value) {
        return this._active === value;
    }
    /**
     * @param {?} value
     * @param {?=} e
     * @return {?}
     */
    selectMatch(value, e = void 0) {
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.parent.changeModel(value);
        setTimeout(() => this.parent.typeaheadOnSelect.emit(value), 0);
        return false;
    }
}
TypeaheadContainerComponent.decorators = [
    { type: Component, args: [{
                selector: 'hx-typeahead-container',
                // tslint:disable-next-line
                template: `
<!-- inject options list template -->
<ng-template [ngTemplateOutlet]="optionsListTemplate || optionListTemplate"
  [ngTemplateOutletContext]="{matches:matches, itemTemplate:itemTemplate, query:query}"></ng-template>
<!-- default options item template -->
<ng-template #hxItemTemplate let-match="match" let-query="query"><span [innerHtml]="hightlight(match, query)"></span></ng-template>
<!-- options list template -->
<ng-template #optionListTemplate >
<ng-template ngFor let-match let-i="index" [ngForOf]="matches">
   <h6 *ngIf="match.isHeader()" class="hx-dropdown-header">{{match}}</h6>
   <ng-template [ngIf]="!match.isHeader()">
      <a href="#"
        class="hx-dropdown-item"
        (click)="selectMatch(match, $event)"
        (mouseenter)="selectActive(match)"
        [class.active]="isActive(match)">
          <ng-template [ngTemplateOutlet]="itemTemplate || hxItemTemplate"
            [ngTemplateOutletContext]="{item:match.item, index:i, match:match, query:query}"></ng-template>
      </a>
  </ng-template>
</ng-template>
</ng-template>
`,
                // tslint:disable
                host: {
                    'class': 'hx-dropdown is-open hx-dropdown-menu',
                    style: 'position: absolute;display: block;'
                },
                // tslint: enable
                encapsulation: ViewEncapsulation.None
            },] },
];
/** @nocollapse */
TypeaheadContainerComponent.ctorParameters = () => [
    { type: ElementRef, },
];
TypeaheadContainerComponent.propDecorators = {
    "focusLost": [{ type: HostListener, args: ['mouseleave',] }, { type: HostListener, args: ['blur',] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TypeaheadMatch {
    /**
     * @param {?} item
     * @param {?=} value
     * @param {?=} header
     */
    constructor(item, value = item, header = false) {
        this.item = item;
        this.value = value;
        this.header = header;
    }
    /**
     * @return {?}
     */
    isHeader() {
        return this.header;
    }
    /**
     * @return {?}
     */
    toString() {
        return this.value;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TypeaheadDirective {
    /**
     * @param {?} control
     * @param {?} viewContainerRef
     * @param {?} element
     * @param {?} renderer
     * @param {?} cis
     */
    constructor(control, viewContainerRef, element, renderer, cis) {
        /**
         * minimal no of characters that needs to be entered before typeahead kicks-in. When set to 0, typeahead shows on focus with full list of options (limited as normal by typeaheadOptionsLimit)
         */
        this.typeaheadMinLength = void 0;
        /**
         * should be used only in case of typeahead attribute is array. If true - loading of options will be async, otherwise - sync. true make sense if options array is large.
         */
        this.typeaheadAsync = void 0;
        /**
         * match latin symbols. If true the word súper would match super and vice versa.
         */
        this.typeaheadLatinize = true;
        /**
         * break words with spaces. If true the text "exact phrase" here match would match with match exact phrase here but not with phrase here exact match (kind of "google style").
         */
        this.typeaheadSingleWords = true;
        /**
         * should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to break words. Defaults to space.
         */
        this.typeaheadWordDelimiters = ' ';
        /**
         * should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to match exact phrase. Defaults to simple and double quotes.
         */
        this.typeaheadPhraseDelimiters = '\'"';
        /**
         * fired when 'busy' state of this component was changed, fired on async mode only, returns boolean
         */
        this.typeaheadLoading = new EventEmitter();
        /**
         * fired on every key event and returns true in case of matches are not detected
         */
        this.typeaheadNoResults = new EventEmitter();
        /**
         * fired when option was selected, return object with data of this option
         */
        this.typeaheadOnSelect = new EventEmitter();
        /**
         * fired when blur event occurres. returns the active item
         */
        this.typeaheadOnBlur = new EventEmitter();
        this.isTypeaheadOptionsListActive = false;
        this.keyUpEventEmitter = new EventEmitter();
        this.placement = 'bottom-left';
        this.element = element;
        this.ngControl = control;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this._typeahead = cis
            .createLoader(element, viewContainerRef, renderer);
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onChange(e) {
        if (this._container) {
            // esc
            if (e.keyCode === 27) {
                this.hide();
                return;
            }
            // up
            if (e.keyCode === 38) {
                this._container.prevActiveMatch();
                return;
            }
            // down
            if (e.keyCode === 40) {
                this._container.nextActiveMatch();
                return;
            }
            // enter
            if (e.keyCode === 13) {
                this._container.selectActiveMatch();
                return;
            }
        }
        // For `<input>`s, use the `value` property. For others that don't have a
        // `value` (such as `<span contenteditable="true">`, use `innerText`.
        const /** @type {?} */ value = e.target.value !== undefined
            ? e.target.value
            : e.target.innerText;
        if (value.trim().length >= this.typeaheadMinLength) {
            this.typeaheadLoading.emit(true);
            this.keyUpEventEmitter.emit(e.target.value);
        }
        else {
            this.typeaheadLoading.emit(false);
            this.typeaheadNoResults.emit(false);
            this.hide();
        }
    }
    /**
     * @return {?}
     */
    onFocus() {
        if (this.typeaheadMinLength === 0) {
            this.typeaheadLoading.emit(true);
            this.keyUpEventEmitter.emit('');
        }
    }
    /**
     * @return {?}
     */
    onBlur() {
        if (this._container && !this._container.isFocused) {
            this.typeaheadOnBlur.emit(this._container.active);
            this.hide();
        }
    }
    /**
     * @param {?} e
     * @return {?}
     */
    onKeydown(e) {
        // no container - no problems
        if (!this._container) {
            return;
        }
        // if items is visible - prevent form submition
        if (e.keyCode === 13) {
            e.preventDefault();
            return;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
        this.typeaheadMinLength = this.typeaheadMinLength === void 0
            ? 1
            : this.typeaheadMinLength;
        this.typeaheadWaitMs = this.typeaheadWaitMs || 0;
        // async should be false in case of array
        if (this.typeaheadAsync === undefined && !(this.typeahead instanceof Observable)) {
            this.typeaheadAsync = false;
        }
        if (this.typeahead instanceof Observable) {
            this.typeaheadAsync = true;
        }
        if (this.typeaheadAsync) {
            this.asyncActions();
        }
        else {
            this.syncActions();
        }
    }
    /**
     * @param {?} match
     * @return {?}
     */
    changeModel(match) {
        const /** @type {?} */ valueStr = match.value;
        this.ngControl.viewToModelUpdate(valueStr);
        (/** @type {?} */ (this.ngControl.control)).setValue(valueStr);
        this.hide();
    }
    /**
     * @return {?}
     */
    get matches() {
        return this._matches;
    }
    /**
     * @return {?}
     */
    show() {
        this._typeahead
            .attach(TypeaheadContainerComponent)
            .to(this.container)
            .position({ attachment: 'bottom left' })
            .show({
            typeaheadRef: this,
            placement: this.placement,
            animation: false
        });
        this._container = this._typeahead.instance;
        this._container.parent = this;
        // This improves the speed as it won't have to be done for each list item
        const /** @type {?} */ normalizedQuery = (this.typeaheadLatinize
            ? latinize(this.ngControl.control.value)
            : this.ngControl.control.value).toString()
            .toLowerCase();
        this._container.query = this.typeaheadSingleWords
            ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
            : normalizedQuery;
        this._container.matches = this._matches;
        this.element.nativeElement.focus();
    }
    /**
     * @return {?}
     */
    hide() {
        if (this._typeahead.isShown) {
            this._typeahead.hide();
            this._container = null;
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._typeahead.dispose();
    }
    /**
     * @return {?}
     */
    asyncActions() {
        this.keyUpEventEmitter.pipe(debounceTime(this.typeaheadWaitMs), mergeMap(() => this.typeahead)).subscribe((matches) => {
            this.finalizeAsyncCall(matches);
        }, (err) => {
            console.error(err);
        });
    }
    /**
     * @return {?}
     */
    syncActions() {
        this.keyUpEventEmitter.pipe(debounceTime(this.typeaheadWaitMs), mergeMap((value) => {
            const /** @type {?} */ normalizedQuery = this.normalizeQuery(value);
            return from(this.typeahead).pipe(filter((option) => {
                return option && this.testMatch(this.normalizeOption(option), normalizedQuery);
            }), toArray());
        }))
            .subscribe((matches) => {
            this.finalizeAsyncCall(matches);
        }, (err) => {
            console.error(err);
        });
    }
    /**
     * @param {?} option
     * @return {?}
     */
    normalizeOption(option) {
        const /** @type {?} */ optionValue = getValueFromObject(option, this.typeaheadOptionField);
        const /** @type {?} */ normalizedOption = this.typeaheadLatinize
            ? latinize(optionValue)
            : optionValue;
        return normalizedOption.toLowerCase();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    normalizeQuery(value) {
        // If singleWords, break model here to not be doing extra work on each
        // iteration
        let /** @type {?} */ normalizedQuery = (this.typeaheadLatinize ? latinize(value) : value)
            .toString()
            .toLowerCase();
        normalizedQuery = this.typeaheadSingleWords
            ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
            : normalizedQuery;
        return normalizedQuery;
    }
    /**
     * @param {?} match
     * @param {?} test
     * @return {?}
     */
    testMatch(match, test) {
        let /** @type {?} */ spaceLength;
        if (typeof test === 'object') {
            spaceLength = test.length;
            for (let /** @type {?} */ i = 0; i < spaceLength; i += 1) {
                if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                    return false;
                }
            }
            return true;
        }
        else {
            return match.indexOf(test) >= 0;
        }
    }
    /**
     * @param {?} matches
     * @return {?}
     */
    finalizeAsyncCall(matches) {
        this.prepareMatches(matches);
        this.typeaheadLoading.emit(false);
        this.typeaheadNoResults.emit(!this.hasMatches());
        if (!this.hasMatches()) {
            this.hide();
            return;
        }
        if (this._container) {
            // This improves the speed as it won't have to be done for each list item
            const /** @type {?} */ normalizedQuery = (this.typeaheadLatinize
                ? latinize(this.ngControl.control.value)
                : this.ngControl.control.value).toString()
                .toLowerCase();
            this._container.query = this.typeaheadSingleWords
                ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
                : normalizedQuery;
            this._container.matches = this._matches;
        }
        else {
            this.show();
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    prepareMatches(options) {
        const /** @type {?} */ limited = options.slice(0, this.typeaheadOptionsLimit);
        if (this.typeaheadGroupField) {
            let /** @type {?} */ matches = [];
            // extract all group names
            const /** @type {?} */ groups = limited
                .map((option) => getValueFromObject(option, this.typeaheadGroupField))
                .filter((v, i, a) => a.indexOf(v) === i);
            groups.forEach((group) => {
                // add group header to array of matches
                matches.push(new TypeaheadMatch(group, group, true));
                // add each item of group to array of matches
                matches = matches.concat(limited
                    .filter((option) => getValueFromObject(option, this.typeaheadGroupField) === group)
                    .map((option) => new TypeaheadMatch(option, getValueFromObject(option, this.typeaheadOptionField))));
            });
            this._matches = matches;
        }
        else {
            this._matches = limited.map((option) => new TypeaheadMatch(option, getValueFromObject(option, this.typeaheadOptionField)));
        }
    }
    /**
     * @return {?}
     */
    hasMatches() {
        return this._matches.length > 0;
    }
}
TypeaheadDirective.decorators = [
    { type: Directive, args: [{ selector: '[typeahead]', exportAs: 'hx-typeahead' },] },
];
/** @nocollapse */
TypeaheadDirective.ctorParameters = () => [
    { type: NgControl, },
    { type: ViewContainerRef, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: ComponentLoaderFactory, },
];
TypeaheadDirective.propDecorators = {
    "typeahead": [{ type: Input },],
    "typeaheadMinLength": [{ type: Input },],
    "typeaheadWaitMs": [{ type: Input },],
    "typeaheadOptionsLimit": [{ type: Input },],
    "typeaheadOptionField": [{ type: Input },],
    "typeaheadGroupField": [{ type: Input },],
    "typeaheadAsync": [{ type: Input },],
    "typeaheadLatinize": [{ type: Input },],
    "typeaheadSingleWords": [{ type: Input },],
    "typeaheadWordDelimiters": [{ type: Input },],
    "typeaheadPhraseDelimiters": [{ type: Input },],
    "typeaheadItemTemplate": [{ type: Input },],
    "optionsListTemplate": [{ type: Input },],
    "typeaheadLoading": [{ type: Output },],
    "typeaheadNoResults": [{ type: Output },],
    "typeaheadOnSelect": [{ type: Output },],
    "typeaheadOnBlur": [{ type: Output },],
    "container": [{ type: Input },],
    "onChange": [{ type: HostListener, args: ['keyup', ['$event'],] },],
    "onFocus": [{ type: HostListener, args: ['focus',] },],
    "onBlur": [{ type: HostListener, args: ['blur',] },],
    "onKeydown": [{ type: HostListener, args: ['keydown', ['$event'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TypeaheadModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: TypeaheadModule,
            providers: [ComponentLoaderFactory, PositioningService]
        };
    }
    ;
}
TypeaheadModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [TypeaheadContainerComponent, TypeaheadDirective],
                exports: [TypeaheadContainerComponent, TypeaheadDirective],
                entryComponents: [TypeaheadContainerComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @abstract
 */
class ITabularConfig {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const OrderByDirection = {
    Ascending: 0,
    Descending: 1,
    None: 2,
};
OrderByDirection[OrderByDirection.Ascending] = "Ascending";
OrderByDirection[OrderByDirection.Descending] = "Descending";
OrderByDirection[OrderByDirection.None] = "None";
class TabularOrderByService {
    /**
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    static _orderByComparator(a, b) {
        if (typeof a !== 'undefined') {
            if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
                // Isn't a number so lowercase the string to properly compare
                if (a.toLowerCase() < b.toLowerCase()) {
                    return -1;
                }
                if (a.toLowerCase() > b.toLowerCase()) {
                    return 1;
                }
            }
            else {
                // Parse strings as numbers to compare properly
                if (parseFloat(a) < parseFloat(b)) {
                    return -1;
                }
                if (parseFloat(a) > parseFloat(b)) {
                    return 1;
                }
            }
        }
        return 0; // equal each other
    }
    /**
     * @param {?} data
     * @param {?} __1
     * @return {?}
     */
    doTransform(data, [config = '+']) {
        if (!Array.isArray(data)) {
            return data;
        }
        if (!Array.isArray(config) || (Array.isArray(config) && config.length === 1)) {
            const /** @type {?} */ propertyToCheck = !Array.isArray(config) ? config : config[0];
            const /** @type {?} */ desc = propertyToCheck.substr(0, 1) === '-';
            // Basic array
            if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
                return !desc ? data.sort() : data.sort().reverse();
            }
            else {
                const /** @type {?} */ property = propertyToCheck.substr(0, 1) === '+' || propertyToCheck.substr(0, 1) === '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;
                return data.sort(function (a, b) {
                    return !desc
                        ? TabularOrderByService._orderByComparator(a[property], b[property])
                        : -TabularOrderByService._orderByComparator(a[property], b[property]);
                });
            }
        }
        else {
            // Loop over property of the array in order and sort
            return data.sort(function (a, b) {
                for (let /** @type {?} */ i = 0; i < config.length; i++) {
                    const /** @type {?} */ desc = config[i].substr(0, 1) === '-';
                    const /** @type {?} */ property = config[i].substr(0, 1) === '+' || config[i].substr(0, 1) === '-'
                        ? config[i].substr(1)
                        : config[i];
                    const /** @type {?} */ comparison = !desc
                        ? TabularOrderByService._orderByComparator(a[property], b[property])
                        : -TabularOrderByService._orderByComparator(a[property], b[property]);
                    // Don't return 0 yet in case of needing to sort by next property
                    if (comparison !== 0) {
                        return comparison;
                    }
                }
                return 0; // equal each other
            });
        }
    }
}
TabularOrderByService.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const TabularSize = {
    Default: 0,
    Small: 1,
    Large: 2,
};
TabularSize[TabularSize.Default] = "Default";
TabularSize[TabularSize.Small] = "Small";
TabularSize[TabularSize.Large] = "Large";

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Configuration service, provides default values for the NavComponent.
 */
class TabularConfig {
    constructor() {
        /**
         * Tabular configuration
         * IPaginationInstance, ISearchConfig
         */
        this.config = {
            size: TabularSize.Default,
            pagination: {
                itemsPerPage: 5,
                currentPage: 1
            },
            clickableRows: false
        };
    }
}
TabularConfig.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const TabularColumnTypes = {
    String: 0,
    Icon: 1,
    Date: 2,
    Actions: 3,
    Status: 4,
    DateTime: 5,
    Checkbox: 6,
    Badge: 7,
};
TabularColumnTypes[TabularColumnTypes.String] = "String";
TabularColumnTypes[TabularColumnTypes.Icon] = "Icon";
TabularColumnTypes[TabularColumnTypes.Date] = "Date";
TabularColumnTypes[TabularColumnTypes.Actions] = "Actions";
TabularColumnTypes[TabularColumnTypes.Status] = "Status";
TabularColumnTypes[TabularColumnTypes.DateTime] = "DateTime";
TabularColumnTypes[TabularColumnTypes.Checkbox] = "Checkbox";
TabularColumnTypes[TabularColumnTypes.Badge] = "Badge";
/**
 * @abstract
 */
class ITabularColumn {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabularComponent {
    /**
     * @param {?} conf
     * @param {?} orderByService
     */
    constructor(conf, orderByService) {
        this.conf = conf;
        this.orderByService = orderByService;
        /**
         * Event fired when refresh is called.
         * Host should refresh data of input.
         */
        this.refresh = new EventEmitter();
        /**
         * Event fired when a row is clicked.
         */
        this.rowClick = new EventEmitter();
        this.oldRows = [];
        this.pagedItems = [];
        this.TabularColumnTypes = TabularColumnTypes;
        this.TabularSize = TabularSize;
        this.selectAll = false;
        this.toggleSelectAll = () => {
            for (let /** @type {?} */ i = 0; i < this.rows.length; i++) {
                this.rows[i].checked = this.selectAll;
            }
        };
        this.toggleIndividualSelect = () => {
            let /** @type {?} */ count = 0;
            for (let /** @type {?} */ i = 0; i < this.rows.length; i++) {
                if (this.rows[i].checked) {
                    count++;
                }
            }
            this.selectAll = (this.rows.length === count);
        };
        Object.assign(this, conf);
    }
    /**
     * Tabular configuration
     * IPaginationInstance, ISearchConfig
     * @return {?}
     */
    get config() {
        return this._config;
    }
    /**
     * @param {?} c
     * @return {?}
     */
    set config(c) {
        this._config = c;
    }
    /**
     * The function to call when a action item is clicked *
     * @return {?}
     */
    get callback() {
        return this._callback;
    }
    /**
     * @param {?} Fn
     * @return {?}
     */
    set callback(Fn) {
        this._callback = Fn;
    }
    /**
     * Search term is used in the simple search pipe
     * Array of objects: *ngFor="#row of rows | simpleSearch : 'the search term'"
     * @return {?}
     */
    get searchTerm() {
        return this._searchTerm;
    }
    /**
     * @param {?} term
     * @return {?}
     */
    set searchTerm(term) {
        this._searchTerm = term;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.rows.length !== this.oldRows.length) {
            this.changeDetected = true;
            console.log('DoCheck: Rows changed to "${this.rows}" from "${this.oldRows}"');
            this.oldRows = this.rows;
            if (this.config.defaultOrderBy) {
                this.orderBy = this.config.defaultOrderBy;
            }
            this.orderByData();
        }
        this.changeDetected = false;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
    }
    /**
     * @return {?}
     */
    get iconDirection() {
        return (this.config.defaultOrderByDirection === OrderByDirection.Ascending) ? ' icon-arrow-up' : ' icon-arrow-down';
    }
    /**
     * Calls the parsed callback with optional arguments
     * @param {?} event
     * @param {?} cb
     * @return {?}
     */
    executeCallback(event, cb) {
        event.stopPropagation();
        if (cb.length) {
            if (cb.length === 1) {
                // if callback has no arguments
                cb[0]();
            }
            else {
                // if callback has 1 or more arguments
                const /** @type {?} */ args = [];
                for (let /** @type {?} */ i = 1; i < cb.length; i++) {
                    args.push(cb[i]);
                }
                cb[0].apply(this, args);
            }
        }
    }
    /**
     * @param {?=} $event
     * @return {?}
     */
    setPage($event = {
        page: this.config.pagination.currentPage,
        itemsPerPage: this.config.pagination.itemsPerPage
    }) {
        this.config.pagination.currentPage = $event.page;
        // calculate start and end page item indexes
        const /** @type {?} */ startIndex = (this.config.pagination.currentPage - 1) * this.config.pagination.itemsPerPage;
        const /** @type {?} */ endIndex = Math.min(startIndex + this.config.pagination.itemsPerPage - 1, this.totalItemCount - 1);
        this.pagedItems = this.rows.slice(startIndex, endIndex + 1);
    }
    /**
     * Get the action tooltip if it exists
     * @param {?} action
     * @return {?}
     */
    getActionTooltip(action) {
        return (action && action.disabledConfig) ? action.disabledConfig.tooltip : '';
    }
    /**
     * @param {?} action
     * @return {?}
     */
    getActionDisabledState(action) {
        return (action && action.disabledConfig) ? action.disabledConfig.disabled : false;
    }
    /**
     * Handles the column header click event.
     * @param {?} key
     * @return {?}
     */
    onSortClickHandler(key) {
        this.orderBy = key;
        this.orderByData();
        return false;
    }
    /**
     * Handles the row click event.
     * @param {?} data
     * @return {?}
     */
    onRowClickHandler(data) {
        if (this.config.clickableRows) {
            this.rowClick.emit(data);
        }
    }
    /**
     * Order collection via full collection and not via pipe.
     * The pagination pipe will only return the paginated amount.
     * Which means the order by filter will only be applied to whats paginated
     * and not the full collection.
     * @return {?}
     */
    orderByData() {
        let /** @type {?} */ direction;
        if (this.config.defaultOrderByDirection === OrderByDirection.Ascending) {
            direction = '-';
            this.config.defaultOrderByDirection = OrderByDirection.Descending;
        }
        else {
            direction = '+';
            this.config.defaultOrderByDirection = OrderByDirection.Ascending;
        }
        this.orderByService.doTransform(this.rows, [direction + this.orderBy]);
        this.setPage();
    }
    /**
     * @return {?}
     */
    get totalItemCount() {
        return this.rows.length;
    }
    /**
     * Helper to determine if tabular instance is in small mode
     * @return {?}
     */
    isSmall() {
        return (this.config.size === TabularSize.Small);
    }
    /**
     * @param {?} colData
     * @return {?}
     */
    hasValidBadgeTypeParams(colData) {
        if (colData) {
            if (typeof colData.label !== 'undefined' && typeof colData.cssClass !== 'undefined') {
                return true;
            }
            else {
                console.error('Record for column type badge is invalid, make sure you have the right type. {label:string,cssClass:string}', colData);
            }
        }
        return false;
    }
    /**
     * @param {?} actions
     * @return {?}
     */
    getDefaultAction(actions) {
        const /** @type {?} */ action = actions.find(function (a) { return a.isDefault; });
        return action;
    }
    /**
     * @param {?} actions
     * @return {?}
     */
    hasDefaultAction(actions) {
        return (typeof this.getDefaultAction(actions) !== 'undefined');
    }
    /**
     * @param {?} actions
     * @return {?}
     */
    getDefaultActionName(actions) {
        const /** @type {?} */ action = this.getDefaultAction(actions);
        return (action) ? action.label : '';
    }
    /**
     * @param {?} actions
     * @return {?}
     */
    getDefaultActionCallback(actions) {
        const /** @type {?} */ action = this.getDefaultAction(actions);
        return (action) ? action.callback : {};
    }
}
TabularComponent.decorators = [
    { type: Component, args: [{
                selector: 'hxa-tabular',
                template: `<table class="tabular hx-table is-striped" [class.is-hover]="config.clickableRows" [class.is-narrow]="config.size === TabularSize.Small">
    <thead>
    <tr>
      <th *ngFor="let col of columns" class="{{col.cssClass}} tabular__{{col.label}}" [ngClass]="{'tabular__checkboxes': col.dataType === 6}">
        <!-- sortable column -->
        <a class="tabular__sorter" href="#" *ngIf="col.sortable && col.dataType != 6" (click)="onSortClickHandler(col.id)"><i class="hx-icon {{iconDirection}} is-small" *ngIf="orderBy == col.id"></i> {{col.label}}</a>
        <!-- non sortable column -->
        <span *ngIf="!col.sortable && col.dataType != 6">{{col.label}}</span>
        <!-- checkbox column -->
        <div *ngIf="col.dataType == 6" class="hx-checkbox-control">
          <input id="selectAll" name="selectAll" type="checkbox" class="hx-checkbox" (change)="toggleSelectAll($event)" title="Select All" [(ngModel)]="selectAll" />
          <label for="selectAll" class="hx-label"></label>
        </div>
      </th>
    </tr>
    </thead>
    <tbody>
    <!--<tr *ngFor="let row of rows | paginate: config.pagination | simpleSearch: searchTerm">-->
    <tr *ngFor="let row of pagedItems | simpleSearch: searchTerm" (click)="onRowClickHandler(row)" [class.is-selected]="row.selected">
      <td *ngFor="let col of columns" class="{{col.cssClass}} tabular__{{col.label}}" [ngClass]="{'tabular__checkboxes': col.dataType === 6}">
        <!-- checkbox type -->
        <div *ngIf="col.dataType === TabularColumnTypes.Checkbox" class="hx-checkbox-control">
          <input id="checkbox-{{row.id}}" name="{{col.label}}-checkbox" type="checkbox" class="hx-checkbox" title="{{col.label}}" (change)="toggleIndividualSelect($event)" [(ngModel)]="row.checked" />
          <label for="checkbox-{{row.id}}" class="hx-label"></label>
        </div>
        <!-- string type -->
        <span *ngIf="col.dataType === TabularColumnTypes.String" title="{{row[col.id]}}">{{row[col.id]}}</span>
        <!-- icon type -->
        <i *ngIf="col.dataType === TabularColumnTypes.Icon" class="hx-icon {{row[col.id]}}"></i>
        <!-- date type -->
        <span *ngIf="col.dataType === TabularColumnTypes.Date">{{row[col.id] | date:'d/M/yy'}}</span>
        <!-- status type -->
        <span *ngIf="col.dataType === TabularColumnTypes.Status" class="hx-icon" [ngClass]="{'is-primary':row[col.id],'is-danger':!row[col.id], 'icon-check-empty': row[col.id], 'icon-close-empty':!row[col.id]}" ></span>
        <!-- badge type -->
        <span *ngIf="col.dataType === TabularColumnTypes.Badge && hasValidBadgeTypeParams(row[col.id])" class="hx-badge is-small {{row[col.id].cssClass}}"><span class="hx-badge-content">{{row[col.id].label}}</span></span>
        <!-- date time type -->
        <span *ngIf="col.dataType === TabularColumnTypes.DateTime">{{row[col.id] | date:'d/M/yy h:mm a'}}</span>
        <!-- actions type -->
        <div *ngIf="col.dataType === TabularColumnTypes.Actions" class="hx-dropdown tabularActions">
          <div class="tabularActions__action">
            <div class="hx-dropdown" hxDropdown [isRight]="true">
              <ng-template *ngIf="!hasDefaultAction(row[col.id]); else splitBtn">
              <!-- collection of actions DOES NOT have a default -->
              <button class="hx-button is-flat hx-button-dropdown" [class.is-small]="config.size === TabularSize.Small" hxDropdownToggle type="button">
                <i class="icon icon-more"></i>
              </button>
              </ng-template>
              <ng-template #splitBtn>
              <!-- collection of actions DOES have a default -->
              <div class="hx-button-split">
                <button type="button" class="hx-button is-flat" [class.is-small]="config.size === TabularSize.Small"  (click)='executeCallback($event,getDefaultActionCallback(row[col.id]))' [innerHtml]="getDefaultActionName(row[col.id])"></button>
                <button type="button" class="hx-button is-flat" [class.is-small]="config.size === TabularSize.Small" hxDropdownToggle><i class="icon icon-more"></i></button>
              </div>
              </ng-template>
              <div class="hx-dropdown-menu" *hxDropdownMenu>
                <ng-container *ngFor="let action of row[col.id]">
                  <a *ngIf="!getActionDisabledState(action) && action.routeType==0 && !action.isDefault"
                     [routerLink]="action.route"
                     class="hx-dropdown-item {{action.css}}"
                     [innerHTML]="action.label">
                  </a>
                  <a *ngIf="!getActionDisabledState(action) && action.routeType==1 && !action.isDefault"
                     (click)='executeCallback($event,action.callback)'
                     class="hx-dropdown-item {{action.css}}"
                     [innerHTML]="action.label">
                  </a>
                </ng-container>
              </div>
            </div>
          </div>
        </div>
      </td>
    </tr>
    </tbody>
  </table>
  <hx-pagination [directionLinks]="true" [boundaryLinks]="true" [rotate]="false" [maxSize]="10"
                 [totalItems]="totalItemCount" [itemsPerPage]="config.pagination.itemsPerPage"
                 [(ngModel)]="config.pagination.currentPage" (pageChanged)="setPage($event)" *ngIf="totalItemCount > config.pagination.itemsPerPage"></hx-pagination>
  `,
                styles: [
                    '.tabular__sorter{position:relative;cursor:pointer} th .icon{position: absolute;left:-1rem;}',
                    '.tabular__checkboxes{width:2%;}',
                    '.tabular__checkboxes .hx-checkbox-control{margin:0;display:flex;}',
                    '.tabularActions__action button.hx-button{ width: 1rem;}'
                ]
            },] },
];
/** @nocollapse */
TabularComponent.ctorParameters = () => [
    { type: TabularConfig, },
    { type: TabularOrderByService, },
];
TabularComponent.propDecorators = {
    "columns": [{ type: Input },],
    "rows": [{ type: Input },],
    "config": [{ type: Input },],
    "callback": [{ type: Input },],
    "searchTerm": [{ type: Input },],
    "refresh": [{ type: Output },],
    "rowClick": [{ type: Output },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Example use
 * Array of objects: *ngFor="#row of rows | simpleSearch : 'the search term'"
 */
/**
 * @record
 */

class SimpleSearchPipe {
    constructor() {
        this.searchValue = (item, searchTerm = '') => {
            const /** @type {?} */ keys = Object.keys(item);
            for (let /** @type {?} */ i = 0, /** @type {?} */ len = keys.length; i < len; i++) {
                let /** @type {?} */ match = false, /** @type {?} */
                propertyValue = item[keys[i]];
                if (propertyValue)
                    match = (propertyValue.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
                if (match || searchTerm == '')
                    return true;
            }
            return false;
        };
    }
    /**
     * @param {?} items
     * @param {?} args
     * @return {?}
     */
    transform(items, args) {
        if (!Array.isArray(items))
            return items;
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => (args) ? this.searchValue(item, args.toString()) : item);
    }
}
SimpleSearchPipe.decorators = [
    { type: Pipe, args: [{
                name: 'simpleSearch',
                pure: false
            },] },
];
/** @nocollapse */
SimpleSearchPipe.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabularModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: TabularModule,
            providers: [
                TabularOrderByService,
                TabularConfig
            ]
        };
    }
}
TabularModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    TabularComponent,
                    SimpleSearchPipe
                ],
                imports: [
                    CommonModule,
                    BrowserModule,
                    HttpModule,
                    RouterModule,
                    PaginationModule,
                    TooltipModule,
                    DropdownModule,
                    FormsModule
                ],
                providers: [
                    TabularOrderByService,
                    TabularConfig
                ],
                exports: [
                    TabularComponent
                ],
                schemas: [CUSTOM_ELEMENTS_SCHEMA]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectizeConfig {
    constructor() {
        /**
         *  The string to separate items by. When typing an item in a multi-selection control
         *  allowing creation, then the delimiter, the item is added. If you paste
         *  delimiter-separated items in such control, the items are added at once.
         *  The delimiter is also used in the getValue API call on a text <input> tag to
         *  separate the multiple values.
         *
         *  Default: ','
         */
        this.delimiter = ',';
        /**
         *  Allows the user to create new items that aren't in the initial list of options.
         *  This setting can be any of the following: true, false (disabled), or a function
         *  to process input. The function can take one of two forms: synchronous
         *  (with signature function(input){} or asynchronous
         *  (with signature function(input, callback). In the synchronous case, the function
         *  should return an object for the options
         *  (eg, with defaults: return { 'value': value, 'text': text };).
         *  The asynchronous version should invoke the callback with the result in the same
         *  format as the object above (eg, callback( { 'value': value, 'text': text});)
         *
         *  Default: false
         */
        this.create = false;
        /**
         *  If true, when user exits the field (clicks outside of input), a new option
         *  is created and selected (if create setting is enabled).
         *
         *  Default: false
         */
        this.createOnBlur = false;
        /**
         *  Specifies a RegExp or a string containing a regular expression that the current
         *  search filter must match to be allowed to be created. May also be a predicate
         *  function that takes the filter text and returns whether it is allowed.
         *
         *  Default: null
         */
        this.createFilter = null;
        /**
         *  Toggles match highlighting within the dropdown menu.
         *
         *  Default: true
         */
        this.highlight = true;
        /**
         *  If false, items created by the user will not show up as available options once
         *  they are unselected.
         *
         *  Default: false
         */
        this.persist = true;
        /**
         *  Show the dropdown immediately when the control receives focus.
         *
         *  Default: true
         */
        this.openOnFocus = true;
        /**
         *  The max number of items to render at once in the dropdown list of options.
         *
         *  Default: 1000
         */
        this.maxOptions = 1000;
        /**
         *  The max number of items the user can select. 1 makes the control mono-selection,
         *  null allows an unlimited number of items.
         *
         *  Default: 1
         */
        this.maxItems = 1;
        /**
         *  If true, the items that are currently selected will not be shown in the dropdown
         *  list of available options.
         *
         *  Default: false
         */
        this.hideSelected = false;
        /**
         *  If true, the dropdown will be closed after a selection is made.
         *
         *  Default: false
         */
        this.closeAfterSelect = false;
        /**
         *  If true, Selectize will treat any options with a "" value like normal.
         *  This defaults to false to accomodate the common <select> practice of
         *  having the first empty option to act as a placeholder.
         *
         *  Default: false
         */
        this.allowEmptyOption = false;
        /**
         *  The animation duration (in milliseconds) of the scroll animation
         *  triggered when going [up] and [down] in the options dropdown.
         *
         *  Default: 60
         */
        this.scrollDuration = 60;
        /**
         *  The number of milliseconds to wait before requesting options from the
         *  server or null. If null, throttling is disabled. Useful when loading
         *  options dynamically while the user types a search / filter expression.
         *
         *  Default: 300
         */
        this.loadThrottle = 300;
        /**
         *  The class name added to the wrapper element while awaiting the
         *  fulfillment of load requests.
         *
         *  Default: 'loading'
         */
        this.loadingClass = 'loading';
        /**
         *  The placeholder of the control (displayed when nothing is selected / typed).
         *  Defaults to input element's placeholder, unless this one is specified.
         *
         *  Default: null
         */
        this.placeholder = null;
        /**
         *  If true, the load function will be called upon control
         *  initialization (with an empty search).
         *
         *  Default: false
         */
        this.preload = false;
        /**
         *  The element the dropdown menu is appended to. This should be 'body' or null.
         *  If null, the dropdown will be appended as a child of the Selectize control.
         *
         *  Default: null
         */
        this.dropdownParent = null;
        /**
         *  If true, the "Add..." option is the default selection in the dropdown.
         *
         *  Default: false
         */
        this.addPrecedence = false;
        /**
         *  If true, the tab key will choose the currently selected item.
         *
         *  Default: false
         */
        this.selectOnTab = false;
        /**
         *  Enable or disable international character support.
         *
         *  Default: true
         */
        this.diacritics = true;
        /**
         *  The property name of the label in the options array
         *
         *  Default: 'label'
         */
        this.labelField = 'label';
        /**
         *  The property name of the value in the options array
         *
         *  Default: 'value'
         */
        this.valueField = 'value';
        /**
         * An array of property names to analyze when filtering options.
         */
        this.searchField = ['label'];
        /**
         * Default override item render function
         */
        this.render = {
            item: (item, escape) => {
                const /** @type {?} */ multi = `<span class="hx-badge is-medium">
                <span class="hx-badge-content">`
                    + escape(item.label) +
                    `</span>
              </span>`;
                const /** @type {?} */ single = `<div class="item">` + escape(item.label) + `</div>`;
                return (!this.maxItems) ? multi : single;
            }
        };
        /**
         *  Selectize plugins to use
         */
        this.plugins = {
            'remove_button': {
                label: '',
                title: 'Remove',
                className: 'hx-delete',
                append: true
            }
        };
    }
}
SelectizeConfig.decorators = [
    { type: Injectable },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const SELECTIZE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectizeComponent),
    multi: true
};
class SelectizeComponent {
    /**
     * @param {?} _differs
     * @param {?} renderer
     */
    constructor(_differs, renderer) {
        this._differs = _differs;
        this.renderer = renderer;
        this.enabled = true;
        this.onBlur = new EventEmitter(false);
        /**
         * Invoked anytime a key is pressed down on the selectize search field
         * @param e
         */
        this.onKeydown = (e) => {
            console.log(e);
            const /** @type {?} */ TABKEY = 9;
            if (e.keyCode === TABKEY) {
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
            }
        };
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.id && this.id.length > 0) {
            this.renderer.setAttribute(this.selectizeInput.nativeElement, 'id', this.id);
        }
        this.reset();
    }
    /**
     * @return {?}
     */
    reset() {
        this.selectize = $(this.selectizeInput.nativeElement).selectize(this.config)[0].selectize;
        this.selectize.on('change', this.onSelectizeValueChange.bind(this));
        this.selectize.on('blur', this.onBlurEvent.bind(this));
        this.selectize.on('type', this.onSelectizeType.bind(this));
        this.selectize.on('item_add', this.onSelectizeItemSelected.bind(this));
        this.updatePlaceholder();
        this.onEnabledStatusChange();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.selectize.off('change');
        this.selectize.off('blur');
        this.selectize.off('type');
    }
    /**
     * Change detection for primitive types.
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (this.selectize) {
            if (changes.hasOwnProperty('placeholder') ||
                changes.hasOwnProperty('hasOptionsPlaceholder') ||
                changes.hasOwnProperty('noOptionsPlaceholder')) {
                this.updatePlaceholder();
            }
            if (changes.hasOwnProperty('enabled')) {
                this.onEnabledStatusChange();
            }
        }
    }
    /**
     * Implementing deep check for option comparison
     *
     * FIXME -> Implement deep check to only compare against label and value fields.
     * @return {?}
     */
    ngDoCheck() {
        if (this._options_differ) {
            const /** @type {?} */ changes = this._options_differ.diff(this._options);
            if (changes) {
                this._applyOptionsChanges(changes);
            }
        }
        if (this._optgroups_differ) {
            const /** @type {?} */ changes = this._optgroups_differ.diff(this._optgroups);
            if (changes) {
                this._applyOptionGroupChanges(changes);
            }
        }
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _applyOptionsChanges(changes) {
        changes.forEachAddedItem((record) => {
            this.onSelectizeOptionAdd(record.item);
        });
        changes.forEachRemovedItem((record) => {
            this.onSelectizeOptionRemove(record.item);
        });
        this.updatePlaceholder();
        this.evalHasError();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    _applyOptionGroupChanges(changes) {
        changes.forEachAddedItem((record) => {
            this.onSelectizeOptGroupAdd(record.item);
        });
        changes.forEachRemovedItem((record) => {
            this.onSelectizeOptGroupRemove(record.item);
        });
        this.updatePlaceholder();
        this.evalHasError();
    }
    /**
     * @return {?}
     */
    clearhighlight() {
        // remove highlight to help selectize bug
        // https://github.com/selectize/selectize.js/issues/1141
        this.selectize.$dropdown_content.removeHighlight();
    }
    /**
     * @return {?}
     */
    onBlurEvent() {
        if (this.formControl) {
            this.formControl.markAsTouched();
        }
        this.onBlur.emit();
        this.evalHasError();
    }
    /**
     * @param {?} optgroup
     * @return {?}
     */
    onSelectizeOptGroupAdd(optgroup) {
        this.selectize.addOptionGroup(optgroup[this.getOptgroupField()], optgroup);
    }
    /**
     * @param {?} optgroup
     * @return {?}
     */
    onSelectizeOptGroupRemove(optgroup) {
        this.selectize.removeOptionGroup(optgroup[this.getOptgroupField()]);
    }
    /**
     * Refresh selected values when options change.
     * @param {?} option
     * @return {?}
     */
    onSelectizeOptionAdd(option) {
        this.selectize.addOption(cloneDeep(option));
        const /** @type {?} */ valueField = this.config.valueField;
        if (this.value) {
            const /** @type {?} */ items = typeof this.value === 'string' || typeof this.value === 'number'
                ? [this.value]
                : this.value;
            if (items &&
                items instanceof Array &&
                items.find(value => value === option[valueField])) {
                this.selectize.addItem(option[valueField], true);
            }
        }
    }
    /**
     * @param {?} option
     * @return {?}
     */
    onSelectizeOptionRemove(option) {
        this.selectize.removeOption(option[this.config.valueField]);
    }
    /**
     * @return {?}
     */
    evalHasError() {
        const /** @type {?} */ parent = $(this.selectize.$control).parent();
        if (this.formControl) {
            if (this.formControl.touched && this.formControl.invalid) {
                parent.addClass(this.errorClass || 'has-error');
            }
            else if (parent.hasClass('has-error')) {
                parent.removeClass(this.errorClass || 'has-error');
            }
        }
    }
    /**
     * Update the current placeholder based on the given input parameter.
     * @return {?}
     */
    updatePlaceholder() {
        if (this.selectize.items.length === 0 &&
            this.selectize.settings.placeholder !== this.getPlaceholder()) {
            this.selectize.settings.placeholder = this.getPlaceholder();
            this.selectize.updatePlaceholder();
            this.selectize.showInput(); // Without this, when options are cleared placeholder only appears after focus.
        }
    }
    /**
     * Called when a change is detected in the 'enabled' input field.
     * Sets the selectize state based on the new value.
     * @return {?}
     */
    onEnabledStatusChange() {
        this.enabled ? this.selectize.enable() : this.selectize.disable();
    }
    /**
     * Dispatches change event when a value change is detected.
     * @param {?} $event
     * @return {?}
     */
    onSelectizeValueChange($event) {
        // In some cases this gets called before registerOnChange.
        if (this.onChangeCallback) {
            // Map selectize's value collection back to original ISelectizeItem object
            const /** @type {?} */ data = this.selectize.items.map(v => {
                return this.selectize.options[v];
            });
            this.onChangeCallback(data);
        }
    }
    /**
     * Invoked when the user types while filtering options.
     * @param {?} str
     * @return {?}
     */
    onSelectizeType(str) {
        if (str.length === 0) {
            this.clearhighlight();
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSelectizeItemSelected($event) {
        this.clearhighlight();
    }
    /**
     * Returns the applicable placeholder.
     * @return {?}
     */
    getPlaceholder() {
        if (this.hasOptionsPlaceholder) {
            if (this.options && this.options.length > 0) {
                return this.hasOptionsPlaceholder;
            }
        }
        if (this.noOptionsPlaceholder) {
            if (!this.options || this.options.length === 0) {
                return this.noOptionsPlaceholder;
            }
        }
        return this.placeholder;
    }
    /**
     * Implementation from ControlValueAccessor
     *
     * @param {?} obj
     * @return {?}
     */
    writeValue(obj) {
        // Extract just 'value' property for selectize.js to use
        this.value = obj.map(v => {
            return v.value;
        });
        this.selectize.setValue(this.value);
    }
    /**
     * Implementation from ControlValueAccessor, callback for (ngModelChange)
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this.onChangeCallback = fn;
    }
    /**
     * Implementation from ControlValueAccessor
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this.onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    getOptgroupField() {
        return this.config['optgroupField']
            ? this.config['optgroupField']
            : 'optgroup';
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set options(value) {
        this._options = value;
        if (!this._options_differ && value) {
            this._options_differ = this._differs.find(value).create();
        }
    }
    /**
     * @return {?}
     */
    get options() {
        return this._options;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set optgroups(value) {
        this._optgroups = value;
        if (!this._optgroups_differ && value) {
            this._optgroups_differ = this._differs.find(value).create();
        }
    }
    /**
     * @return {?}
     */
    get optgroups() {
        return this._optgroups;
    }
}
SelectizeComponent.decorators = [
    { type: Component, args: [{
                selector: 'hxa-selectize',
                template: `<select #selectizeInput></select>`,
                providers: [SELECTIZE_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: [`.selectize-control{position:relative}.selectize-dropdown,.selectize-input,.selectize-input input{color:#2a2c2d;font-family:inherit;font-size:.92rem;line-height:1.5;-webkit-font-smoothing:inherit}.selectize-control.single .selectize-input.input-active,.selectize-input{background:0 0;cursor:text;display:inline-block}.selectize-input{border:1px solid rgba(0,0,0,.2);padding:8px;display:inline-block;width:100%;overflow:hidden;position:relative;z-index:1;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:none;box-shadow:none;border-radius:0;border-width:0 0 1px}.selectize-control.multi .selectize-input.has-items{padding:6px 8px 3px}.selectize-input.full{background-color:transparent}.selectize-input.disabled,.selectize-input.disabled *{cursor:default!important}.selectize-input.focus{-webkit-box-shadow:none;box-shadow:none}.selectize-input.dropdown-active{border-radius:0}.selectize-input>*{vertical-align:baseline;display:inline-block;zoom:1}.selectize-control.multi .selectize-input>div{cursor:pointer;margin:4px;padding:2px 6px;background:rgba(0,0,0,.05);color:#2a2c2d;border:0 solid transparent;border-radius:290486px;font-size:.75rem;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;line-height:1.5;white-space:nowrap}.selectize-control.multi .selectize-input>div.active{background:#e8e8e8;color:#2a2c2d;border:0 solid #cacaca}.selectize-control.multi .selectize-input.disabled>div,.selectize-control.multi .selectize-input.disabled>div.active{color:#787878;background:rgba(77,77,77,.05);border:0 solid rgba(77,77,77,0)}.selectize-input>input{display:inline-block!important;padding:0!important;min-height:0!important;max-height:none!important;max-width:100%!important;margin:0 2px 0 0!important;text-indent:0!important;border:0!important;background:0 0!important;line-height:inherit!important;-webkit-user-select:auto!important}.selectize-input>input::-ms-clear{display:none}.selectize-input>input:focus{outline:0!important}.selectize-input::after{content:' ';display:block;clear:left}.selectize-input.dropdown-active::before{content:' ';display:block;position:absolute;background:#f0f0f0;height:1px;bottom:0;left:0;right:0}.hx-select-control:after{display:none}.selectize-dropdown{position:absolute;z-index:10;border:transparent;background:#fff;margin:-1px 0 0;border-top:0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.145);box-shadow:0 6px 12px rgba(0,0,0,.145);border-radius:0}.selectize-dropdown [data-selectable]{cursor:pointer;overflow:hidden}.selectize-dropdown [data-selectable] .highlight{background:rgba(35,49,43,.23);border-radius:1px;font-weight:700}.selectize-dropdown .optgroup-header,.selectize-dropdown [data-selectable]{padding:5px 8px}.selectize-dropdown .optgroup:first-child .optgroup-header{border-top:0}.selectize-dropdown .optgroup-header{color:#2a2c2d;background:#fff;cursor:default}.selectize-dropdown .active{background-color:#41b987;color:#fff}.selectize-dropdown .active.create{color:#fff}.selectize-dropdown .create{color:rgba(42,44,45,.5)}.selectize-dropdown-content{overflow-y:auto;overflow-x:hidden;max-height:200px;-webkit-overflow-scrolling:touch}.selectize-control.single .selectize-input,.selectize-control.single .selectize-input input{cursor:pointer}.selectize-control.single .selectize-input.input-active,.selectize-control.single .selectize-input.input-active input{cursor:text}.selectize-control.single .selectize-input:after{content:' ';display:block;position:absolute;top:50%;right:15px;margin-top:-3px;width:0;height:0;border-style:solid;border-width:5px 5px 0;border-color:grey transparent transparent}.selectize-control.single .selectize-input.dropdown-active:after{margin-top:-4px;border-width:0 5px 5px;border-color:transparent transparent grey}.selectize-control.rtl.single .selectize-input:after{left:15px;right:auto}.selectize-control.rtl .selectize-input>input{margin:0 4px 0 -2px!important}.selectize-control .selectize-input.disabled{opacity:.5;background-color:#fafafa}.selectize-control.plugin-remove_button [data-value]{position:relative;padding-right:.7rem!important}.selectize-control.plugin-remove_button [data-value].is-medium{padding-right:1rem!important}.selectize-control.plugin-remove_button [data-value] .hx-delete{margin-left:-.2rem;height:16px;width:16px;max-height:16px;max-width:16px;min-height:16px;min-width:16px}.selectize-control.plugin-remove_button [data-value].is-medium .hx-delete{margin-left:-.5rem}.selectize-control.plugin-remove_button [data-value].is-large .hx-delete{margin-left:-.2rem;height:20px;width:20px;max-height:20px;max-width:20px;min-height:20px;min-width:20px}.selectize-control.plugin-remove_button .disabled [data-value] .hx-remove:hover{background:0 0}.selectize-control.plugin-remove_button .disabled [data-value] .hx-remove{border-left-color:rgba(77,77,77,0)}.selectize-control.plugin-remove_button .remove-single{position:absolute;right:28px;top:6px;font-size:23px}`]
            },] },
];
/** @nocollapse */
SelectizeComponent.ctorParameters = () => [
    { type: IterableDiffers, },
    { type: Renderer2, },
];
SelectizeComponent.propDecorators = {
    "config": [{ type: Input },],
    "id": [{ type: Input },],
    "placeholder": [{ type: Input },],
    "hasOptionsPlaceholder": [{ type: Input },],
    "noOptionsPlaceholder": [{ type: Input },],
    "enabled": [{ type: Input },],
    "value": [{ type: Input },],
    "formControl": [{ type: Input },],
    "errorClass": [{ type: Input },],
    "onBlur": [{ type: Output },],
    "selectizeInput": [{ type: ViewChild, args: ['selectizeInput',] },],
    "options": [{ type: Input },],
    "optgroups": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class SelectizeModule {
    /**
     * @param {?=} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: SelectizeModule,
            providers: [
                ComponentLoaderFactory
            ]
        };
    }
    ;
}
SelectizeModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    SelectizeComponent
                ],
                exports: [
                    SelectizeComponent
                ],
                entryComponents: [SelectizeComponent]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AutoGrowDirective {
    /**
     * @param {?} element
     */
    constructor(element) {
        this.element = element;
    }
    /**
     * @return {?}
     */
    onInput() {
        this.resize();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        const /** @type {?} */ style = this.element.nativeElement.style;
        style.overflow = 'hidden';
        style.height = 'auto';
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
        this.resize();
    }
    /**
     * @return {?}
     */
    resize() {
        const /** @type {?} */ style = this.element.nativeElement.style;
        const /** @type {?} */ height = this.element.nativeElement.scrollHeight;
        style.height = `${height}px`;
    }
}
AutoGrowDirective.decorators = [
    { type: Directive, args: [{
                selector: 'textarea[autogrow]'
            },] },
];
/** @nocollapse */
AutoGrowDirective.ctorParameters = () => [
    { type: ElementRef, },
];
AutoGrowDirective.propDecorators = {
    "onInput": [{ type: HostListener, args: ['input', ['$event.target'],] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class AutoGrowModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: AutoGrowModule, providers: []
        };
    }
    ;
}
AutoGrowModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AutoGrowDirective
                ],
                exports: [
                    AutoGrowDirective
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TypeaheadOptions {
    /**
     * @param {?} options
     */
    constructor(options) {
        Object.assign(this, options);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/** @enum {number} */
const ActionConfigRouteType = {
    Default: 0,
    Callback: 1,
};
ActionConfigRouteType[ActionConfigRouteType.Default] = "Default";
ActionConfigRouteType[ActionConfigRouteType.Callback] = "Callback";
/**
 * @abstract
 */
class IActionsConfig {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class TabularColumn {
    /**
     * @param {?} id
     * @param {?} label
     * @param {?} dataType
     * @param {?} sortable
     * @param {?=} cssClass
     * @param {?=} options
     */
    constructor(id, label, dataType, sortable, cssClass = '', options) {
        this.id = id;
        this.label = label;
        this.dataType = dataType;
        this.sortable = sortable;
        this.cssClass = cssClass;
        this.options = options;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @param {?=} defaultValue
 * @return {?}
 */
function OnChange(defaultValue) {
    const /** @type {?} */ sufix = 'Change';
    return function OnChangeHandler(target, propertyKey) {
        const /** @type {?} */ _key = ` __${propertyKey}Value`;
        Object.defineProperty(target, propertyKey, {
            /**
             * @return {?}
             */
            get() { return this[_key]; },
            /**
             * @param {?} value
             * @return {?}
             */
            set(value) {
                const /** @type {?} */ prevValue = this[_key];
                this[_key] = value;
                if (prevValue !== value && this[propertyKey + sufix]) {
                    this[propertyKey + sufix].emit(value);
                }
            }
        });
    };
}
/* tslint:enable */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @template T
 */
class LinkedList {
    constructor() {
        this.length = 0;
        this.asArray = [];
    }
    /**
     * @param {?} position
     * @return {?}
     */
    getNode(position) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        let /** @type {?} */ current = this.head;
        for (let /** @type {?} */ index = 0; index < position; index++) {
            current = current.next;
        }
        return current;
    }
    /**
     * @return {?}
     */
    createInternalArrayRepresentation() {
        const /** @type {?} */ outArray = [];
        let /** @type {?} */ current = this.head;
        while (current) {
            outArray.push(current.value);
            current = current.next;
        }
        this.asArray = outArray;
    }
    /**
     * @param {?} position
     * @return {?}
     */
    get(position) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            return void 0;
        }
        let /** @type {?} */ current = this.head;
        for (let /** @type {?} */ index = 0; index < position; index++) {
            current = current.next;
        }
        return current.value;
    }
    /**
     * @param {?} value
     * @param {?=} position
     * @return {?}
     */
    add(value, position = this.length) {
        if (position < 0 || position > this.length) {
            throw new Error('Position is out of the list');
        }
        const /** @type {?} */ node = {
            value: /** @type {?} */ (value),
            next: /** @type {?} */ (undefined),
            previous: /** @type {?} */ (undefined)
        };
        if (this.length === 0) {
            this.head = node;
            this.tail = node;
            this.current = node;
        }
        else {
            if (position === 0) {
                // first node
                node.next = this.head;
                this.head.previous = node;
                this.head = node;
            }
            else if (position === this.length) {
                // last node
                this.tail.next = node;
                node.previous = this.tail;
                this.tail = node;
            }
            else {
                // node in middle
                const /** @type {?} */ currentPreviousNode = this.getNode(position - 1);
                const /** @type {?} */ currentNextNode = currentPreviousNode.next;
                currentPreviousNode.next = node;
                currentNextNode.previous = node;
                node.previous = currentPreviousNode;
                node.next = currentNextNode;
            }
        }
        this.length++;
        this.createInternalArrayRepresentation();
    }
    /**
     * @param {?=} position
     * @return {?}
     */
    remove(position = 0) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        if (position === 0) {
            // first node
            this.head = this.head.next;
            if (this.head) {
                // there is no second node
                this.head.previous = undefined;
            }
            else {
                // there is no second node
                this.tail = undefined;
            }
        }
        else if (position === this.length - 1) {
            // last node
            this.tail = this.tail.previous;
            this.tail.next = undefined;
        }
        else {
            // middle node
            const /** @type {?} */ removedNode = this.getNode(position);
            removedNode.next.previous = removedNode.previous;
            removedNode.previous.next = removedNode.next;
        }
        this.length--;
        this.createInternalArrayRepresentation();
    }
    /**
     * @param {?} position
     * @param {?} value
     * @return {?}
     */
    set(position, value) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        const /** @type {?} */ node = this.getNode(position);
        node.value = value;
        this.createInternalArrayRepresentation();
    }
    /**
     * @return {?}
     */
    toArray() {
        return this.asArray;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    findAll(fn) {
        let /** @type {?} */ current = this.head;
        const /** @type {?} */ result = [];
        for (let /** @type {?} */ index = 0; index < this.length; index++) {
            if (fn(current.value, index)) {
                result.push({ index, value: current.value });
            }
            current = current.next;
        }
        return result;
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    push(...args) {
        args.forEach((arg) => {
            this.add(arg);
        });
        return this.length;
    }
    /**
     * @return {?}
     */
    pop() {
        if (this.length === 0) {
            return undefined;
        }
        const /** @type {?} */ last = this.tail;
        this.remove(this.length - 1);
        return last.value;
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    unshift(...args) {
        args.reverse();
        args.forEach((arg) => {
            this.add(arg, 0);
        });
        return this.length;
    }
    /**
     * @return {?}
     */
    shift() {
        if (this.length === 0) {
            return undefined;
        }
        const /** @type {?} */ lastItem = this.head.value;
        this.remove();
        return lastItem;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    forEach(fn) {
        let /** @type {?} */ current = this.head;
        for (let /** @type {?} */ index = 0; index < this.length; index++) {
            fn(current.value, index);
            current = current.next;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    indexOf(value) {
        let /** @type {?} */ current = this.head;
        let /** @type {?} */ position = 0;
        for (let /** @type {?} */ index = 0; index < this.length; index++) {
            if (current.value === value) {
                position = index;
                break;
            }
            current = current.next;
        }
        return position;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    some(fn) {
        let /** @type {?} */ current = this.head;
        let /** @type {?} */ result = false;
        while (current && !result) {
            if (fn(current.value)) {
                result = true;
                break;
            }
            current = current.next;
        }
        return result;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    every(fn) {
        let /** @type {?} */ current = this.head;
        let /** @type {?} */ result = true;
        while (current && result) {
            if (!fn(current.value)) {
                result = false;
            }
            current = current.next;
        }
        return result;
    }
    /**
     * @return {?}
     */
    toString() {
        return '[Linked List]';
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    find(fn) {
        let /** @type {?} */ current = this.head;
        let /** @type {?} */ result;
        for (let /** @type {?} */ index = 0; index < this.length; index++) {
            if (fn(current.value, index)) {
                result = current.value;
                break;
            }
            current = current.next;
        }
        return result;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    findIndex(fn) {
        let /** @type {?} */ current = this.head;
        let /** @type {?} */ result;
        for (let /** @type {?} */ index = 0; index < this.length; index++) {
            if (fn(current.value, index)) {
                result = index;
                break;
            }
            current = current.next;
        }
        return result;
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
var win = typeof window !== 'undefined' && window || /** @type {?} */ ({});
var document$1 = win.document;
var location = win.location;
var gc = win['gc'] ? () => win['gc']() : () => null;
var performance = win['performance'] ? win['performance'] : null;
const Event = win['Event'];
const MouseEvent = win['MouseEvent'];
const KeyboardEvent = win['KeyboardEvent'];
const EventTarget = win['EventTarget'];
const History = win['History'];
const Location = win['Location'];
const EventListener = win['EventListener'];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class Utils {
    /**
     * @param {?} element
     * @return {?}
     */
    static reflow(element) {
        ((bs) => bs)(element.offsetHeight);
    }
    /**
     * @param {?} elem
     * @return {?}
     */
    static getStyles(elem) {
        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        let /** @type {?} */ view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = win;
        }
        return view.getComputedStyle(elem);
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class HxUiModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: HxUiModule,
            providers: [
                ModalService
            ]
        };
    }
}
HxUiModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    DropdownModule.forRoot(), ModalModule.forRoot(), PaginationModule.forRoot(),
                    TabsModule.forRoot(), TooltipModule.forRoot(),
                    TypeaheadModule.forRoot(), TabularModule.forRoot(),
                    SelectizeModule.forRoot(), DatepickerModule.forRoot(),
                    AutoGrowModule.forRoot()
                ],
                exports: [
                    DatepickerModule, DropdownModule, ModalModule,
                    PaginationModule, TabsModule, TooltipModule,
                    TypeaheadModule, TabularModule, SelectizeModule,
                    AutoGrowModule
                ]
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { OnChange, LinkedList, Trigger, Utils, ComponentLoaderFactory, ContentRef, ComponentLoader, Positioning, PositioningOptions, PositioningService, positionElements, Context, HxUiModule, ModalContainer, Modal, ModalService, ModalPlaceholderComponent, ModalModule, ModalBackdropComponent, DatepickerComponent, DatepickerFormComponent, DateValueAccessor, DropdownDirective, DropdownMenuDirective, DropdownToggleDirective, DropdownContainerComponent, DropdownState, DropdownConfig, DropdownModule, PagerComponent, PaginationComponent, PaginationModule, PaginationConfig, NgTranscludeDirective, TabDirective, TabHeadingDirective, TabsetComponent, TabsetConfig, TabsModule, TooltipContentComponent, TooltipDirective, TooltipModule, TooltipConfig, latinMap, TypeaheadOptions, TypeaheadMatch, escapeRegexp, getValueFromObject, tokenize, latinize, TypeaheadContainerComponent, TypeaheadDirective, TypeaheadModule, TabularComponent, TabularModule, ActionConfigRouteType, IActionsConfig, TabularColumnTypes, ITabularColumn, TabularColumn, ITabularConfig, TabularConfig, OrderByDirection, TabularOrderByService, TabularSize, SELECTIZE_VALUE_ACCESSOR, SelectizeComponent, SelectizeConfig, SelectizeModule, AutoGrowDirective, AutoGrowModule, AutoGrowModule as ɵf, DatepickerModule as ɵd, PAGER_CONTROL_VALUE_ACCESSOR as ɵa, PAGINATION_CONTROL_VALUE_ACCESSOR as ɵb, PositioningService as ɵe, SimpleSearchPipe as ɵc };
//# sourceMappingURL=hxui-angular.js.map
