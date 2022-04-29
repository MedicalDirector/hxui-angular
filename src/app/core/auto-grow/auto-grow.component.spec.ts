import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoGrowComponent } from './auto-grow.component';
import { SharedModule } from 'app/shared/shared.module';

describe('AutoGrowComponent', () => {
  let component: AutoGrowComponent;
  let fixture: ComponentFixture<AutoGrowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AutoGrowComponent],
      imports: [SharedModule]
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
