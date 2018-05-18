import { IActionsConfig } from './actions-config.interface';
import { Context } from '../enums';
export interface ITabularRow {
    /**
     * Set context, default, danger, warning, success or info
     */
    context: Context;
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
