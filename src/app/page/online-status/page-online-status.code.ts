import { Code } from 'src/app/shared/page-base/page-base.model';

export class PageOnlineStatusCode {
  usage: Code = {
    lang: ['ts'],
    text: `import {HxUiModule} from "@hxui/angular";

@NgModule({
  imports: [HxUiModule.forRoot(),...]
})
export class AppModule {}
`,
  };

  egBasicHTML: Code = {
    lang: ['ts'],
    text: `<div class="hx-card">
  <div class="hx-card-content">
    <p>App is currently:</p>
    <span
      class="hx-badge"
      [class.is-primary]="isOnline"
      [class.is-danger]="!isOnline"
    >
      <span class="hx-badge-content"
        >{{ (isOnline)? 'Online' : 'Offline' }}</span
      >
    </span>
  </div>
</div>   
`,
  };

  egBasicTS: Code = {
    lang: ['ts'],
    text: `import { Component, OnInit } from '@angular/core';
import { OnlineStatusService } from '@hxui/angular';

@Component({
  selector: 'app-myfeature',
  templateUrl: './myfeature.component.html',
})
export class MyFeatureComponent implements OnInit {

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
`,
  };
}
