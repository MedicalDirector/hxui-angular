export class OnlineStatusCode {

  usage =
    `
    import {HxUiModule} from "@hxui/angular";
    
    @NgModule({
      imports: [HxUiModule.forRoot(),...]
    })
    export class AppModule(){}

`;

  exampleTemplate =
    `
          <div class="hx-card">
            <div class="hx-card-content">
              <p>App is currently: </p>
              <span class="hx-badge" [class.is-primary]="isOnline" [class.is-danger]="!isOnline">
               <span class="hx-badge-content">{{ (isOnline)? 'Online' : 'Offline' }}</span>
            </span>
            </div>
          </div>
          
`;

  exampleTypescript =
    `
      import {Component, Inject, OnInit} from '@angular/core';
      import {OnlineStatusService} from '@hxui/angular';
      
      @Component({
        selector: 'app-online-status',
        templateUrl: './online-status.component.html',
      })
      export class OnlineStatusComponent implements OnInit {
      
        isOnline = true;
      
        constructor(private onlineStatusService: OnlineStatusService) {}
      
        ngOnInit() {
          this.onlineStatusService.online.subscribe((data) => {
            this.isOnline = true;
          });
          this.onlineStatusService.offline.subscribe((data) => {
            this.isOnline = false;
          });
        }
      }

  `;

  exampleInfoTabTemplate =
    `
<hx-tabset [justified]="true" [hasInfo]="true">
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Overdue</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">10 <small>in April</small></h6>
          <h6 class="mt-0 mb-0">13 <small>in total</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 1 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Upcoming</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">23 <small>in April/May</small></h6>
          <h6 class="mt-0 mb-0">300 <small>claims</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 2 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Assigned/New</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">40 <small>total</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 3 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Plan Started</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">23 <small>awaiting recall</small></h6>
          <h6 class="mt-0 mb-0">40 <small>recalled</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 4 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Team Participation</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">23 <small>participating</small></h6>
          <h6 class="mt-0 mb-0">11 <small>no response</small></h6>
          <h6 class="mt-0 mb-0">5 <small>declined</small></h6>
        </div>
      </div>
    </ng-template>
    Tab 5 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Awaiting Billing</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">23 <small>in April</small></h6>
          <h6 class="mt-0 mb-0">40 <small>in total</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 6 content
  </hx-tab>
  <hx-tab>
    <ng-template hxTabHeading>
      <h6 class="mt-0 mb-1">Completed</h6>
      <div class="hx-columns mt-0 pt-0">
        <div class="hx-column hx-flex-grow">
          <h6 class="mt-0 mb-0">23 <small>in April</small></h6>
          <h6 class="mt-0 mb-0">40 <small>in total</small></h6>
          <h6 class="mt-0 mb-0">&nbsp;</h6>
        </div>
      </div>
    </ng-template>
    Tab 7 content
  </hx-tab>
</hx-tabset>

    `;

}
