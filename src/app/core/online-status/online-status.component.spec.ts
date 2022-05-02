import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'app/shared/shared.module';
import { OnlineStatusComponent } from './online-status.component';

describe('OnlineStatusComponent', () => {
  let component: OnlineStatusComponent;
  let fixture: ComponentFixture<OnlineStatusComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [OnlineStatusComponent],
      imports: [SharedModule],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
