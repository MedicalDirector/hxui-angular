import {TooltipConfig} from '../tooltip/tooltip.config';

export enum TabularColumnTypes {
  String,
  Icon,
  Date,
  Actions,
  Status,
  DateTime,
  Checkbox,
  Badge,
  Number
}

export abstract class ITabularColumn {
  /**
   * Unique identifier/reference
   */
  id: string;

  /**
   * Label used for display purposes.
   */
  label: string;

  /**
   * Column data type
   */
  dataType: TabularColumnTypes;

  /**
   * Css class name to append to columns
   */
  cssClass: string;
}


export interface ITabularColumnBadgeType {
  label: string;
  cssClass?: string;
  tooltipConfig?: TooltipConfig;
}


export interface ITabularColumnIconType {
  icon: string;
  cssClass?: string;
  tooltip: {
    config: TooltipConfig,
    content: string;
  };
}
