import {Component, Input, OnInit} from '@angular/core';
import {Context, Size} from '../enums';

@Component({
  selector: 'hxa-loaders',
  templateUrl: './loaders.component.html',
  styleUrls: ['./loaders.component.scss']
})
export class LoadersComponent implements OnInit {

  @Input()
  size: Size = Size.Default;

  @Input()
  context: Context = Context.None;

  /** Enums to be used in the template **/
  contextEnum = Context;
  sizeEnum = Size;

  constructor() { }

  ngOnInit() {
  }

}
