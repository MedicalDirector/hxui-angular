import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { SelectizeComponent } from './selectize.component';
import { SelectizeConfig } from './selectize.config';

// eslint-disable-next-line no-var
declare var $: any;

xdescribe('SelectizeComponent', () => {
  let component: SelectizeComponent;
  let fixture: ComponentFixture<SelectizeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SelectizeComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectizeComponent);
    component = fixture.componentInstance;
    component.config = new SelectizeConfig();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onOptionAdded when a new option is added in selectize', () => {
    jest.spyOn(component.onOptionAdded, 'emit');
    (component as any).selectize.addOption({ label: 'boo', value: 'hoo' });
    expect(component.onOptionAdded.emit).toHaveBeenCalledWith({
      label: 'boo',
      value: 'hoo',
      $order: 1
    });
  });

  it('should not emit onOptionAdded when new option added via input', () => {
    jest.spyOn(component.onOptionAdded, 'emit');
    component.options = [
      { label: 'boo1', value: 'hoo1' },
      { label: 'boo2', value: 'hoo2' },
      { label: 'boo3', value: 'hoo3' }
    ];
    fixture.detectChanges();
    expect(component.onOptionAdded.emit).not.toHaveBeenCalled();
  });
});
