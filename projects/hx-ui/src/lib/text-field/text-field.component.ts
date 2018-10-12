import {Component, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'hxa-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {

  // This component needs to support:
  // Label formatting for inputs that are not required and are empty (label needs to look like a placeholder, then change to a floating label once a value entered)
  // See examples in src/app/core/text-field/text-field.component.html which were copied from hxui

  constructor() { }

  ngOnInit() {
  }

}
