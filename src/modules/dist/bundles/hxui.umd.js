(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('rxjs/Subscription'), require('rxjs/add/operator/filter'), require('rxjs/Rx'), require('@angular/common'), require('@angular/forms'), require('rxjs/Observable'), require('rxjs/add/observable/from'), require('rxjs/add/operator/debounceTime'), require('rxjs/add/operator/map'), require('rxjs/add/operator/mergeMap'), require('rxjs/add/operator/toArray'), require('@angular/platform-browser'), require('@angular/http'), require('@angular/router')) :
	typeof define === 'function' && define.amd ? define(['exports', '@angular/core', 'rxjs/Subscription', 'rxjs/add/operator/filter', 'rxjs/Rx', '@angular/common', '@angular/forms', 'rxjs/Observable', 'rxjs/add/observable/from', 'rxjs/add/operator/debounceTime', 'rxjs/add/operator/map', 'rxjs/add/operator/mergeMap', 'rxjs/add/operator/toArray', '@angular/platform-browser', '@angular/http', '@angular/router'], factory) :
	(factory((global.hxui = global.hxui || {}, global.hxui.angular = {}),global.ng.core,global.Subscription,null,global.Rx,global.common,global.forms,global.Rx,null,null,global.Rx.Observable.prototype,global.Rx.Observable.prototype,null,global.platformBrowser,global.http,global.router));
}(this, (function (exports,core,Subscription,filter,Rx,common,forms,Observable$1,from,debounceTime,map,mergeMap,toArray,platformBrowser,http,router) { 'use strict';

var ContentRef = /** @class */ (function () {
    function ContentRef(nodes, viewRef, componentRef) {
        this.nodes = nodes;
        this.viewRef = viewRef;
        this.componentRef = componentRef;
    }
    return ContentRef;
}());

/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
// previous version:
// https://github.com/angular-ui/bootstrap/blob/07c31d0731f7cb068a1932b8e01d2312b796b4ec/src/position/position.js
// tslint:disable
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
    Positioning.prototype.getStyle = function (element, prop) { return window.getComputedStyle(element)[prop]; };
    Positioning.prototype.isStaticPositioned = function (element) {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    };
    Positioning.prototype.offsetParent = function (element) {
        var offsetParentEl = element.offsetParent || document.documentElement;
        while (offsetParentEl && offsetParentEl !== document.documentElement && this.isStaticPositioned(offsetParentEl)) {
            offsetParentEl = offsetParentEl.offsetParent;
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

var PositioningOptions = /** @class */ (function () {
    function PositioningOptions() {
    }
    return PositioningOptions;
}());

var PositioningService = /** @class */ (function () {
    function PositioningService() {
    }
    PositioningService.prototype.position = function (options) {
        var element = options.element, target = options.target, attachment = options.attachment, appendToBody = options.appendToBody;
        positionElements(this._getHtmlElement(target), this._getHtmlElement(element), attachment, appendToBody);
    };
    PositioningService.prototype._getHtmlElement = function (element) {
        // it means that we got a selector
        if (typeof element === 'string') {
            return document.querySelector(element);
        }
        if (element instanceof core.ElementRef) {
            return element.nativeElement;
        }
        return element;
    };
    PositioningService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    PositioningService.ctorParameters = function () { return []; };
    return PositioningService;
}());

/**
 * @copyright Valor Software
 * @copyright Angular ng-bootstrap team
 */
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
        listeners.push(renderer.listen(target, trigger.open, showFn), renderer.listen(target, trigger.close, hideFn));
    });
    return function () { listeners.forEach(function (unsubscribeFn) { return unsubscribeFn(); }); };
}

// todo: add delay support
// todo: merge events onShow, onShown, etc...
// todo: add global positioning configuration?
var ComponentLoader = /** @class */ (function () {
    /**
     * Do not use this directly, it should be instanced via
     * `ComponentLoadFactory.attach`
     * @internal
     * @param _viewContainerRef
     * @param _elementRef
     * @param _injector
     * @param _renderer
     * @param _componentFactoryResolver
     * @param _ngZone
     * @param _posService
     */
    // tslint:disable-next-line
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
    // todo: add behaviour: to target element, `body`, custom element
    // todo: add behaviour: to target element, `body`, custom element
    ComponentLoader.prototype.to = 
    // todo: add behaviour: to target element, `body`, custom element
    function (container) {
        this.container = container || this.container;
        return this;
    };
    ComponentLoader.prototype.position = function (opts) {
        this.attachment = opts.attachment || this.attachment;
        this._elementRef = opts.target || this._elementRef;
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
                document.querySelector(this.container)
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
        listenOpts.toggle = listenOpts.toggle || (function () {
            return _this.isShown
                ? listenOpts.hide()
                : listenOpts.show();
        });
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
    /**
     *
     * @param _elementRef
     * @param _viewContainerRef
     * @param _renderer
     * @returns {ComponentLoader}
     */
    /**
       *
       * @param _elementRef
       * @param _viewContainerRef
       * @param _renderer
       * @returns {ComponentLoader}
       */
    ComponentLoaderFactory.prototype.createLoader = /**
       *
       * @param _elementRef
       * @param _viewContainerRef
       * @param _renderer
       * @returns {ComponentLoader}
       */
    function (_elementRef, _viewContainerRef, _renderer) {
        return new ComponentLoader(_viewContainerRef, _renderer, _elementRef, this._injector, this._componentFactoryResolver, this._ngZone, this._posService);
    };
    ComponentLoaderFactory.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    ComponentLoaderFactory.ctorParameters = function () { return [
        { type: core.ComponentFactoryResolver, },
        { type: core.NgZone, },
        { type: core.Injector, },
        { type: PositioningService, },
    ]; };
    return ComponentLoaderFactory;
}());

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
    DropdownState.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    DropdownState.ctorParameters = function () { return []; };
    return DropdownState;
}());

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
    DropdownContainerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'hx-dropdown-container',
                    host: {
                        style: 'display:block;position: absolute;'
                    },
                    template: "\n    <div [class.is-dropup]=\"direction === 'up'\"\n         [class.is-dropdown]=\"direction === 'down'\"\n         [class.is-open]=\"isOpen\"><ng-content></ng-content></div>\n  "
                },] },
    ];
    /** @nocollapse */
    DropdownContainerComponent.ctorParameters = function () { return [
        { type: DropdownState, },
    ]; };
    return DropdownContainerComponent;
}());

var DropdownMenuDirective = /** @class */ (function () {
    function DropdownMenuDirective(_state, _viewContainer, _templateRef) {
        _state.resolveDropdownMenu({
            templateRef: _templateRef,
            viewContainer: _viewContainer
        });
    }
    DropdownMenuDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[hxDropdownMenu],[dropdownMenu]',
                    exportAs: 'hx-dropdown-menu'
                },] },
    ];
    /** @nocollapse */
    DropdownMenuDirective.ctorParameters = function () { return [
        { type: DropdownState, },
        { type: core.ViewContainerRef, },
        { type: core.TemplateRef, },
    ]; };
    return DropdownMenuDirective;
}());

