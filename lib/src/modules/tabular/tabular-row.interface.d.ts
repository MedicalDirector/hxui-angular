import { IActionsConfig } from './actions-config.interface';
import { Context } from '../enums';
export interface ITabularRow {
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
}
