import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../../../../src/app/app.module';
import { AccordionComponent } from './accordion.component';
import { AccordionContainerComponent } from './accordion.container.component';
import { AccordionHeaderComponent } from './accordion.header.component';
import { AccordionBodyComponent } from './accordion.body';

describe('AccordionComponent', () => {
  let component: AccordionComponent;
  let fixture: ComponentFixture<AccordionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [  ],
      declarations: [
        AccordionComponent,
        AccordionContainerComponent,
        AccordionHeaderComponent,
        AccordionBodyComponent
      ]
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
