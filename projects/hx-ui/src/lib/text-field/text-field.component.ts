import {Component, OnInit, ContentChild, HostBinding} from '@angular/core';
import {LabelStylesDirective} from './label-styles.directive';

@Component({
  selector: 'hxa-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {
    
  @ContentChild(LabelStylesDirective)
  input: LabelStylesDirective;

  constructor() { }

  ngOnInit() {
  }

}
