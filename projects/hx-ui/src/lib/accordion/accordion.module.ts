import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AccordionComponent } from "./accordion.component";
import { AccordionContainerComponent } from "./accordion.container.component";
import { AccordionHeaderComponent } from "./accordion.header.component";
import { AccordionBodyComponent } from "./accordion.body";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AccordionComponent,
        AccordionContainerComponent,
        AccordionHeaderComponent,
        AccordionBodyComponent
    ],
    exports: [
        AccordionComponent,
        AccordionContainerComponent,
        AccordionHeaderComponent,
        AccordionBodyComponent
    ]
})
export class AccordionModule { }
