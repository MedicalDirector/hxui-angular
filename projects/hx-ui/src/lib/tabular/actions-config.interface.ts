import {IDisabledInput} from './disabled-input.interface';
import {TooltipConfig} from '../tooltip/tooltip.config';

export enum ActionConfigRouteType {
  None,
  Route,
  Callback
}


export abstract class IActionsConfig {
  /**
   * Unique identifier/reference
   */
  id: string;

  /**
   * Label used for display purposes.
   */
  label: string;

  /**
   * HxUI Icon
   */
  icon?: string;

  /**
   * Css class name to append to button
   */
  css?: string;

  /**
   * Disabled option
   */
  disabledConfig?: IDisabledInput;

  /**
   * The route to go to when clicked.
   */
  route?: Array<any>;

  /**
   * The route type. Could be standard route or callback.
   */
  routeType: ActionConfigRouteType;

  /**
   * The function to call when route type is callback
   */
  callback?: any;


  /**
   * Child actions
   */
  children?: IActionsConfig[];

  /**
   * Tooltip config
   */
  tooltip?: {
    config: TooltipConfig,
    content: string;
  };

  /**
   * Is Loading state, will show a loading indicator in replacement of icon/text
   */
  isLoading?: boolean;

}
