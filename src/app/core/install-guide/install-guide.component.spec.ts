import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallGuideComponent } from './install-guide.component';
import {AppModule} from '../../app.module';

describe('InstallGuideComponent', () => {
  let component: InstallGuideComponent;
  let fixture: ComponentFixture<InstallGuideComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ AppModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstallGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
