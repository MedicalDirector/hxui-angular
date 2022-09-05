import { Component, OnInit } from '@angular/core';
import { OnlineStatusService } from '@hxui/angular';

@Component({
  selector: 'eg-basic-online-status',
  template: `
    <div class="hx-card">
      <div class="hx-card-content">
        <p style="display: inline-block">App is currently:</p>
        <span
          class="hx-badge"
          [class.is-primary]="isOnline"
          [class.is-danger]="!isOnline"
        >
          <span class="hx-badge-content">{{
            isOnline ? 'Online' : 'Offline'
          }}</span>
        </span>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ExampleBasicOnlineStatusComponent implements OnInit {
  isOnline = true;

  constructor(private _onlineStatusService: OnlineStatusService) {}

  ngOnInit() {
    this._onlineStatusService.online$.subscribe(() => {
      this.isOnline = true;
    });
    this._onlineStatusService.offline$.subscribe(() => {
      this.isOnline = false;
    });
  }
}
