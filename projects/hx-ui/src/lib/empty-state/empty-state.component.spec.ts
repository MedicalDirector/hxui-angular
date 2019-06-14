
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyStateComponent } from './empty-state.component';
import {EmptyStateConfig} from './empty-state.config';
import {IEmptyStateAction} from './empty-state-action.interface';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('EmptyStateComponent', () => {
  let component: EmptyStateComponent;
  let fixture: ComponentFixture<EmptyStateComponent>;
  const mockService = {mockCallback : () => {}};
  let callbackSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmptyStateComponent ],
      providers: [EmptyStateConfig]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmptyStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    callbackSpy = spyOn(mockService, 'mockCallback').and.callThrough();
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
      }];

    component.icon = emptyIcon;
    component.msg = emptyStateMsg;
    component.actions = emptyStateActions;

    component.executeCallback({}, component.actions[0].callback);
    expect(callbackSpy).toHaveBeenCalled();
  });
});