var DropdownToggleDirective = /** @class */ (function () {
    function DropdownToggleDirective(_state, _element, _renderer) {
        var _this = this;
        this._state = _state;
        this._element = _element;
        this._renderer = _renderer;
        this._subscriptions = [];
        // sync is open value with state
        this._subscriptions.push(this._state
            .isOpenChange.subscribe(function (value) { return _this.isOpen = value; }));
        // populate disabled state
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
        // console.log(this._state.isOpen);
        if (!this._state.isOpen) {
            // console.log('click to open');
            this._state.toggleClick.emit();
        }
        if (this._state.isOpen || this._element.nativeElement.contains(event.target)) {
            var removeRegisteredListener_1 = this._renderer.listen('document', 'click', function () {
                //  console.log('the document was clicked', this._state.isOpen);
                //  console.log('the document was clicked', this._state.isOpen);
                _this._state.toggleClick.emit(false);
                removeRegisteredListener_1();
            });
        }
    };
    // Performance issue with multiple document listeners
    /*@HostListener('document:click', ['$event'])
      onDocumentClick(event: any): void {
        if (this._state.autoClose && event.button !== 2 &&
          !this._element.nativeElement.contains(event.target)) {
          console.log('document:click');
          this._state.toggleClick.emit(false);
        }
      }*/
    DropdownToggleDirective.prototype.onEsc = 
    // Performance issue with multiple document listeners
    /*@HostListener('document:click', ['$event'])
      onDocumentClick(event: any): void {
        if (this._state.autoClose && event.button !== 2 &&
          !this._element.nativeElement.contains(event.target)) {
          console.log('document:click');
          this._state.toggleClick.emit(false);
        }
      }*/
    function () {
        if (this._state.autoClose) {
            this._state.toggleClick.emit(false);
        }
    };
    DropdownToggleDirective.prototype.ngOnDestroy = function () {
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.unsubscribe();
        }
    };
    DropdownToggleDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[hxDropdownToggle],[dropdownToggle]',
                    exportAs: 'hx-dropdown-toggle'
                },] },
    ];
    /** @nocollapse */
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
    return DropdownToggleDirective;
}());

/** Default dropdown configuration */
var DropdownConfig = /** @class */ (function () {
    function DropdownConfig() {
        /** default dropdown auto closing behavior */
        this.autoClose = true;
    }
    DropdownConfig.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    DropdownConfig.ctorParameters = function () { return []; };
    return DropdownConfig;
}());

var DropdownDirective = /** @class */ (function () {
    function DropdownDirective(_elementRef, _renderer, _viewContainerRef, _cis, _config, _state) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this._viewContainerRef = _viewContainerRef;
        this._cis = _cis;
        this._config = _config;
        this._state = _state;
        // todo: move to component loader
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
    Object.defineProperty(DropdownDirective.prototype, "autoClose", {
        get: function () {
            return this._state.autoClose;
        },
        set: /**
           * Indicates that dropdown will be closed on item or document click,
           * and after pressing ESC
           */
        function (value) {
            if (typeof value === 'boolean') {
                this._state.autoClose = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    
    Object.defineProperty(DropdownDirective.prototype, "isDisabled", {
        get: function () { return this._isDisabled; },
        set: /**
           * Disables dropdown toggle and hides dropdown menu if opened
           */
        function (value) {
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
        get: /**
           * Returns whether or not dropdown is position right of the toggle
           */
        function () {
            return this._isInlineRight;
        },
        set: function (value) {
            this._isInlineRight = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownDirective.prototype, "isOpen", {
        get: /**
           * Returns whether or not the dropdown is currently being shown
           */
        function () {
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
            show: function () { return _this.show(); }
        });
        // toggle visibility on toggle element click
        this._subscriptions.push(this._state
            .toggleClick.subscribe(function (value) { return _this.toggle(value); }));
        // hide dropdown if set disabled while opened
        this._subscriptions.push(this._state
            .isDisabledChange
            .filter(function (value) { return value === true; })
            .subscribe(function (value) { return _this.hide(); }));
        // attach dropdown menu inside of dropdown
        if (this._showInline) {
            this._state.dropdownMenu
                .then(function (dropdownMenu) {
                _this._inlinedMenu = dropdownMenu.viewContainer.createEmbeddedView(dropdownMenu.templateRef);
            });
        }
    };
    /**
     * Opens an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
       * Opens an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    DropdownDirective.prototype.show = /**
       * Opens an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    function () {
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
            // check direction in which dropdown should be opened
            var _dropup = _this.dropup === true ||
                (typeof _this.dropup !== 'undefined' && _this.dropup !== false);
            _this._state.direction = _dropup ? 'up' : 'down';
            var _placement = _this.placement ||
                (_dropup ? 'top left' : 'bottom left');
            // show dropdown
            // show dropdown
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
    /**
     * Closes an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
       * Closes an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    DropdownDirective.prototype.hide = /**
       * Closes an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    function () {
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
    /**
     * Toggles an element’s popover. This is considered a “manual” triggering of
     * the popover.
     */
    /**
       * Toggles an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    DropdownDirective.prototype.toggle = /**
       * Toggles an element’s popover. This is considered a “manual” triggering of
       * the popover.
       */
    function (value) {
        if (this.isOpen || value === false) {
            return this.hide();
        }
        return this.show();
    };
    DropdownDirective.prototype.ngOnDestroy = function () {
        // clean up subscriptions and destroy dropdown
        for (var _i = 0, _a = this._subscriptions; _i < _a.length; _i++) {
            var sub = _a[_i];
            sub.unsubscribe();
        }
        this._dropdown.dispose();
    };
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
    /** @nocollapse */
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
    return DropdownDirective;
}());

var DropdownModule = /** @class */ (function () {
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
    /** @nocollapse */
    DropdownModule.ctorParameters = function () { return []; };
    return DropdownModule;
}());

// These 2 items will make sure that you can annotate
// a custom modal component with @Modal()
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

var ModalBackdropComponent = /** @class */ (function () {
    function ModalBackdropComponent() {
    }
    ModalBackdropComponent.prototype.dismiss = function () {
        this.close();
        this.destroy();
    };
    ModalBackdropComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'hx-modal-backdrop',
                    template: "<div class=\"hx-modal-backdrop fade in\" (click)=\"dismiss()\"></div>"
                },] },
    ];
    /** @nocollapse */
    ModalBackdropComponent.ctorParameters = function () { return []; };
    return ModalBackdropComponent;
}());

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
    /**
     * Create component dynamically
     * @param component
     * @param parameters
     * @returns {ReplaySubject}
     */
    /**
         * Create component dynamically
         * @param component
         * @param parameters
         * @returns {ReplaySubject}
         */
    ModalService.prototype.create = /**
         * Create component dynamically
         * @param component
         * @param parameters
         * @returns {ReplaySubject}
         */
    function (component, parameters) {
        //create backdrop
        this.backdropRef = this.dynamicComponentLoader(ModalBackdropComponent);
        //create dynamic component
        return this.dynamicComponentLoader(component, parameters);
    };
    /**
     * Load dynamic component and return componentRef
     * @param component
     * @param parameters
     * @returns {ComponentRef}
     */
    /**
         * Load dynamic component and return componentRef
         * @param component
         * @param parameters
         * @returns {ComponentRef}
         */
    ModalService.prototype.dynamicComponentLoader = /**
         * Load dynamic component and return componentRef
         * @param component
         * @param parameters
         * @returns {ComponentRef}
         */
    function (component, parameters) {
        var _this = this;
        // compile the component based on its type and
        // create a component factory
        var factory = this.componentFactoryResolver.resolveComponentFactory(component);
        // the injector will be needed for DI in
        // the custom component
        var childInjector = core.ReflectiveInjector.resolveAndCreate([], this.injector);
        // create the actual component
        var componentRef = this.vcRef.createComponent(factory, 0, childInjector);
        // pass the @Input parameters to the instance
        Object.assign(componentRef.instance, parameters);
        // add a destroy method to the modal instance
        componentRef.instance['destroy'] = function () {
            // this will close the backdrop
            // this will close the backdrop
            _this.backdropRef.destroy();
            // this will destroy the component
            componentRef.destroy();
        };
        return componentRef;
    };
    ModalService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    ModalService.ctorParameters = function () { return [
        { type: core.ComponentFactoryResolver, },
    ]; };
    return ModalService;
}());

// this is the modal container
var ModalPlaceholderComponent = /** @class */ (function () {
    function ModalPlaceholderComponent(modalService, injector) {
        this.modalService = modalService;
        this.injector = injector;
    }
    ModalPlaceholderComponent.prototype.ngOnInit = function () {
        this.modalService.registerViewContainerRef(this.viewContainerRef);
        this.modalService.registerInjector(this.injector);
    };
    ModalPlaceholderComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'hx-modal-placeholder',
                    template: "<div #modalPlaceholder></div>"
                },] },
    ];
    /** @nocollapse */
    ModalPlaceholderComponent.ctorParameters = function () { return [
        { type: ModalService, },
        { type: core.Injector, },
    ]; };
    ModalPlaceholderComponent.propDecorators = {
        "viewContainerRef": [{ type: core.ViewChild, args: ['modalPlaceholder', { read: core.ViewContainerRef },] },],
    };
    return ModalPlaceholderComponent;
}());

