import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccordionBodyComponent } from './accordion.body';
import { AccordionComponent } from './accordion.component';
import { AccordionContainerComponent } from './accordion.container.component';
import { AccordionHeaderComponent } from './accordion.header.component';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [],
    declarations: [
        AccordionComponent,
        AccordionContainerComponent,
        AccordionHeaderComponent,
        AccordionBodyComponent
    ],
    teardown: { destroyAfterEach: false }
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
