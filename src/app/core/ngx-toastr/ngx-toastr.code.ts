export class NgxToastrCode {

  install = `
  npm install ngx-toastr --save

`;

  import = `
  @import '~ngx-toastr/toastr';

`;

  usage = `
  import { NgSelectModule } from '@ng-select/ng-select';
  import { FormsModule } from '@angular/forms';

  @NgModule({
    declarations: [AppComponent],
    imports: [ToastrModule.forRoot(), FormsModule],
    bootstrap: [AppComponent]
  })
  export class AppModule {}

`;


  exampleTemplate =
    `
  <h4>Default Examples</h4>

    <div class="hx-columns">
      <div class="hx-column">
      <button class="hx-button is-primary" (click)="showSuccess()">Show success</button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-danger" (click)="showError()">Show error</button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-warning" (click)="showWarning()">Show warning</button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-info" (click)="showInfo()">Show info</button>
      </div>
    </div>

    <hr>

    <h4>With Titles Examples</h4>

    <p>Add an optional title to each toast</p>

    <div class="hx-columns">
      <div class="hx-column">
        <button class="hx-button is-primary" (click)="showSuccess('Success')">Show success</button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-danger" (click)="showError('Error')">Show error</button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-warning" (click)="showWarning('Warning')">Show warning</button>
      </div>
      <div class="hx-column">
        <button class="hx-button is-info" (click)="showInfo('Informative')">Show info</button>
      </div>
    </div>

  `;

  exampleTypescript =
    `
 import {Component, Inject, OnInit} from '@angular/core';
 import {ToastrService} from "ngx-toastr";

  @Component({
    selector: 'app-ng-select',
    templateUrl: './ngx-toastr.component.html',
    styleUrls: ['./ngx-toastr.component.scss']
  })
  export class NgxToastrComponent implements OnInit {

    constructor(
      private toastr: ToastrService
    ) {
    }

    ngOnInit() {

    }

    showSuccess(title?: string){
      this.toastr.success('The action performed was successful.',title, {closeButton: true, disableTimeOut: true});
    }

    showError(title?: string){
      this.toastr.error('An issue occurred with the action performed.',title);
    }

    showInfo(title?: string){
      this.toastr.info("Notice, this notice you should notice it's worth noticing.", title);
    }

    showWarning(title?: string){
      this.toastr.warning('Performing this action could have consequence.', title);
    }

  }
  `;


}
