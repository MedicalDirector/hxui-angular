

# Install Guide

## Adding HxUI-angular into a project

* * *

1\.Use **NPM**:

    npm install @hxui/angular --save



2\. **Import all web component modules** into app module or shared module.



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


3\. Alternatively **import each web component module** that you need individually.

       import {DropdownModule} from "@hxui/angular";

       @NgModule({
        imports: [DropdownModule.forRoot(),...]
       })
       export class AppModule(){}




**The [Material CDK](https://material.angular.io/cdk/categories) has been used to construct some of the web components in HxUi.  
In order for components to work correctly, you will need to include some of the structural css provided.**


        /* Structural css needed for CDK to work correctly */
        @import   '~@angular/cdk/overlay-prebuilt.css';
        @import   '~@angular/cdk/a11y-prebuilt.css';
        @import   '~@angular/cdk/text-field-prebuilt.css';


