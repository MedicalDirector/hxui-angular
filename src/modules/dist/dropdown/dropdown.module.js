import { ModuleWithProviders, NgModule } from '@angular/core';
import { ComponentLoaderFactory } from '../component-loader/component-loader.factory';
import { PositioningService } from '../positioning/positioning.service';
import { DropdownContainerComponent } from './dropdown-container.component';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownConfig } from './dropdown.config';
import { DropdownDirective } from './dropdown.directive';
import { DropdownState } from './dropdown.state';
var DropdownModule = /** @class */ (function () {
    function DropdownModule() {
    }
    DropdownModule.forRoot = function (config) {
        return {
            ngModule: DropdownModule, providers: [
                ComponentLoaderFactory,
                PositioningService,
                DropdownState,
                { provide: DropdownConfig, useValue: config ? config : { autoClose: true } }
            ]
        };
    };
    ;
    DropdownModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        DropdownMenuDirective,
                        DropdownToggleDirective,
                        DropdownContainerComponent,
                        DropdownDirective
                    ],
                    exports: [
                        DropdownMenuDirective,
                        DropdownToggleDirective,
                        DropdownDirective
                    ],
                    entryComponents: [DropdownContainerComponent]
                },] },
    ];
    /** @nocollapse */
    DropdownModule.ctorParameters = function () { return []; };
    return DropdownModule;
}());
export { DropdownModule };
//# sourceMappingURL=dropdown.module.js.map