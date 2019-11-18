import {
  Component
} from '@angular/core';
import {
  DropdownDirective
} from '../dropdown/dropdown.directive';

@Component({
  selector: 'dropdown-stub',
  template: '',
  providers: [{
    provide: DropdownDirective,
    useClass: DropdownStubDirective
  }]
})
export class DropdownStubDirective {
  hide() {}
}