var ModalModule = /** @class */ (function () {
    function ModalModule() {
    }
    ModalModule.forRoot = function () {
        return {
            ngModule: ModalModule,
            providers: [ModalService]
        };
    };
    ModalModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [ModalPlaceholderComponent, ModalBackdropComponent],
                    exports: [ModalPlaceholderComponent],
                    entryComponents: [ModalBackdropComponent]
                },] },
    ];
    /** @nocollapse */
    ModalModule.ctorParameters = function () { return []; };
    return ModalModule;
}());

// todo: split
/** Provides default values for Pagination and pager components */
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
            rotate: true
        };
        this.pager = {
            itemsPerPage: 15,
            previousText: 'Previous',
            nextText: 'Next',
            pageBtnClass: '',
            align: true
        };
    }
    PaginationConfig.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    PaginationConfig.ctorParameters = function () { return []; };
    return PaginationConfig;
}());

var PAGINATION_CONTROL_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return PaginationComponent; }),
    multi: true
};
var PAGINATION_TEMPLATE = "\n  <ul class=\"hx-pagination\" [ngClass]=\"classMap\">\n    <li class=\"is-first\"\n        *ngIf=\"boundaryLinks\"\n        [class.is-disabled]=\"noPrevious()||disabled\">\n      <a href (click)=\"selectPage(1, $event)\" [innerHTML]=\"getText('first')\"></a>\n    </li>\n\n    <li class=\"is-prev\"\n        *ngIf=\"directionLinks\"\n        [class.is-disabled]=\"noPrevious()||disabled\">\n      <a href (click)=\"selectPage(page - 1, $event)\" [innerHTML]=\"getText('previous')\"></a>\n      </li>\n\n    <li *ngFor=\"let pg of pages\"\n        [class.is-current]=\"pg.active\"\n        [class.is-disabled]=\"disabled&&!pg.active\">\n      <a href (click)=\"selectPage(pg.number, $event)\" [innerHTML]=\"pg.text\"></a>\n    </li>\n\n    <li class=\"is-next\"\n        *ngIf=\"directionLinks\"\n        [class.is-disabled]=\"noNext()||disabled\">\n      <a class=\"page-link\" href (click)=\"selectPage(page + 1, $event)\" [innerHTML]=\"getText('next')\"></a></li>\n\n    <li class=\"is-last\"\n        *ngIf=\"boundaryLinks\"\n        [class.is-disabled]=\"noNext()||disabled\">\n      <a href (click)=\"selectPage(totalPages, $event)\" [innerHTML]=\"getText('last')\"></a></li>\n  </ul>\n  ";
var PaginationComponent = /** @class */ (function () {
    function PaginationComponent(renderer, elementRef, paginationConfig) {
        /** fired when total pages count changes, $event:number equals to total pages count */
        this.numPages = new core.EventEmitter();
        /** fired when page was changed, $event:{page, itemsPerPage} equals to object with current page index and number of items per page */
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
        get: /** maximum number of items per page. If value less than 1 will display all items on one page */
        function () {
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
        get: /** total number of items in all pages */
        function () {
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
    };
    PaginationComponent.prototype.writeValue = function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    };
    PaginationComponent.prototype.getText = function (key) {
        return this[key + 'Text'] || this.config[key + 'Text'];
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
    // Create page object used in template
    // Create page object used in template
    PaginationComponent.prototype.makePage = 
    // Create page object used in template
    function (num, text, active) {
        return { text: text, number: num, active: active };
    };
    PaginationComponent.prototype.getPages = function (currentPage, totalPages) {
        var pages = [];
        // Default page limits
        var startPage = 1;
        var endPage = totalPages;
        var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
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
        for (var num = startPage; num <= endPage; num++) {
            var page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
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
    // base class
    // base class
    PaginationComponent.prototype.calculateTotalPages = 
    // base class
    function () {
        var totalPages = this.itemsPerPage < 1
            ? 1
            : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    PaginationComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'hx-pagination',
                    template: PAGINATION_TEMPLATE,
                    providers: [PAGINATION_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
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
        "pageBtnClass": [{ type: core.Input },],
        "disabled": [{ type: core.Input },],
        "numPages": [{ type: core.Output },],
        "pageChanged": [{ type: core.Output },],
        "itemsPerPage": [{ type: core.Input },],
        "totalItems": [{ type: core.Input },],
    };
    return PaginationComponent;
}());

var PAGER_CONTROL_VALUE_ACCESSOR = {
    provide: forms.NG_VALUE_ACCESSOR,
    useExisting: core.forwardRef(function () { return PagerComponent; }),
    multi: true
};
var PAGER_TEMPLATE = "\n    <ul class=\"hx-flex hx-flex-justify-between\">\n      <li [class.is-disabled]=\"noPrevious()\" [class.is-previous]=\"align\" class=\"{{ pageBtnClass }}\">\n        <a href (click)=\"selectPage(page - 1, $event)\">{{getText('previous')}}</a>\n      </li>\n      <li [class.is-disabled]=\"noNext()\" [class.is-next]=\"align\" class=\"{{ pageBtnClass }}\">\n        <a href (click)=\"selectPage(page + 1, $event)\">{{getText('next')}}</a>\n      </li>\n  </ul>\n";
var PagerComponent = /** @class */ (function () {
    function PagerComponent(renderer, elementRef, paginationConfig) {
        /** fired when total pages count changes, $event:number equals to total pages count */
        this.numPages = new core.EventEmitter();
        /** fired when page was changed, $event:{page, itemsPerPage} equals to object with current page index and number of items per page */
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
        get: /** maximum number of items per page. If value less than 1 will display all items on one page */
        function () {
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
        get: /** total number of items in all pages */
        function () {
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
    };
    PagerComponent.prototype.writeValue = function (value) {
        this.page = value;
        this.pages = this.getPages(this.page, this.totalPages);
    };
    PagerComponent.prototype.getText = function (key) {
        return this[key + 'Text'] || this.config[key + 'Text'];
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
    // Create page object used in template
    // Create page object used in template
    PagerComponent.prototype.makePage = 
    // Create page object used in template
    function (num, text, active) {
        return { text: text, number: num, active: active };
    };
    PagerComponent.prototype.getPages = function (currentPage, totalPages) {
        var pages = [];
        // Default page limits
        var startPage = 1;
        var endPage = totalPages;
        var isMaxSized = typeof this.maxSize !== 'undefined' && this.maxSize < totalPages;
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
        for (var num = startPage; num <= endPage; num++) {
            var page = this.makePage(num, num.toString(), num === currentPage);
            pages.push(page);
        }
        // Add links to move between page sets
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
    // base class
    // base class
    PagerComponent.prototype.calculateTotalPages = 
    // base class
    function () {
        var totalPages = this.itemsPerPage < 1
            ? 1
            : Math.ceil(this.totalItems / this.itemsPerPage);
        return Math.max(totalPages || 0, 1);
    };
    PagerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'hx-pager',
                    template: PAGER_TEMPLATE,
                    providers: [PAGER_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
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
    return PagerComponent;
}());

var PaginationModule = /** @class */ (function () {
    function PaginationModule() {
    }
    PaginationModule.forRoot = function () {
        return { ngModule: PaginationModule, providers: [PaginationConfig] };
    };
    PaginationModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    declarations: [PagerComponent, PaginationComponent],
                    exports: [PagerComponent, PaginationComponent]
                },] },
    ];
    /** @nocollapse */
    PaginationModule.ctorParameters = function () { return []; };
    return PaginationModule;
}());

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
    NgTranscludeDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[ngTransclude]'
                },] },
    ];
    /** @nocollapse */
    NgTranscludeDirective.ctorParameters = function () { return [
        { type: core.ViewContainerRef, },
    ]; };
    NgTranscludeDirective.propDecorators = {
        "ngTransclude": [{ type: core.Input },],
    };
    return NgTranscludeDirective;
}());

