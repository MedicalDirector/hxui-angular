import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',

  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('500ms ease-in-out', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  ]
})

export class AppComponent {
  nav = true;
}
