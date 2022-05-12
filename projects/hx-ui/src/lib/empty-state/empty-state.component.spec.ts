import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IEmptyStateAction } from './empty-state-action.interface';
import { EmptyStateComponent } from './empty-state.component';
import { EmptyStateConfig } from './empty-state.config';

describe('EmptyStateComponent', () => {
  let component: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const mockService = { mockCallback: () => {} };
  let callbackSpy;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyStateComponent],
      providers: [EmptyStateConfig]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    callbackSpy = jest.spyOn(mockService, 'mockCallback').mockImplementation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should execute callback on action click', () => {
    const emptyIcon = 'icon-medications';
    const emptyStateMsg = 'No current medications have been recorded';
    const emptyStateActions: IEmptyStateAction[] = [
      {
        id: 'currentNotTakingMedsBtn',
        label: 'Not taking any medications',
        css: '',
        callback: [mockService.mockCallback]
      },
      {
        id: 'currentAddMedsBtn',
        label: 'Add current medication',
        css: 'is-primary',
        callback: [mockService.mockCallback]
      }
    ];

    component.icon = emptyIcon;
    component.msg = emptyStateMsg;
    component.actions = emptyStateActions;

    component.executeCallback({}, component.actions[0].callback);
    expect(callbackSpy).toHaveBeenCalled();
  });
});
