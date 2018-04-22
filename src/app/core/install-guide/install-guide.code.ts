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

}