var TabsetConfig = /** @class */ (function () {
    function TabsetConfig() {
        /** provides default navigation context class: 'tabs' or 'pills' */
        this.type = 'tabs';
    }
    TabsetConfig.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    TabsetConfig.ctorParameters = function () { return []; };
    return TabsetConfig;
}());

var TabsetComponent = /** @class */ (function () {
    function TabsetComponent(config) {
        this.clazn = true;
        this.tabs = [];
        this.classMap = {};
        Object.assign(this, config);
    }
    Object.defineProperty(TabsetComponent.prototype, "vertical", {
        get: /** if true tabs will be placed vertically */
        function () {
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
        get: /** if true tabs fill the container and have a consistent width */
        function () {
            return this._justified;
        },
        set: function (value) {
            this._justified = value;
            this.setClassMap();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabsetComponent.prototype, "type", {
        get: /** navigation context class: 'tabs' or 'pills' */
        function () {
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
        // Select a new tab if the tab to be removed is selected and not destroyed
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
                'is-justified': this.justified
            }, _a["hx-nav-" + this.type] = true, _a);
        var _a;
    };
    TabsetComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'hx-tabset',
                    template: "\n    <ul class=\"hx-nav\" [ngClass]=\"classMap\" (click)=\"$event.preventDefault()\">\n        <li *ngFor=\"let tabz of tabs\" [ngClass]=\"['hx-nav-item', tabz.customClass || '']\"\n          [class.is-active]=\"tabz.active\" [class.is-disabled]=\"tabz.disabled\">\n          <a href=\"javascript:void(0);\" class=\"hx-nav-link\"\n            [class.is-active]=\"tabz.active\" [class.is-disabled]=\"tabz.disabled\"\n            (click)=\"tabz.active = true\">\n            <span [ngTransclude]=\"tabz.headingRef\">{{tabz.heading}}</span>\n            <span *ngIf=\"tabz.removable\">\n              <span (click)=\"$event.preventDefault(); removeTab(tabz);\" class=\"icon close-outline is-small\"></span>\n            </span>\n          </a>\n        </li>\n    </ul>\n    <div class=\"hx-tab-content\">\n      <ng-content></ng-content>\n    </div>\n  "
                },] },
    ];
    /** @nocollapse */
    TabsetComponent.ctorParameters = function () { return [
        { type: TabsetConfig, },
    ]; };
    TabsetComponent.propDecorators = {
        "vertical": [{ type: core.Input },],
        "justified": [{ type: core.Input },],
        "type": [{ type: core.Input },],
        "clazn": [{ type: core.HostBinding, args: ['class.hx-tab-container',] },],
    };
    return TabsetComponent;
}());

var TabDirective = /** @class */ (function () {
    function TabDirective(tabset, elementRef) {
        this.elementRef = elementRef;
        /** fired when tab became active, $event:Tab equals to selected instance of Tab component */
        this.select = new core.EventEmitter();
        /** fired when tab became inactive, $event:Tab equals to deselected instance of Tab component */
        this.deselect = new core.EventEmitter();
        /** fired before tab will be removed, $event:Tab equals to instance of removed tab */
        this.removed = new core.EventEmitter();
        this.addClasn = true;
        this.tabset = tabset;
        this.tabset.addTab(this);
    }
    Object.defineProperty(TabDirective.prototype, "active", {
        get: /** tab active state toggle */
        function () {
            return this._active;
        },
        set: function (active) {
            var _this = this;
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
    TabDirective.decorators = [
        { type: core.Directive, args: [{ selector: 'hx-tab, [hx-tab]' },] },
    ];
    /** @nocollapse */
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
    return TabDirective;
}());

/** Should be used to mark <template> element as a template for tab heading */
var TabHeadingDirective = /** @class */ (function () {
    function TabHeadingDirective(templateRef, tab) {
        tab.headingRef = templateRef;
    }
    TabHeadingDirective.decorators = [
        { type: core.Directive, args: [{ selector: '[hxTabHeading]' },] },
    ];
    /** @nocollapse */
    TabHeadingDirective.ctorParameters = function () { return [
        { type: core.TemplateRef, },
        { type: TabDirective, },
    ]; };
    return TabHeadingDirective;
}());

var TabsModule = /** @class */ (function () {
    function TabsModule() {
    }
    TabsModule.forRoot = function () {
        return {
            ngModule: TabsModule,
            providers: [TabsetConfig]
        };
    };
    TabsModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    declarations: [NgTranscludeDirective, TabDirective, TabsetComponent, TabHeadingDirective],
                    exports: [TabDirective, TabsetComponent, TabHeadingDirective, NgTranscludeDirective]
                },] },
    ];
    /** @nocollapse */
    TabsModule.ctorParameters = function () { return []; };
    return TabsModule;
}());

