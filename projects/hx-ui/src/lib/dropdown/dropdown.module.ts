import { ModuleWithProviders, NgModule } from '@angular/core';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownConfig } from './dropdown.config';
import { DropdownDirective } from './dropdown.directive';


@NgModule({
  declarations: [
    DropdownMenuDirective,
    DropdownToggleDirective,
    DropdownDirective
  ],
  exports: [
    DropdownMenuDirective,
    DropdownToggleDirective,
    DropdownDirective
  ]
})
export class DropdownModule {
  public static forRoot(config?: any): ModuleWithProviders {
    return {
      ngModule: DropdownModule, providers: [
        {provide: DropdownConfig, useValue: config ? config : {autoClose: true}}
      ]
    };
  };

}
