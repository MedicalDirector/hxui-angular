import { SafeHtml } from "@angular/platform-browser";
import { TooltipConfig } from "../tooltip/tooltip.config";

export enum TabularColumnTypes {
  String,
  Icon,
  Date,
  Actions,
  Status,
  DateTime,
  Checkbox,
  Badge,
  Number,
  Html
}

export interface ITabularColumnOptions {
  [key: string]: unknown;
  header?: SafeHtml;
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
   * Is column sortable?
   */
  sortable: boolean;

  /**
   * Css class name to append to columns
   */
  cssClass: string;

  /**
   * Is column hidden?
   */
  hidden: boolean;

  /**
   * Optional parameters
   * - header: replace column label with html string
   */
  options?: ITabularColumnOptions;
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
    config: TooltipConfig;
    content: string;
  };
}
