import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  OriginConnectionPosition,
  Overlay,
  OverlayConnectionPosition,
  OverlayRef,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { from, Observable, Subject } from 'rxjs';
import {
  debounceTime,
  filter,
  mergeMap,
  take,
  takeUntil,
  toArray
} from 'rxjs/operators';
import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadMatch } from './typeahead-match.class';
import { getValueFromObject, latinize, tokenize } from './typeahead-utils';

@Directive({ selector: '[hxaTypeahead]', exportAs: 'hx-typeahead' })
export class TypeaheadDirective implements OnInit, OnDestroy {
  /** options source, can be Array of strings, objects or an Observable for external matching process */
  @Input() public hxaTypeahead: any;
  /** minimal no of characters that needs to be entered before typeahead kicks-in. When set to 0, typeahead shows on focus with full list of options (limited as normal by typeaheadOptionsLimit) */
  @Input() public typeaheadMinLength: number = void 0;
  /** minimal wait time after last character typed before typeahead kicks-in */
  @Input() public typeaheadWaitMs: number;
  /** maximum length of options items list */
  @Input() public typeaheadOptionsLimit: number;
  /** when options source is an array of objects, the name of field that contains the options value, we use array item as option in case of this field is missing. Supports nested properties and methods. */
  @Input() public typeaheadOptionField: string;
  /** when options source is an array of objects, the name of field that contains the group value, matches are grouped by this field when set. */
  @Input() public typeaheadGroupField: string;
  /** should be used only in case of typeahead attribute is array. If true - loading of options will be async, otherwise - sync. true make sense if options array is large. */
  @Input() public typeaheadAsync: boolean = void 0;
  /** match latin symbols. If true the word súper would match super and vice versa. */
  @Input() public typeaheadLatinize = true;
  /** break words with spaces. If true the text "exact phrase" here match would match with match exact phrase here but not with phrase here exact match (kind of "google style"). */
  @Input() public typeaheadSingleWords = true;
  /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to break words. Defaults to space. */
  @Input() public typeaheadWordDelimiters = ' ';
  /** should be used only in case typeaheadSingleWords attribute is true. Sets the word delimiter to match exact phrase. Defaults to simple and double quotes. */
  @Input() public typeaheadPhraseDelimiters = '\'"';
  /** used to specify a custom item template. Template variables exposed are called item and index; */
  @Input() public typeaheadItemTemplate: TemplateRef<any>;
  /** used to specify a custom options list template. Template variables: matches, itemTemplate, query */
  @Input() public optionsListTemplate: TemplateRef<any>;

  @Input()
  disabled: boolean;

  @Input()
  offsetY = 0;

  @Input()
  offsetX = 0;

  @Input()
  placement: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  @Input()
  maxWidthRelativeTo: string;

  @Input()
  minWidthRelativeTo: string;

  @Input()
  maxHeight = '20rem';

  /** fired when 'busy' state of this component was changed, fired on async mode only, returns boolean */
  @Output() public typeaheadLoading: EventEmitter<boolean> = new EventEmitter();
  /** fired on every key event and returns true in case of matches are not detected */
  @Output() public typeaheadNoResults: EventEmitter<boolean> =
    new EventEmitter();
  /** fired when option was selected, return object with data of this option */
  @Output() public typeaheadOnSelect: EventEmitter<TypeaheadMatch> =
    new EventEmitter();
  /** fired when blur event occurres. returns the active item */
  @Output() public typeaheadOnBlur: EventEmitter<any> = new EventEmitter();

  public isTypeaheadOptionsListActive = false;

  protected keyUpEventEmitter: EventEmitter<any> = new EventEmitter();
  protected _matches: TypeaheadMatch[];
  private _overlayRef: OverlayRef | null;
  private _typeaheadInstance: TypeaheadContainerComponent | null;
  private _portal: ComponentPortal<TypeaheadContainerComponent>;
  private readonly _destroyed = new Subject();