var TooltipContentComponent = /** @class */ (function () {
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
        if (nativeEl.currentStyle)
            // IE
            return nativeEl.currentStyle[cssProp];
        if (window.getComputedStyle)
            return window.getComputedStyle(nativeEl)[cssProp];
        // finally try and get inline style
        return nativeEl.style[cssProp];
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
    TooltipContentComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'hx-tooltip-content',
                    // changeDetection: ChangeDetectionStrategy.OnPush,
                    template: "\n        <div class=\"hx-tooltip is-{{ placement }}\"\n             [style.top]=\"top + 'px'\"\n             [style.left]=\"left + 'px'\"\n             [class.is-active]=\"active\"\n             role=\"tooltip\">\n            <div class=\"hx-tooltip-content\">\n                <ng-content></ng-content>\n                {{ content }}\n            </div> \n        </div>\n"
                },] },
    ];
    /** @nocollapse */
    TooltipContentComponent.ctorParameters = function () { return [
        { type: core.ElementRef, },
        { type: core.ChangeDetectorRef, },
    ]; };
    TooltipContentComponent.propDecorators = {
        "hostElement": [{ type: core.Input },],
        "content": [{ type: core.Input },],
        "placement": [{ type: core.Input },],
        "animation": [{ type: core.Input },],
    };
    return TooltipContentComponent;
}());

/** Default values provider for tooltip */
var TooltipConfig = /** @class */ (function () {
    function TooltipConfig() {
        /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
        this.placement = 'bottom';
        /** should tooltip start in a disabled state */
        this.disabled = false;
        /** animate tooltip or not */
        this.animation = true;
    }
    TooltipConfig.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    TooltipConfig.ctorParameters = function () { return []; };
    return TooltipConfig;
}());

var TooltipDirective = /** @class */ (function () {
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
            this.tooltip.instance.content = this.content;
            this.tooltip.instance.placement = this.placement;
            this.tooltip.instance.animation = this.animation;
        }
        else {
            var tooltip = this.content;
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
            this.content.hide();
    };
    TooltipDirective.decorators = [
        { type: core.Directive, args: [{
                    selector: '[hxTooltip]'
                },] },
    ];
    /** @nocollapse */
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
        "show": [{ type: core.HostListener, args: ['focusin',] }, { type: core.HostListener, args: ['mouseenter',] },],
        "hide": [{ type: core.HostListener, args: ['focusout',] }, { type: core.HostListener, args: ['mouseleave',] },],
    };
    return TooltipDirective;
}());

var TooltipModule = /** @class */ (function () {
    function TooltipModule() {
    }
    TooltipModule.forRoot = function () { return { ngModule: TooltipModule, providers: [TooltipConfig] }; };
    TooltipModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    declarations: [TooltipContentComponent, TooltipDirective],
                    exports: [TooltipContentComponent, TooltipDirective],
                    entryComponents: [TooltipContentComponent]
                },] },
    ];
    /** @nocollapse */
    TooltipModule.ctorParameters = function () { return []; };
    return TooltipModule;
}());

/* tslint:disable:max-file-line-count */
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
    // Regex: capture the whole query string and replace it with the string
    // that will be used to match the results, for example if the capture is
    // 'a' the result will be \a
    return queryToEscape.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
}
/* tslint:disable */
function tokenize(str, wordRegexDelimiters, phraseRegexDelimiters) {
    if (wordRegexDelimiters === void 0) { wordRegexDelimiters = ' '; }
    if (phraseRegexDelimiters === void 0) { phraseRegexDelimiters = ''; }
    /* tslint:enable */
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
    for (var _i = 0, propertiesArray_1 = propertiesArray; _i < propertiesArray_1.length; _i++) {
        var property = propertiesArray_1[_i];
        if (property in object) {
            object = object[property];
        }
    }
    return object.toString();
}

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
        /** minimal no of characters that needs to be entered before typeahead kicks-in. When set to 0, typeahead shows on focus with full list of options (limited as normal by typeaheadOptionsLimit) */
        this.typeaheadMinLength = void 0;
        /** should be used only in case of typeahead attribute is array. If true - loading of options will be async, otherwise - sync. true make sense if options array is large. */
        this.typeaheadAsync = void 0;
        /** match latin symbols. If true the word súper would match super and vice versa. */
        this.typeaheadLatinize = true;
        /** break words with spaces. If true the text "exact phrase" here match would match with match exact phrase here but not with phrase here exact match (kind of "google style"). */
        this.typeaheadSingleWords = true;
        /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to break words. Defaults to space. */
        this.typeaheadWordDelimiters = ' ';
        /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to match exact phrase. Defaults to simple and double quotes. */
        this.typeaheadPhraseDelimiters = '\'"';
        /** fired when 'busy' state of this component was changed, fired on async mode only, returns boolean */
        this.typeaheadLoading = new core.EventEmitter();
        /** fired on every key event and returns true in case of matches are not detected */
        this.typeaheadNoResults = new core.EventEmitter();
        /** fired when option was selected, return object with data of this option */
        this.typeaheadOnSelect = new core.EventEmitter();
        /** fired when blur event occurres. returns the active item */
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
        // no container - no problems
        if (!this._container) {
            return;
        }
        // if items is visible - prevent form submition
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
        // async should be false in case of array
        if (this.typeaheadAsync === undefined && !(this.typeahead instanceof Observable$1.Observable)) {
            this.typeaheadAsync = false;
        }
        if (this.typeahead instanceof Observable$1.Observable) {
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
        this.ngControl.control.setValue(valueStr);
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
        // This improves the speed as it won't have to be done for each list item
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
            return Observable$1.Observable.from(_this.typeahead)
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
        // If singleWords, break model here to not be doing extra work on each
        // iteration
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
            // This improves the speed as it won't have to be done for each list item
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
            // extract all group names
            var groups = limited
                .map(function (option) { return getValueFromObject(option, _this.typeaheadGroupField); })
                .filter(function (v, i, a) { return a.indexOf(v) === i; });
            groups.forEach(function (group) {
                // add group header to array of matches
                // add group header to array of matches
                matches_1.push(new TypeaheadMatch(group, group, true));
                // add each item of group to array of matches
                // add each item of group to array of matches
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
    TypeaheadDirective.decorators = [
        { type: core.Directive, args: [{ selector: '[typeahead]', exportAs: 'hx-typeahead' },] },
    ];
    /** @nocollapse */
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
    return TypeaheadDirective;
}());

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
        // Replaces the capture string with the same string inside of a "strong" tag
        if (typeof query === 'object') {
            var queryLen = query.length;
            for (var i = 0; i < queryLen; i += 1) {
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
        setTimeout(function () {
            return _this.parent.typeaheadOnSelect.emit(value);
        }, 0);
        return false;
    };
    TypeaheadContainerComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'hx-typeahead-container',
                    // tslint:disable-next-line
                    template: "\n<!-- inject options list template -->\n<ng-template [ngTemplateOutlet]=\"optionsListTemplate || optionListTemplate\"\n  [ngTemplateOutletContext]=\"{matches:matches, itemTemplate:itemTemplate, query:query}\"></ng-template>\n\n<!-- default options item template -->\n<ng-template #hxItemTemplate let-match=\"match\" let-query=\"query\"><span [innerHtml]=\"hightlight(match, query)\"></span></ng-template>\n\n<!-- options list template -->\n<ng-template #optionListTemplate >\n<ng-template ngFor let-match let-i=\"index\" [ngForOf]=\"matches\">\n   <h6 *ngIf=\"match.isHeader()\" class=\"hx-dropdown-header\">{{match}}</h6>\n   \n   <ng-template [ngIf]=\"!match.isHeader()\">\n      <a href=\"#\"\n        class=\"hx-dropdown-item\"\n        (click)=\"selectMatch(match, $event)\"\n        (mouseenter)=\"selectActive(match)\"\n        [class.active]=\"isActive(match)\">\n          <ng-template [ngTemplateOutlet]=\"itemTemplate || hxItemTemplate\" \n            [ngTemplateOutletContext]=\"{item:match.item, index:i, match:match, query:query}\"></ng-template>\n      </a>\n  </ng-template>\n</ng-template>\n</ng-template>\n",
                    // tslint:disable
                    host: {
                        'class': 'hx-dropdown is-open hx-dropdown-menu',
                        style: 'position: absolute;display: block;'
                    },
                    // tslint: enable
                    encapsulation: core.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    TypeaheadContainerComponent.ctorParameters = function () { return [
        { type: core.ElementRef, },
    ]; };
    TypeaheadContainerComponent.propDecorators = {
        "focusLost": [{ type: core.HostListener, args: ['mouseleave',] }, { type: core.HostListener, args: ['blur',] },],
    };
    return TypeaheadContainerComponent;
}());

