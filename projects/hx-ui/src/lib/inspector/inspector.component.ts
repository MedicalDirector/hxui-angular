import {
  ApplicationRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, NgZone,
  OnInit, Output,
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { ComponentPortal, DomPortalOutlet} from '@angular/cdk/portal';
import {Subject} from 'rxjs/index';
import {InspectorSize} from './inspector-size.enum';


@Component({
  selector: 'hxa-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
  animations: [
    trigger('slide', [
      state('slideOut', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      state('slideIn',   style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('slideOut => slideIn', animate('200ms ease-in')),
      transition('slideIn => slideOut', animate('200ms ease-out')),
      transition('void => *', [
        style({ transform: 'translate3d(100%, 0, 0)' }),
        animate('200ms ease-in')
      ]),
    ]),
    trigger('size', [
      state('small', style({
        width: '37rem'
      })),
      state('large',   style({
        width: (document.documentElement.clientWidth - 100) + 'px'
      })),
      transition('small => large', animate('200ms ease-in')),
      transition('large => small', animate('200ms ease-out')),
      transition('void => *', [
        style({ width: '0'}),
        animate('200ms ease-in')
      ]),
    ])
  ]
})
export class InspectorComponent implements OnInit {

  onSlideInComplete$ = new Subject<boolean>();
  onSlideOutComplete$ = new Subject<boolean>();
  onResizeComplete$ = new Subject<InspectorSize>();
  componentPortal: ComponentPortal<any>;
  parameters: Object = {};
  state = 'slideOut';
  size = 'small';

  private portalHost: DomPortalOutlet;
  private animationCount = 0;

  constructor(private elementRef: ElementRef,
              private zone: NgZone,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              private appRef: ApplicationRef) { }

  ngOnInit() {
    this.attachComponent();
    this.slideIn();
  }

  close = () => {
    this.slideOut();
  }

  slideIn = () => {
    this.state = 'slideIn';
  }

  slideOut = () => {
    this.state = 'slideOut';
  }

  resize(size: InspectorSize) {
    this.size = (size === InspectorSize.Small) ? 'small' : 'large';
  }

  slideDone = ($event) => {

    // initial slide in done
    if ($event.fromState === 'void') {
      if (this.animationCount < 1) {
        this.animationCount++;
      } else {
        this.allAnimationsDone();
      }
    }

    // slide out done
    if ($event.fromState === 'slideIn' && $event.toState === 'slideOut') {
      this.onSlideOutComplete$.next(true);
    }
  }

  sizeDone = ($event) => {

    // initial size animation
    if ($event.fromState === 'void') {
      if (this.animationCount < 1) {
        this.animationCount++;
      } else {
        this.allAnimationsDone();
      }
    }

    // size done
    if (($event.fromState === 'small' && $event.toState === 'large') || ($event.fromState === 'large' && $event.toState === 'small')) {
      this.onResizeComplete$.next(($event.toState === 'large') ? InspectorSize.Large : InspectorSize.Small);
    }
  }

  allAnimationsDone() {
    this.animationCount = 0;
    this.onSlideInComplete$.next(true);
  }


  attachComponent() {
    // Create a portalHost from a DOM element
    this.portalHost = new DomPortalOutlet(
      this.elementRef.nativeElement.querySelector('.portalHost'),
      this.componentFactoryResolver,
      this.appRef,
      this.injector
    );

    // Attach portal to host
    const componentRef =  this.portalHost.attach(this.componentPortal);

    // pass the @Input parameters to the instance
    Object.assign(componentRef.instance, this.parameters);
  }

}