  @HostListener('keyup', ['$event'])
  public onChange(e: any): void {
    if (this._typeaheadInstance) {
      // up
      if (e.key === 'ArrowUp') {
        this._typeaheadInstance.prevActiveMatch();
        return;
      }

      // down
      if (e.key === 'ArrowDown') {
        this._typeaheadInstance.nextActiveMatch();
        return;
      }

      // enter
      if (e.key === 'Enter') {
        this._typeaheadInstance.selectActiveMatch();
        return;
      }
    }

    // For `<input>`s, use the `value` property. For others that don't have a
    // `value` (such as `<span contenteditable="true">`, use `innerText`.
    const value =
      e.target.value !== undefined ? e.target.value : e.target.innerText;
    if (value.trim().length >= this.typeaheadMinLength) {
      this.typeaheadLoading.emit(true);
      this.keyUpEventEmitter.emit(e.target.value);
    } else {
      this.typeaheadLoading.emit(false);
      this.typeaheadNoResults.emit(false);
      this.hide();
    }
  }

  @HostListener('focus')
  public onFocus(): void {
    if (this.typeaheadMinLength === 0) {
      this.typeaheadLoading.emit(true);
      this.keyUpEventEmitter.emit('');
    }
  }

  @HostListener('blur')
  public onBlur(): void {
    if (this._typeaheadInstance && !this._typeaheadInstance.isFocused) {
      this.typeaheadOnBlur.emit(this._typeaheadInstance.active);
      this.hide();
    }
  }

  @HostListener('keydown', ['$event'])
  public onKeydown(e: any): void {
    // no container - no problems
    if (!this._typeaheadInstance) {
      return;
    }

    // if items is visible - prevent form submition
    if (e.keyCode === 13) {
      e.preventDefault();
      return;
    }
  }

