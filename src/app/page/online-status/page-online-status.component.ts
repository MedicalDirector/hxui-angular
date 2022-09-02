import { Component, OnInit } from '@angular/core';
import { OnlineStatusService } from '@hxui/angular';
import { Contents } from 'src/app/shared/page-base/page-base.model';
import { PageOnlineStatusCode } from './page-online-status.code';

@Component({
  selector: 'app-page-online-status',
  templateUrl: './page-online-status.component.html',
  styles: [':host { display: contents; }'],
})
export class PageOnlineStatusComponent implements OnInit {
  code = new PageOnlineStatusCode();
  contents: Contents[] = [
    { text: 'Usage', link: 'usage' },
    { text: 'Basic example', link: 'example-basic' },
    { text: 'API reference', link: 'api' },
  ];

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
