import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';

import { TypeaheadContainerComponent } from './typeahead-container.component';
import { TypeaheadDirective } from './typeahead.directive';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { PositioningService } from '../positioning/positioning.service';
import {TypeaheadHighlightComponent} from "./typeahead-highlight.component";

@NgModule({
  imports: [CommonModule],
  declarations: [TypeaheadContainerComponent, TypeaheadDirective, TypeaheadHighlightComponent],
  exports: [TypeaheadContainerComponent, TypeaheadDirective, TypeaheadHighlightComponent],
  entryComponents: [TypeaheadContainerComponent]
})
export class TypeaheadModule {
  public static forRoot(): ModuleWithProviders<TypeaheadModule> {
    return {
      ngModule: TypeaheadModule,
      providers: [ComponentLoaderFactory, PositioningService]
    };
  };
}
