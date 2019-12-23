import {Component, EventEmitter, NgZone, OnInit, Output, ViewChild} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import {Router} from '@angular/router';
import {ComponentPortal} from '@angular/cdk/portal';


@Component({
  selector: 'hxa-inspector',
  templateUrl: './inspector.component.html',
  styleUrls: ['./inspector.component.scss'],
  animations: [
    trigger('slide', [
      state('slideOut', style({
        transform: 'translateX(-100%)',
      })),
      state('slideIn',   style({
        transform: 'translateX(0)'
      })),
      transition('slideOut => slideIn', animate('200ms ease-in')),
      transition('slideIn => slideOut', animate('200ms ease-out')),
      transition('void => *', [
        style({transform: 'translateX(-100%)', width: '340px'}),
        animate('200ms ease-in')
      ]),
    ])
  ]
})
export class InspectorComponent implements OnInit {

  @ViewChild(InspectorComponent) inspectorComponent: InspectorComponent;
  @Output() onClose = new EventEmitter<boolean>();
  componentPortal: ComponentPortal<any>;

  public state = 'slideOut';
  constructor(private zone: NgZone) { }

  ngOnInit() {
    this.slideIn();
  }

  close = ($event) => {
    this.slideOut();
  }

  slideIn = () => {
    this.state = 'slideIn';
  }

  slideOut = () => {
    this.state = 'slideOut';
  }

  slideOutComplete = ($event) => {
    this.zone.run(() => {
      if ($event.fromState !== 'void') {
        this.onClose.emit(true);
      }
    });
  }

  slideInComplete = ($event) => {
    this.zone.run(() => {
      if ($event.fromState !== 'void') {
        this.onClose.emit(true);
      }
    });
  }

}