var TypeaheadModule = /** @class */ (function () {
    function TypeaheadModule() {
    }
    TypeaheadModule.forRoot = function () {
        return {
            ngModule: TypeaheadModule,
            providers: [ComponentLoaderFactory, PositioningService]
        };
    };
    
    TypeaheadModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [common.CommonModule],
                    declarations: [TypeaheadContainerComponent, TypeaheadDirective],
                    exports: [TypeaheadContainerComponent, TypeaheadDirective],
                    entryComponents: [TypeaheadContainerComponent]
                },] },
    ];
    /** @nocollapse */
    TypeaheadModule.ctorParameters = function () { return []; };
    return TypeaheadModule;
}());

(function (TabularSize) {
    TabularSize[TabularSize["Default"] = 0] = "Default";
    TabularSize[TabularSize["Small"] = 1] = "Small";
    TabularSize[TabularSize["Large"] = 2] = "Large";
})(exports.TabularSize || (exports.TabularSize = {}));

var ITabularConfig = /** @class */ (function () {
    function ITabularConfig() {
    }
    return ITabularConfig;
}());

(function (TabularColumnTypes) {
    TabularColumnTypes[TabularColumnTypes["String"] = 0] = "String";
    TabularColumnTypes[TabularColumnTypes["Icon"] = 1] = "Icon";
    TabularColumnTypes[TabularColumnTypes["Date"] = 2] = "Date";
    TabularColumnTypes[TabularColumnTypes["Actions"] = 3] = "Actions";
    TabularColumnTypes[TabularColumnTypes["Status"] = 4] = "Status";
    TabularColumnTypes[TabularColumnTypes["DateTime"] = 5] = "DateTime";
    TabularColumnTypes[TabularColumnTypes["Checkbox"] = 6] = "Checkbox";
})(exports.TabularColumnTypes || (exports.TabularColumnTypes = {}));
var ITabularColumn = /** @class */ (function () {
    function ITabularColumn() {
    }
    return ITabularColumn;
}());

var TabularColumn = /** @class */ (function () {
    function TabularColumn(id, label, dataType, sortable, cssClass) {
        if (cssClass === void 0) { cssClass = ''; }
        this.id = id;
        this.label = label;
        this.dataType = dataType;
        this.sortable = sortable;
        this.cssClass = cssClass;
    }
    return TabularColumn;
}());

(function (ActionConfigRouteType) {
    ActionConfigRouteType[ActionConfigRouteType["Default"] = 0] = "Default";
    ActionConfigRouteType[ActionConfigRouteType["Callback"] = 1] = "Callback";
})(exports.ActionConfigRouteType || (exports.ActionConfigRouteType = {}));
var IActionsConfig = /** @class */ (function () {
    function IActionsConfig() {
    }
    return IActionsConfig;
}());

(function (OrderByDirection) {
    OrderByDirection[OrderByDirection["Ascending"] = 0] = "Ascending";
    OrderByDirection[OrderByDirection["Descending"] = 1] = "Descending";
    OrderByDirection[OrderByDirection["None"] = 2] = "None";
})(exports.OrderByDirection || (exports.OrderByDirection = {}));
var TabularOrderByService = /** @class */ (function () {
    function TabularOrderByService() {
    }
    TabularOrderByService._orderByComparator = function (a, b) {
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase())
                return -1;
            if (a.toLowerCase() > b.toLowerCase())
                return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b))
                return -1;
            if (parseFloat(a) > parseFloat(b))
                return 1;
        }
        return 0; //equal each other
    };
    TabularOrderByService.prototype.doTransform = function (data, _a) {
        var _b = _a[0], config = _b === void 0 ? '+' : _b;
        if (!Array.isArray(data))
            return data;
        if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
            var propertyToCheck = !Array.isArray(config) ? config : config[0];
            var desc_1 = propertyToCheck.substr(0, 1) == '-';
            // Basic array
            if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                return !desc_1 ? data.sort() : data.sort().reverse();
            }
            else {
                var property_1 = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
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
            // Loop over property of the array in order and sort
            return data.sort(function (a, b) {
                for (var i = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];
                    var comparison = !desc
                        ? TabularOrderByService._orderByComparator(a[property], b[property])
                        : -TabularOrderByService._orderByComparator(a[property], b[property]);
                    // Don't return 0 yet in case of needing to sort by next property
                    if (comparison !== 0)
                        return comparison;
                }
                return 0; // equal each other
            });
        }
    };
    TabularOrderByService.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    TabularOrderByService.ctorParameters = function () { return []; };
    return TabularOrderByService;
}());

/**
 * Configuration service, provides default values for the NavComponent.
 */
var TabularConfig = /** @class */ (function () {
    function TabularConfig() {
        /**
             * Tabular configuration
             * IPaginationInstance, ISearchConfig
             */
        this.config = {
            size: exports.TabularSize.Default,
            pagination: {
                itemsPerPage: 5,
                currentPage: 1
            },
        };
        /**
             * Default order by value
             * @type {string[]}
             */
        this.defaultOrderBy = ['id'];
        /**
             * Default order by direction
             * @type OrderByDirection
             */
        this.defaultOrderByDirection = exports.OrderByDirection.Ascending;
    }
    TabularConfig.decorators = [
        { type: core.Injectable },
    ];
    /** @nocollapse */
    TabularConfig.ctorParameters = function () { return []; };
    return TabularConfig;
}());

