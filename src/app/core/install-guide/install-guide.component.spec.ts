import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstallGuideComponent } from './install-guide.component';

describe('InstallGuideComponent', () => {
  let component: InstallGuideComponent;
  let fixture: ComponentFixture<InstallGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstallGuideComponent ]
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
