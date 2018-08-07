export class InstallGuideCode {

  step1 =
   `
   npm install @hxui/angular --save
   `;

  step2 =
  `
  import {HxUiModule} from "@hxui/angular";

  @NgModule({
    declarations: [
      AppComponent
    ],
    imports: [
      HxUiModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
  export class AppModule {}
   `;

  step3 =
    `
   import {DropdownModule} from "@hxui/angular";

   @NgModule({
    imports: [DropdownModule.forRoot(),...]
   })
   export class AppModule(){
   `;

 cdk =  `
    /* Structural css needed for CDK to work correctly */
    @import   '~@angular/cdk/overlay-prebuilt.css';
    @import   '~@angular/cdk/a11y-prebuilt.css';
    @import   '~@angular/cdk/text-field-prebuilt.css';
 `;

}