var TabularComponent = /** @class */ (function () {
    function TabularComponent(conf, orderByService) {
        var _this = this;
        this.conf = conf;
        this.orderByService = orderByService;
        /**
           * Event fired when refresh is called.
           * Host should refresh data of input.
           * @type {EventEmitter<any>}
           */
        this.refresh = new core.EventEmitter();
        this.defaultOrderBy = ['id'];
        this.selectAll = false;
        /**
           * Order by used by orderBy service
           * @example *ngFor="#person of people | orderBy : ['-age', 'firstName']"
           * @example *ngFor="#person of people | orderBy : ['+age', 'firstName']"
           */
        this.orderBy = this.defaultOrderBy;
        this.toggleSelectAll = function () {
            for (var i = 0; i < _this.rows.length; i++) {
                _this.rows[i].selected = _this.selectAll;
            }
        };
        this.toggleIndividualSelect = function () {
            var count = 0;
            for (var i = 0; i < _this.rows.length; i++) {
                if (_this.rows[i].selected) {
                    count++;
                }
            }
            _this.selectAll = (_this.rows.length === count);
        };
        Object.assign(this, conf);
    }
    Object.defineProperty(TabularComponent.prototype, "config", {
        get: /**
           * Tabular configuration
           * IPaginationInstance, ISearchConfig
           */
        function () {
            return this._config;
        },
        set: function (c) {
            this._config = c;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabularComponent.prototype, "callback", {
        get: /** The function to call when a action item is clicked **/
        function () {
            return this._callback;
        },
        set: function (Fn) {
            this._callback = Fn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TabularComponent.prototype, "searchTerm", {
        get: /**
           * Search term is used in the simple search pipe
           * Array of objects: *ngFor="#row of rows | simpleSearch : 'the search term'"
           */
        function () {
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
        this.setPage();
    };
    Object.defineProperty(TabularComponent.prototype, "iconDirection", {
        get: function () {
            return (this.defaultOrderByDirection === exports.OrderByDirection.Ascending) ? 'icon-sort-asc' : 'icon-sort-desc';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Calls the parsed callback with optional arguments
     * @param event
     * @param cb
     * @returns {boolean}
     */
    /**
       * Calls the parsed callback with optional arguments
       * @param event
       * @param cb
       * @returns {boolean}
       */
    TabularComponent.prototype.executeCallback = /**
       * Calls the parsed callback with optional arguments
       * @param event
       * @param cb
       * @returns {boolean}
       */
    function (event, cb) {
        if (cb.length) {
            if (cb.length === 1) {
                // if callback has no arguments
                cb[0]();
            }
            else {
                // if callback has 1 or more arguments
                var args = [];
                for (var i = 1; i < cb.length; i++) {
                    args.push(cb[i]);
                }
                cb[0].apply(this, args);
            }
        }
        return false;
    };
    TabularComponent.prototype.setPage = function ($event) {
        if ($event === void 0) { $event = {
            page: this.config.pagination.currentPage,
            itemsPerPage: this.config.pagination.itemsPerPage
        }; }
        this.config.pagination.currentPage = $event.page;
        // calculate start and end page item indexes
        var startIndex = (this.config.pagination.currentPage - 1) * this.config.pagination.itemsPerPage;
        var endIndex = Math.min(startIndex + this.config.pagination.itemsPerPage - 1, this.totalItemCount - 1);
        this.pagedItems = this.rows.slice(startIndex, endIndex + 1);
    };
    /**
     * Get the action tooltip if it exists
     * @param action
     * @returns {string}
       */
    /**
       * Get the action tooltip if it exists
       * @param action
       * @returns {string}
         */
    TabularComponent.prototype.getActionTooltip = /**
       * Get the action tooltip if it exists
       * @param action
       * @returns {string}
         */
    function (action) {
        return (action && action.disabledConfig) ? action.disabledConfig.tooltip : '';
    };
    TabularComponent.prototype.getActionDisabledState = function (action) {
        return (action && action.disabledConfig) ? action.disabledConfig.disabled : false;
    };
    /**
     * Handles the column header click event.
     * @param key
     */
    /**
       * Handles the column header click event.
       * @param key
       */
    TabularComponent.prototype.onSortClickHandler = /**
       * Handles the column header click event.
       * @param key
       */
    function (key) {
        this.orderBy = ([key] === this.orderBy) ? this.defaultOrderBy : [key];
        this.orderByData();
    };
    /**
     * Order collection via full collection and not via pipe.
     * The pagination pipe will only return the paginated amount.
     * Which means the order by filter will only be applied to whats paginated
     * and not the full collection.
     */
    /**
       * Order collection via full collection and not via pipe.
       * The pagination pipe will only return the paginated amount.
       * Which means the order by filter will only be applied to whats paginated
       * and not the full collection.
       */
    TabularComponent.prototype.orderByData = /**
       * Order collection via full collection and not via pipe.
       * The pagination pipe will only return the paginated amount.
       * Which means the order by filter will only be applied to whats paginated
       * and not the full collection.
       */
    function () {
        var direction;
        if (this.defaultOrderByDirection === exports.OrderByDirection.Ascending) {
            direction = '-';
            this.defaultOrderByDirection = exports.OrderByDirection.Descending;
        }
        else {
            direction = '+';
            this.defaultOrderByDirection = exports.OrderByDirection.Ascending;
        }
        this.orderByService.doTransform(this.rows, [direction + this.orderBy[0]]);
        this.setPage();
    };
    Object.defineProperty(TabularComponent.prototype, "totalItemCount", {
        get: function () {
            return this.rows.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Helper to determine if tabular instance is in small mode
     * @returns {boolean}
     */
    /**
       * Helper to determine if tabular instance is in small mode
       * @returns {boolean}
       */
    TabularComponent.prototype.isSmall = /**
       * Helper to determine if tabular instance is in small mode
       * @returns {boolean}
       */
    function () {
        return (this.config.size === exports.TabularSize.Small);
    };
    TabularComponent.decorators = [
        { type: core.Component, args: [{
                    selector: 'hx-tabular',
                    template: "<table class=\"tabular hx-table is-striped\">\n    <thead>\n    <tr>\n      <th *ngFor=\"let col of columns\" class=\"{{col.cssClass}} tabular__{{col.label}}\" [ngClass]=\"{'tabular__checkboxes': col.dataType === 6}\">\n\n        <!-- sortable column -->\n        <a class=\"tabular__sorter\" *ngIf=\"col.sortable && col.dataType != 6\" (click)=\"onSortClickHandler(col.id)\">{{col.label}}<i class=\"icon {{iconDirection}}\" *ngIf=\"orderBy == col.id\"></i></a>\n\n        <!-- non sortable column -->\n        <span *ngIf=\"!col.sortable && col.dataType != 6\">{{col.label}}</span>\n\n        <!-- checkbox column -->\n        <div *ngIf=\"col.dataType == 6\" class=\"hx-checkbox-control\">\n          <input id=\"selectAll\" name=\"selectAll\" type=\"checkbox\" class=\"hx-checkbox\" (change)=\"toggleSelectAll($event)\" title=\"Select All\" [(ngModel)]=\"selectAll\" />\n          <label for=\"selectAll\" class=\"hx-label\"></label>\n        </div>\n      </th>\n    </tr>\n    </thead>\n\n    <tbody>\n    <!--<tr *ngFor=\"let row of rows | paginate: config.pagination | simpleSearch: searchTerm\">-->\n    <tr *ngFor=\"let row of pagedItems | simpleSearch: searchTerm\">\n      <td *ngFor=\"let col of columns\" class=\"{{col.cssClass}} tabular__{{col.label}}\" [ngClass]=\"{'tabular__checkboxes': col.dataType === 6}\">\n\n        <!-- string type -->\n        <span *ngIf=\"col.dataType == 0\">{{row[col.id]}}</span>\n\n        <!-- icon type -->\n        <i *ngIf=\"col.dataType == 1\" class=\"icon {{row[col.id]}}\"></i>\n\n        <!-- date type -->\n        <span *ngIf=\"col.dataType == 2\">{{row[col.id] | date}}</span>\n\n        <!-- status type -->\n        <span *ngIf=\"col.dataType == 4\" class=\"hx-badge text-uppercase\" [ngClass]=\"{'is-primary':row[col.id],'is-danger':!row[col.id]}\">{{(row[col.id])?'ACTIVE':'INACTIVE'}}</span>\n\n        <!-- date time type -->\n        <span *ngIf=\"col.dataType == 5\">{{row[col.id] | date:'medium'}}</span>\n\n        <!-- actions type -->\n        <div *ngIf=\"col.dataType==3\" class=\"hx-dropdown tabularActions\">\n\n\n          <div class=\"tabularActions__action\">\n            <div class=\"hx-dropdown\" hxDropdown [isRight]=\"true\">\n\n              <button class=\"hx-button is-small hx-button-dropdown\" hxDropdownToggle type=\"button\">\n                <i class=\"icon icon-more\"></i>\n              </button>\n              <div class=\"hx-dropdown-menu\" *hxDropdownMenu>\n\n                <ng-container *ngFor=\"let action of row[col.id]\">\n                  <a *ngIf=\"!getActionDisabledState(action) && action.routeType==0\"\n                     [routerLink]=\"action.route\"\n                     class=\"hx-dropdown-item {{action.css}}\"\n                     [innerHTML]=\"action.label\">\n                  </a>\n                  <a *ngIf=\"!getActionDisabledState(action) && action.routeType==1\"\n                     (click)='executeCallback($event,action.callback)'\n                     class=\"hx-dropdown-item {{action.css}}\"\n                     [innerHTML]=\"action.label\">\n                  </a>\n                </ng-container>\n\n              </div>\n\n            </div>\n\n          </div>\n        </div>\n\n        <!-- checkbox type -->\n        <div *ngIf=\"col.dataType == 6\" class=\"hx-checkbox-control\">\n          <input id=\"checkbox-{{row.id}}\" name=\"{{col.label}}-checkbox\" type=\"checkbox\" class=\"hx-checkbox\" title=\"{{col.label}}\" (change)=\"toggleIndividualSelect($event)\" [(ngModel)]=\"row.selected\" />\n          <label for=\"checkbox-{{row.id}}\" class=\"hx-label\"></label>\n        </div>\n\n      </td>\n    </tr>\n    </tbody>\n  </table>\n\n  <hx-pagination [directionLinks]=\"true\" [boundaryLinks]=\"true\" [rotate]=\"false\" [maxSize]=\"10\"\n                 [totalItems]=\"totalItemCount\" [itemsPerPage]=\"config.pagination.itemsPerPage\"\n                 [(ngModel)]=\"config.pagination.currentPage\" (pageChanged)=\"setPage($event)\"></hx-pagination>\n  ",
                    styles: [
                        '.tabular__sorter{position:relative;cursor:pointer} th .icon{position: absolute;}',
                        '.tabular__checkboxes{width:2%;}',
                        '.tabular__checkboxes .hx-checkbox-control{margin:0;display:flex;}'
                    ]
                },] },
    ];
    /** @nocollapse */
    TabularComponent.ctorParameters = function () { return [
        { type: TabularConfig, },
        { type: TabularOrderByService, },
    ]; };
    TabularComponent.propDecorators = {
        "columns": [{ type: core.Input },],
        "rows": [{ type: core.Input },],
        "config": [{ type: core.Input },],
        "callback": [{ type: core.Input },],
        "searchTerm": [{ type: core.Input },],
        "refresh": [{ type: core.Output },],
    };
    return TabularComponent;
}());

/**
 * Example use
 * Array of objects: *ngFor="#row of rows | simpleSearch : 'the search term'"
 */
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
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(function (item) { return (args) ? _this.searchValue(item, args.toString()) : item; });
    };
    SimpleSearchPipe.decorators = [
        { type: core.Pipe, args: [{
                    name: 'simpleSearch',
                    pure: false
                },] },
    ];
    /** @nocollapse */
    SimpleSearchPipe.ctorParameters = function () { return []; };
    return SimpleSearchPipe;
}());

var TabularModule = /** @class */ (function () {
    function TabularModule() {
    }
    TabularModule.forRoot = function () { return { ngModule: TabularModule, providers: [TabularOrderByService, TabularConfig] }; };
    TabularModule.decorators = [
        { type: core.NgModule, args: [{
                    declarations: [
                        TabularComponent,
                        SimpleSearchPipe
                    ],
                    imports: [
                        common.CommonModule,
                        platformBrowser.BrowserModule,
                        http.HttpModule,
                        router.RouterModule,
                        PaginationModule,
                        TooltipModule,
                        DropdownModule,
                        forms.FormsModule
                    ],
                    providers: [
                        TabularOrderByService,
                        TabularConfig
                    ],
                    exports: [
                        TabularComponent
                    ],
                    schemas: [core.CUSTOM_ELEMENTS_SCHEMA]
                },] },
    ];
    /** @nocollapse */
    TabularModule.ctorParameters = function () { return []; };
    return TabularModule;
}());

var TypeaheadOptions = /** @class */ (function () {
    function TypeaheadOptions(options) {
        Object.assign(this, options);
    }
    return TypeaheadOptions;
}());

/*tslint:disable:no-invalid-this */
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
/* tslint:enable */

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
            value: value,
            next: undefined,
            previous: undefined
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
    // Array methods overriding start
    // Array methods overriding start
    LinkedList.prototype.push = 
    // Array methods overriding start
    function () {
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

/*tslint:disable */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * JS version of browser APIs. This library can only run in the browser.
 */
var win = typeof window !== 'undefined' && window || {};
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
    // source: https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
    // source: https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
    Utils.getStyles = 
    // source: https://github.com/jquery/jquery/blob/master/src/css/var/getStyles.js
    function (elem) {
        // Support: IE <=11 only, Firefox <=30 (#15098, #14150)
        // IE throws on elements created in popups
        // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
            view = win;
        }
        return view.getComputedStyle(elem);
    };
    return Utils;
}());

/* tslint:disable: max-classes-per-file */
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
    HxUiModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [
                        DropdownModule.forRoot(), ModalModule.forRoot(), PaginationModule.forRoot(),
                        TabsModule.forRoot(), TooltipModule.forRoot(),
                        TypeaheadModule.forRoot(), TabularModule.forRoot()
                    ],
                    exports: [
                        DropdownModule, ModalModule, PaginationModule,
                        TabsModule, TooltipModule,
                        TypeaheadModule, TabularModule
                    ]
                },] },
    ];
    /** @nocollapse */
    HxUiModule.ctorParameters = function () { return []; };
    return HxUiModule;
}());

exports.HxUiModule = HxUiModule;
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
exports.ModalContainer = ModalContainer;
exports.Modal = Modal;
exports.ModalService = ModalService;
exports.ModalPlaceholderComponent = ModalPlaceholderComponent;
exports.ModalModule = ModalModule;
exports.ModalBackdropComponent = ModalBackdropComponent;
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
exports.IActionsConfig = IActionsConfig;
exports.ITabularColumn = ITabularColumn;
exports.TabularColumn = TabularColumn;
exports.ITabularConfig = ITabularConfig;
exports.TabularConfig = TabularConfig;
exports.TabularOrderByService = TabularOrderByService;

Object.defineProperty(exports, '__esModule', { value: true });

})));
