import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectizeComponent } from './selectize.component';
import {AppModule} from '../../app.module';

xdescribe('SelectizeComponent', () => {
  let component: SelectizeComponent;
  let fixture: ComponentFixture<SelectizeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
