export class LoadersCode {

  usage =
    `
    import { LoadersModule } from "@hxui/angular";

    @NgModule({
      imports: [LoadersModule.forRoot(), ...]
    })
    export class AppModule() {}
    `;

  exampleTemplate =
    `
  <div class="hx-columns">
    <div class="hx-column">
      <div class="hx-card">
        <div class="hx-card-header"><div class="hx-card-header-title">Sizes</div></div>
        <div class="hx-card-content">
          <div class="hx-columns">
            <div class="hx-column"><hxa-loaders></hxa-loaders></div>
            <div class="hx-column"><hxa-loaders [size]="sizeEnum.Small"></hxa-loaders></div>
          </div>
        </div>
      </div>
    </div>
    <div class="hx-column">
      <div class="hx-card">
        <div class="hx-card-header"><div class="hx-card-header-title">Contextual</div></div>
        <div class="hx-card-content">
          <div class="hx-columns">
            <div class="hx-column"><hxa-loaders [context]="contextEnum.Info"></hxa-loaders></div>
            <div class="hx-column"><hxa-loaders [context]="contextEnum.Success"></hxa-loaders></div>
            <div class="hx-column"><hxa-loaders [context]="contextEnum.Danger"></hxa-loaders></div>
            <div class="hx-column"><hxa-loaders [context]="contextEnum.Warning"></hxa-loaders></div>
          </div>
        </div>
      </div>
    </div>
  </div>
    `;

  exampleTypescript =
    `
  import { Component, OnInit } from '@angular/core';
  import {Context, Size} from '@hxui/angular/enums';
  
  @Component({
    selector: 'app-loaders',
    templateUrl: './loaders.component.html',
  })
  export class LoadersComponent implements OnInit {
  
    contextEnum = Context;
    sizeEnum = Size;
  
    constructor() { }
  
    ngOnInit() {
    }  
  }

    `;
}
