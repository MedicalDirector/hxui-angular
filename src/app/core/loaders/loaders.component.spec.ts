import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadersComponent } from './loaders.component';
import {AppModule} from '../../app.module';

describe('LoadersComponent', () => {
  let component: LoadersComponent;
  let fixture: ComponentFixture<LoadersComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [AppModule],
    teardown: { destroyAfterEach: false }
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
