import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoGrowComponent } from './auto-grow.component';
import {AppModule} from '../../app.module';

describe('AutoGrowComponent', () => {
  let component: AutoGrowComponent;
  let fixture: ComponentFixture<AutoGrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
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
