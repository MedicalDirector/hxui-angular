import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGrowComponent } from './auto-grow.component';

describe('AutoGrowComponent', () => {
  let component: AutoGrowComponent;
  let fixture: ComponentFixture<AutoGrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoGrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoGrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
