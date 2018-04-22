import { Component, OnInit } from '@angular/core';
import {AutoGrowCode} from './auto-grow.code';

@Component({
  selector: 'app-auto-grow',
  templateUrl: './auto-grow.component.html',
  styles: [':host { display:flex; flex: 1; min-width: 0; }']
})
export class AutoGrowComponent implements OnInit {

  code = new AutoGrowCode();
  constructor() { }

  ngOnInit() {
  }

}
