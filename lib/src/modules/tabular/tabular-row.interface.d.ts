import { IActionsConfig } from './actions-config.interface';
export interface ITabularRow {
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
