import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectizeComponent } from './selectize.component';
import {FormsModule} from '@angular/forms';
import {SelectizeConfig} from './selectize.config';

declare var $: any;

describe('SelectizeComponent', () => {
  let component: SelectizeComponent;
  let fixture: ComponentFixture<SelectizeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ SelectizeComponent ]
    })
      .compileComponents();
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
    spyOn(component.onOptionAdded, 'emit');
    (component as any).selectize.addOption({label: 'boo', value: 'hoo'});
    expect(component.onOptionAdded.emit).toHaveBeenCalledWith({label: 'boo', value: 'hoo', $order: 1});
  });

  it('should not emit onOptionAdded when new option added via input', () => {
    spyOn(component.onOptionAdded, 'emit');
    component.options = [{label: 'boo1', value: 'hoo1'}, {label: 'boo2', value: 'hoo2'}, {label: 'boo3', value: 'hoo3'}];
    fixture.detectChanges();
    expect(component.onOptionAdded.emit).not.toHaveBeenCalled();
  });
});
