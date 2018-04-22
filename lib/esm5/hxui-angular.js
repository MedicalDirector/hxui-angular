import { __extends, __values, __read } from 'tslib';
import { Component, EventEmitter, Output, Input, ElementRef, HostListener, forwardRef, NgModule, TemplateRef, ReflectiveInjector, Injectable, NgZone, ComponentFactoryResolver, Injector, Directive, ViewContainerRef, HostBinding, Renderer2, Renderer, ViewChild, ChangeDetectorRef, ViewEncapsulation, Pipe, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormsModule, NgControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import 'rxjs/add/operator/filter';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

var DatepickerComponent = (function () {
    function DatepickerComponent() {
        this.onDateSelected = new EventEmitter();
        this.days = new Array();
        this.week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
        this.cellCount = 41;
    }
    DatepickerComponent.prototype.renderCalendar = function () {
        for (var i = 0; i <= this.cellCount; i++) {
            var date = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth());
            var dayOffset = date.getDay() == 0 ? 7 : date.getDay();
            this.days[i] = new Date(date.setDate(2 - dayOffset + i));
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
        return inputDate.getMonth() == this.viewDate.getMonth();
    };
    DatepickerComponent.prototype.isCurrentDay = function (inputDate) {
        return inputDate.getTime() == this.presentDate.getTime();
    };
    DatepickerComponent.prototype.isSelectedDay = function (inputDate) {
        if (this.selectedDate)
            return inputDate.getTime() == this.selectedDate.getTime();
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
    };
    return DatepickerComponent;
}());
DatepickerComponent.decorators = [
    { type: Component, args: [{
                selector: 'hxa-datepicker',
                template: "<div class=\"hxui-reset\">\n  <div class=\"hx-card hxa-datepicker-container\">\n    <div class=\"hx-card-header hxa-datepicker-header\">\n      <div class=\"hxa-datepicker-month\">\n        <div class=\"hxa-datepicker-icon\" title=\"Previous Month\" (click)=\"previousMonth()\">\n            <a class=\"hx-button is-transparent\"><i class=\"hx-icon icon-angle-left\"></i></a>\n        </div>\n        <div class=\"hxa-datepicker-month-title\">\n          <span>{{viewDate.toLocaleString(\"en-au\", { month: \"long\", year: \"numeric\" })}}</span></div>\n        <div class=\"hxa-datepicker-icon\" title=\"Next Month\" (click)=\"nextMonth()\">\n            <a class=\"hx-button is-transparent\"><i class=\"hx-icon icon-angle-right\"></i></a>\n        </div>\n      </div>\n      <div class=\"hxa-datepicker-week\">\n        <div class=\"hxa-datepicker-weekday\" *ngFor=\"let weekday of week\">\n          {{weekday | slice:0:3}}\n        </div>\n      </div>\n    </div>\n    <div class=\"hxa-datepicker-contents\">\n      <div class=\"hxa-datepicker-day\" *ngFor=\"let day of days\"\n      [ngClass]=\"{'hxa-datepicker-day-siblingmonth': !isCurrentMonth(day),\n      'hxa-datepicker-day-currentday': isCurrentDay(day),\n      'hxa-datepicker-day-selectedday': isSelectedDay(day)}\"\n      (click)=\"setSelectedDate(day)\">\n      <a class=\"hx-button is-transparent\">{{day.getDate()}}</a>\n      </div>\n    </div>\n  </div>\n</div>",
                styles: [".hxa-datepicker-container{max-width:21em;width:21em;height:24em;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;font-size:1rem}.hxa-datepicker-header{padding:1rem 1rem 0;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:initial;-ms-flex-align:initial;align-items:initial;-ms-flex-pack:distribute;justify-content:space-around;font-weight:100}.hxa-datepicker-icon{cursor:pointer;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.hxa-datepicker-icon .hx-button{position:initial!important;top:initial!important}.hxa-datepicker-icon .hx-button.is-transparent:hover{color:#000}.hxa-datepicker-icon .hx-icon{font-size:2.3em;position:initial!important;top:initial!important}.hxa-datepicker-month{display:-webkit-box;display:-ms-flexbox;display:flex;text-align:center;margin-bottom:1rem}.hxa-datepicker-month-title{font-size:1.5em;-webkit-box-flex:3;-ms-flex:3;flex:3;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.hxa-datepicker-week{display:-webkit-box;display:-ms-flexbox;display:flex;width:100%;text-align:center}.hxa-datepicker-weekday{-webkit-box-flex:1;-ms-flex:1;flex:1}.hxa-datepicker-contents{padding:1rem;background-color:rgba(246,246,249,.5);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-flex:1;-ms-flex:1;flex:1;-ms-flex-pack:distribute;justify-content:space-around;-ms-flex-line-pack:distribute;align-content:space-around}.hxa-datepicker-day{-webkit-box-flex:1;-ms-flex:1 1 14%;flex:1 1 14%;height:16.666%;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.hxa-datepicker-day .hx-button{position:initial;top:initial;-webkit-box-flex:1;-ms-flex:1;flex:1;font-weight:100;height:100%;padding:0}.hxa-datepicker-day-siblingmonth .hx-button{color:rgba(0,0,0,.3)}.hxa-datepicker-day-selectedday .hx-button{color:#fff;background:#41b987}.hxa-datepicker-day-currentday .hx-button{border:2px solid #41b987}"]
            },] },
];
DatepickerComponent.ctorParameters = function () { return []; };
DatepickerComponent.propDecorators = {
    "onDateSelected": [{ type: Output },],
    "selectedDate": [{ type: Input },],
};
var DateValueAccessor = (function () {
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
var DatepickerFormComponent = (function (_super) {
    __extends(DatepickerFormComponent, _super);
    function DatepickerFormComponent(element) {
        var _this = _super.call(this) || this;
        _this.element = element;
        _this.onDateChange = new EventEmitter();
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
    { type: Component, args: [{
                selector: 'hxa-datepicker-input, hxa-datepicker-form',
                template: "<div class=\"hx-input-group hxa-datepicker-form\">\n  <div class=\"hx-input-control\" [ngClass]=\"{'is-danger': !isValid}\">\n    <input class=\"hx-input\" type=\"text\" #datePickerForm\n    [required]=\"required ? true : null\"\n    [value]=\"date | date:dateFormat\"\n    (change)=\"onChange(datePickerForm.value)\"\n    (focus)=\"onFocus()\"\n    (keydown.Tab)=\"onTab(datePickerForm.value)\"\n    [disabled]=\"disabled\"\n    [readonly]=\"readonly ? true : null\">\n    <label class=\"hx-label\">{{placeholder}} <sup *ngIf=\"required\">*</sup></label>\n    <div class=\"hx-help\"></div>\n    <div class=\"hxa-datepicker-help\">Please select a date</div>\n  </div>\n  <i class=\"hx-icon icon-calendar\"></i>\n  <hxa-datepicker class=\"hxa-datepicker-calendar\" *ngIf=\"visible\" [selectedDate]=\"date\"\n   (onDateSelected)=\"onDateSelectEvent($event)\"\n   [ngClass]=\"{'hxa-datepicker-calendar-top': align == 'top', 'hxa-datepicker-calendar-bottom': align == 'bottom'}\"></hxa-datepicker>\n</div>",
                styles: [".hxa-datepicker-form{position:relative;max-width:21rem}.hxa-datepicker-calendar{position:absolute;z-index:99;left:0}.hxa-datepicker-calendar-top{bottom:100%}.hxa-datepicker-calendar-bottom{top:70%}.hxa-datepicker-help{font-size:.75rem;margin-top:.25rem;color:#63605f}.hxa-datepicker-form input[readonly]~.hx-label{top:-.5rem;font-size:.75rem;color:#41b987}"],
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(function () { return DatepickerFormComponent; }),
                        multi: true
                    }]
            },] },
];
DatepickerFormComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
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
var DatepickerModule = (function () {
    function DatepickerModule() {
    }
    DatepickerModule.forRoot = function () {
        return { ngModule: DatepickerModule, providers: [] };
    };
    return DatepickerModule;
}());
DatepickerModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule, FormsModule],
                declarations: [DatepickerComponent, DatepickerFormComponent],
                exports: [DatepickerComponent, DatepickerFormComponent]
            },] },
];
DatepickerModule.ctorParameters = function () { return []; };
var ContentRef = (function () {
    function ContentRef(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
    return ContentRef;
}());
var Trigger = (function () {
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
var ComponentLoader = (function () {
    function ComponentLoader(_viewContainerRef, _renderer, _elementRef, _injector, _componentFactoryResolver, _ngZone, _posService) {
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
            var injector = ReflectiveInjector.resolveAndCreate(this._providers, this._injector);
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
        if (content instanceof TemplateRef) {
            var viewRef = this._viewContainerRef
                .createEmbeddedView(content);
            return new ContentRef([viewRef.rootNodes], viewRef);
        }
        return new ContentRef([[this._renderer.createText(null, "" + content)]]);
    };
    return ComponentLoader;
}());
var Positioning = (function () {
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
var PositioningService = (function () {
    function PositioningService() {
    }
    PositioningService.prototype.position = function (options) {
        var element = options.element, target = options.target, attachment = options.attachment, appendToBody = options.appendToBody;
        positionElements(this._getHtmlElement(target), this._getHtmlElement(element), (attachment), appendToBody);
    };
    PositioningService.prototype._getHtmlElement = function (element) {
        if (typeof element === 'string') {
            return (document.querySelector(element));
        }
        if (element instanceof ElementRef) {
            return element.nativeElement;
        }
        return (element);
    };
    return PositioningService;
}());
PositioningService.decorators = [
    { type: Injectable },
];
PositioningService.ctorParameters = function () { return []; };
var ComponentLoaderFactory = (function () {
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
    { type: Injectable },
];
ComponentLoaderFactory.ctorParameters = function () { return [
    { type: ComponentFactoryResolver, },
    { type: NgZone, },
    { type: Injector, },
    { type: PositioningService, },
]; };
var DropdownState = (function () {
    function DropdownState() {
        var _this = this;
        this.direction = 'down';
        this.isOpenChange = new EventEmitter();
        this.isDisabledChange = new EventEmitter();
        this.toggleClick = new EventEmitter();
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
    { type: Injectable },
];
DropdownState.ctorParameters = function () { return []; };
var DropdownContainerComponent = (function () {
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
    { type: Component, args: [{
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
var DropdownMenuDirective = (function () {
    function DropdownMenuDirective(_state, _viewContainer, _templateRef) {
        _state.resolveDropdownMenu({
            templateRef: _templateRef,
            viewContainer: _viewContainer
        });
    }
    return DropdownMenuDirective;
}());
DropdownMenuDirective.decorators = [
    { type: Directive, args: [{
                selector: '[hxDropdownMenu],[dropdownMenu]',
                exportAs: 'hx-dropdown-menu'
            },] },
];
DropdownMenuDirective.ctorParameters = function () { return [
    { type: DropdownState, },
    { type: ViewContainerRef, },
    { type: TemplateRef, },
]; };
var DropdownToggleDirective = (function () {
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
    { type: Directive, args: [{
                selector: '[hxDropdownToggle],[dropdownToggle]',
                exportAs: 'hx-dropdown-toggle'
            },] },
];
DropdownToggleDirective.ctorParameters = function () { return [
    { type: DropdownState, },
    { type: ElementRef, },
    { type: Renderer2, },
]; };
DropdownToggleDirective.propDecorators = {
    "isDisabled": [{ type: HostBinding, args: ['attr.disabled',] },],
    "isOpen": [{ type: HostBinding, args: ['class.is-active',] }, { type: HostBinding, args: ['attr.aria-expanded',] },],
    "onClick": [{ type: HostListener, args: ['click', ['$event'],] },],
    "onEsc": [{ type: HostListener, args: ['keyup.esc',] },],
};
var DropdownConfig = (function () {
    function DropdownConfig() {
        this.autoClose = true;
    }
    return DropdownConfig;
}());
DropdownConfig.decorators = [
    { type: Injectable },
];
DropdownConfig.ctorParameters = function () { return []; };
var DropdownDirective = (function () {
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
            .isDisabledChange
            .filter(function (value) { return value === true; })
            .subscribe(function (value) { return _this.hide(); }));
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
DropdownDirective.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: Renderer, },
    { type: ViewContainerRef, },
    { type: ComponentLoaderFactory, },
    { type: DropdownConfig, },
    { type: DropdownState, },
]; };
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
var DropdownModule = (function () {
    function DropdownModule() {
    }
    DropdownModule.forRoot = function (config) {
        return {
            ngModule: DropdownModule, providers: [
                ComponentLoaderFactory,
                PositioningService,
                DropdownState,
                { provide: DropdownConfig, useValue: config ? config : { autoClose: true } }
            ]
        };
    };
    
    return DropdownModule;
}());
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
DropdownModule.ctorParameters = function () { return []; };
var ModalContainer = (function () {
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
var ModalBackdropComponent = (function () {
    function ModalBackdropComponent() {
    }
    ModalBackdropComponent.prototype.dismiss = function () {
        this.close();
        this.destroy();
    };
    return ModalBackdropComponent;
}());
ModalBackdropComponent.decorators = [
    { type: Component, args: [{
                selector: 'hx-modal-backdrop',
                template: "<div class=\"hx-modal-backdrop fade in\" (click)=\"dismiss()\"></div>"
            },] },
];
ModalBackdropComponent.ctorParameters = function () { return []; };
var ModalService = (function () {
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
        this.backdropRef = this.dynamicComponentLoader(ModalBackdropComponent);
        return this.dynamicComponentLoader(component, parameters);
    };
    ModalService.prototype.dynamicComponentLoader = function (component, parameters) {
        var _this = this;
        var factory = this.componentFactoryResolver.resolveComponentFactory(component);
        var childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
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
    { type: Injectable },
];
ModalService.ctorParameters = function () { return [
    { type: ComponentFactoryResolver, },
]; };
var ModalPlaceholderComponent = (function () {
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
    { type: Component, args: [{
                selector: 'hx-modal-placeholder',
                template: "<div #modalPlaceholder></div>"
            },] },
];
ModalPlaceholderComponent.ctorParameters = function () { return [
    { type: ModalService, },
    { type: Injector, },
]; };
ModalPlaceholderComponent.propDecorators = {
    "viewContainerRef": [{ type: ViewChild, args: ['modalPlaceholder', { read: ViewContainerRef },] },],
};
var ModalModule = (function () {
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
    { type: NgModule, args: [{
                declarations: [ModalPlaceholderComponent, ModalBackdropComponent],
                exports: [ModalPlaceholderComponent],
                entryComponents: [ModalBackdropComponent]
            },] },
];
ModalModule.ctorParameters = function () { return []; };
var PaginationConfig = (function () {
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
    { type: Injectable },
];
PaginationConfig.ctorParameters = function () { return []; };
var PAGER_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return PagerComponent; }),
    multi: true
};
var PAGER_TEMPLATE = "\n    <ul class=\"hx-flex hx-flex-justify-between\">\n      <li [class.is-disabled]=\"noPrevious()\" [class.is-previous]=\"align\" class=\"{{ pageBtnClass }}\">\n        <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n      <li [class.is-disabled]=\"noNext()\" [class.is-next]=\"align\" class=\"{{ pageBtnClass }}\">\n        <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a>\n      </li>\n  </ul>\n";
var PagerComponent = (function () {
    function PagerComponent(renderer, elementRef, paginationConfig) {
        this.numPages = new EventEmitter();
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
    { type: Component, args: [{
                selector: 'hx-pager',
                template: PAGER_TEMPLATE,
                providers: [PAGER_CONTROL_VALUE_ACCESSOR]
            },] },
];
PagerComponent.ctorParameters = function () { return [
    { type: Renderer, },
    { type: ElementRef, },
    { type: PaginationConfig, },
]; };
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
var PAGINATION_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return PaginationComponent; }),
    multi: true
};
var PAGINATION_TEMPLATE = "\n  <ul class=\"hx-pagination\" [ngClass]=\"classMap\" [class.is-sticky]=\"sticky\">\n    <li class=\"is-first\"\n        *ngIf=\"boundaryLinks\"\n        [class.is-disabled]=\"noPrevious()||disabled\">\n      <a href (click)=\"selectPage(1, $event)\" [innerHTML]=\"getText('first')\"></a>\n    </li>\n    <li class=\"is-prev\"\n        *ngIf=\"directionLinks\"\n        [class.is-disabled]=\"noPrevious()||disabled\">\n      <a href (click)=\"selectPage(page - 1, $event)\" [innerHTML]=\"getText('previous')\"></a>\n      </li>\n    <li *ngFor=\"let pg of pages\"\n        [class.is-current]=\"pg.active\"\n        [class.is-disabled]=\"disabled&&!pg.active\">\n      <a href (click)=\"selectPage(pg.number, $event)\" [innerHTML]=\"pg.text\"></a>\n    </li>\n    <li class=\"is-next\"\n        *ngIf=\"directionLinks\"\n        [class.is-disabled]=\"noNext()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(page + 1, $event)\" [innerHTML]=\"getText('next')\"></a></li>\n    <li class=\"is-last\"\n        *ngIf=\"boundaryLinks\"\n        [class.is-disabled]=\"noNext()||disabled\">\n      <a href (click)=\"selectPage(totalPages, $event)\" [innerHTML]=\"getText('last')\"></a></li>\n  </ul>\n  ";
var PaginationComponent = (function () {
    function PaginationComponent(renderer, elementRef, paginationConfig) {
        this.numPages = new EventEmitter();
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
    { type: Component, args: [{
                selector: 'hx-pagination',
                template: PAGINATION_TEMPLATE,
                providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
            },] },
];
PaginationComponent.ctorParameters = function () { return [
    { type: Renderer, },
    { type: ElementRef, },
    { type: PaginationConfig, },
]; };
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
var PaginationModule = (function () {
    function PaginationModule() {
    }
    PaginationModule.forRoot = function () {
        return { ngModule: PaginationModule, providers: [PaginationConfig] };
    };
    return PaginationModule;
}());
PaginationModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [PagerComponent, PaginationComponent],
                exports: [PagerComponent, PaginationComponent]
            },] },
];
PaginationModule.ctorParameters = function () { return []; };
var NgTranscludeDirective = (function () {
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
    { type: Directive, args: [{
                selector: '[ngTransclude]'
            },] },
];
NgTranscludeDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
]; };
NgTranscludeDirective.propDecorators = {
    "ngTransclude": [{ type: Input },],
};
var TabsetConfig = (function () {
    function TabsetConfig() {
        this.type = 'tabs';
    }
    return TabsetConfig;
}());
TabsetConfig.decorators = [
    { type: Injectable },
];
TabsetConfig.ctorParameters = function () { return []; };
var TabsetComponent = (function () {
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
    { type: Component, args: [{
                selector: 'hx-tabset',
                template: "\n    <ul class=\"hx-nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n        <li *ngFor=\"let tabz of tabs\" [ngClass]=\"['hx-nav-item', tabz.customClass || '']\"\n          [class.is-active]=\"tabz.active\" [class.is-disabled]=\"tabz.disabled\">\n          <a href=\"javascript:void(0);\" class=\"hx-nav-link\"\n            [class.is-active]=\"tabz.active\" [class.is-disabled]=\"tabz.disabled\"\n            (click)=\"tabz.active = true\">\n            <span [ngTransclude]=\"tabz.headingRef\">{{tabz.heading}}</span>\n            <span *ngIf=\"tabz.removable\">\n              <span (click)=\"$event.preventDefault(); removeTab(tabz);\" class=\"icon close-outline is-small\"></span>\n            </span>\n          </a>\n        </li>\n    </ul>\n    <div class=\"hx-tab-content\">\n      <ng-content></ng-content>\n    </div>\n  "
            },] },
];
TabsetComponent.ctorParameters = function () { return [
    { type: TabsetConfig, },
]; };
TabsetComponent.propDecorators = {
    "vertical": [{ type: Input },],
    "justified": [{ type: Input },],
    "hasInfo": [{ type: Input },],
    "type": [{ type: Input },],
    "clazn": [{ type: HostBinding, args: ['class.hx-tab-container',] },],
};
var TabDirective = (function () {
    function TabDirective(tabset, elementRef) {
        this.elementRef = elementRef;
        this.select = new EventEmitter();
        this.deselect = new EventEmitter();
        this.removed = new EventEmitter();
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
    { type: Directive, args: [{ selector: 'hx-tab, [hx-tab]' },] },
];
TabDirective.ctorParameters = function () { return [
    { type: TabsetComponent, },
    { type: ElementRef, },
]; };
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
var TabHeadingDirective = (function () {
    function TabHeadingDirective(templateRef, tab) {
        tab.headingRef = templateRef;
    }
    return TabHeadingDirective;
}());
TabHeadingDirective.decorators = [
    { type: Directive, args: [{ selector: '[hxTabHeading]' },] },
];
TabHeadingDirective.ctorParameters = function () { return [
    { type: TemplateRef, },
    { type: TabDirective, },
]; };
var TabsModule = (function () {
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
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [NgTranscludeDirective, TabDirective, TabsetComponent, TabHeadingDirective],
                exports: [TabDirective, TabsetComponent, TabHeadingDirective, NgTranscludeDirective]
            },] },
];
TabsModule.ctorParameters = function () { return []; };
var TooltipContentComponent = (function () {
    function TooltipContentComponent(element, cdr) {
        this.element = element;
        this.cdr = cdr;
        this.placement = 'bottom';
        this.animation = true;
        this.top = -100000;
        this.left = -100000;
        this.active = false;
    }
    TooltipContentComponent.prototype.ngAfterViewInit = function () {
        this.show();
        this.cdr.detectChanges();
    };
    TooltipContentComponent.prototype.show = function () {
        if (!this.hostElement)
            return;
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
        var hostElPos = appendToBody ? this.offset(hostEl) : this.position(hostEl);
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
            offsetParentBCR.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
            offsetParentBCR.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
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
            top: boundingClientRect.top + (window.pageYOffset || window.document.documentElement.scrollTop),
            left: boundingClientRect.left + (window.pageXOffset || window.document.documentElement.scrollLeft)
        };
    };
    TooltipContentComponent.prototype.getStyle = function (nativeEl, cssProp) {
        if (((nativeEl)).currentStyle)
            return ((nativeEl)).currentStyle[cssProp];
        if (window.getComputedStyle)
            return ((window.getComputedStyle(nativeEl)))[cssProp];
        return ((nativeEl.style))[cssProp];
    };
    TooltipContentComponent.prototype.isStaticPositioned = function (nativeEl) {
        return (this.getStyle(nativeEl, 'position') || 'static') === 'static';
    };
    TooltipContentComponent.prototype.parentOffsetEl = function (nativeEl) {
        var offsetParent = nativeEl.offsetParent || window.document;
        while (offsetParent && offsetParent !== window.document && this.isStaticPositioned(offsetParent)) {
            offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || window.document;
    };
    return TooltipContentComponent;
}());
TooltipContentComponent.decorators = [
    { type: Component, args: [{
                selector: 'hx-tooltip-content',
                template: "\n        <div class=\"hx-tooltip is-{{ placement }}\"\n             [style.top]=\"top + 'px'\"\n             [style.left]=\"left + 'px'\"\n             [class.is-active]=\"active\"\n             role=\"tooltip\">\n            <div class=\"hx-tooltip-content\">\n                <ng-content></ng-content>\n                {{ content }}\n            </div>\n        </div>\n"
            },] },
];
TooltipContentComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
]; };
TooltipContentComponent.propDecorators = {
    "hostElement": [{ type: Input },],
    "content": [{ type: Input },],
    "placement": [{ type: Input },],
    "animation": [{ type: Input },],
};
var TooltipConfig = (function () {
    function TooltipConfig() {
        this.placement = 'bottom';
        this.disabled = false;
        this.animation = true;
    }
    return TooltipConfig;
}());
TooltipConfig.decorators = [
    { type: Injectable },
];
TooltipConfig.ctorParameters = function () { return []; };
var TooltipDirective = (function () {
    function TooltipDirective(viewContainerRef, resolver, config) {
        this.viewContainerRef = viewContainerRef;
        this.resolver = resolver;
        this.config = config;
        this.animation = true;
        this.placement = 'bottom';
        Object.assign(this, config);
    }
    TooltipDirective.prototype.show = function () {
        if (this.disabled || this.visible)
            return;
        this.visible = true;
        if (typeof this.content === 'string') {
            var factory = this.resolver.resolveComponentFactory(TooltipContentComponent);
            if (!this.visible)
                return;
            this.tooltip = this.viewContainerRef.createComponent(factory);
            this.tooltip.instance.hostElement = this.viewContainerRef.element.nativeElement;
            this.tooltip.instance.content = (this.content);
            this.tooltip.instance.placement = this.placement;
            this.tooltip.instance.animation = this.animation;
        }
        else {
            var tooltip = (this.content);
            tooltip.hostElement = this.viewContainerRef.element.nativeElement;
            tooltip.placement = this.placement;
            tooltip.animation = this.animation;
            tooltip.show();
        }
    };
    TooltipDirective.prototype.hide = function () {
        if (!this.visible)
            return;
        this.visible = false;
        if (this.tooltip)
            this.tooltip.destroy();
        if (this.content instanceof TooltipContentComponent)
            ((this.content)).hide();
    };
    return TooltipDirective;
}());
TooltipDirective.decorators = [
    { type: Directive, args: [{
                selector: '[hxTooltip]'
            },] },
];
TooltipDirective.ctorParameters = function () { return [
    { type: ViewContainerRef, },
    { type: ComponentFactoryResolver, },
    { type: TooltipConfig, },
]; };
TooltipDirective.propDecorators = {
    "content": [{ type: Input, args: ['hxTooltip',] },],
    "disabled": [{ type: Input },],
    "animation": [{ type: Input },],
    "placement": [{ type: Input },],
    "show": [{ type: HostListener, args: ['focusin',] }, { type: HostListener, args: ['mouseenter',] },],
    "hide": [{ type: HostListener, args: ['focusout',] }, { type: HostListener, args: ['mouseleave',] },],
};
var TooltipModule = (function () {
    function TooltipModule() {
    }
    TooltipModule.forRoot = function () { return { ngModule: TooltipModule, providers: [TooltipConfig] }; };
    return TooltipModule;
}());
TooltipModule.decorators = [
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [TooltipContentComponent, TooltipDirective],
                exports: [TooltipContentComponent, TooltipDirective],
                entryComponents: [TooltipContentComponent]
            },] },
];
TooltipModule.ctorParameters = function () { return []; };
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
var TypeaheadContainerComponent = (function () {
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
    { type: Component, args: [{
                selector: 'hx-typeahead-container',
                template: "\n<!-- inject options list template -->\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || optionListTemplate\"\n  [ngTemplateOutletContext]=\"{matches:matches, itemTemplate:itemTemplate, query:query}\"></ng-template>\n<!-- default options item template -->\n<ng-template #hxItemTemplate let-match=\"match\" let-query=\"query\"><span [innerHtml]=\"hightlight(match, query)\"></span></ng-template>\n<!-- options list template -->\n<ng-template #optionListTemplate >\n<ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n   <h6 *ngIf=\"match.isHeader()\" class=\"hx-dropdown-header\">{{match}}</h6>\n   <ng-template [ngIf]=\"!match.isHeader()\">\n      <a href=\"#\"\n        class=\"hx-dropdown-item\"\n        (click)=\"selectMatch(match, $event)\"\n        (mouseenter)=\"selectActive(match)\"\n        [class.active]=\"isActive(match)\">\n          <ng-template [ngTemplateOutlet]=\"itemTemplate || hxItemTemplate\"\n            [ngTemplateOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></ng-template>\n      </a>\n  </ng-template>\n</ng-template>\n</ng-template>\n",
                host: {
                    'class': 'hx-dropdown is-open hx-dropdown-menu',
                    style: 'position: absolute;display: block;'
                },
                encapsulation: ViewEncapsulation.None
            },] },
];
TypeaheadContainerComponent.ctorParameters = function () { return [
    { type: ElementRef, },
]; };
TypeaheadContainerComponent.propDecorators = {
    "focusLost": [{ type: HostListener, args: ['mouseleave',] }, { type: HostListener, args: ['blur',] },],
};
var TypeaheadMatch = (function () {
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
var TypeaheadDirective = (function () {
    function TypeaheadDirective(control, viewContainerRef, element, renderer, cis) {
        this.typeaheadMinLength = void 0;
        this.typeaheadAsync = void 0;
        this.typeaheadLatinize = true;
        this.typeaheadSingleWords = true;
        this.typeaheadWordDelimiters = ' ';
        this.typeaheadPhraseDelimiters = '\'"';
        this.typeaheadLoading = new EventEmitter();
        this.typeaheadNoResults = new EventEmitter();
        this.typeaheadOnSelect = new EventEmitter();
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
        this.keyUpEventEmitter
            .debounceTime(this.typeaheadWaitMs)
            .mergeMap(function () { return _this.typeahead; })
            .subscribe(function (matches) {
            _this.finalizeAsyncCall(matches);
        }, function (err) {
            console.error(err);
        });
    };
    TypeaheadDirective.prototype.syncActions = function () {
        var _this = this;
        this.keyUpEventEmitter
            .debounceTime(this.typeaheadWaitMs)
            .mergeMap(function (value) {
            var normalizedQuery = _this.normalizeQuery(value);
            return Observable.from(_this.typeahead)
                .filter(function (option) {
                return option && _this.testMatch(_this.normalizeOption(option), normalizedQuery);
            })
                .toArray();
        })
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
    { type: Directive, args: [{ selector: '[typeahead]', exportAs: 'hx-typeahead' },] },
];
TypeaheadDirective.ctorParameters = function () { return [
    { type: NgControl, },
    { type: ViewContainerRef, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: ComponentLoaderFactory, },
]; };
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
var TypeaheadModule = (function () {
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
    { type: NgModule, args: [{
                imports: [CommonModule],
                declarations: [TypeaheadContainerComponent, TypeaheadDirective],
                exports: [TypeaheadContainerComponent, TypeaheadDirective],
                entryComponents: [TypeaheadContainerComponent]
            },] },
];
TypeaheadModule.ctorParameters = function () { return []; };
var ITabularConfig = (function () {
    function ITabularConfig() {
    }
    return ITabularConfig;
}());
var OrderByDirection = {
    Ascending: 0,
    Descending: 1,
    None: 2,
};
OrderByDirection[OrderByDirection.Ascending] = "Ascending";
OrderByDirection[OrderByDirection.Descending] = "Descending";
OrderByDirection[OrderByDirection.None] = "None";
var TabularOrderByService = (function () {
    function TabularOrderByService() {
    }
    TabularOrderByService._orderByComparator = function (a, b) {
        if (typeof a !== 'undefined') {
            if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
                if (a.toLowerCase() < b.toLowerCase()) {
                    return -1;
                }
                if (a.toLowerCase() > b.toLowerCase()) {
                    return 1;
                }
            }
            else {
                if (parseFloat(a) < parseFloat(b)) {
                    return -1;
                }
                if (parseFloat(a) > parseFloat(b)) {
                    return 1;
                }
            }
        }
        return 0;
    };
    TabularOrderByService.prototype.doTransform = function (data, _a) {
        var _b = __read(_a, 1), _c = _b[0], config = _c === void 0 ? '+' : _c;
        if (!Array.isArray(data)) {
            return data;
        }
        if (!Array.isArray(config) || (Array.isArray(config) && config.length === 1)) {
            var propertyToCheck = !Array.isArray(config) ? config : config[0];
            var desc_1 = propertyToCheck.substr(0, 1) === '-';
            if (!propertyToCheck || propertyToCheck === '-' || propertyToCheck === '+') {
                return !desc_1 ? data.sort() : data.sort().reverse();
            }
            else {
                var property_1 = propertyToCheck.substr(0, 1) === '+' || propertyToCheck.substr(0, 1) === '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;
                return data.sort(function (a, b) {
                    return !desc_1
                        ? TabularOrderByService._orderByComparator(a[property_1], b[property_1])
                        : -TabularOrderByService._orderByComparator(a[property_1], b[property_1]);
                });
            }
        }
        else {
            return data.sort(function (a, b) {
                for (var i = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) === '-';
                    var property = config[i].substr(0, 1) === '+' || config[i].substr(0, 1) === '-'
                        ? config[i].substr(1)
                        : config[i];
                    var comparison = !desc
                        ? TabularOrderByService._orderByComparator(a[property], b[property])
                        : -TabularOrderByService._orderByComparator(a[property], b[property]);
                    if (comparison !== 0) {
                        return comparison;
                    }
                }
                return 0;
            });
        }
    };
    return TabularOrderByService;
}());
TabularOrderByService.decorators = [
    { type: Injectable },
];
TabularOrderByService.ctorParameters = function () { return []; };
var TabularSize = {
    Default: 0,
    Small: 1,
    Large: 2,
};
TabularSize[TabularSize.Default] = "Default";
TabularSize[TabularSize.Small] = "Small";
TabularSize[TabularSize.Large] = "Large";
var TabularConfig = (function () {
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
    { type: Injectable },
];
TabularConfig.ctorParameters = function () { return []; };
var TabularColumnTypes = {
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
var ITabularColumn = (function () {
    function ITabularColumn() {
    }
    return ITabularColumn;
}());
var TabularComponent = (function () {
    function TabularComponent(conf, orderByService) {
        var _this = this;
        this.conf = conf;
        this.orderByService = orderByService;
        this.refresh = new EventEmitter();
        this.rowClick = new EventEmitter();
        this.oldRows = [];
        this.pagedItems = [];
        this.TabularColumnTypes = TabularColumnTypes;
        this.TabularSize = TabularSize;
        this.selectAll = false;
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
            if (this.config.defaultOrderBy) {
                this.orderBy = this.config.defaultOrderBy;
            }
            this.orderByData();
        }
        this.changeDetected = false;
    };
    TabularComponent.prototype.ngOnChanges = function (changes) {
    };
    Object.defineProperty(TabularComponent.prototype, "iconDirection", {
        get: function () {
            return (this.config.defaultOrderByDirection === OrderByDirection.Ascending) ? ' icon-arrow-up' : ' icon-arrow-down';
        },
        enumerable: true,
        configurable: true
    });
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
    TabularComponent.prototype.onSortClickHandler = function (key) {
        this.orderBy = key;
        this.orderByData();
        return false;
    };
    TabularComponent.prototype.onRowClickHandler = function (data) {
        if (this.config.clickableRows) {
            this.rowClick.emit(data);
        }
    };
    TabularComponent.prototype.orderByData = function () {
        var direction;
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
    { type: Component, args: [{
                selector: 'hxa-tabular',
                template: "<table class=\"tabular hx-table is-striped\" [class.is-hover]=\"config.clickableRows\" [class.is-narrow]=\"config.size === TabularSize.Small\">\n    <thead>\n    <tr>\n      <th *ngFor=\"let col of columns\" class=\"{{col.cssClass}} tabular__{{col.label}}\" [ngClass]=\"{'tabular__checkboxes': col.dataType === 6}\">\n        <!-- sortable column -->\n        <a class=\"tabular__sorter\" href=\"#\" *ngIf=\"col.sortable && col.dataType != 6\" (click)=\"onSortClickHandler(col.id)\"><i class=\"hx-icon {{iconDirection}} is-small\" *ngIf=\"orderBy == col.id\"></i> {{col.label}}</a>\n        <!-- non sortable column -->\n        <span *ngIf=\"!col.sortable && col.dataType != 6\">{{col.label}}</span>\n        <!-- checkbox column -->\n        <div *ngIf=\"col.dataType == 6\" class=\"hx-checkbox-control\">\n          <input id=\"selectAll\" name=\"selectAll\" type=\"checkbox\" class=\"hx-checkbox\" (change)=\"toggleSelectAll($event)\" title=\"Select All\" [(ngModel)]=\"selectAll\" />\n          <label for=\"selectAll\" class=\"hx-label\"></label>\n        </div>\n      </th>\n    </tr>\n    </thead>\n    <tbody>\n    <!--<tr *ngFor=\"let row of rows | paginate: config.pagination | simpleSearch: searchTerm\">-->\n    <tr *ngFor=\"let row of pagedItems | simpleSearch: searchTerm\" (click)=\"onRowClickHandler(row)\" [class.is-selected]=\"row.selected\">\n      <td *ngFor=\"let col of columns\" class=\"{{col.cssClass}} tabular__{{col.label}}\" [ngClass]=\"{'tabular__checkboxes': col.dataType === 6}\">\n        <!-- checkbox type -->\n        <div *ngIf=\"col.dataType === TabularColumnTypes.Checkbox\" class=\"hx-checkbox-control\">\n          <input id=\"checkbox-{{row.id}}\" name=\"{{col.label}}-checkbox\" type=\"checkbox\" class=\"hx-checkbox\" title=\"{{col.label}}\" (change)=\"toggleIndividualSelect($event)\" [(ngModel)]=\"row.checked\" />\n          <label for=\"checkbox-{{row.id}}\" class=\"hx-label\"></label>\n        </div>\n        <!-- string type -->\n        <span *ngIf=\"col.dataType === TabularColumnTypes.String\" title=\"{{row[col.id]}}\">{{row[col.id]}}</span>\n        <!-- icon type -->\n        <i *ngIf=\"col.dataType === TabularColumnTypes.Icon\" class=\"hx-icon {{row[col.id]}}\"></i>\n        <!-- date type -->\n        <span *ngIf=\"col.dataType === TabularColumnTypes.Date\">{{row[col.id] | date:'d/M/yy'}}</span>\n        <!-- status type -->\n        <span *ngIf=\"col.dataType === TabularColumnTypes.Status\" class=\"hx-icon\" [ngClass]=\"{'is-primary':row[col.id],'is-danger':!row[col.id], 'icon-check-empty': row[col.id], 'icon-close-empty':!row[col.id]}\" ></span>\n        <!-- badge type -->\n        <span *ngIf=\"col.dataType === TabularColumnTypes.Badge && hasValidBadgeTypeParams(row[col.id])\" class=\"hx-badge is-small {{row[col.id].cssClass}}\"><span class=\"hx-badge-content\">{{row[col.id].label}}</span></span>\n        <!-- date time type -->\n        <span *ngIf=\"col.dataType === TabularColumnTypes.DateTime\">{{row[col.id] | date:'d/M/yy h:mm a'}}</span>\n        <!-- actions type -->\n        <div *ngIf=\"col.dataType === TabularColumnTypes.Actions\" class=\"hx-dropdown tabularActions\">\n          <div class=\"tabularActions__action\">\n            <div class=\"hx-dropdown\" hxDropdown [isRight]=\"true\">\n              <ng-template *ngIf=\"!hasDefaultAction(row[col.id]); else splitBtn\">\n              <!-- collection of actions DOES NOT have a default -->\n              <button class=\"hx-button is-flat hx-button-dropdown\" [class.is-small]=\"config.size === TabularSize.Small\" hxDropdownToggle type=\"button\">\n                <i class=\"icon icon-more\"></i>\n              </button>\n              </ng-template>\n              <ng-template #splitBtn>\n              <!-- collection of actions DOES have a default -->\n              <div class=\"hx-button-split\">\n                <button type=\"button\" class=\"hx-button is-flat\" [class.is-small]=\"config.size === TabularSize.Small\"  (click)='executeCallback($event,getDefaultActionCallback(row[col.id]))' [innerHtml]=\"getDefaultActionName(row[col.id])\"></button>\n                <button type=\"button\" class=\"hx-button is-flat\" [class.is-small]=\"config.size === TabularSize.Small\" hxDropdownToggle><i class=\"icon icon-more\"></i></button>\n              </div>\n              </ng-template>\n              <div class=\"hx-dropdown-menu\" *hxDropdownMenu>\n                <ng-container *ngFor=\"let action of row[col.id]\">\n                  <a *ngIf=\"!getActionDisabledState(action) && action.routeType==0 && !action.isDefault\"\n                     [routerLink]=\"action.route\"\n                     class=\"hx-dropdown-item {{action.css}}\"\n                     [innerHTML]=\"action.label\">\n                  </a>\n                  <a *ngIf=\"!getActionDisabledState(action) && action.routeType==1 && !action.isDefault\"\n                     (click)='executeCallback($event,action.callback)'\n                     class=\"hx-dropdown-item {{action.css}}\"\n                     [innerHTML]=\"action.label\">\n                  </a>\n                </ng-container>\n              </div>\n            </div>\n          </div>\n        </div>\n      </td>\n    </tr>\n    </tbody>\n  </table>\n  <hx-pagination [directionLinks]=\"true\" [boundaryLinks]=\"true\" [rotate]=\"false\" [maxSize]=\"10\"\n                 [totalItems]=\"totalItemCount\" [itemsPerPage]=\"config.pagination.itemsPerPage\"\n                 [(ngModel)]=\"config.pagination.currentPage\" (pageChanged)=\"setPage($event)\" *ngIf=\"totalItemCount > config.pagination.itemsPerPage\"></hx-pagination>\n  ",
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
    { type: TabularOrderByService, },
]; };
TabularComponent.propDecorators = {
    "columns": [{ type: Input },],
    "rows": [{ type: Input },],
    "config": [{ type: Input },],
    "callback": [{ type: Input },],
    "searchTerm": [{ type: Input },],
    "refresh": [{ type: Output },],
    "rowClick": [{ type: Output },],
};
var SimpleSearchPipe = (function () {
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
    { type: Pipe, args: [{
                name: 'simpleSearch',
                pure: false
            },] },
];
SimpleSearchPipe.ctorParameters = function () { return []; };
var TabularModule = (function () {
    function TabularModule() {
    }
    TabularModule.forRoot = function () {
        return {
            ngModule: TabularModule,
            providers: [
                TabularOrderByService,
                TabularConfig
            ]
        };
    };
    return TabularModule;
}());
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
TabularModule.ctorParameters = function () { return []; };
var TypeaheadOptions = (function () {
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
var IActionsConfig = (function () {
    function IActionsConfig() {
    }
    return IActionsConfig;
}());
var TabularColumn = (function () {
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
var LinkedList = (function () {
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
var Utils = (function () {
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
var PositioningOptions = (function () {
    function PositioningOptions() {
    }
    return PositioningOptions;
}());
var HxUiModule = (function () {
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
    { type: NgModule, args: [{
                imports: [
                    DropdownModule.forRoot(), ModalModule.forRoot(), PaginationModule.forRoot(),
                    TabsModule.forRoot(), TooltipModule.forRoot(),
                    TypeaheadModule.forRoot(), TabularModule.forRoot(),
                    DatepickerModule.forRoot()
                ],
                exports: [
                    DatepickerModule, DropdownModule, ModalModule,
                    PaginationModule, TabsModule, TooltipModule,
                    TypeaheadModule, TabularModule
                ]
            },] },
];
HxUiModule.ctorParameters = function () { return []; };

export { OnChange, LinkedList, Trigger, Utils, ComponentLoaderFactory, ContentRef, ComponentLoader, Positioning, PositioningOptions, PositioningService, positionElements, HxUiModule, ModalContainer, Modal, ModalService, ModalPlaceholderComponent, ModalModule, ModalBackdropComponent, DatepickerComponent, DatepickerFormComponent, DateValueAccessor, DropdownDirective, DropdownMenuDirective, DropdownToggleDirective, DropdownContainerComponent, DropdownState, DropdownConfig, DropdownModule, PagerComponent, PaginationComponent, PaginationModule, PaginationConfig, NgTranscludeDirective, TabDirective, TabHeadingDirective, TabsetComponent, TabsetConfig, TabsModule, TooltipContentComponent, TooltipDirective, TooltipModule, TooltipConfig, latinMap, TypeaheadOptions, TypeaheadMatch, escapeRegexp, getValueFromObject, tokenize, latinize, TypeaheadContainerComponent, TypeaheadDirective, TypeaheadModule, TabularComponent, TabularModule, ActionConfigRouteType, IActionsConfig, TabularColumnTypes, ITabularColumn, TabularColumn, ITabularConfig, TabularConfig, OrderByDirection, TabularOrderByService, TabularSize, DatepickerModule as ɵd, PAGER_CONTROL_VALUE_ACCESSOR as ɵa, PAGINATION_CONTROL_VALUE_ACCESSOR as ɵb, SimpleSearchPipe as ɵc };
//# sourceMappingURL=hxui-angular.js.map