(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('@angular/common'), require('rxjs/operators'), require('rxjs'), require('array-sort-by'), require('@angular/platform-browser'), require('@angular/common/http'), require('@angular/router'), require('lodash')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', '@angular/forms', '@angular/common', 'rxjs/operators', 'rxjs', 'array-sort-by', '@angular/platform-browser', '@angular/common/http', '@angular/router', 'lodash'], factory) :
	(factory((global.hxui = global.hxui || {}, global.hxui.angular = {}),global.ng.core,global.ng.forms,global.ng.common,global.Rx.Observable.prototype,global.rxjs,global.sortBy,global.ng.platformBrowser,global.ng.common.http,global.ng.router,global.lodash));
}(this, (function (exports,core,forms,common,operators,rxjs,sortBy,platformBrowser,http,router,lodash) { 'use strict';

sortBy = sortBy && sortBy.hasOwnProperty('default') ? sortBy['default'] : sortBy;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0
THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.
See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */
var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}





function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

var Positioning = /** @class */ (function () {
    function Positioning() {
    }
    Positioning.prototype.position = function (element, round) {
        if (round === void 0) { round = true; }
        var elPosition;
        var parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };
        if (this.getStyle(element, 'position') === 'fixed') {
            elPosition = element.getBoundingClientRect();
        }
        else {
            var offsetParentEl = this.offsetParent(element);
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
    };
    Positioning.prototype.offset = function (element, round) {
        if (round === void 0) { round = true; }
        var elBcr = element.getBoundingClientRect();
        var viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };
        var elOffset = {
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
    };
    Positioning.prototype.positionElements = function (hostElement, targetElement, placement, appendToBody) {
        var hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        var shiftWidth = {
            left: hostElPosition.left,
            center: hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2,
            right: hostElPosition.left + hostElPosition.width
        };
        var shiftHeight = {
            top: hostElPosition.top,
            center: hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2,
            bottom: hostElPosition.top + hostElPosition.height
        };
        var targetElBCR = targetElement.getBoundingClientRect();
        var placementPrimary = placement.split(' ')[0] || 'top';
        var placementSecondary = placement.split(' ')[1] || 'center';
        var targetElPosition = {
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
    };
    Positioning.prototype.getStyle = function (element, prop) { return ((window.getComputedStyle(element)))[prop]; };
    Positioning.prototype.isStaticPositioned = function (element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    };
    Positioning.prototype.offsetParent = function (element) {
        var offsetParentEl = (element.offsetParent) || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = (offsetParentEl.offsetParent);
        }
        return offsetParentEl || document.documentElement;
    };
    return Positioning;
}());
var positionService = new Positioning();
function positionElements(hostElement, targetElement, placement, appendToBody) {
    var pos = positionService.positionElements(hostElement, targetElement, placement, appendToBody);
    targetElement.style.top = pos.top + "px";
    targetElement.style.left = pos.left + "px";
}
var PositioningService = /** @class */ (function () {
    function PositioningService() {
    }
    PositioningService.prototype.position = function (options) {
        var element = options.element, target = options.target, attachment = options.attachment, appendToBody = options.appendToBody;
        positionElements(this._getHtmlElement(target), this._getHtmlElement(element), (attachment), appendToBody);
    };
    PositioningService.prototype.isElementBelowTheFold = function (element) {
        var rect = element.getBoundingClientRect();
        return ((rect.top + rect.height) > document.body.clientHeight);
    };
    PositioningService.prototype._getHtmlElement = function (element) {
        if (typeof element === 'string') {
            return (document.querySelector(element));
        }
        if (element instanceof core.ElementRef) {
            return element.nativeElement;
        }
        return (element);
    };
    return PositioningService;
}());
PositioningService.decorators = [
    { type: core.Injectable },
];
var PositioningOptions = /** @class */ (function () {
    function PositioningOptions() {
    }
    return PositioningOptions;
}());
var DatepickerComponent = /** @class */ (function () {
    function DatepickerComponent(hostElement, positioningService) {
        this.hostElement = hostElement;
        this.positioningService = positioningService;
        this.onDateSelected = new core.EventEmitter();
        this.days = new Array();
        this.week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.cellCount = 41;
    }
    DatepickerComponent.prototype.renderCalendar = function () {
        for (var i = 0; i <= this.cellCount; i++) {
            var date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth());
            var dayOffset = date.getDay() === 0 ? 7 : date.getDay();
            this.days[i] = new Date(date.setDate(2 - dayOffset + i));
        }
    };
    DatepickerComponent.prototype.positionCalendar = function () {
        var rect = this.hostElement.nativeElement.getBoundingClientRect();
        var buffer = 10;
        if (this.positioningService.isElementBelowTheFold(this.hostElement.nativeElement)) {
            this.hostElement.nativeElement.style.top = (rect.top - (rect.top + rect.height + buffer)) + 'px';
        }
    };
    DatepickerComponent.prototype.previousMonth = function () {
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1);
        this.renderCalendar();
    };
    DatepickerComponent.prototype.nextMonth = function () {
        this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1);
        this.renderCalendar();
    };
    DatepickerComponent.prototype.isCurrentMonth = function (inputDate) {
        return inputDate.getMonth() === this.viewDate.getMonth();
    };
    DatepickerComponent.prototype.isCurrentDay = function (inputDate) {
        return inputDate.getTime() === this.presentDate.getTime();
    };
    DatepickerComponent.prototype.isSelectedDay = function (inputDate) {
        if (this.selectedDate) {
            return inputDate.getTime() === this.selectedDate.getTime();
        }
        return false;
    };
    DatepickerComponent.prototype.setSelectedDate = function (date) {
        this.selectedDate = date;
        this.onDateSelected.emit(date);
    };
    DatepickerComponent.prototype.ngOnChanges = function (changes) {
        if (!!changes["selectedDate"].currentValue) {
            this.viewDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth());
        }
    };
    DatepickerComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        this.viewDate = this.viewDate || new Date(date.getFullYear(), date.getMonth());
        this.renderCalendar();
        this.positionCalendar();
    };
    return DatepickerComponent;
}());
DatepickerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hxa-datepicker',
                template: "<div class=\"hxui-reset\">\n  <div class=\"hx-card hxa-datepicker-container\">\n    <div class=\"hx-card-header hxa-datepicker-header\">\n      <div class=\"hxa-datepicker-month\">\n        <div class=\"hxa-datepicker-icon\" title=\"Previous Month\" (click)=\"previousMonth()\">\n            <a class=\"hx-button is-transparent\"><i class=\"hx-icon icon-angle-left\"></i></a>\n        </div>\n        <div class=\"hxa-datepicker-month-title\">\n          <span>{{viewDate.toLocaleString(\"en-au\", { month: \"long\", year: \"numeric\" })}}</span></div>\n        <div class=\"hxa-datepicker-icon\" title=\"Next Month\" (click)=\"nextMonth()\">\n            <a class=\"hx-button is-transparent\"><i class=\"hx-icon icon-angle-right\"></i></a>\n        </div>\n      </div>\n      <div class=\"hxa-datepicker-week\">\n        <div class=\"hxa-datepicker-weekday\" *ngFor=\"let weekday of week\">\n          {{weekday | slice:0:3}}\n        </div>\n      </div>\n    </div>\n    <div class=\"hxa-datepicker-contents\">\n      <div class=\"hxa-datepicker-day\" *ngFor=\"let day of days\"\n      [ngClass]=\"{'hxa-datepicker-day-siblingmonth': !isCurrentMonth(day),\n      'hxa-datepicker-day-currentday': isCurrentDay(day),\n      'hxa-datepicker-day-selectedday': isSelectedDay(day)}\"\n      (click)=\"setSelectedDate(day)\">\n      <a class=\"hx-button is-transparent\">{{day.getDate()}}</a>\n      </div>\n    </div>\n  </div>\n</div>",
                styles: [".hxa-datepicker-container{max-width:21em;width:21em;height:24em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;font-size:1rem}.hxa-datepicker-header{padding:1rem 1rem 0;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:initial;-ms-flex-align:initial;align-items:initial;-ms-flex-pack:distribute;justify-content:space-around;font-weight:100}.hxa-datepicker-icon{cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.hxa-datepicker-icon .hx-button{position:initial!important;top:initial!important}.hxa-datepicker-icon .hx-button.is-transparent:hover{color:#000}.hxa-datepicker-icon .hx-icon{font-size:2.3em;position:initial!important;top:initial!important}.hxa-datepicker-month{display:-webkit-box;display:-ms-flexbox;display:flex;text-align:center;margin-bottom:1rem}.hxa-datepicker-month-title{font-size:1.5em;-webkit-box-flex:3;-ms-flex:3;flex:3;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.hxa-datepicker-week{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;text-align:center}.hxa-datepicker-weekday{-webkit-box-flex:1;-ms-flex:1;flex:1}.hxa-datepicker-contents{padding:1rem;background-color:rgba(246,246,249,.5);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-flex:1;-ms-flex:1;flex:1;-ms-flex-pack:distribute;justify-content:space-around;-ms-flex-line-pack:distribute;align-content:space-around}.hxa-datepicker-day{-webkit-box-flex:1;-ms-flex:1 1 14%;flex:1 1 14%;height:16.666%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.hxa-datepicker-day .hx-button{position:initial;top:initial;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:100;height:100%;padding:0}.hxa-datepicker-day-siblingmonth .hx-button{color:rgba(0,0,0,.3)}.hxa-datepicker-day-selectedday .hx-button{color:#fff;background:#41b987}.hxa-datepicker-day-currentday .hx-button{border:2px solid #41b987}"]
            },] },
];
DatepickerComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: PositioningService, },
]; };
DatepickerComponent.propDecorators = {
    "onDateSelected": [{ type: core.Output },],
    "selectedDate": [{ type: core.Input },],
};
var DateValueAccessor = /** @class */ (function () {
    function DateValueAccessor() {
        this.onChanged = new Array();
        this.onTouched = new Array();
    }
    DateValueAccessor.prototype.writeValue = function (value) {
        if (value === null || value instanceof Date) {
            this.setDate(value);
        }
    };
    DateValueAccessor.prototype.registerOnChange = function (fn) {
        this.onChanged.push(fn);
    };
    DateValueAccessor.prototype.registerOnTouched = function (fn) {
        this.onTouched.push(fn);
    };
    DateValueAccessor.prototype.propogateTouched = function () {
        this.onTouched.forEach(function (fn) { return fn(); });
    };
    DateValueAccessor.prototype.propogateChange = function (value) {
        this.onChanged.forEach(function (fn) { return fn(value); });
    };
    return DateValueAccessor;
}());
var DatepickerFormComponent = /** @class */ (function (_super) {
    __extends(DatepickerFormComponent, _super);
    function DatepickerFormComponent(element) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.onDateChange = new core.EventEmitter();
        _this.disabled = false;
        _this.readonly = false;
        _this.required = true;
        _this.allowTextEntry = true;
        _this.defaultToPresentDate = true;
        _this.allowPreviousDates = true;
        _this.dateFormat = "dd/MM/y";
        _this.placeholder = "Date";
        _this.align = "bottom";
        _this.visible = false;
        _this.isValid = true;
        _this.hasInitialised = false;
        _this.validators = new Array();
        return _this;
    }
    DatepickerFormComponent.prototype.setDate = function (date) {
        this.date = date;
        this.onDateChange.emit(date);
        this.propogateChange(date);
        this.isValid = true;
    };
    DatepickerFormComponent.prototype.setVisible = function () {
        this.visible = true;
    };
    DatepickerFormComponent.prototype.unsetVisible = function () {
        this.visible = false;
    };
    DatepickerFormComponent.prototype.onClickOutsideComponent = function (targetElement) {
        if (!this.element.nativeElement.firstChild.contains(targetElement)) {
            this.unsetVisible();
        }
    };
    DatepickerFormComponent.prototype.onDateSelectEvent = function (inputDate) {
        this.unsetVisible();
        this.setDate(inputDate);
    };
    DatepickerFormComponent.prototype.onChange = function (inputDate) {
        var date = this.parseDate(inputDate);
        var isValid = this.validate(date);
        if (inputDate === "") {
            this.setDate(null);
        }
        else if (isValid) {
            this.setDate(date);
        }
        else {
            this.isValid = false;
        }
    };
    DatepickerFormComponent.prototype.onFocus = function () {
        this.setVisible();
        this.propogateTouched();
    };
    DatepickerFormComponent.prototype.onTab = function (inputDate) {
        this.onChange(inputDate);
        this.unsetVisible();
        this.propogateTouched();
    };
    DatepickerFormComponent.prototype.parseDate = function (inputDate) {
        var dateArray = inputDate.split(/[.,\/ -]/);
        if (dateArray.length == 3 && dateArray[2].length != 0) {
            var day = dateArray.shift();
            dateArray.splice(1, 0, day);
            var parseInput = Date.parse(dateArray.join("/"));
            if (!isNaN(parseInput)) {
                return new Date(parseInput);
            }
        }
        return null;
    };
    DatepickerFormComponent.prototype.validate = function (date) {
        var isValid = true;
        this.validators.forEach(function (validator) {
            isValid = isValid && validator(date);
        });
        return isValid;
    };
    DatepickerFormComponent.prototype.registerValidator = function (fn) {
        this.validators.push(fn);
    };
    DatepickerFormComponent.prototype.validateIsNotBeforeDate = function (presentDate) {
        return function (date) {
            return date.getTime() >= presentDate.getTime();
        };
    };
    DatepickerFormComponent.prototype.validateIsNotNullOrUndefined = function (date) {
        return !!date;
    };
    DatepickerFormComponent.prototype.ngDoCheck = function () {
        if (this.defaultToPresentDate && !this.hasInitialised && this.date === null) {
            this.setDate(this.presentDate);
            this.hasInitialised = true;
        }
    };
    DatepickerFormComponent.prototype.ngOnInit = function () {
        var date = new Date();
        this.presentDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        if (!this.allowPreviousDates) {
            this.registerValidator(this.validateIsNotBeforeDate(this.presentDate));
        }
        this.registerValidator(this.validateIsNotNullOrUndefined);
    };
    return DatepickerFormComponent;
}(DateValueAccessor));
DatepickerFormComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hxa-datepicker-input, hxa-datepicker-form',
                template: "<div class=\"hx-input-group hxa-datepicker-form\">\n  <div class=\"hx-input-control\" [ngClass]=\"{'is-danger': !isValid}\">\n    <input class=\"hx-input\" type=\"text\" #datePickerForm\n    [required]=\"required ? true : null\"\n    [value]=\"date | date:dateFormat\"\n    (change)=\"onChange(datePickerForm.value)\"\n    (focus)=\"onFocus()\"\n    (keydown.Tab)=\"onTab(datePickerForm.value)\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly ? true : null\">\n    <label class=\"hx-label\">{{placeholder}} <sup *ngIf=\"required\">*</sup></label>\n    <div class=\"hx-help\"></div>\n    <div class=\"hxa-datepicker-help\">Please select a date</div>\n  </div>\n  <i class=\"hx-icon icon-calendar\"></i>\n  <hxa-datepicker class=\"hxa-datepicker-calendar\" *ngIf=\"visible\" [selectedDate]=\"date\"\n   (onDateSelected)=\"onDateSelectEvent($event)\"\n   [ngClass]=\"{'hxa-datepicker-calendar-top': align == 'top', 'hxa-datepicker-calendar-bottom': align == 'bottom'}\"></hxa-datepicker>\n</div>",
                styles: [".hxa-datepicker-form{position:relative;max-width:21rem}.hxa-datepicker-calendar{position:absolute;z-index:99;left:0}.hxa-datepicker-calendar-top{bottom:100%}.hxa-datepicker-calendar-bottom{top:70%}.hxa-datepicker-help{font-size:.75rem;margin-top:.25rem;color:#63605f}.hxa-datepicker-form input[readonly]~.hx-label{top:-.5rem;font-size:.75rem;color:#41b987}"],
                providers: [{
                        provide: forms.NG_VALUE_ACCESSOR,
                        useExisting: core.forwardRef(function () { return DatepickerFormComponent; }),
                        multi: true
                    }]
            },] },
];
DatepickerFormComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
DatepickerFormComponent.propDecorators = {
    "onDateChange": [{ type: core.Output },],
    "disabled": [{ type: core.Input },],
    "readonly": [{ type: core.Input },],
    "required": [{ type: core.Input },],
    "allowTextEntry": [{ type: core.Input },],
    "defaultToPresentDate": [{ type: core.Input },],
    "allowPreviousDates": [{ type: core.Input },],
    "dateFormat": [{ type: core.Input },],
    "placeholder": [{ type: core.Input },],
    "align": [{ type: core.Input },],
    "onClickOutsideComponent": [{ type: core.HostListener, args: ['document:click', ['$event.target'],] },],
};
var DatepickerModule = /** @class */ (function () {
    function DatepickerModule() {
    }
    DatepickerModule.forRoot = function () {
        return { ngModule: DatepickerModule, providers: [] };
    };
    return DatepickerModule;
}());
DatepickerModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule, forms.FormsModule],
                declarations: [DatepickerComponent, DatepickerFormComponent],
                exports: [DatepickerComponent, DatepickerFormComponent]
            },] },
];
var DropdownState = /** @class */ (function () {
    function DropdownState() {
        var _this = this;
        this.direction = 'down';
        this.isOpenChange = new core.EventEmitter();
        this.isDisabledChange = new core.EventEmitter();
        this.toggleClick = new core.EventEmitter();
        this.dropdownMenu = new Promise(function (resolve) {
            _this.resolveDropdownMenu = resolve;
        });
        this.isOpenChange.subscribe(function (value) {
            _this.isOpen = value;
        });
    }
    return DropdownState;
}());
DropdownState.decorators = [
    { type: core.Injectable },
];
DropdownState.ctorParameters = function () { return []; };
var DropdownContainerComponent = /** @class */ (function () {
    function DropdownContainerComponent(_state) {
        var _this = this;
        this._state = _state;
        this.isOpen = false;
        this._subscription = _state.isOpenChange.subscribe(function (value) {
            _this.isOpen = value;
        });
    }
    Object.defineProperty(DropdownContainerComponent.prototype, "direction", {
        get: function () {
            return this._state.direction;
        },
        enumerable: true,
        configurable: true
    });
    DropdownContainerComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    return DropdownContainerComponent;
}());
DropdownContainerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hx-dropdown-container',
                host: {
                    style: 'display:block;position: absolute;'
                },
                template: "\n    <div [class.is-dropup]=\"direction === 'up'\"\n         [class.is-dropdown]=\"direction === 'down'\"\n         [class.is-open]=\"isOpen\"><ng-content></ng-content></div>\n  "
            },] },
];
DropdownContainerComponent.ctorParameters = function () { return [
    { type: DropdownState, },
]; };
var DropdownMenuDirective = /** @class */ (function () {
    function DropdownMenuDirective(_state, _viewContainer, _templateRef) {
        _state.resolveDropdownMenu({
            templateRef: _templateRef,
            viewContainer: _viewContainer
        });
    }
    return DropdownMenuDirective;
}());
DropdownMenuDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[hxDropdownMenu],[dropdownMenu]',
                exportAs: 'hx-dropdown-menu'
            },] },
];
DropdownMenuDirective.ctorParameters = function () { return [
    { type: DropdownState, },
    { type: core.ViewContainerRef, },
    { type: core.TemplateRef, },
]; };
var DropdownToggleDirective = /** @class */ (function () {
    function DropdownToggleDirective(_state, _element, _renderer) {
        var _this = this;
        this._state = _state;
        this._element = _element;
        this._renderer = _renderer;
        this._subscriptions = [];
        this._subscriptions.push(this._state
            .isOpenChange.subscribe(function (value) { return _this.isOpen = value; }));
        this._subscriptions.push(this._state
            .isDisabledChange
            .subscribe(function (value) { return _this.isDisabled = value || false; }));
    }
    DropdownToggleDirective.prototype.onClick = function (event) {
        var _this = this;
        event.stopPropagation();
        if (this.isDisabled) {
            return;
        }
        if (!this._state.isOpen) {
            this._state.toggleClick.emit();
        }
        if (this._state.isOpen || this._element.nativeElement.contains(event.target)) {
            var removeRegisteredListener_1 = this._renderer.listen('document', 'click', function () {
                _this._state.toggleClick.emit(false);
                removeRegisteredListener_1();
            });
        }
    };
    DropdownToggleDirective.prototype.onEsc = function () {
        if (this._state.autoClose) {
            this._state.toggleClick.emit(false);
        }
    };
    DropdownToggleDirective.prototype.ngOnDestroy = function () {
        try {
            for (var _a = __values(this._subscriptions), _b = _a.next(); !_b.done; _b = _a.next()) {
                var sub = _b.value;
                sub.unsubscribe();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_1) throw e_1.error; }
        }
        var e_1, _c;
    };
    return DropdownToggleDirective;
}());
DropdownToggleDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[hxDropdownToggle],[dropdownToggle]',
                exportAs: 'hx-dropdown-toggle'
            },] },
];
DropdownToggleDirective.ctorParameters = function () { return [
    { type: DropdownState, },
    { type: core.ElementRef, },
    { type: core.Renderer2, },
]; };
DropdownToggleDirective.propDecorators = {
    "isDisabled": [{ type: core.HostBinding, args: ['attr.disabled',] },],
    "isOpen": [{ type: core.HostBinding, args: ['class.is-active',] }, { type: core.HostBinding, args: ['attr.aria-expanded',] },],
    "onClick": [{ type: core.HostListener, args: ['click', ['$event'],] },],
    "onEsc": [{ type: core.HostListener, args: ['keyup.esc',] },],
};
var DropdownConfig = /** @class */ (function () {
    function DropdownConfig() {
        this.autoClose = true;
    }
    return DropdownConfig;
}());
DropdownConfig.decorators = [
    { type: core.Injectable },
];
var ContentRef = /** @class */ (function () {
    function ContentRef(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
    return ContentRef;
}());
var Trigger = /** @class */ (function () {
    function Trigger(open, close) {
        this.open = open;
        this.close = close || open;
    }
    Trigger.prototype.isManual = function () { return this.open === 'manual' || this.close === 'manual'; };
    return Trigger;
}());
var DEFAULT_ALIASES = {
    hover: ['mouseenter', 'mouseleave'],
    focus: ['focusin', 'focusout']
};
function parseTriggers(triggers, aliases) {
    if (aliases === void 0) { aliases = DEFAULT_ALIASES; }
    var trimmedTriggers = (triggers || '').trim();
    if (trimmedTriggers.length === 0) {
        return [];
    }
    var parsedTriggers = trimmedTriggers.split(/\s+/)
        .map(function (trigger) { return trigger.split(':'); })
        .map(function (triggerPair) {
        var alias = aliases[triggerPair[0]] || triggerPair;
        return new Trigger(alias[0], alias[1]);
    });
    var manualTriggers = parsedTriggers
        .filter(function (triggerPair) { return triggerPair.isManual(); });
    if (manualTriggers.length > 1) {
        throw new Error('Triggers parse error: only one manual trigger is allowed');
    }
    if (manualTriggers.length === 1 && parsedTriggers.length > 1) {
        throw new Error('Triggers parse error: manual trigger can\'t be mixed with other triggers');
    }
    return parsedTriggers;
}
function listenToTriggers(renderer, target, triggers, showFn, hideFn, toggleFn) {
    var parsedTriggers = parseTriggers(triggers);
    var listeners = [];
    if (parsedTriggers.length === 1 && parsedTriggers[0].isManual()) {
        return Function.prototype;
    }
    parsedTriggers.forEach(function (trigger) {
        if (trigger.open === trigger.close) {
            listeners.push(renderer.listen(target, trigger.open, toggleFn));
            return;
        }
        listeners.push(renderer.listen(target, (trigger.open), showFn), renderer.listen(target, (trigger.close), hideFn));
    });
    return function () { listeners.forEach(function (unsubscribeFn) { return (unsubscribeFn()); }); };
}
var ComponentLoader = /** @class */ (function () {
    function ComponentLoader(_viewContainerRef, _renderer, _elementRef, _injector, _componentFactoryResolver, _ngZone, _posService) {
        this.onBeforeShow = new core.EventEmitter();
        this.onShown = new core.EventEmitter();
        this.onBeforeHide = new core.EventEmitter();
        this.onHidden = new core.EventEmitter();
        this._providers = [];
        this._ngZone = _ngZone;
        this._injector = _injector;
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._posService = _posService;
        this._viewContainerRef = _viewContainerRef;
        this._componentFactoryResolver = _componentFactoryResolver;
    }
    Object.defineProperty(ComponentLoader.prototype, "isShown", {
        get: function () {
            return !!this._componentRef;
        },
        enumerable: true,
        configurable: true
    });
    ComponentLoader.prototype.attach = function (compType) {
        this._componentFactory = this._componentFactoryResolver
            .resolveComponentFactory(compType);
        return this;
    };
    ComponentLoader.prototype.to = function (container) {
        this.container = container || this.container;
        return this;
    };
    ComponentLoader.prototype.position = function (opts) {
        this.attachment = opts.attachment || this.attachment;
        this._elementRef = (opts.target) || this._elementRef;
        return this;
    };
    ComponentLoader.prototype.provide = function (provider) {
        this._providers.push(provider);
        return this;
    };
    ComponentLoader.prototype.show = function (opts) {
        if (opts === void 0) { opts = {}; }
        this._subscribePositioning();
        if (!this._componentRef) {
            this.onBeforeShow.emit();
            this._contentRef = this._getContentRef(opts.content);
            var injector = core.ReflectiveInjector.resolveAndCreate(this._providers, this._injector);
            this._componentRef = this._viewContainerRef
                .createComponent(this._componentFactory, 0, injector, this._contentRef.nodes);
            this.instance = this._componentRef.instance;
            Object.assign(this._componentRef.instance, opts);
            if (this.container === 'body' && typeof document !== 'undefined') {
                document.querySelector((this.container))
                    .appendChild(this._componentRef.location.nativeElement);
            }
            this._componentRef.changeDetectorRef.markForCheck();
            this.onShown.emit(this._componentRef.instance);
        }
        return this._componentRef;
    };
    ComponentLoader.prototype.hide = function () {
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
    };
    ComponentLoader.prototype.toggle = function () {
        if (this.isShown) {
            this.hide();
            return;
        }
        this.show();
    };
    ComponentLoader.prototype.dispose = function () {
        if (this.isShown) {
            this.hide();
        }
        this._unsubscribePositioning();
        if (this._unregisterListenersFn) {
            this._unregisterListenersFn();
        }
    };
    ComponentLoader.prototype.listen = function (listenOpts) {
        var _this = this;
        this.triggers = listenOpts.triggers || this.triggers;
        listenOpts.target = listenOpts.target || this._elementRef;
        listenOpts.show = listenOpts.show || (function () { return _this.show(); });
        listenOpts.hide = listenOpts.hide || (function () { return _this.hide(); });
        listenOpts.toggle = listenOpts.toggle || (function () { return _this.isShown
            ? listenOpts.hide()
            : listenOpts.show(); });
        this._unregisterListenersFn = listenToTriggers(this._renderer, listenOpts.target.nativeElement, this.triggers, listenOpts.show, listenOpts.hide, listenOpts.toggle);
        return this;
    };
    ComponentLoader.prototype._subscribePositioning = function () {
        var _this = this;
        if (this._zoneSubscription || !this.attachment) {
            return;
        }
        this._zoneSubscription = this._ngZone
            .onStable.subscribe(function () {
            if (!_this._componentRef) {
                return;
            }
            _this._posService.position({
                element: _this._componentRef.location,
                target: _this._elementRef,
                attachment: _this.attachment,
                appendToBody: _this.container === 'body'
            });
        });
    };
    ComponentLoader.prototype._unsubscribePositioning = function () {
        if (!this._zoneSubscription) {
            return;
        }
        this._zoneSubscription.unsubscribe();
        this._zoneSubscription = null;
    };
    ComponentLoader.prototype._getContentRef = function (content) {
        if (!content) {
            return new ContentRef([]);
        }
        if (content instanceof core.TemplateRef) {
            var viewRef = this._viewContainerRef
                .createEmbeddedView(content);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        return new ContentRef([[this._renderer.createText(null, "" + content)]]);
    };
    return ComponentLoader;
}());
var ComponentLoaderFactory = /** @class */ (function () {
    function ComponentLoaderFactory(componentFactoryResolver, ngZone, injector, posService) {
        this._ngZone = ngZone;
        this._injector = injector;
        this._posService = posService;
        this._componentFactoryResolver = componentFactoryResolver;
    }
    ComponentLoaderFactory.prototype.createLoader = function (_elementRef, _viewContainerRef, _renderer) {
        return new ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._posService);
    };
    return ComponentLoaderFactory;
}());
ComponentLoaderFactory.decorators = [
    { type: core.Injectable },
];
ComponentLoaderFactory.ctorParameters = function () { return [
    { type: core.ComponentFactoryResolver, },
    { type: core.NgZone, },
    { type: core.Injector, },
    { type: PositioningService, },
]; };
var DropdownDirective = /** @class */ (function () {
    function DropdownDirective(_elementRef, _renderer, _viewContainerRef, _cis, _config, _state) {
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
        this._dropdown = this._cis
            .createLoader(this._elementRef, this._viewContainerRef, this._renderer)
            .provide({ provide: DropdownState, useValue: this._state });
        this.onShown = this._dropdown.onShown;
        this.onHidden = this._dropdown.onHidden;
        this.isOpenChange = this._state.isOpenChange;
        this._state.autoClose = this._config.autoClose;
    }
    Object.defineProperty(DropdownDirective.prototype, "autoClose", {
        get: function () {
            return this._state.autoClose;
        },
        set: function (value) {
            if (typeof value === 'boolean') {
                this._state.autoClose = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownDirective.prototype, "isDisabled", {
        get: function () { return this._isDisabled; },
        set: function (value) {
            this._isDisabled = value;
            this._state.isDisabledChange.emit(value);
            if (value) {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownDirective.prototype, "isRight", {
        get: function () {
            return this._isInlineRight;
        },
        set: function (value) {
            this._isInlineRight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownDirective.prototype, "isOpen", {
        get: function () {
            if (this._showInline) {
                return this._isInlineOpen;
            }
            return this._dropdown.isShown;
        },
        set: function (value) {
            if (value) {
                this.show();
            }
            else {
                this.hide();
            }
        },
        enumerable: true,
        configurable: true
    });
    DropdownDirective.prototype.ngOnInit = function () {
        var _this = this;
        if (this._isInited) {
            return;
        }
        this._isInited = true;
        this._showInline = !this.container;
        this._dropdown.listen({
            triggers: this.triggers,
            show: function () { return _this.show(); }
        });
        this._subscriptions.push(this._state
            .toggleClick.subscribe(function (value) { return _this.toggle(value); }));
        this._subscriptions.push(this._state
            .isDisabledChange.pipe(operators.filter(function (value) { return value === true; })).subscribe(function (value) { return _this.hide(); }));
        if (this._showInline) {
            this._state.dropdownMenu
                .then(function (dropdownMenu) {
                _this._inlinedMenu = dropdownMenu.viewContainer.createEmbeddedView(dropdownMenu.templateRef);
            });
        }
    };
    DropdownDirective.prototype.show = function () {
        var _this = this;
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
            .then(function (dropdownMenu) {
            var _dropup = _this.dropup === true ||
                (typeof _this.dropup !== 'undefined' && _this.dropup !== false);
            _this._state.direction = _dropup ? 'up' : 'down';
            var _placement = _this.placement ||
                (_dropup ? 'top left' : 'bottom left');
            _this._dropdown
                .attach(DropdownContainerComponent)
                .to(_this.container)
                .position({ attachment: _placement })
                .show({
                content: dropdownMenu.templateRef,
                placement: _placement
            });
            _this._state.isOpenChange.emit(true);
        });
    };
    DropdownDirective.prototype.hide = function () {
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
    };
    DropdownDirective.prototype.toggle = function (value) {
        if (this.isOpen || value === false) {
            return this.hide();
        }
        return this.show();
    };
    DropdownDirective.prototype.ngOnDestroy = function () {
        try {
            for (var _a = __values(this._subscriptions), _b = _a.next(); !_b.done; _b = _a.next()) {
                var sub = _b.value;
                sub.unsubscribe();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this._dropdown.dispose();
        var e_2, _c;
    };
    return DropdownDirective;
}());
DropdownDirective.decorators = [
    { type: core.Directive, args: [{
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
DropdownDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.Renderer, },
    { type: core.ViewContainerRef, },
    { type: ComponentLoaderFactory, },
    { type: DropdownConfig, },
    { type: DropdownState, },
]; };
DropdownDirective.propDecorators = {
    "placement": [{ type: core.Input },],
    "triggers": [{ type: core.Input },],
    "container": [{ type: core.Input },],
    "dropup": [{ type: core.Input },],
    "autoClose": [{ type: core.Input },],
    "isDisabled": [{ type: core.Input },],
    "isRight": [{ type: core.Input },],
    "isOpen": [{ type: core.Input },],
    "isOpenChange": [{ type: core.Output },],
    "onShown": [{ type: core.Output },],
    "onHidden": [{ type: core.Output },],
};
var DropdownModule = /** @class */ (function () {
    function DropdownModule() {
    }
    DropdownModule.forRoot = function (config) {
        return {
            ngModule: DropdownModule, providers: [
                PositioningService,
                DropdownState,
                { provide: DropdownConfig, useValue: config ? config : { autoClose: true } }
            ]
        };
    };
    return DropdownModule;
}());
DropdownModule.decorators = [
    { type: core.NgModule, args: [{
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
var ModalContainer = /** @class */ (function () {
    function ModalContainer() {
    }
    ModalContainer.prototype.close = function () {
        this.destroy();
    };
    return ModalContainer;
}());
function Modal() {
    return function (target) {
        Object.assign(target.prototype, ModalContainer.prototype);
    };
}
exports.ModalBackdropComponent = /** @class */ (function () {
    function ModalBackdropComponent() {
    }
    ModalBackdropComponent.prototype.dismiss = function () {
        this.close();
        this.destroy();
    };
    return ModalBackdropComponent;
}());
exports.ModalBackdropComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hx-modal-backdrop',
                template: "<div class=\"hx-modal-backdrop fade in\" (click)=\"dismiss()\"></div>"
            },] },
];
exports.ModalBackdropComponent = __decorate([
    Modal()
], exports.ModalBackdropComponent);
var ModalService = /** @class */ (function () {
    function ModalService(componentFactoryResolver) {
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ModalService.prototype.registerViewContainerRef = function (vcRef) {
        this.vcRef = vcRef;
    };
    ModalService.prototype.registerInjector = function (injector) {
        this.injector = injector;
    };
    ModalService.prototype.create = function (component, parameters) {
        this.backdropRef = this.dynamicComponentLoader(exports.ModalBackdropComponent);
        return this.dynamicComponentLoader(component, parameters);
    };
    ModalService.prototype.dynamicComponentLoader = function (component, parameters) {
        var _this = this;
        var factory = this.componentFactoryResolver.resolveComponentFactory(component);
        var childInjector = core.ReflectiveInjector.resolveAndCreate([], this.injector);
        var componentRef = this.vcRef.createComponent(factory, 0, childInjector);
        Object.assign(componentRef.instance, parameters);
        componentRef.instance['destroy'] = function () {
            _this.backdropRef.destroy();
            componentRef.destroy();
        };
        return componentRef;
    };
    return ModalService;
}());
ModalService.decorators = [
    { type: core.Injectable },
];
ModalService.ctorParameters = function () { return [
    { type: core.ComponentFactoryResolver, },
]; };
var ModalPlaceholderComponent = /** @class */ (function () {
    function ModalPlaceholderComponent(modalService, injector) {
        this.modalService = modalService;
        this.injector = injector;
    }
    ModalPlaceholderComponent.prototype.ngOnInit = function () {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    };
    return ModalPlaceholderComponent;
}());
ModalPlaceholderComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hx-modal-placeholder',
                template: "<div #modalPlaceholder></div>"
            },] },
];
ModalPlaceholderComponent.ctorParameters = function () { return [
    { type: ModalService, },
    { type: core.Injector, },
]; };
ModalPlaceholderComponent.propDecorators = {
    "viewContainerRef": [{ type: core.ViewChild, args: ['modalPlaceholder', { read: core.ViewContainerRef },] },],
};
var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule.forRoot = function () {
        return {
            ngModule: ModalModule,
            providers: [ModalService]
        };
    };
    return ModalModule;
}());
ModalModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [ModalPlaceholderComponent, exports.ModalBackdropComponent],
                exports: [ModalPlaceholderComponent],
                entryComponents: [exports.ModalBackdropComponent]
            },] },
];
var PaginationConfig = /** @class */ (function () {
    function PaginationConfig() {
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
    return PaginationConfig;
}());
PaginationConfig.decorators = [
    { type: core.Injectable },
];
var PAGER_CONTROL_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return PagerComponent; }),
    multi: true
};
var PAGER_TEMPLATE = "\n    <ul class=\"hx-flex hx-flex-justify-between\">\n      <li [class.is-disabled]=\"noPrevious()\" [class.is-previous]=\"align\" class=\"{{ pageBtnClass }}\">\n        <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n      <li [class.is-disabled]=\"noNext()\" [class.is-next]=\"align\" class=\"{{ pageBtnClass }}\">\n        <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a>\n      </li>\n  </ul>\n";
var PagerComponent = /** @class */ (function () {
    function PagerComponent(renderer, elementRef, paginationConfig) {
        this.numPages = new core.EventEmitter();
        this.pageChanged = new core.EventEmitter();
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
    Object.defineProperty(PagerComponent.prototype, "itemsPerPage", {
        get: function () {
            return this._itemsPerPage;
        },
        set: function (v) {
            this._itemsPerPage = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "totalItems", {
        get: function () {
            return this._totalItems;
        },
        set: function (v) {
            this._totalItems = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "totalPages", {
        get: function () {
            return this._totalPages;
        },
        set: function (v) {
            this._totalPages = v;
            this.numPages.emit(v);
            if (this.inited) {
                this.selectPage(this.page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PagerComponent.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            var _previous = this._page;
            this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
            if (_previous === this._page || typeof _previous === 'undefined') {
                return;
            }
            this.pageChanged.emit({
                page: this._page,
                itemsPerPage: this.itemsPerPage
            });
        },
        enumerable: true,
        configurable: true
    });
    PagerComponent.prototype.configureOptions = function (config) {
        this.config = Object.assign({}, config);
    };
    PagerComponent.prototype.ngOnInit = function () {
        this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
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
        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined'
            ? this.itemsPerPage
            : this.config.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.inited = true;
    };
    PagerComponent.prototype.writeValue = function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    };
    PagerComponent.prototype.getText = function (key) {
        return ((this))[key + 'Text'] || this.config[key + 'Text'];
    };
    PagerComponent.prototype.noPrevious = function () {
        return this.page === 1;
    };
    PagerComponent.prototype.noNext = function () {
        return this.page === this.totalPages;
    };
    PagerComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    PagerComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    PagerComponent.prototype.selectPage = function (page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                var target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.onChange(this.page);
        }
    };
    PagerComponent.prototype.makePage = function (num, text, active) {
        return { text: text, number: num, active: active };
    };
    PagerComponent.prototype.getPages = function (currentPage, totalPages) {
        var pages = [];
        var startPage = 1;
        var endPage = totalPages;
        var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        if (isMaxSized) {
            if (this.rotate) {
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        for (var num = startPage; num <= endPage; num++) {
            var page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                var previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                var nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    };
    PagerComponent.prototype.calculateTotalPages = function () {
        var totalPages = this.itemsPerPage < 1
            ? 1
            : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    return PagerComponent;
}());
PagerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hx-pager',
                template: PAGER_TEMPLATE,
                providers: [PAGER_CONTROL_VALUE_ACCESSOR]
            },] },
];
PagerComponent.ctorParameters = function () { return [
    { type: core.Renderer, },
    { type: core.ElementRef, },
    { type: PaginationConfig, },
]; };
PagerComponent.propDecorators = {
    "align": [{ type: core.Input },],
    "maxSize": [{ type: core.Input },],
    "boundaryLinks": [{ type: core.Input },],
    "directionLinks": [{ type: core.Input },],
    "firstText": [{ type: core.Input },],
    "previousText": [{ type: core.Input },],
    "nextText": [{ type: core.Input },],
    "lastText": [{ type: core.Input },],
    "rotate": [{ type: core.Input },],
    "pageBtnClass": [{ type: core.Input },],
    "disabled": [{ type: core.Input },],
    "numPages": [{ type: core.Output },],
    "pageChanged": [{ type: core.Output },],
    "itemsPerPage": [{ type: core.Input },],
    "totalItems": [{ type: core.Input },],
};
var PAGINATION_CONTROL_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return PaginationComponent; }),
    multi: true
};
var PAGINATION_TEMPLATE = "\n  <ul class=\"hx-pagination\" [ngClass]=\"classMap\" [class.is-sticky]=\"sticky\">\n    <li class=\"is-first\"\n        *ngIf=\"boundaryLinks\"\n        [class.is-disabled]=\"noPrevious()||disabled\">\n      <a href (click)=\"selectPage(1, $event)\" [innerHTML]=\"getText('first')\"></a>\n    </li>\n    <li class=\"is-prev\"\n        *ngIf=\"directionLinks\"\n        [class.is-disabled]=\"noPrevious()||disabled\">\n      <a href (click)=\"selectPage(page - 1, $event)\" [innerHTML]=\"getText('previous')\"></a>\n      </li>\n    <li *ngFor=\"let pg of pages\"\n        [class.is-current]=\"pg.active\"\n        [class.is-disabled]=\"disabled&&!pg.active\">\n      <a href (click)=\"selectPage(pg.number, $event)\" [innerHTML]=\"pg.text\"></a>\n    </li>\n    <li class=\"is-next\"\n        *ngIf=\"directionLinks\"\n        [class.is-disabled]=\"noNext()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(page + 1, $event)\" [innerHTML]=\"getText('next')\"></a></li>\n    <li class=\"is-last\"\n        *ngIf=\"boundaryLinks\"\n        [class.is-disabled]=\"noNext()||disabled\">\n      <a href (click)=\"selectPage(totalPages, $event)\" [innerHTML]=\"getText('last')\"></a></li>\n  </ul>\n  ";
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent(renderer, elementRef, paginationConfig) {
        this.numPages = new core.EventEmitter();
        this.pageChanged = new core.EventEmitter();
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
    Object.defineProperty(PaginationComponent.prototype, "itemsPerPage", {
        get: function () {
            return this._itemsPerPage;
        },
        set: function (v) {
            this._itemsPerPage = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalItems", {
        get: function () {
            return this._totalItems;
        },
        set: function (v) {
            this._totalItems = v;
            this.totalPages = this.calculateTotalPages();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "totalPages", {
        get: function () {
            return this._totalPages;
        },
        set: function (v) {
            this._totalPages = v;
            this.numPages.emit(v);
            if (this.inited) {
                this.selectPage(this.page);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PaginationComponent.prototype, "page", {
        get: function () {
            return this._page;
        },
        set: function (value) {
            var _previous = this._page;
            this._page = (value > this.totalPages) ? this.totalPages : (value || 1);
            if (_previous === this._page || typeof _previous === 'undefined') {
                return;
            }
            this.pageChanged.emit({
                page: this._page,
                itemsPerPage: this.itemsPerPage
            });
        },
        enumerable: true,
        configurable: true
    });
    PaginationComponent.prototype.configureOptions = function (config) {
        this.config = Object.assign({}, config);
    };
    PaginationComponent.prototype.ngOnInit = function () {
        this.classMap = this.elementRef.nativeElement.getAttribute('class') || '';
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
        this.itemsPerPage = typeof this.itemsPerPage !== 'undefined'
            ? this.itemsPerPage
            : this.config.itemsPerPage;
        this.totalPages = this.calculateTotalPages();
        this.pages = this.getPages(this.page, this.totalPages);
        this.inited = true;
    };
    PaginationComponent.prototype.writeValue = function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    };
    PaginationComponent.prototype.getText = function (key) {
        return ((this))[key + 'Text'] || this.config[key + 'Text'];
    };
    PaginationComponent.prototype.noPrevious = function () {
        return this.page === 1;
    };
    PaginationComponent.prototype.noNext = function () {
        return this.page === this.totalPages;
    };
    PaginationComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    PaginationComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    PaginationComponent.prototype.selectPage = function (page, event) {
        if (event) {
            event.preventDefault();
        }
        if (!this.disabled) {
            if (event && event.target) {
                var target = event.target;
                target.blur();
            }
            this.writeValue(page);
            this.onChange(this.page);
        }
    };
    PaginationComponent.prototype.makePage = function (num, text, active) {
        return { text: text, number: num, active: active };
    };
    PaginationComponent.prototype.getPages = function (currentPage, totalPages) {
        var pages = [];
        var startPage = 1;
        var endPage = totalPages;
        var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
        if (isMaxSized) {
            if (this.rotate) {
                startPage = Math.max(currentPage - Math.floor(this.maxSize / 2), 1);
                endPage = startPage + this.maxSize - 1;
                if (endPage > totalPages) {
                    endPage = totalPages;
                    startPage = endPage - this.maxSize + 1;
                }
            }
            else {
                startPage = ((Math.ceil(currentPage / this.maxSize) - 1) * this.maxSize) + 1;
                endPage = Math.min(startPage + this.maxSize - 1, totalPages);
            }
        }
        for (var num = startPage; num <= endPage; num++) {
            var page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        if (isMaxSized && !this.rotate) {
            if (startPage > 1) {
                var previousPageSet = this.makePage(startPage - 1, '...', false);
                pages.unshift(previousPageSet);
            }
            if (endPage < totalPages) {
                var nextPageSet = this.makePage(endPage + 1, '...', false);
                pages.push(nextPageSet);
            }
        }
        return pages;
    };
    PaginationComponent.prototype.calculateTotalPages = function () {
        var totalPages = this.itemsPerPage < 1
            ? 1
            : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    return PaginationComponent;
}());
PaginationComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hx-pagination',
                template: PAGINATION_TEMPLATE,
                providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
            },] },
];
PaginationComponent.ctorParameters = function () { return [
    { type: core.Renderer, },
    { type: core.ElementRef, },
    { type: PaginationConfig, },
]; };
PaginationComponent.propDecorators = {
    "align": [{ type: core.Input },],
    "maxSize": [{ type: core.Input },],
    "boundaryLinks": [{ type: core.Input },],
    "directionLinks": [{ type: core.Input },],
    "firstText": [{ type: core.Input },],
    "previousText": [{ type: core.Input },],
    "nextText": [{ type: core.Input },],
    "lastText": [{ type: core.Input },],
    "rotate": [{ type: core.Input },],
    "sticky": [{ type: core.Input },],
    "pageBtnClass": [{ type: core.Input },],
    "disabled": [{ type: core.Input },],
    "numPages": [{ type: core.Output },],
    "pageChanged": [{ type: core.Output },],
    "itemsPerPage": [{ type: core.Input },],
    "totalItems": [{ type: core.Input },],
};
var PaginationModule = /** @class */ (function () {
    function PaginationModule() {
    }
    PaginationModule.forRoot = function () {
        return { ngModule: PaginationModule, providers: [PaginationConfig] };
    };
    return PaginationModule;
}());
PaginationModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [PagerComponent, PaginationComponent],
                exports: [PagerComponent, PaginationComponent]
            },] },
];
var NgTranscludeDirective = /** @class */ (function () {
    function NgTranscludeDirective(viewRef) {
        this.viewRef = viewRef;
    }
    Object.defineProperty(NgTranscludeDirective.prototype, "ngTransclude", {
        get: function () {
            return this._ngTransclude;
        },
        set: function (templateRef) {
            this._ngTransclude = templateRef;
            if (templateRef) {
                this.viewRef.createEmbeddedView(templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    return NgTranscludeDirective;
}());
NgTranscludeDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[ngTransclude]'
            },] },
];
NgTranscludeDirective.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
]; };
NgTranscludeDirective.propDecorators = {
    "ngTransclude": [{ type: core.Input },],
};
var TabsetConfig = /** @class */ (function () {
    function TabsetConfig() {
        this.type = 'tabs';
    }
    return TabsetConfig;
}());
TabsetConfig.decorators = [
    { type: core.Injectable },
];
var TabsetComponent = /** @class */ (function () {
    function TabsetComponent(config) {
        this.clazn = true;
        this.tabs = [];
        this.classMap = {};
        Object.assign(this, config);
    }
    Object.defineProperty(TabsetComponent.prototype, "vertical", {
        get: function () {
            return this._vertical;
        },
        set: function (value) {
            this._vertical = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsetComponent.prototype, "justified", {
        get: function () {
            return this._justified;
        },
        set: function (value) {
            this._justified = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsetComponent.prototype, "hasInfo", {
        get: function () {
            return this._hasInfo;
        },
        set: function (value) {
            this._hasInfo = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsetComponent.prototype, "type", {
        get: function () {
            return this._type;
        },
        set: function (value) {
            this._type = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    TabsetComponent.prototype.ngOnDestroy = function () {
        this.isDestroyed = true;
    };
    TabsetComponent.prototype.addTab = function (tab) {
        this.tabs.push(tab);
        tab.active = this.tabs.length === 1 && tab.active !== false;
    };
    TabsetComponent.prototype.removeTab = function (tab, options) {
        if (options === void 0) { options = { reselect: true, emit: true }; }
        var index = this.tabs.indexOf(tab);
        if (index === -1 || this.isDestroyed) {
            return;
        }
        if (options.reselect && tab.active && this.hasAvailableTabs(index)) {
            var newActiveIndex = this.getClosestTabIndex(index);
            this.tabs[newActiveIndex].active = true;
        }
        if (options.emit) {
            tab.removed.emit(tab);
        }
        this.tabs.splice(index, 1);
        if (tab.elementRef.nativeElement && tab.elementRef.nativeElement.remove) {
            tab.elementRef.nativeElement.remove();
        }
    };
    TabsetComponent.prototype.getClosestTabIndex = function (index) {
        var tabsLength = this.tabs.length;
        if (!tabsLength) {
            return -1;
        }
        for (var step = 1; step <= tabsLength; step += 1) {
            var prevIndex = index - step;
            var nextIndex = index + step;
            if (this.tabs[prevIndex] && !this.tabs[prevIndex].disabled) {
                return prevIndex;
            }
            if (this.tabs[nextIndex] && !this.tabs[nextIndex].disabled) {
                return nextIndex;
            }
        }
        return -1;
    };
    TabsetComponent.prototype.hasAvailableTabs = function (index) {
        var tabsLength = this.tabs.length;
        if (!tabsLength) {
            return false;
        }
        for (var i = 0; i < tabsLength; i += 1) {
            if (!this.tabs[i].disabled && i !== index) {
                return true;
            }
        }
        return false;
    };
    TabsetComponent.prototype.setClassMap = function () {
        this.classMap = (_a = {
                'is-vertical': this.vertical,
                'is-justified': this.justified,
                'has-info': this.hasInfo
            }, _a["hx-nav-" + this.type] = true, _a);
        var _a;
    };
    return TabsetComponent;
}());
TabsetComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hx-tabset',
                template: "\n    <ul class=\"hx-nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n        <li *ngFor=\"let tabz of tabs\" [ngClass]=\"['hx-nav-item', tabz.customClass || '']\"\n          [class.is-active]=\"tabz.active\" [class.is-disabled]=\"tabz.disabled\">\n          <a href=\"javascript:void(0);\" class=\"hx-nav-link\"\n            [class.is-active]=\"tabz.active\" [class.is-disabled]=\"tabz.disabled\"\n            (click)=\"tabz.active = true\">\n            <span [ngTransclude]=\"tabz.headingRef\">{{tabz.heading}}</span>\n            <span *ngIf=\"tabz.removable\">\n              <span (click)=\"$event.preventDefault(); removeTab(tabz);\" class=\"icon close-outline is-small\"></span>\n            </span>\n          </a>\n        </li>\n    </ul>\n    <div class=\"hx-tab-content\">\n      <ng-content></ng-content>\n    </div>\n  "
            },] },
];
TabsetComponent.ctorParameters = function () { return [
    { type: TabsetConfig, },
]; };
TabsetComponent.propDecorators = {
    "vertical": [{ type: core.Input },],
    "justified": [{ type: core.Input },],
    "hasInfo": [{ type: core.Input },],
    "type": [{ type: core.Input },],
    "clazn": [{ type: core.HostBinding, args: ['class.hx-tab-container',] },],
};
var TabDirective = /** @class */ (function () {
    function TabDirective(tabset, elementRef) {
        this.elementRef = elementRef;
        this.select = new core.EventEmitter();
        this.deselect = new core.EventEmitter();
        this.removed = new core.EventEmitter();
        this.addClasn = true;
        this.tabset = tabset;
        this.tabset.addTab(this);
    }
    Object.defineProperty(TabDirective.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (active) {
            var _this = this;
            if (this.disabled && active || !active) {
                if (!active) {
                    this._active = active;
                }
                this.deselect.emit(this);
                return;
            }
            this._active = active;
            this.select.emit(this);
            this.tabset.tabs.forEach(function (tab) {
                if (tab !== _this) {
                    tab.active = false;
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    TabDirective.prototype.ngOnInit = function () {
        this.removable = this.removable;
    };
    TabDirective.prototype.ngOnDestroy = function () {
        this.tabset.removeTab(this, { reselect: false, emit: false });
    };
    return TabDirective;
}());
TabDirective.decorators = [
    { type: core.Directive, args: [{ selector: 'hx-tab, [hx-tab]' },] },
];
TabDirective.ctorParameters = function () { return [
    { type: TabsetComponent, },
    { type: core.ElementRef, },
]; };
TabDirective.propDecorators = {
    "heading": [{ type: core.Input },],
    "id": [{ type: core.Input },],
    "disabled": [{ type: core.Input },],
    "removable": [{ type: core.Input },],
    "customClass": [{ type: core.Input },],
    "active": [{ type: core.HostBinding, args: ['class.is-active',] }, { type: core.Input },],
    "select": [{ type: core.Output },],
    "deselect": [{ type: core.Output },],
    "removed": [{ type: core.Output },],
    "addClasn": [{ type: core.HostBinding, args: ['class.hx-tab-pane',] },],
};
var TabHeadingDirective = /** @class */ (function () {
    function TabHeadingDirective(templateRef, tab) {
        tab.headingRef = templateRef;
    }
    return TabHeadingDirective;
}());
TabHeadingDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[hxTabHeading]' },] },
];
TabHeadingDirective.ctorParameters = function () { return [
    { type: core.TemplateRef, },
    { type: TabDirective, },
]; };
var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    TabsModule.forRoot = function () {
        return {
            ngModule: TabsModule,
            providers: [TabsetConfig]
        };
    };
    return TabsModule;
}());
TabsModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [NgTranscludeDirective, TabDirective, TabsetComponent, TabHeadingDirective],
                exports: [TabDirective, TabsetComponent, TabHeadingDirective, NgTranscludeDirective]
            },] },
];
var Context = {
    None: 0,
    Success: 1,
    Warning: 2,
    Danger: 3,
};
Context[Context.None] = "None";
Context[Context.Success] = "Success";
Context[Context.Warning] = "Warning";
Context[Context.Danger] = "Danger";
var TooltipContentComponent = /** @class */ (function () {
    function TooltipContentComponent(element, cdr) {
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
    TooltipContentComponent.prototype.ngAfterViewInit = function () {
        this.show();
        this.cdr.detectChanges();
    };
    TooltipContentComponent.prototype.show = function () {
        if (!this.hostElement) {
            return;
        }
        var p = this.positionElements(this.hostElement, this.element.nativeElement.children[0], this.placement);
        this.top = p.top;
        this.left = p.left;
        this.active = true;
    };
    TooltipContentComponent.prototype.hide = function () {
        this.top = -100000;
        this.left = -100000;
        this.active = true;
    };
    TooltipContentComponent.prototype.positionElements = function (hostEl, targetEl, positionStr, appendToBody) {
        if (appendToBody === void 0) { appendToBody = true; }
        var positionStrParts = positionStr.split('-');
        var pos0 = positionStrParts[0];
        var pos1 = positionStrParts[1] || 'center';
        var hostElPos = appendToBody
            ? this.offset(hostEl)
            : this.position(hostEl);
        var targetElWidth = targetEl.offsetWidth;
        var targetElHeight = targetEl.offsetHeight;
        var shiftWidth = {
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
        var shiftHeight = {
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
        var targetElPos;
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
    };
    TooltipContentComponent.prototype.position = function (nativeEl) {
        var offsetParentBCR = { top: 0, left: 0 };
        var elBCR = this.offset(nativeEl);
        var offsetParentEl = this.parentOffsetEl(nativeEl);
        if (offsetParentEl !== window.document) {
            offsetParentBCR = this.offset(offsetParentEl);
            offsetParentBCR.top +=
                offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left +=
                offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
        }
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: elBCR.top - offsetParentBCR.top,
            left: elBCR.left - offsetParentBCR.left
        };
    };
    TooltipContentComponent.prototype.offset = function (nativeEl) {
        var boundingClientRect = nativeEl.getBoundingClientRect();
        return {
            width: boundingClientRect.width || nativeEl.offsetWidth,
            height: boundingClientRect.height || nativeEl.offsetHeight,
            top: boundingClientRect.top +
                (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left +
                (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    };
    TooltipContentComponent.prototype.getStyle = function (nativeEl, cssProp) {
        if (((nativeEl)).currentStyle) {
            return ((nativeEl)).currentStyle[cssProp];
        }
        if (window.getComputedStyle) {
            return ((window.getComputedStyle(nativeEl)))[cssProp];
        }
        return ((nativeEl.style))[cssProp];
    };
    TooltipContentComponent.prototype.isStaticPositioned = function (nativeEl) {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    };
    TooltipContentComponent.prototype.parentOffsetEl = function (nativeEl) {
        var offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent &&
            offsetParent !== window.document &&
            this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    };
    return TooltipContentComponent;
}());
TooltipContentComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hx-tooltip-content',
                template: "\n        <div class=\"hx-tooltip is-{{ placement }}\"\n             [style.top]=\"top + 'px'\"\n             [style.left]=\"left + 'px'\"\n             [class.is-active]=\"active\"\n             [class.is-success]=\"context === contextEnum.Success\"\n             [class.is-warning]=\"context === contextEnum.Warning\"\n             [class.is-danger]=\"context === contextEnum.Danger\"\n             role=\"tooltip\">\n            <div class=\"hx-tooltip-content\">\n                <ng-content></ng-content>\n                {{ content }}\n            </div>\n        </div>\n"
            },] },
];
TooltipContentComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
    { type: core.ChangeDetectorRef, },
]; };
TooltipContentComponent.propDecorators = {
    "hostElement": [{ type: core.Input },],
    "content": [{ type: core.Input },],
    "placement": [{ type: core.Input },],
    "context": [{ type: core.Input },],
    "animation": [{ type: core.Input },],
};
var TooltipConfig = /** @class */ (function () {
    function TooltipConfig() {
        this.placement = 'bottom';
        this.context = Context.None;
        this.disabled = false;
        this.animation = true;
    }
    return TooltipConfig;
}());
TooltipConfig.decorators = [
    { type: core.Injectable },
];
var TooltipDirective = /** @class */ (function () {
    function TooltipDirective(viewContainerRef, resolver, config) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.config = config;
        this.animation = true;
        this.placement = 'bottom';
        this.context = Context.None;
        Object.assign(this, config);
    }
    TooltipDirective.prototype.show = function () {
        if (this.disabled || this.visible) {
            return;
        }
        this.visible = true;
        if (typeof this.content === 'string') {
            var factory = this.resolver.resolveComponentFactory(TooltipContentComponent);
            if (!this.visible) {
                return;
            }
            this.tooltip = this.viewContainerRef.createComponent(factory);
            this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.tooltip.instance.content = (this.content);
            this.tooltip.instance.placement = this.placement;
            this.tooltip.instance.context = this.context;
            this.tooltip.instance.animation = this.animation;
        }
        else {
            var tooltip = (this.content);
            tooltip.hostElement = this.viewContainerRef.element.nativeElement;
            tooltip.placement = this.placement;
            tooltip.context = this.context;
            tooltip.animation = this.animation;
            tooltip.show();
        }
    };
    TooltipDirective.prototype.hide = function () {
        if (!this.visible) {
            return;
        }
        this.visible = false;
        if (this.tooltip) {
            this.tooltip.destroy();
        }
        if (this.content instanceof TooltipContentComponent) {
            ((this.content)).hide();
        }
    };
    return TooltipDirective;
}());
TooltipDirective.decorators = [
    { type: core.Directive, args: [{
                selector: '[hxTooltip]'
            },] },
];
TooltipDirective.ctorParameters = function () { return [
    { type: core.ViewContainerRef, },
    { type: core.ComponentFactoryResolver, },
    { type: TooltipConfig, },
]; };
TooltipDirective.propDecorators = {
    "content": [{ type: core.Input, args: ['hxTooltip',] },],
    "disabled": [{ type: core.Input },],
    "animation": [{ type: core.Input },],
    "placement": [{ type: core.Input },],
    "context": [{ type: core.Input },],
    "show": [{ type: core.HostListener, args: ['focusin',] }, { type: core.HostListener, args: ['mouseenter',] },],
    "hide": [{ type: core.HostListener, args: ['focusout',] }, { type: core.HostListener, args: ['mouseleave',] },],
};
var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule.forRoot = function () { return { ngModule: TooltipModule, providers: [TooltipConfig] }; };
    return TooltipModule;
}());
TooltipModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [TooltipContentComponent, TooltipDirective],
                exports: [TooltipContentComponent, TooltipDirective],
                entryComponents: [TooltipContentComponent]
            },] },
];
var latinMap = {
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
function latinize(str) {
    if (!str) {
        return '';
    }
    return str.replace(/[^A-Za-z0-9\[\] ]/g, function (a) {
        return latinMap[a] || a;
    });
}
function escapeRegexp(queryToEscape) {
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}
function tokenize(str, wordRegexDelimiters, phraseRegexDelimiters) {
    if (wordRegexDelimiters === void 0) { wordRegexDelimiters = ' '; }
    if (phraseRegexDelimiters === void 0) { phraseRegexDelimiters = ''; }
    var regexStr = '(?:[' + phraseRegexDelimiters + '])([^' + phraseRegexDelimiters + ']+)(?:[' + phraseRegexDelimiters + '])|([^' + wordRegexDelimiters + ']+)';
    var preTokenized = str.split(new RegExp(regexStr, 'g'));
    var result = [];
    var preTokenizedLength = preTokenized.length;
    var token;
    var replacePhraseDelimiters = new RegExp('[' + phraseRegexDelimiters + ']+', 'g');
    for (var i = 0; i < preTokenizedLength; i += 1) {
        token = preTokenized[i];
        if (token && token.length && token !== wordRegexDelimiters) {
            result.push(token.replace(replacePhraseDelimiters, ''));
        }
    }
    return result;
}
function getValueFromObject(object, option) {
    if (!option || typeof object !== 'object') {
        return object.toString();
    }
    if (option.endsWith('()')) {
        var functionName = option.slice(0, option.length - 2);
        return object[functionName]().toString();
    }
    var properties = option.replace(/\[(\w+)\]/g, '.$1')
        .replace(/^\./, '');
    var propertiesArray = properties.split('.');
    try {
        for (var propertiesArray_1 = __values(propertiesArray), propertiesArray_1_1 = propertiesArray_1.next(); !propertiesArray_1_1.done; propertiesArray_1_1 = propertiesArray_1.next()) {
            var property = propertiesArray_1_1.value;
            if (property in object) {
                object = object[property];
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (propertiesArray_1_1 && !propertiesArray_1_1.done && (_a = propertiesArray_1.return)) _a.call(propertiesArray_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return object.toString();
    var e_3, _a;
}
var TypeaheadContainerComponent = /** @class */ (function () {
    function TypeaheadContainerComponent(element) {
        this.isFocused = false;
        this._matches = [];
        this.element = element;
    }
    Object.defineProperty(TypeaheadContainerComponent.prototype, "active", {
        get: function () {
            return this._active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "matches", {
        get: function () {
            return this._matches;
        },
        set: function (value) {
            this._matches = value;
            if (this._matches.length > 0) {
                this._active = this._matches[0];
                if (this._active.isHeader()) {
                    this.nextActiveMatch();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "optionsListTemplate", {
        get: function () {
            return this.parent ? this.parent.optionsListTemplate : undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TypeaheadContainerComponent.prototype, "itemTemplate", {
        get: function () {
            return this.parent ? this.parent.typeaheadItemTemplate : undefined;
        },
        enumerable: true,
        configurable: true
    });
    TypeaheadContainerComponent.prototype.selectActiveMatch = function () {
        this.selectMatch(this._active);
    };
    TypeaheadContainerComponent.prototype.prevActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index - 1 < 0
            ? this.matches.length - 1
            : index - 1];
        if (this._active.isHeader()) {
            this.prevActiveMatch();
        }
    };
    TypeaheadContainerComponent.prototype.nextActiveMatch = function () {
        var index = this.matches.indexOf(this._active);
        this._active = this.matches[index + 1 > this.matches.length - 1
            ? 0
            : index + 1];
        if (this._active.isHeader()) {
            this.nextActiveMatch();
        }
    };
    TypeaheadContainerComponent.prototype.selectActive = function (value) {
        this.isFocused = true;
        this._active = value;
    };
    TypeaheadContainerComponent.prototype.hightlight = function (match, query) {
        var itemStr = match.value;
        var itemStrHelper = (this.parent && this.parent.typeaheadLatinize
            ? latinize(itemStr)
            : itemStr).toLowerCase();
        var startIdx;
        var tokenLen;
        if (typeof query === 'object') {
            var queryLen = query.length;
            for (var i = 0; i < queryLen; i += 1) {
                startIdx = itemStrHelper.indexOf(query[i]);
                tokenLen = query[i].length;
                if (startIdx >= 0 && tokenLen > 0) {
                    itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
                    itemStrHelper = itemStrHelper.substring(0, startIdx) + '        ' + ' '.repeat(tokenLen) + '         ' + itemStrHelper.substring(startIdx + tokenLen);
                }
            }
        }
        else if (query) {
            startIdx = itemStrHelper.indexOf(query);
            tokenLen = query.length;
            if (startIdx >= 0 && tokenLen > 0) {
                itemStr = itemStr.substring(0, startIdx) + '<strong>' + itemStr.substring(startIdx, startIdx + tokenLen) + '</strong>' + itemStr.substring(startIdx + tokenLen);
            }
        }
        return itemStr;
    };
    TypeaheadContainerComponent.prototype.focusLost = function () {
        this.isFocused = false;
    };
    TypeaheadContainerComponent.prototype.isActive = function (value) {
        return this._active === value;
    };
    TypeaheadContainerComponent.prototype.selectMatch = function (value, e) {
        var _this = this;
        if (e === void 0) { e = void 0; }
        if (e) {
            e.stopPropagation();
            e.preventDefault();
        }
        this.parent.changeModel(value);
        setTimeout(function () { return _this.parent.typeaheadOnSelect.emit(value); }, 0);
        return false;
    };
    return TypeaheadContainerComponent;
}());
TypeaheadContainerComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hx-typeahead-container',
                template: "\n<!-- inject options list template -->\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || optionListTemplate\"\n  [ngTemplateOutletContext]=\"{matches:matches, itemTemplate:itemTemplate, query:query}\"></ng-template>\n<!-- default options item template -->\n<ng-template #hxItemTemplate let-match=\"match\" let-query=\"query\"><span [innerHtml]=\"hightlight(match, query)\"></span></ng-template>\n<!-- options list template -->\n<ng-template #optionListTemplate >\n<ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n   <h6 *ngIf=\"match.isHeader()\" class=\"hx-dropdown-header\">{{match}}</h6>\n   <ng-template [ngIf]=\"!match.isHeader()\">\n      <a href=\"#\"\n        class=\"hx-dropdown-item\"\n        (click)=\"selectMatch(match, $event)\"\n        (mouseenter)=\"selectActive(match)\"\n        [class.active]=\"isActive(match)\">\n          <ng-template [ngTemplateOutlet]=\"itemTemplate || hxItemTemplate\"\n            [ngTemplateOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></ng-template>\n      </a>\n  </ng-template>\n</ng-template>\n</ng-template>\n",
                host: {
                    'class': 'hx-dropdown is-open hx-dropdown-menu',
                    style: 'position: absolute;display: block;'
                },
                encapsulation: core.ViewEncapsulation.None
            },] },
];
TypeaheadContainerComponent.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
TypeaheadContainerComponent.propDecorators = {
    "focusLost": [{ type: core.HostListener, args: ['mouseleave',] }, { type: core.HostListener, args: ['blur',] },],
};
var TypeaheadMatch = /** @class */ (function () {
    function TypeaheadMatch(item, value, header) {
        if (value === void 0) { value = item; }
        if (header === void 0) { header = false; }
        this.item = item;
        this.value = value;
        this.header = header;
    }
    TypeaheadMatch.prototype.isHeader = function () {
        return this.header;
    };
    TypeaheadMatch.prototype.toString = function () {
        return this.value;
    };
    return TypeaheadMatch;
}());
var TypeaheadDirective = /** @class */ (function () {
    function TypeaheadDirective(control, viewContainerRef, element, renderer, cis) {
        this.typeaheadMinLength = void 0;
        this.typeaheadAsync = void 0;
        this.typeaheadLatinize = true;
        this.typeaheadSingleWords = true;
        this.typeaheadWordDelimiters = ' ';
        this.typeaheadPhraseDelimiters = '\'"';
        this.typeaheadLoading = new core.EventEmitter();
        this.typeaheadNoResults = new core.EventEmitter();
        this.typeaheadOnSelect = new core.EventEmitter();
        this.typeaheadOnBlur = new core.EventEmitter();
        this.isTypeaheadOptionsListActive = false;
        this.keyUpEventEmitter = new core.EventEmitter();
        this.placement = 'bottom-left';
        this.element = element;
        this.ngControl = control;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this._typeahead = cis
            .createLoader(element, viewContainerRef, renderer);
    }
    TypeaheadDirective.prototype.onChange = function (e) {
        if (this._container) {
            if (e.keyCode === 27) {
                this.hide();
                return;
            }
            if (e.keyCode === 38) {
                this._container.prevActiveMatch();
                return;
            }
            if (e.keyCode === 40) {
                this._container.nextActiveMatch();
                return;
            }
            if (e.keyCode === 13) {
                this._container.selectActiveMatch();
                return;
            }
        }
        var value = e.target.value !== undefined
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
    };
    TypeaheadDirective.prototype.onFocus = function () {
        if (this.typeaheadMinLength === 0) {
            this.typeaheadLoading.emit(true);
            this.keyUpEventEmitter.emit('');
        }
    };
    TypeaheadDirective.prototype.onBlur = function () {
        if (this._container && !this._container.isFocused) {
            this.typeaheadOnBlur.emit(this._container.active);
            this.hide();
        }
    };
    TypeaheadDirective.prototype.onKeydown = function (e) {
        if (!this._container) {
            return;
        }
        if (e.keyCode === 13) {
            e.preventDefault();
            return;
        }
    };
    TypeaheadDirective.prototype.ngOnInit = function () {
        this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
        this.typeaheadMinLength = this.typeaheadMinLength === void 0
            ? 1
            : this.typeaheadMinLength;
        this.typeaheadWaitMs = this.typeaheadWaitMs || 0;
        if (this.typeaheadAsync === undefined && !(this.typeahead instanceof rxjs.Observable)) {
            this.typeaheadAsync = false;
        }
        if (this.typeahead instanceof rxjs.Observable) {
            this.typeaheadAsync = true;
        }
        if (this.typeaheadAsync) {
            this.asyncActions();
        }
        else {
            this.syncActions();
        }
    };
    TypeaheadDirective.prototype.changeModel = function (match) {
        var valueStr = match.value;
        this.ngControl.viewToModelUpdate(valueStr);
        ((this.ngControl.control)).setValue(valueStr);
        this.hide();
    };
    Object.defineProperty(TypeaheadDirective.prototype, "matches", {
        get: function () {
            return this._matches;
        },
        enumerable: true,
        configurable: true
    });
    TypeaheadDirective.prototype.show = function () {
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
        var normalizedQuery = (this.typeaheadLatinize
            ? latinize(this.ngControl.control.value)
            : this.ngControl.control.value).toString()
            .toLowerCase();
        this._container.query = this.typeaheadSingleWords
            ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
            : normalizedQuery;
        this._container.matches = this._matches;
        this.element.nativeElement.focus();
    };
    TypeaheadDirective.prototype.hide = function () {
        if (this._typeahead.isShown) {
            this._typeahead.hide();
            this._container = null;
        }
    };
    TypeaheadDirective.prototype.ngOnDestroy = function () {
        this._typeahead.dispose();
    };
    TypeaheadDirective.prototype.asyncActions = function () {
        var _this = this;
        this.keyUpEventEmitter.pipe(operators.debounceTime(this.typeaheadWaitMs), operators.mergeMap(function () { return _this.typeahead; })).subscribe(function (matches) {
            _this.finalizeAsyncCall(matches);
        }, function (err) {
            console.error(err);
        });
    };
    TypeaheadDirective.prototype.syncActions = function () {
        var _this = this;
        this.keyUpEventEmitter.pipe(operators.debounceTime(this.typeaheadWaitMs), operators.mergeMap(function (value) {
            var normalizedQuery = _this.normalizeQuery(value);
            return rxjs.from(_this.typeahead).pipe(operators.filter(function (option) {
                return option && _this.testMatch(_this.normalizeOption(option), normalizedQuery);
            }), operators.toArray());
        }))
            .subscribe(function (matches) {
            _this.finalizeAsyncCall(matches);
        }, function (err) {
            console.error(err);
        });
    };
    TypeaheadDirective.prototype.normalizeOption = function (option) {
        var optionValue = getValueFromObject(option, this.typeaheadOptionField);
        var normalizedOption = this.typeaheadLatinize
            ? latinize(optionValue)
            : optionValue;
        return normalizedOption.toLowerCase();
    };
    TypeaheadDirective.prototype.normalizeQuery = function (value) {
        var normalizedQuery = (this.typeaheadLatinize ? latinize(value) : value)
            .toString()
            .toLowerCase();
        normalizedQuery = this.typeaheadSingleWords
            ? tokenize(normalizedQuery, this.typeaheadWordDelimiters, this.typeaheadPhraseDelimiters)
            : normalizedQuery;
        return normalizedQuery;
    };
    TypeaheadDirective.prototype.testMatch = function (match, test) {
        var spaceLength;
        if (typeof test === 'object') {
            spaceLength = test.length;
            for (var i = 0; i < spaceLength; i += 1) {
                if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
                    return false;
                }
            }
            return true;
        }
        else {
            return match.indexOf(test) >= 0;
        }
    };
    TypeaheadDirective.prototype.finalizeAsyncCall = function (matches) {
        this.prepareMatches(matches);
        this.typeaheadLoading.emit(false);
        this.typeaheadNoResults.emit(!this.hasMatches());
        if (!this.hasMatches()) {
            this.hide();
            return;
        }
        if (this._container) {
            var normalizedQuery = (this.typeaheadLatinize
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
    };
    TypeaheadDirective.prototype.prepareMatches = function (options) {
        var _this = this;
        var limited = options.slice(0, this.typeaheadOptionsLimit);
        if (this.typeaheadGroupField) {
            var matches_1 = [];
            var groups = limited
                .map(function (option) { return getValueFromObject(option, _this.typeaheadGroupField); })
                .filter(function (v, i, a) { return a.indexOf(v) === i; });
            groups.forEach(function (group) {
                matches_1.push(new TypeaheadMatch(group, group, true));
                matches_1 = matches_1.concat(limited
                    .filter(function (option) { return getValueFromObject(option, _this.typeaheadGroupField) === group; })
                    .map(function (option) { return new TypeaheadMatch(option, getValueFromObject(option, _this.typeaheadOptionField)); }));
            });
            this._matches = matches_1;
        }
        else {
            this._matches = limited.map(function (option) { return new TypeaheadMatch(option, getValueFromObject(option, _this.typeaheadOptionField)); });
        }
    };
    TypeaheadDirective.prototype.hasMatches = function () {
        return this._matches.length > 0;
    };
    return TypeaheadDirective;
}());
TypeaheadDirective.decorators = [
    { type: core.Directive, args: [{ selector: '[typeahead]', exportAs: 'hx-typeahead' },] },
];
TypeaheadDirective.ctorParameters = function () { return [
    { type: forms.NgControl, },
    { type: core.ViewContainerRef, },
    { type: core.ElementRef, },
    { type: core.Renderer, },
    { type: ComponentLoaderFactory, },
]; };
TypeaheadDirective.propDecorators = {
    "typeahead": [{ type: core.Input },],
    "typeaheadMinLength": [{ type: core.Input },],
    "typeaheadWaitMs": [{ type: core.Input },],
    "typeaheadOptionsLimit": [{ type: core.Input },],
    "typeaheadOptionField": [{ type: core.Input },],
    "typeaheadGroupField": [{ type: core.Input },],
    "typeaheadAsync": [{ type: core.Input },],
    "typeaheadLatinize": [{ type: core.Input },],
    "typeaheadSingleWords": [{ type: core.Input },],
    "typeaheadWordDelimiters": [{ type: core.Input },],
    "typeaheadPhraseDelimiters": [{ type: core.Input },],
    "typeaheadItemTemplate": [{ type: core.Input },],
    "optionsListTemplate": [{ type: core.Input },],
    "typeaheadLoading": [{ type: core.Output },],
    "typeaheadNoResults": [{ type: core.Output },],
    "typeaheadOnSelect": [{ type: core.Output },],
    "typeaheadOnBlur": [{ type: core.Output },],
    "container": [{ type: core.Input },],
    "onChange": [{ type: core.HostListener, args: ['keyup', ['$event'],] },],
    "onFocus": [{ type: core.HostListener, args: ['focus',] },],
    "onBlur": [{ type: core.HostListener, args: ['blur',] },],
    "onKeydown": [{ type: core.HostListener, args: ['keydown', ['$event'],] },],
};
var TypeaheadModule = /** @class */ (function () {
    function TypeaheadModule() {
    }
    TypeaheadModule.forRoot = function () {
        return {
            ngModule: TypeaheadModule,
            providers: [ComponentLoaderFactory, PositioningService]
        };
    };
    return TypeaheadModule;
}());
TypeaheadModule.decorators = [
    { type: core.NgModule, args: [{
                imports: [common.CommonModule],
                declarations: [TypeaheadContainerComponent, TypeaheadDirective],
                exports: [TypeaheadContainerComponent, TypeaheadDirective],
                entryComponents: [TypeaheadContainerComponent]
            },] },
];
var ITabularConfig = /** @class */ (function () {
    function ITabularConfig() {
    }
    return ITabularConfig;
}());
var TabularColumnTypes = {
    String: 0,
    Icon: 1,
    Date: 2,
    Actions: 3,
    Status: 4,
    DateTime: 5,
    Checkbox: 6,
    Badge: 7,
    Number: 8,
};
TabularColumnTypes[TabularColumnTypes.String] = "String";
TabularColumnTypes[TabularColumnTypes.Icon] = "Icon";
TabularColumnTypes[TabularColumnTypes.Date] = "Date";
TabularColumnTypes[TabularColumnTypes.Actions] = "Actions";
TabularColumnTypes[TabularColumnTypes.Status] = "Status";
TabularColumnTypes[TabularColumnTypes.DateTime] = "DateTime";
TabularColumnTypes[TabularColumnTypes.Checkbox] = "Checkbox";
TabularColumnTypes[TabularColumnTypes.Badge] = "Badge";
TabularColumnTypes[TabularColumnTypes.Number] = "Number";
var ITabularColumn = /** @class */ (function () {
    function ITabularColumn() {
    }
    return ITabularColumn;
}());
var SortByDirection = {
    Ascending: 0,
    Descending: 1,
    None: 2,
};
SortByDirection[SortByDirection.Ascending] = "Ascending";
SortByDirection[SortByDirection.Descending] = "Descending";
SortByDirection[SortByDirection.None] = "None";
var TabularSortByService = /** @class */ (function () {
    function TabularSortByService() {
    }
    TabularSortByService.prototype.sortBy = function (rows, sortProps) {
        if (rows === void 0) { rows = []; }
        if (sortProps === void 0) { sortProps = []; }
        sortBy(rows, function (item) {
            var sort = [];
            try {
                for (var sortProps_1 = __values(sortProps), sortProps_1_1 = sortProps_1.next(); !sortProps_1_1.done; sortProps_1_1 = sortProps_1.next()) {
                    var prop = sortProps_1_1.value;
                    if (prop.type === TabularColumnTypes.String && prop.direction === SortByDirection.Descending) {
                        sort.push('desc:' + item[prop.property]);
                    }
                    else if (prop.type === TabularColumnTypes.Number && prop.direction === SortByDirection.Descending) {
                        sort.push(-item[prop.property]);
                    }
                    else if ((prop.type === TabularColumnTypes.Date || prop.type === TabularColumnTypes.DateTime) && prop.direction === SortByDirection.Descending) {
                        sort.push(-new Date(item[prop.property]));
                    }
                    else if ((prop.type === TabularColumnTypes.Date || prop.type === TabularColumnTypes.DateTime) && prop.direction === SortByDirection.Ascending) {
                        sort.push(new Date(item[prop.property]));
                    }
                    else {
                        sort.push(item[prop.property]);
                    }
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (sortProps_1_1 && !sortProps_1_1.done && (_a = sortProps_1.return)) _a.call(sortProps_1);
                }
                finally { if (e_4) throw e_4.error; }
            }
            return sort;
            var e_4, _a;
        });
    };
    return TabularSortByService;
}());
TabularSortByService.decorators = [
    { type: core.Injectable },
];
var TabularSize = {
    Default: 0,
    Small: 1,
    Large: 2,
};
TabularSize[TabularSize.Default] = "Default";
TabularSize[TabularSize.Small] = "Small";
TabularSize[TabularSize.Large] = "Large";
var TabularConfig = /** @class */ (function () {
    function TabularConfig() {
        this.config = {
            size: TabularSize.Default,
            pagination: {
                itemsPerPage: 5,
                currentPage: 1
            },
            clickableRows: false
        };
    }
    return TabularConfig;
}());
TabularConfig.decorators = [
    { type: core.Injectable },
];
var TabularComponent = /** @class */ (function () {
    function TabularComponent(conf, sortByService) {
        var _this = this;
        this.conf = conf;
        this.sortByService = sortByService;
        this.refresh = new core.EventEmitter();
        this.rowClick = new core.EventEmitter();
        this.oldRows = [];
        this.pagedItems = [];
        this.TabularColumnTypes = TabularColumnTypes;
        this.TabularSize = TabularSize;
        this.selectAll = false;
        this.Context = Context;
        this.SortByDirection = SortByDirection;
        this.toggleSelectAll = function () {
            for (var i = 0; i < _this.rows.length; i++) {
                _this.rows[i].checked = _this.selectAll;
            }
        };
        this.toggleIndividualSelect = function () {
            var count = 0;
            for (var i = 0; i < _this.rows.length; i++) {
                if (_this.rows[i].checked) {
                    count++;
                }
            }
            _this.selectAll = (_this.rows.length === count);
        };
        Object.assign(this, conf);
    }
    Object.defineProperty(TabularComponent.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (c) {
            this._config = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabularComponent.prototype, "callback", {
        get: function () {
            return this._callback;
        },
        set: function (Fn) {
            this._callback = Fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabularComponent.prototype, "searchTerm", {
        get: function () {
            return this._searchTerm;
        },
        set: function (term) {
            this._searchTerm = term;
        },
        enumerable: true,
        configurable: true
    });
    TabularComponent.prototype.ngOnInit = function () {
    };
    TabularComponent.prototype.ngDoCheck = function () {
        if (this.rows.length !== this.oldRows.length) {
            this.changeDetected = true;
            console.log('DoCheck: Rows changed to "${this.rows}" from "${this.oldRows}"');
            this.oldRows = this.rows;
            this.orderByData();
        }
        this.changeDetected = false;
    };
    TabularComponent.prototype.ngOnChanges = function (changes) {
    };
    TabularComponent.prototype.executeCallback = function (event, cb) {
        event.stopPropagation();
        if (cb.length) {
            if (cb.length === 1) {
                cb[0]();
            }
            else {
                var args = [];
                for (var i = 1; i < cb.length; i++) {
                    args.push(cb[i]);
                }
                cb[0].apply(this, args);
            }
        }
    };
    TabularComponent.prototype.setPage = function ($event) {
        if ($event === void 0) { $event = {
            page: this.config.pagination.currentPage,
            itemsPerPage: this.config.pagination.itemsPerPage
        }; }
        this.config.pagination.currentPage = $event.page;
        var startIndex = (this.config.pagination.currentPage - 1) * this.config.pagination.itemsPerPage;
        var endIndex = Math.min(startIndex + this.config.pagination.itemsPerPage - 1, this.totalItemCount - 1);
        this.pagedItems = this.rows.slice(startIndex, endIndex + 1);
    };
    TabularComponent.prototype.getActionTooltip = function (action) {
        return (action && action.disabledConfig) ? action.disabledConfig.tooltip : '';
    };
    TabularComponent.prototype.getActionDisabledState = function (action) {
        return (action && action.disabledConfig) ? action.disabledConfig.disabled : false;
    };
    TabularComponent.prototype.onSortClickHandler = function (key, type) {
        var findPropInSortList = this.config.sortBy.filter(function (prop) { return (prop.property === key); });
        if (findPropInSortList.length) {
            var prop_1 = findPropInSortList[0];
            var index = this.config.sortBy.findIndex(function (x) { return x === prop_1; });
            if (prop_1.direction === SortByDirection.None) {
                prop_1.direction = SortByDirection.Descending;
            }
            else if (prop_1.direction === SortByDirection.Descending) {
                prop_1.direction = SortByDirection.Ascending;
            }
            else if (prop_1.direction === SortByDirection.Ascending) {
                if (index > -1) {
                    this.config.sortBy.splice(index, 1);
                }
            }
        }
        else {
            this.config.sortBy.push({ property: key, direction: SortByDirection.Descending, type: type });
        }
        this.orderByData();
        return false;
    };
    TabularComponent.prototype.isColumnSorted = function (key, direction) {
        var findPropInSortList = this.config.sortBy.filter(function (prop) { return (prop.property === key && prop.direction === direction); });
        return (findPropInSortList.length > 0);
    };
    TabularComponent.prototype.onRowClickHandler = function (data) {
        if (this.config.clickableRows) {
            this.rowClick.emit(data);
        }
    };
    TabularComponent.prototype.orderByData = function () {
        this.sortByService.sortBy(this.rows, this.config.sortBy);
        this.setPage();
    };
    Object.defineProperty(TabularComponent.prototype, "totalItemCount", {
        get: function () {
            return this.rows.length;
        },
        enumerable: true,
        configurable: true
    });
    TabularComponent.prototype.isSmall = function () {
        return (this.config.size === TabularSize.Small);
    };
    TabularComponent.prototype.hasValidBadgeTypeParams = function (colData) {
        if (colData) {
            if (typeof colData.label !== 'undefined' && typeof colData.cssClass !== 'undefined') {
                return true;
            }
            else {
                console.error('Record for column type badge is invalid, make sure you have the right type. {label:string,cssClass:string}', colData);
            }
        }
        return false;
    };
    TabularComponent.prototype.getDefaultAction = function (actions) {
        var action = actions.find(function (a) { return a.isDefault; });
        return action;
    };
    TabularComponent.prototype.hasDefaultAction = function (actions) {
        return (typeof this.getDefaultAction(actions) !== 'undefined');
    };
    TabularComponent.prototype.getDefaultActionName = function (actions) {
        var action = this.getDefaultAction(actions);
        return (action) ? action.label : '';
    };
    TabularComponent.prototype.getDefaultActionCallback = function (actions) {
        var action = this.getDefaultAction(actions);
        return (action) ? action.callback : {};
    };
    return TabularComponent;
}());
TabularComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hxa-tabular',
                template: "<table class=\"tabular hx-table is-striped\" [class.is-hover]=\"config.clickableRows\" [class.is-narrow]=\"config.size === TabularSize.Small\">\n  <thead>\n  <tr>\n    <th *ngFor=\"let col of columns\" class=\"{{col.cssClass}} tabular__{{col.label}}\" [ngClass]=\"{'tabular__checkboxes': col.dataType === TabularColumnTypes.Checkbox}\">\n      <!-- sortable column -->\n      <a class=\"tabular__sorter\" href=\"#\" *ngIf=\"col.sortable && col.dataType != TabularColumnTypes.Checkbox\" (click)=\"onSortClickHandler(col.id, col.dataType)\"><i class=\"hx-icon icon-arrow-up is-small\" *ngIf=\"isColumnSorted(col.id, SortByDirection.Ascending)\"></i><i class=\"hx-icon icon-arrow-down is-small\" *ngIf=\"isColumnSorted(col.id, SortByDirection.Descending)\"></i> {{col.label}}</a>\n      <!-- non sortable column -->\n      <span *ngIf=\"!col.sortable && col.dataType !== TabularColumnTypes.Checkbox\">{{col.label}}</span>\n      <!-- checkbox column -->\n      <div *ngIf=\"col.dataType === TabularColumnTypes.Checkbox\" class=\"hx-checkbox-control\">\n        <input id=\"selectAll\" name=\"selectAll\" type=\"checkbox\" class=\"hx-checkbox\" (change)=\"toggleSelectAll($event)\" title=\"Select All\" [(ngModel)]=\"selectAll\" />\n        <label for=\"selectAll\" class=\"hx-label\"></label>\n      </div>\n    </th>\n  </tr>\n  </thead>\n  <tbody>\n  <!--<tr *ngFor=\"let row of rows | paginate: config.pagination | simpleSearch: searchTerm\">-->\n  <tr *ngFor=\"let row of pagedItems | simpleSearch: searchTerm\"\n      (click)=\"onRowClickHandler(row)\"\n      [class.is-selected]=\"row.selected\"\n      [class.is-danger]=\"row.context === Context.Danger\"\n      [class.is-warning]=\"row.context === Context.Warning\"\n      [class.is-info]=\"row.context === Context.Info\"\n      [class.is-success]=\"row.context === Context.Success\">\n    <td *ngFor=\"let col of columns\" class=\"{{col.cssClass}} tabular__{{col.label}}\" [ngClass]=\"{'tabular__checkboxes': col.dataType === 6}\">\n      <!-- checkbox type -->\n      <div *ngIf=\"col.dataType === TabularColumnTypes.Checkbox\" class=\"hx-checkbox-control\">\n        <input id=\"checkbox-{{row.id}}\" name=\"{{col.label}}-checkbox\" type=\"checkbox\" class=\"hx-checkbox\" title=\"{{col.label}}\" (change)=\"toggleIndividualSelect($event)\" [(ngModel)]=\"row.checked\" />\n        <label for=\"checkbox-{{row.id}}\" class=\"hx-label\"></label>\n      </div>\n      <!-- string type | number type -->\n      <span *ngIf=\"col.dataType === TabularColumnTypes.String || col.dataType === TabularColumnTypes.Number\" title=\"{{row[col.id]}}\">{{row[col.id]}}</span>\n      <!-- icon type -->\n      <i *ngIf=\"col.dataType === TabularColumnTypes.Icon\" class=\"hx-icon {{row[col.id]}}\"></i>\n      <!-- date type -->\n      <span *ngIf=\"col.dataType === TabularColumnTypes.Date\">{{row[col.id] | date:'d/M/yy'}}</span>\n      <!-- status type -->\n      <span *ngIf=\"col.dataType === TabularColumnTypes.Status\" class=\"hx-icon\" [ngClass]=\"{'is-primary':row[col.id],'is-danger':!row[col.id], 'icon-check-empty': row[col.id], 'icon-close-empty':!row[col.id]}\" ></span>\n      <!-- badge type -->\n      <span *ngIf=\"col.dataType === TabularColumnTypes.Badge && hasValidBadgeTypeParams(row[col.id])\" class=\"hx-badge is-small {{row[col.id].cssClass}}\"><span class=\"hx-badge-content\">{{row[col.id].label}}</span></span>\n      <!-- date time type -->\n      <span *ngIf=\"col.dataType === TabularColumnTypes.DateTime\">{{row[col.id] | date:'d/M/yy h:mm a'}}</span>\n      <!-- actions type -->\n      <div *ngIf=\"col.dataType === TabularColumnTypes.Actions\" class=\"hx-dropdown tabularActions\">\n        <div class=\"tabularActions__action\">\n          <div class=\"hx-dropdown\" hxDropdown [isRight]=\"true\">\n            <ng-template *ngIf=\"!hasDefaultAction(row[col.id]); else splitBtn\">\n              <!-- collection of actions DOES NOT have a default -->\n              <button class=\"hx-button is-flat hx-button-dropdown\" [class.is-small]=\"config.size === TabularSize.Small\" hxDropdownToggle type=\"button\">\n                <i class=\"icon icon-more\"></i>\n              </button>\n            </ng-template>\n            <ng-template #splitBtn>\n              <!-- collection of actions DOES have a default -->\n              <div class=\"hx-button-split\">\n                <button type=\"button\" class=\"hx-button is-flat\" [class.is-small]=\"config.size === TabularSize.Small\"  (click)='executeCallback($event,getDefaultActionCallback(row[col.id]))' [innerHtml]=\"getDefaultActionName(row[col.id])\"></button>\n                <button type=\"button\" class=\"hx-button is-flat\" [class.is-small]=\"config.size === TabularSize.Small\" hxDropdownToggle><i class=\"icon icon-more\"></i></button>\n              </div>\n            </ng-template>\n            <div class=\"hx-dropdown-menu\" *hxDropdownMenu>\n              <ng-container *ngFor=\"let action of row[col.id]\">\n                <a *ngIf=\"!getActionDisabledState(action) && action.routeType==0 && !action.isDefault\"\n                   [routerLink]=\"action.route\"\n                   class=\"hx-dropdown-item {{action.css}}\"\n                   [innerHTML]=\"action.label\">\n                </a>\n                <a *ngIf=\"!getActionDisabledState(action) && action.routeType==1 && !action.isDefault\"\n                   (click)='executeCallback($event,action.callback)'\n                   class=\"hx-dropdown-item {{action.css}}\"\n                   [innerHTML]=\"action.label\">\n                </a>\n              </ng-container>\n            </div>\n          </div>\n        </div>\n      </div>\n    </td>\n  </tr>\n  </tbody>\n</table>\n<hx-pagination [directionLinks]=\"true\" [boundaryLinks]=\"true\" [rotate]=\"false\" [maxSize]=\"10\"\n               [totalItems]=\"totalItemCount\" [itemsPerPage]=\"config.pagination.itemsPerPage\"\n               [(ngModel)]=\"config.pagination.currentPage\" (pageChanged)=\"setPage($event)\" *ngIf=\"totalItemCount > config.pagination.itemsPerPage\"></hx-pagination>\n",
                styles: [
                    '.tabular__sorter{position:relative;cursor:pointer} th .icon{position: absolute;left:-1rem;}',
                    '.tabular__checkboxes{width:2%;}',
                    '.tabular__checkboxes .hx-checkbox-control{margin:0;display:flex;}',
                    '.tabularActions__action button.hx-button{ width: 1rem;}'
                ]
            },] },
];
TabularComponent.ctorParameters = function () { return [
    { type: TabularConfig, },
    { type: TabularSortByService, },
]; };
TabularComponent.propDecorators = {
    "columns": [{ type: core.Input },],
    "rows": [{ type: core.Input },],
    "config": [{ type: core.Input },],
    "callback": [{ type: core.Input },],
    "searchTerm": [{ type: core.Input },],
    "refresh": [{ type: core.Output },],
    "rowClick": [{ type: core.Output },],
};
var SimpleSearchPipe = /** @class */ (function () {
    function SimpleSearchPipe() {
        this.searchValue = function (item, searchTerm) {
            if (searchTerm === void 0) { searchTerm = ''; }
            var keys = Object.keys(item);
            for (var i = 0, len = keys.length; i < len; i++) {
                var match = false, propertyValue = item[keys[i]];
                if (propertyValue)
                    match = (propertyValue.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
                if (match || searchTerm == '')
                    return true;
            }
            return false;
        };
    }
    SimpleSearchPipe.prototype.transform = function (items, args) {
        var _this = this;
        if (!Array.isArray(items))
            return items;
        return items.filter(function (item) { return (args) ? _this.searchValue(item, args.toString()) : item; });
    };
    return SimpleSearchPipe;
}());
SimpleSearchPipe.decorators = [
    { type: core.Pipe, args: [{
                name: 'simpleSearch',
                pure: false
            },] },
];
SimpleSearchPipe.ctorParameters = function () { return []; };
var TabularModule = /** @class */ (function () {
    function TabularModule() {
    }
    TabularModule.forRoot = function () {
        return {
            ngModule: TabularModule,
            providers: [
                TabularSortByService,
                TabularConfig
            ]
        };
    };
    return TabularModule;
}());
TabularModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [
                    TabularComponent,
                    SimpleSearchPipe
                ],
                imports: [
                    common.CommonModule,
                    platformBrowser.BrowserModule,
                    http.HttpClientModule,
                    router.RouterModule,
                    PaginationModule,
                    TooltipModule,
                    DropdownModule,
                    forms.FormsModule
                ],
                providers: [
                    TabularSortByService,
                    TabularConfig
                ],
                exports: [
                    TabularComponent
                ],
                schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
            },] },
];
var SelectizeConfig = /** @class */ (function () {
    function SelectizeConfig() {
        var _this = this;
        this.delimiter = ',';
        this.create = false;
        this.createOnBlur = false;
        this.createFilter = null;
        this.highlight = true;
        this.persist = true;
        this.openOnFocus = true;
        this.maxOptions = 1000;
        this.maxItems = 1;
        this.hideSelected = false;
        this.closeAfterSelect = false;
        this.allowEmptyOption = false;
        this.scrollDuration = 60;
        this.loadThrottle = 300;
        this.loadingClass = 'loading';
        this.placeholder = null;
        this.preload = false;
        this.dropdownParent = null;
        this.addPrecedence = false;
        this.selectOnTab = false;
        this.diacritics = true;
        this.labelField = 'label';
        this.valueField = 'value';
        this.searchField = ['label'];
        this.render = {
            item: function (item, escape) {
                var multi = "<span class=\"hx-badge is-medium\">\n                <span class=\"hx-badge-content\">"
                    + escape(item.label) +
                    "</span>\n              </span>";
                var single = "<div class=\"item\">" + escape(item.label) + "</div>";
                return (!_this.maxItems) ? multi : single;
            }
        };
        this.plugins = {
            'remove_button': {
                label: '',
                title: 'Remove',
                className: 'hx-delete',
                append: true
            }
        };
    }
    return SelectizeConfig;
}());
SelectizeConfig.decorators = [
    { type: core.Injectable },
];
var SELECTIZE_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return SelectizeComponent; }),
    multi: true
};
var SelectizeComponent = /** @class */ (function () {
    function SelectizeComponent(_differs, renderer) {
        this._differs = _differs;
        this.renderer = renderer;
        this.enabled = true;
        this.onBlur = new core.EventEmitter(false);
        this.onKeydown = function (e) {
            console.log(e);
            var TABKEY = 9;
            if (e.keyCode === TABKEY) {
                e.preventDefault();
                e.stopImmediatePropagation();
                e.stopPropagation();
            }
        };
    }
    SelectizeComponent.prototype.ngOnInit = function () {
        if (this.id && this.id.length > 0) {
            this.renderer.setAttribute(this.selectizeInput.nativeElement, 'id', this.id);
        }
        this.reset();
    };
    SelectizeComponent.prototype.reset = function () {
        this.selectize = $(this.selectizeInput.nativeElement).selectize(this.config)[0].selectize;
        this.selectize.on('change', this.onSelectizeValueChange.bind(this));
        this.selectize.on('blur', this.onBlurEvent.bind(this));
        this.selectize.on('type', this.onSelectizeType.bind(this));
        this.selectize.on('item_add', this.onSelectizeItemSelected.bind(this));
        this.updatePlaceholder();
        this.onEnabledStatusChange();
    };
    SelectizeComponent.prototype.ngOnDestroy = function () {
        this.selectize.off('change');
        this.selectize.off('blur');
        this.selectize.off('type');
    };
    SelectizeComponent.prototype.ngOnChanges = function (changes) {
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
    };
    SelectizeComponent.prototype.ngDoCheck = function () {
        if (this._options_differ) {
            var changes = this._options_differ.diff(this._options);
            if (changes) {
                this._applyOptionsChanges(changes);
            }
        }
        if (this._optgroups_differ) {
            var changes = this._optgroups_differ.diff(this._optgroups);
            if (changes) {
                this._applyOptionGroupChanges(changes);
            }
        }
    };
    SelectizeComponent.prototype._applyOptionsChanges = function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) {
            _this.onSelectizeOptionAdd(record.item);
        });
        changes.forEachRemovedItem(function (record) {
            _this.onSelectizeOptionRemove(record.item);
        });
        this.updatePlaceholder();
        this.evalHasError();
    };
    SelectizeComponent.prototype._applyOptionGroupChanges = function (changes) {
        var _this = this;
        changes.forEachAddedItem(function (record) {
            _this.onSelectizeOptGroupAdd(record.item);
        });
        changes.forEachRemovedItem(function (record) {
            _this.onSelectizeOptGroupRemove(record.item);
        });
        this.updatePlaceholder();
        this.evalHasError();
    };
    SelectizeComponent.prototype.clearhighlight = function () {
        this.selectize.$dropdown_content.removeHighlight();
    };
    SelectizeComponent.prototype.onBlurEvent = function () {
        if (this.formControl) {
            this.formControl.markAsTouched();
        }
        this.onBlur.emit();
        this.evalHasError();
    };
    SelectizeComponent.prototype.onSelectizeOptGroupAdd = function (optgroup) {
        this.selectize.addOptionGroup(optgroup[this.getOptgroupField()], optgroup);
    };
    SelectizeComponent.prototype.onSelectizeOptGroupRemove = function (optgroup) {
        this.selectize.removeOptionGroup(optgroup[this.getOptgroupField()]);
    };
    SelectizeComponent.prototype.onSelectizeOptionAdd = function (option) {
        this.selectize.addOption(lodash.cloneDeep(option));
        var valueField = this.config.valueField;
        if (this.value) {
            var items = typeof this.value === 'string' || typeof this.value === 'number'
                ? [this.value]
                : this.value;
            if (items &&
                items instanceof Array &&
                items.find(function (value) { return value === option[valueField]; })) {
                this.selectize.addItem(option[valueField], true);
            }
        }
    };
    SelectizeComponent.prototype.onSelectizeOptionRemove = function (option) {
        this.selectize.removeOption(option[this.config.valueField]);
    };
    SelectizeComponent.prototype.evalHasError = function () {
        var parent = $(this.selectize.$control).parent();
        if (this.formControl) {
            if (this.formControl.touched && this.formControl.invalid) {
                parent.addClass(this.errorClass || 'has-error');
            }
            else if (parent.hasClass('has-error')) {
                parent.removeClass(this.errorClass || 'has-error');
            }
        }
    };
    SelectizeComponent.prototype.updatePlaceholder = function () {
        if (this.selectize.items.length === 0 &&
            this.selectize.settings.placeholder !== this.getPlaceholder()) {
            this.selectize.settings.placeholder = this.getPlaceholder();
            this.selectize.updatePlaceholder();
            this.selectize.showInput();
        }
    };
    SelectizeComponent.prototype.onEnabledStatusChange = function () {
        this.enabled ? this.selectize.enable() : this.selectize.disable();
    };
    SelectizeComponent.prototype.onSelectizeValueChange = function ($event) {
        var _this = this;
        if (this.onChangeCallback) {
            var data = this.selectize.items.map(function (v) {
                return _this.selectize.options[v];
            });
            this.onChangeCallback(data);
        }
    };
    SelectizeComponent.prototype.onSelectizeType = function (str) {
        if (str.length === 0) {
            this.clearhighlight();
        }
    };
    SelectizeComponent.prototype.onSelectizeItemSelected = function ($event) {
        this.clearhighlight();
    };
    SelectizeComponent.prototype.getPlaceholder = function () {
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
    };
    SelectizeComponent.prototype.writeValue = function (obj) {
        this.value = obj.map(function (v) {
            return v.value;
        });
        this.selectize.setValue(this.value);
    };
    SelectizeComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    SelectizeComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    SelectizeComponent.prototype.getOptgroupField = function () {
        return this.config['optgroupField']
            ? this.config['optgroupField']
            : 'optgroup';
    };
    Object.defineProperty(SelectizeComponent.prototype, "options", {
        get: function () {
            return this._options;
        },
        set: function (value) {
            this._options = value;
            if (!this._options_differ && value) {
                this._options_differ = this._differs.find(value).create();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectizeComponent.prototype, "optgroups", {
        get: function () {
            return this._optgroups;
        },
        set: function (value) {
            this._optgroups = value;
            if (!this._optgroups_differ && value) {
                this._optgroups_differ = this._differs.find(value).create();
            }
        },
        enumerable: true,
        configurable: true
    });
    return SelectizeComponent;
}());
SelectizeComponent.decorators = [
    { type: core.Component, args: [{
                selector: 'hxa-selectize',
                template: "<select #selectizeInput></select>",
                providers: [SELECTIZE_VALUE_ACCESSOR],
                encapsulation: core.ViewEncapsulation.None,
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                styles: [".selectize-control{position:relative}.selectize-dropdown,.selectize-input,.selectize-input input{color:#2a2c2d;font-family:inherit;font-size:.92rem;line-height:1.5;-webkit-font-smoothing:inherit}.selectize-control.single .selectize-input.input-active,.selectize-input{background:0 0;cursor:text;display:inline-block}.selectize-input{border:1px solid rgba(0,0,0,.2);padding:8px;display:inline-block;width:100%;overflow:hidden;position:relative;z-index:1;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:none;box-shadow:none;border-radius:0;border-width:0 0 1px}.selectize-control.multi .selectize-input.has-items{padding:6px 8px 3px}.selectize-input.full{background-color:transparent}.selectize-input.disabled,.selectize-input.disabled *{cursor:default!important}.selectize-input.focus{-webkit-box-shadow:none;box-shadow:none}.selectize-input.dropdown-active{border-radius:0}.selectize-input>*{vertical-align:baseline;display:inline-block;zoom:1}.selectize-control.multi .selectize-input>div{cursor:pointer;margin:4px;padding:2px 6px;background:rgba(0,0,0,.05);color:#2a2c2d;border:0 solid transparent;border-radius:290486px;font-size:.75rem;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;line-height:1.5;white-space:nowrap}.selectize-control.multi .selectize-input>div.active{background:#e8e8e8;color:#2a2c2d;border:0 solid #cacaca}.selectize-control.multi .selectize-input.disabled>div,.selectize-control.multi .selectize-input.disabled>div.active{color:#787878;background:rgba(77,77,77,.05);border:0 solid rgba(77,77,77,0)}.selectize-input>input{display:inline-block!important;padding:0!important;min-height:0!important;max-height:none!important;max-width:100%!important;margin:0 2px 0 0!important;text-indent:0!important;border:0!important;background:0 0!important;line-height:inherit!important;-webkit-user-select:auto!important}.selectize-input>input::-ms-clear{display:none}.selectize-input>input:focus{outline:0!important}.selectize-input::after{content:' ';display:block;clear:left}.selectize-input.dropdown-active::before{content:' ';display:block;position:absolute;background:#f0f0f0;height:1px;bottom:0;left:0;right:0}.hx-select-control:after{display:none}.selectize-dropdown{position:absolute;z-index:10;border:transparent;background:#fff;margin:-1px 0 0;border-top:0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 6px 12px rgba(0,0,0,.145);box-shadow:0 6px 12px rgba(0,0,0,.145);border-radius:0}.selectize-dropdown [data-selectable]{cursor:pointer;overflow:hidden}.selectize-dropdown [data-selectable] .highlight{background:rgba(35,49,43,.23);border-radius:1px;font-weight:700}.selectize-dropdown .optgroup-header,.selectize-dropdown [data-selectable]{padding:5px 8px}.selectize-dropdown .optgroup:first-child .optgroup-header{border-top:0}.selectize-dropdown .optgroup-header{color:#2a2c2d;background:#fff;cursor:default}.selectize-dropdown .active{background-color:#41b987;color:#fff}.selectize-dropdown .active.create{color:#fff}.selectize-dropdown .create{color:rgba(42,44,45,.5)}.selectize-dropdown-content{overflow-y:auto;overflow-x:hidden;max-height:200px;-webkit-overflow-scrolling:touch}.selectize-control.single .selectize-input,.selectize-control.single .selectize-input input{cursor:pointer}.selectize-control.single .selectize-input.input-active,.selectize-control.single .selectize-input.input-active input{cursor:text}.selectize-control.single .selectize-input:after{content:' ';display:block;position:absolute;top:50%;right:15px;margin-top:-3px;width:0;height:0;border-style:solid;border-width:5px 5px 0;border-color:grey transparent transparent}.selectize-control.single .selectize-input.dropdown-active:after{margin-top:-4px;border-width:0 5px 5px;border-color:transparent transparent grey}.selectize-control.rtl.single .selectize-input:after{left:15px;right:auto}.selectize-control.rtl .selectize-input>input{margin:0 4px 0 -2px!important}.selectize-control .selectize-input.disabled{opacity:.5;background-color:#fafafa}.selectize-control.plugin-remove_button [data-value]{position:relative;padding-right:.7rem!important}.selectize-control.plugin-remove_button [data-value].is-medium{padding-right:1rem!important}.selectize-control.plugin-remove_button [data-value] .hx-delete{margin-left:-.2rem;height:16px;width:16px;max-height:16px;max-width:16px;min-height:16px;min-width:16px}.selectize-control.plugin-remove_button [data-value].is-medium .hx-delete{margin-left:-.5rem}.selectize-control.plugin-remove_button [data-value].is-large .hx-delete{margin-left:-.2rem;height:20px;width:20px;max-height:20px;max-width:20px;min-height:20px;min-width:20px}.selectize-control.plugin-remove_button .disabled [data-value] .hx-remove:hover{background:0 0}.selectize-control.plugin-remove_button .disabled [data-value] .hx-remove{border-left-color:rgba(77,77,77,0)}.selectize-control.plugin-remove_button .remove-single{position:absolute;right:28px;top:6px;font-size:23px}"]
            },] },
];
SelectizeComponent.ctorParameters = function () { return [
    { type: core.IterableDiffers, },
    { type: core.Renderer2, },
]; };
SelectizeComponent.propDecorators = {
    "config": [{ type: core.Input },],
    "id": [{ type: core.Input },],
    "placeholder": [{ type: core.Input },],
    "hasOptionsPlaceholder": [{ type: core.Input },],
    "noOptionsPlaceholder": [{ type: core.Input },],
    "enabled": [{ type: core.Input },],
    "value": [{ type: core.Input },],
    "formControl": [{ type: core.Input },],
    "errorClass": [{ type: core.Input },],
    "onBlur": [{ type: core.Output },],
    "selectizeInput": [{ type: core.ViewChild, args: ['selectizeInput',] },],
    "options": [{ type: core.Input },],
    "optgroups": [{ type: core.Input },],
};
var SelectizeModule = /** @class */ (function () {
    function SelectizeModule() {
    }
    SelectizeModule.forRoot = function (config) {
        return {
            ngModule: SelectizeModule,
            providers: [
                ComponentLoaderFactory
            ]
        };
    };
    return SelectizeModule;
}());
SelectizeModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [
                    SelectizeComponent
                ],
                exports: [
                    SelectizeComponent
                ],
                entryComponents: [SelectizeComponent]
            },] },
];
var AutoGrowDirective = /** @class */ (function () {
    function AutoGrowDirective(element) {
        this.element = element;
    }
    AutoGrowDirective.prototype.onInput = function () {
        this.resize();
    };
    AutoGrowDirective.prototype.ngAfterContentInit = function () {
        var style = this.element.nativeElement.style;
        style.overflow = 'hidden';
        style.height = 'auto';
    };
    AutoGrowDirective.prototype.ngAfterContentChecked = function () {
        this.resize();
    };
    AutoGrowDirective.prototype.resize = function () {
        var style = this.element.nativeElement.style;
        var height = this.element.nativeElement.scrollHeight;
        style.height = height + "px";
    };
    return AutoGrowDirective;
}());
AutoGrowDirective.decorators = [
    { type: core.Directive, args: [{
                selector: 'textarea[autogrow]'
            },] },
];
AutoGrowDirective.ctorParameters = function () { return [
    { type: core.ElementRef, },
]; };
AutoGrowDirective.propDecorators = {
    "onInput": [{ type: core.HostListener, args: ['input', ['$event.target'],] },],
};
var AutoGrowModule = /** @class */ (function () {
    function AutoGrowModule() {
    }
    AutoGrowModule.forRoot = function () {
        return {
            ngModule: AutoGrowModule, providers: []
        };
    };
    return AutoGrowModule;
}());
AutoGrowModule.decorators = [
    { type: core.NgModule, args: [{
                declarations: [
                    AutoGrowDirective
                ],
                exports: [
                    AutoGrowDirective
                ]
            },] },
];
var TypeaheadOptions = /** @class */ (function () {
    function TypeaheadOptions(options) {
        Object.assign(this, options);
    }
    return TypeaheadOptions;
}());
var ActionConfigRouteType = {
    Default: 0,
    Callback: 1,
};
ActionConfigRouteType[ActionConfigRouteType.Default] = "Default";
ActionConfigRouteType[ActionConfigRouteType.Callback] = "Callback";
var IActionsConfig = /** @class */ (function () {
    function IActionsConfig() {
    }
    return IActionsConfig;
}());
var TabularColumn = /** @class */ (function () {
    function TabularColumn(id, label, dataType, sortable, cssClass, options) {
        if (cssClass === void 0) { cssClass = ''; }
        this.id = id;
        this.label = label;
        this.dataType = dataType;
        this.sortable = sortable;
        this.cssClass = cssClass;
        this.options = options;
    }
    return TabularColumn;
}());
function OnChange(defaultValue) {
    var sufix = 'Change';
    return function OnChangeHandler(target, propertyKey) {
        var _key = " __" + propertyKey + "Value";
        Object.defineProperty(target, propertyKey, {
            get: function () { return this[_key]; },
            set: function (value) {
                var prevValue = this[_key];
                this[_key] = value;
                if (prevValue !== value && this[propertyKey + sufix]) {
                    this[propertyKey + sufix].emit(value);
                }
            }
        });
    };
}
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.length = 0;
        this.asArray = [];
    }
    LinkedList.prototype.getNode = function (position) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        var current = this.head;
        for (var index = 0; index < position; index++) {
            current = current.next;
        }
        return current;
    };
    LinkedList.prototype.createInternalArrayRepresentation = function () {
        var outArray = [];
        var current = this.head;
        while (current) {
            outArray.push(current.value);
            current = current.next;
        }
        this.asArray = outArray;
    };
    LinkedList.prototype.get = function (position) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            return void 0;
        }
        var current = this.head;
        for (var index = 0; index < position; index++) {
            current = current.next;
        }
        return current.value;
    };
    LinkedList.prototype.add = function (value, position) {
        if (position === void 0) { position = this.length; }
        if (position < 0 || position > this.length) {
            throw new Error('Position is out of the list');
        }
        var node = {
            value: (value),
            next: (undefined),
            previous: (undefined)
        };
        if (this.length === 0) {
            this.head = node;
            this.tail = node;
            this.current = node;
        }
        else {
            if (position === 0) {
                node.next = this.head;
                this.head.previous = node;
                this.head = node;
            }
            else if (position === this.length) {
                this.tail.next = node;
                node.previous = this.tail;
                this.tail = node;
            }
            else {
                var currentPreviousNode = this.getNode(position - 1);
                var currentNextNode = currentPreviousNode.next;
                currentPreviousNode.next = node;
                currentNextNode.previous = node;
                node.previous = currentPreviousNode;
                node.next = currentNextNode;
            }
        }
        this.length++;
        this.createInternalArrayRepresentation();
    };
    LinkedList.prototype.remove = function (position) {
        if (position === void 0) { position = 0; }
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        if (position === 0) {
            this.head = this.head.next;
            if (this.head) {
                this.head.previous = undefined;
            }
            else {
                this.tail = undefined;
            }
        }
        else if (position === this.length - 1) {
            this.tail = this.tail.previous;
            this.tail.next = undefined;
        }
        else {
            var removedNode = this.getNode(position);
            removedNode.next.previous = removedNode.previous;
            removedNode.previous.next = removedNode.next;
        }
        this.length--;
        this.createInternalArrayRepresentation();
    };
    LinkedList.prototype.set = function (position, value) {
        if (this.length === 0 || position < 0 || position >= this.length) {
            throw new Error('Position is out of the list');
        }
        var node = this.getNode(position);
        node.value = value;
        this.createInternalArrayRepresentation();
    };
    LinkedList.prototype.toArray = function () {
        return this.asArray;
    };
    LinkedList.prototype.findAll = function (fn) {
        var current = this.head;
        var result = [];
        for (var index = 0; index < this.length; index++) {
            if (fn(current.value, index)) {
                result.push({ index: index, value: current.value });
            }
            current = current.next;
        }
        return result;
    };
    LinkedList.prototype.push = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.forEach(function (arg) {
            _this.add(arg);
        });
        return this.length;
    };
    LinkedList.prototype.pop = function () {
        if (this.length === 0) {
            return undefined;
        }
        var last = this.tail;
        this.remove(this.length - 1);
        return last.value;
    };
    LinkedList.prototype.unshift = function () {
        var _this = this;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        args.reverse();
        args.forEach(function (arg) {
            _this.add(arg, 0);
        });
        return this.length;
    };
    LinkedList.prototype.shift = function () {
        if (this.length === 0) {
            return undefined;
        }
        var lastItem = this.head.value;
        this.remove();
        return lastItem;
    };
    LinkedList.prototype.forEach = function (fn) {
        var current = this.head;
        for (var index = 0; index < this.length; index++) {
            fn(current.value, index);
            current = current.next;
        }
    };
    LinkedList.prototype.indexOf = function (value) {
        var current = this.head;
        var position = 0;
        for (var index = 0; index < this.length; index++) {
            if (current.value === value) {
                position = index;
                break;
            }
            current = current.next;
        }
        return position;
    };
    LinkedList.prototype.some = function (fn) {
        var current = this.head;
        var result = false;
        while (current && !result) {
            if (fn(current.value)) {
                result = true;
                break;
            }
            current = current.next;
        }
        return result;
    };
    LinkedList.prototype.every = function (fn) {
        var current = this.head;
        var result = true;
        while (current && result) {
            if (!fn(current.value)) {
                result = false;
            }
            current = current.next;
        }
        return result;
    };
    LinkedList.prototype.toString = function () {
        return '[Linked List]';
    };
    LinkedList.prototype.find = function (fn) {
        var current = this.head;
        var result;
        for (var index = 0; index < this.length; index++) {
            if (fn(current.value, index)) {
                result = current.value;
                break;
            }
            current = current.next;
        }
        return result;
    };
    LinkedList.prototype.findIndex = function (fn) {
        var current = this.head;
        var result;
        for (var index = 0; index < this.length; index++) {
            if (fn(current.value, index)) {
                result = index;
                break;
            }
            current = current.next;
        }
        return result;
    };
    return LinkedList;
}());
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var win = typeof window !== 'undefined' && window || ({});
var document$1 = win.document;
var location = win.location;
var gc = win['gc'] ? function () { return win['gc'](); } : function () { return null; };
var performance = win['performance'] ? win['performance'] : null;
var Event = win['Event'];
var MouseEvent = win['MouseEvent'];
var KeyboardEvent = win['KeyboardEvent'];
var EventTarget = win['EventTarget'];
var History = win['History'];
var Location = win['Location'];
var EventListener = win['EventListener'];
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.reflow = function (element) {
        (function (bs) { return bs; })(element.offsetHeight);
    };
    Utils.getStyles = function (elem) {
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = win;
        }
        return view.getComputedStyle(elem);
    };
    return Utils;
}());
var HxUiModule = /** @class */ (function () {
    function HxUiModule() {
    }
    HxUiModule.forRoot = function () {
        return {
            ngModule: HxUiModule,
            providers: [
                ModalService
            ]
        };
    };
    return HxUiModule;
}());
HxUiModule.decorators = [
    { type: core.NgModule, args: [{
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

exports.OnChange = OnChange;
exports.LinkedList = LinkedList;
exports.Trigger = Trigger;
exports.Utils = Utils;
exports.ComponentLoaderFactory = ComponentLoaderFactory;
exports.ContentRef = ContentRef;
exports.ComponentLoader = ComponentLoader;
exports.Positioning = Positioning;
exports.PositioningOptions = PositioningOptions;
exports.PositioningService = PositioningService;
exports.positionElements = positionElements;
exports.Context = Context;
exports.HxUiModule = HxUiModule;
exports.ModalContainer = ModalContainer;
exports.Modal = Modal;
exports.ModalService = ModalService;
exports.ModalPlaceholderComponent = ModalPlaceholderComponent;
exports.ModalModule = ModalModule;
exports.DatepickerComponent = DatepickerComponent;
exports.DatepickerFormComponent = DatepickerFormComponent;
exports.DateValueAccessor = DateValueAccessor;
exports.DropdownDirective = DropdownDirective;
exports.DropdownMenuDirective = DropdownMenuDirective;
exports.DropdownToggleDirective = DropdownToggleDirective;
exports.DropdownContainerComponent = DropdownContainerComponent;
exports.DropdownState = DropdownState;
exports.DropdownConfig = DropdownConfig;
exports.DropdownModule = DropdownModule;
exports.PagerComponent = PagerComponent;
exports.PaginationComponent = PaginationComponent;
exports.PaginationModule = PaginationModule;
exports.PaginationConfig = PaginationConfig;
exports.NgTranscludeDirective = NgTranscludeDirective;
exports.TabDirective = TabDirective;
exports.TabHeadingDirective = TabHeadingDirective;
exports.TabsetComponent = TabsetComponent;
exports.TabsetConfig = TabsetConfig;
exports.TabsModule = TabsModule;
exports.TooltipContentComponent = TooltipContentComponent;
exports.TooltipDirective = TooltipDirective;
exports.TooltipModule = TooltipModule;
exports.TooltipConfig = TooltipConfig;
exports.latinMap = latinMap;
exports.TypeaheadOptions = TypeaheadOptions;
exports.TypeaheadMatch = TypeaheadMatch;
exports.escapeRegexp = escapeRegexp;
exports.getValueFromObject = getValueFromObject;
exports.tokenize = tokenize;
exports.latinize = latinize;
exports.TypeaheadContainerComponent = TypeaheadContainerComponent;
exports.TypeaheadDirective = TypeaheadDirective;
exports.TypeaheadModule = TypeaheadModule;
exports.TabularComponent = TabularComponent;
exports.TabularModule = TabularModule;
exports.ActionConfigRouteType = ActionConfigRouteType;
exports.IActionsConfig = IActionsConfig;
exports.TabularColumnTypes = TabularColumnTypes;
exports.ITabularColumn = ITabularColumn;
exports.TabularColumn = TabularColumn;
exports.ITabularConfig = ITabularConfig;
exports.TabularConfig = TabularConfig;
exports.SortByDirection = SortByDirection;
exports.TabularSortByService = TabularSortByService;
exports.TabularSize = TabularSize;
exports.SELECTIZE_VALUE_ACCESSOR = SELECTIZE_VALUE_ACCESSOR;
exports.SelectizeComponent = SelectizeComponent;
exports.SelectizeConfig = SelectizeConfig;
exports.SelectizeModule = SelectizeModule;
exports.AutoGrowDirective = AutoGrowDirective;
exports.AutoGrowModule = AutoGrowModule;
exports.ɵf = AutoGrowModule;
exports.ɵd = DatepickerModule;
exports.ɵa = PAGER_CONTROL_VALUE_ACCESSOR;
exports.ɵb = PAGINATION_CONTROL_VALUE_ACCESSOR;
exports.ɵe = PositioningService;
exports.ɵc = SimpleSearchPipe;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=hxui-angular.umd.js.map
