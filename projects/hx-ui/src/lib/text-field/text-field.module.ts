import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFieldComponent } from './text-field.component';
import { LabelStylesDirective } from './label-styles.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        TextFieldComponent,
        LabelStylesDirective
    ],
    exports: [
        TextFieldComponent,
        LabelStylesDirective
    ]
})
export class TextFieldModule { }
