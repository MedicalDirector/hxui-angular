import {IActionsConfig} from './actions-config.interface';
import {Context} from '../enums';
import {TooltipConfig} from '../tooltip/tooltip.config';

export interface ITabularRow {
  /**
   * Set an ID property. It's optional unless you have a checkbox column
   */
  id?: number|string;
  /**
   * Set context, default, danger, warning, success or info
   */
  context?: Context;
  /**
   * Set stripe context, default, danger, warning, success or info
   */
  stripeContext?: Context;
  /**
   * Allows you to add any css class names to each row.
   */
  cssClass?: string;
  /**
   * Used to configure 1 or more actions
   */
  actions?: IActionsConfig[];

  /**
   * Used to control the checkbox checked state
   */
  checked?: boolean;

  /**
   * Used to control the model selected state
   */
 selected?: boolean;

  /**
   * Title attribute at the row level
   */
  title?: string;

    /**
   * Used to disable/enable menu
   */
  actionDisabled?: boolean;

   /**
   * Used to disable/enable checkbox
   */
  checkboxDisabled?: boolean;

  rowDisabled?: boolean;
}



