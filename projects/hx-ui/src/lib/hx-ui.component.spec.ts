import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HxUiComponent } from './hx-ui.component';

describe('HxUiComponent', () => {
  let component: HxUiComponent;
  let fixture: ComponentFixture<HxUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HxUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HxUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
