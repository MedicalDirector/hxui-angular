import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadersComponent } from './loaders.component';
import {AppModule} from '../../app.module';

describe('LoadersComponent', () => {
  let component: LoadersComponent;
  let fixture: ComponentFixture<LoadersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
