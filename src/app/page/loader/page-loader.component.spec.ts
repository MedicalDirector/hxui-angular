import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { PageLoaderComponent } from './page-loader.component';

describe('PageLoaderComponent', () => {
  let component: PageLoaderComponent;
  let fixture: ComponentFixture<PageLoaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [PageLoaderComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
