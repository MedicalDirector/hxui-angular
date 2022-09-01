import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedModule } from '../../shared/shared.module';
import { PageAccordionComponent } from './page-accordion.component';

describe('PageAccordionComponent', () => {
  let component: PageAccordionComponent;
  let fixture: ComponentFixture<PageAccordionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PageAccordionComponent],
      imports: [SharedModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
