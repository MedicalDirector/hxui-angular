import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { PageDialogComponent } from './page-dialog.component';

describe('PageDialogComponent', () => {
  let component: PageDialogComponent;
  let fixture: ComponentFixture<PageDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PageDialogComponent],
      imports: [SharedModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
