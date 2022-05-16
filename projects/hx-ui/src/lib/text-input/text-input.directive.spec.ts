import { TextInputDirective } from './text-input.directive';
import {Component, DebugElement} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';


@Component({
  template: `<input type="text" hxaTextInput>`
})
class TestTextInputComponent {
}

describe('TextInputDirective', () => {


  let fixture;
  let inputEl: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
    declarations: [TextInputDirective, TestTextInputComponent],
    teardown: { destroyAfterEach: false }
})
    .createComponent(TestTextInputComponent);
    inputEl = fixture.debugElement.query(By.css('input'));
  });


  it('should apply focus css class', () => {
    inputEl.triggerEventHandler('focus', null);
    fixture.detectChanges();
    expect(inputEl.nativeElement.classList).toContain('has-label-floating');
  });
});
