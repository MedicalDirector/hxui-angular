import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';
import {FiltersCollapsedComponent} from './filters-collapsed.component';
import {HxUiModule} from '../hx-ui.module';
import {IFilterOption, IFiltersConfig} from './filters-config.interface';
import {FilterType} from './filters-type.enum';
import {IEmptyStateAction} from '../empty-state/empty-state-action.interface';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;
  const mockService = {mockCallback : (p) => { }};
  let callbackSpy;
  const filtersConfigs: IFiltersConfig[] = [
    {
      id: 'TEST_SINGLE_SELECT_1',
      type: FilterType.SingleSelect,
      label: 'Test single select 1',
      options: [
        {
          label: 'Option 1',
          value: 0,
          selected: false
        },
        {
          label: 'Option 2',
          value: 1,
          selected: true
        },
        {
          label: 'Option 3',
          value: 2,
          selected: false
        },
        {
          label: 'Option 4',
          value: 3,
          selected: false
        },
        {
          label: 'Option 5',
          value: 4,
          selected: false
        },
        {
          label: 'Option 6',
          value: 5,
          selected: false
        }
      ],
      defaultIndex: 1,
      callback: [mockService.mockCallback, 'test_single_select_1']
    },
    {
      id: 'TEST_SEARCH_1',
      type: FilterType.Search,
      label: 'Test search 1',
      callback: [mockService.mockCallback]
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HxUiModule],
      declarations: []
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    callbackSpy = spyOn(mockService, 'mockCallback').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should reset filter defaults upon calling reset', () => {

    component.filters = filtersConfigs;

    const filter = component.data[0];
    const preselected_option = filter.options[1];
    const new_option = filter.options[4];

    component.onFilterOptionSelected(filter, new_option);

    expect(filter.selected).toBe(new_option);
    expect(new_option.selected).toBeTruthy();
    expect(preselected_option.selected).toBeFalsy();

    component.resetFilters();

    expect(filter.selected).toBe(preselected_option);
    expect(new_option.selected).toBeFalsy();
    expect(preselected_option.selected).toBeTruthy();

  });

  it('should set option and unset selected option', () => {
    component.filters = filtersConfigs;

    const filter = component.data[0];
    const preselected_option = filter.options[1];
    const new_option = filter.options[4];

    component.onFilterOptionSelected(filter, new_option);
    expect(filter.selected).toBe(new_option);
    expect(new_option.selected).toBeTruthy();
    expect(preselected_option.selected).toBeFalsy();
  });

  it('should execute callback on action click', () => {

    component.filters = filtersConfigs;
    const filter = component.data[0];
    filter.callback = [mockService.mockCallback, 'mock callback test'];

    component.executeFilterCallback(filter);
    expect(callbackSpy).toHaveBeenCalled();
  });
});
