import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipsComponent } from './tooltips.component';
import {AppModule} from '../../app.module';

describe('TooltipsComponent', () => {
  let component: TooltipsComponent;
  let fixture: ComponentFixture<TooltipsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
