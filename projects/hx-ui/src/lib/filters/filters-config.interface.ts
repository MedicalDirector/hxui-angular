import { DisplayMode } from '../date-range-picker/date-range-picker.model';
import { FilterType } from './filters-type.enum';

export interface IFilterOption {
  label: string;
  value: any;
  icon?: string;
  selected: boolean;
  charLimit?: number;
}

export interface IFiltersConfig {
  /**
   * Unique identifier for filter
   */
  id: string;

  /**
   * Filter type, can be SingleSelect, MultiSelect or Search
   */
  type: FilterType;

  /**
   * Label that will appear in a button or search field placeholder
   */
  label: string;

  /**
   * Filter options for Single Select and MultiSelect types
   */
  options?: IFilterOption[];

  /**
   * Filter value for Search filter type
   */
  value?: string;

  /**
   * The original value from corresponding source component
   */
  sourceValue?: any;

  /**
   * Filter character limit for Search filter type
   * Fire filter event if character >= this value
   *  Defaults to 2
   */
  charLimit?: number;

  /**
   * Index of default filter option.
   * The options to set when filters are cleared.
   */
  defaultIndex?: number[];

  /**
   * Display mode for type date range picker
   */
  dateRangePickerDisplayMode?: DisplayMode;

  /**
   * Display date format for type date range picker
   */
  dateRangePickerDisplayDateFormat?: string;

  /**
   * Width in REM for Search filter type.
   * Defaults if not set
   */
  width?: number;

  disabled?: boolean;
  hidden?: boolean;
  isLoading?: boolean;
}