  public constructor(
    public ngControl: NgControl,
    public overlay: Overlay,
    private _ngZone: NgZone,
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit() {
    this.typeaheadOptionsLimit = this.typeaheadOptionsLimit || 20;
    this.typeaheadMinLength =
      this.typeaheadMinLength === void 0 ? 1 : this.typeaheadMinLength;
    this.typeaheadWaitMs = this.typeaheadWaitMs || 0;

    // async should be false in case of array
    if (
      this.typeaheadAsync === undefined &&
      !(this.hxaTypeahead instanceof Observable)
    ) {
      this.typeaheadAsync = false;
    }

    if (this.hxaTypeahead instanceof Observable) {
      this.typeaheadAsync = true;
    }

    if (this.typeaheadAsync) {
      this.asyncActions();
    } else {
      this.syncActions();
    }
  }

  public changeModel(match: TypeaheadMatch): void {
    const valueStr: string = match.value;
    this.ngControl.viewToModelUpdate(valueStr);
    (this.ngControl.control as FormControl).setValue(valueStr);
    this.hide();
  }

  public get matches(): any[] {
    return this._matches;
  }

  public show(delay = 0): void {
    if (this.disabled) {
      return;
    }

    const overlayRef = this._createOverlay();

    this._detach();
    this._portal =
      this._portal ||
      new ComponentPortal(TypeaheadContainerComponent, this._viewContainerRef);
    this._typeaheadInstance = overlayRef.attach(this._portal).instance;
    this._typeaheadInstance
      .afterHidden()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    this._updateContainer();
    this._setWidthsRelativeTo(overlayRef);
    this._typeaheadInstance!.show(delay);
    this._elementRef.nativeElement.focus();
  }

  public hide() {
    this._hide();
  }

  private _hide(delay = 0) {
    if (this._typeaheadInstance) {
      this._typeaheadInstance.hide(delay);
    }
  }

  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._typeaheadInstance = null;
    }
    this._destroyed.next(true);
    this._destroyed.complete();
  }

  protected asyncActions(): void {
    this.keyUpEventEmitter
      .pipe(
        debounceTime(this.typeaheadWaitMs),
        mergeMap(() => this.hxaTypeahead)
      )
      .subscribe(
        (matches: any[]) => {
          this.finalizeAsyncCall(matches);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  protected syncActions(): void {
    this.keyUpEventEmitter
      .pipe(
        debounceTime(this.typeaheadWaitMs),
        mergeMap((value: string) => {
          const normalizedQuery = this.normalizeQuery(value);

          return from(this.hxaTypeahead).pipe(
            filter((option: any) => {
              return (
                option &&
                this.testMatch(this.normalizeOption(option), normalizedQuery)
              );
            }),
            toArray()
          );
        })
      )
      .subscribe(
        (matches: any[]) => {
          this.finalizeAsyncCall(matches);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  protected normalizeOption(option: any): string {
    const optionValue: string = getValueFromObject(
      option,
      this.typeaheadOptionField
    );
    const normalizedOption = this.typeaheadLatinize
      ? latinize(optionValue)
      : optionValue;

    return normalizedOption.toLowerCase();
  }

  protected normalizeQuery(value: string): any {
    // If singleWords, break model here to not be doing extra work on each
    // iteration
    let normalizedQuery: any = (
      this.typeaheadLatinize ? latinize(value) : value
    )
      .toString()
      .toLowerCase();
    normalizedQuery = this.typeaheadSingleWords
      ? tokenize(
          normalizedQuery,
          this.typeaheadWordDelimiters,
          this.typeaheadPhraseDelimiters
        )
      : normalizedQuery;

    return normalizedQuery;
  }

  protected testMatch(match: string, test: any): boolean {
    let spaceLength: number;

    if (typeof test === 'object') {
      spaceLength = test.length;
      for (let i = 0; i < spaceLength; i += 1) {
        if (test[i].length > 0 && match.indexOf(test[i]) < 0) {
          return false;
        }
      }
      return true;
    } else {
      return match.indexOf(test) >= 0;
    }
  }

  protected finalizeAsyncCall(matches: any[]): void {
    this.prepareMatches(matches);

    this.typeaheadLoading.emit(false);
    this.typeaheadNoResults.emit(!this.hasMatches());

    if (!this.hasMatches()) {
      this.hide();
      return;
    }

    if (this._typeaheadInstance) {
      this._updateContainer();
    } else {
      this.show();
    }
  }

  protected prepareMatches(options: any[]): void {
    const limited: any[] = options.slice(0, this.typeaheadOptionsLimit);

    if (this.typeaheadGroupField) {
      let matches: TypeaheadMatch[] = [];

      // extract all group names
      const groups = limited
        .map((option: any) =>
          getValueFromObject(option, this.typeaheadGroupField)
        )
        .filter((v: string, i: number, a: any[]) => a.indexOf(v) === i);

      groups.forEach((group: string) => {
        // add group header to array of matches
        matches.push(new TypeaheadMatch(group, group, true));

        // add each item of group to array of matches
        matches = matches.concat(
          limited
            .filter(
              (option: any) =>
                getValueFromObject(option, this.typeaheadGroupField) === group
            )
            .map(
              (option: any) =>
                new TypeaheadMatch(
                  option,
                  getValueFromObject(option, this.typeaheadOptionField)
                )
            )
        );
      });

      this._matches = matches;
    } else {
      this._matches = limited.map(
        (option: any) =>
          new TypeaheadMatch(
            option,
            getValueFromObject(option, this.typeaheadOptionField)
          )
      );
    }
  }

  protected hasMatches(): boolean {
    return this._matches.length > 0;
  }

  private _createOverlay(): OverlayRef {
    if (this._overlayRef) {
      return this._overlayRef;
    }

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this._elementRef)
      .withFlexibleDimensions(false)
      .withDefaultOffsetX(this.offsetX)
      .withDefaultOffsetY(this.offsetY)
      .withPositions([
        { originX: 'start', originY: 'top', overlayX: 'start', overlayY: 'top' }
      ])
      .withTransformOriginOn('.hxa-dropdown-control');

    this._overlayRef = this.overlay.create({
      positionStrategy: positionStrategy,
      panelClass: [
        'hxui-reset',
        'hxa-dropdown-panel',
        'is-open',
        'is-fluid-min-width'
      ],
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop'
    });

    this._updatePosition();

    this._overlayRef
      .detachments()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._detach());

    this._overlayRef.backdropClick().subscribe(() => this.hide());

    const position = this._overlayRef.getConfig()
      .positionStrategy as FlexibleConnectedPositionStrategy;
    position.positionChanges.pipe(takeUntil(this._destroyed)).subscribe(pos => {
      if (pos.connectionPair.originX === 'start') {
        this.placement = 'left';
      } else if (pos.connectionPair.originX === 'end') {
        this.placement = 'right';
      } else if (pos.connectionPair.originY === 'top') {
        this.placement = 'top';
      } else if (pos.connectionPair.originY === 'bottom') {
        this.placement = 'bottom';
      }
    });

    return this._overlayRef;
  }

  private _setWidthsRelativeTo(overlayRef: OverlayRef) {
    if (this.maxWidthRelativeTo && this.minWidthRelativeTo) {
      const elem: Element = document.getElementById(this.maxWidthRelativeTo);
      overlayRef.updateSize({
        minWidth: elem.clientWidth,
        maxWidth: elem.clientWidth,
        maxHeight: this.maxHeight
      });
    } else if (this.maxWidthRelativeTo) {
      const elem: Element = document.getElementById(this.maxWidthRelativeTo);
      overlayRef.updateSize({
        maxWidth: elem.clientWidth,
        maxHeight: this.maxHeight
      });
    } else if (this.minWidthRelativeTo) {
      const elem: Element = document.getElementById(this.minWidthRelativeTo);
      overlayRef.updateSize({
        minWidth: elem.clientWidth,
        maxHeight: this.maxHeight
      });
    } else {
      overlayRef.updateSize({ maxHeight: this.maxHeight });
    }
  }

  private _updatePosition() {
    const position = this._overlayRef!.getConfig()
      .positionStrategy as FlexibleConnectedPositionStrategy;
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();

    position.withPositions([
      { ...origin.main, ...overlay.main },
      { ...origin.fallback, ...overlay.fallback }
    ]);
  }

  /**
   * Returns the origin position and a fallback position based on the user's position preference.
   * The fallback position is the inverse of the origin (e.g. `'bottom' -> 'top'`).
   */
  private _getOrigin(): {
    main: OriginConnectionPosition;
    fallback: OriginConnectionPosition;
  } {
    const placement = this.placement;
    let originPlacement: OriginConnectionPosition;

    if (placement === 'top' || placement === 'bottom') {
      originPlacement = {
        originX: 'center',
        originY: placement === 'top' ? 'top' : 'bottom'
      };
    } else if (placement === 'left') {
      originPlacement = { originX: 'start', originY: 'center' };
    } else if (placement === 'right') {
      originPlacement = { originX: 'end', originY: 'center' };
    } else {
      console.error('Position error', placement);
    }

    const { x, y } = this._invertPosition(
      originPlacement.originX,
      originPlacement.originY
    );

    return {
      main: originPlacement,
      fallback: { originX: x, originY: y }
    };
  }

  /** Returns the overlay position and a fallback position based on the user's preference */
  private _getOverlayPosition(): {
    main: OverlayConnectionPosition;
    fallback: OverlayConnectionPosition;
  } {
    const placement = this.placement;
    let overlayPlacement: OverlayConnectionPosition;

    if (placement === 'top') {
      overlayPlacement = { overlayX: 'center', overlayY: 'bottom' };
    } else if (placement === 'bottom') {
      overlayPlacement = { overlayX: 'center', overlayY: 'top' };
    } else if (placement === 'left') {
      overlayPlacement = { overlayX: 'end', overlayY: 'center' };
    } else if (placement === 'right') {
      overlayPlacement = { overlayX: 'start', overlayY: 'center' };
    } else {
      console.error('Could not find a position', placement);
    }

    const { x, y } = this._invertPosition(
      overlayPlacement.overlayX,
      overlayPlacement.overlayY
    );

    return {
      main: overlayPlacement,
      fallback: { overlayX: x, overlayY: y }
    };
  }

  private _invertPosition(
    x: HorizontalConnectionPos,
    y: VerticalConnectionPos
  ) {
    if (this.placement === 'top' || this.placement === 'bottom') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else {
      if (x === 'end') {
        x = 'start';
      } else if (x === 'start') {
        x = 'end';
      }
    }

    return { x, y };
  }

  private _detach() {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._typeaheadInstance = null;
  }

  /** Updates the container and repositions the overlay according to the new content length */
  private _updateContainer() {
    // Must wait for the content to be painted to the container so that the overlay can properly
    // calculate the correct positioning based on the size of its contents.
    if (this._typeaheadInstance) {
      this._typeaheadInstance.parent = this;
      this._typeaheadInstance.placement = this.placement;

      const normalizedQuery = (
        this.typeaheadLatinize
          ? latinize(this.ngControl.control.value)
          : this.ngControl.control.value
      )
        .toString()
        .toLowerCase();
      this._typeaheadInstance.query = this.typeaheadSingleWords
        ? tokenize(
            normalizedQuery,
            this.typeaheadWordDelimiters,
            this.typeaheadPhraseDelimiters
          )
        : normalizedQuery;
      this._typeaheadInstance.matches = this._matches;
      //this._typeaheadInstance.maxWidth = this.maxWidth;

      this._ngZone.onMicrotaskEmpty
        .asObservable()
        .pipe(take(1), takeUntil(this._destroyed))
        .subscribe(() => {
          if (this._typeaheadInstance) {
            this._overlayRef!.updatePosition();
          }
        });
    }
  }
}
