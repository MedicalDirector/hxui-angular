import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { sidebar } from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-in-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition(':leave', [
        animate('500ms ease-in-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
  styles: [
    `
      :host {
        display: contents;
      }

      nav {
        grid-area: sidebar;
        position: sticky;
        max-height: 100vh;
        top: 0;
      }
    `,
  ],
})
export class SidebarComponent {
  navs = sidebar;

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
