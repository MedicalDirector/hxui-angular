import { IDisabledInput } from './disabled-input.interface';
export declare enum ActionConfigRouteType {
    Default = 0,
    Callback = 1,
}
export declare abstract class IActionsConfig {
    /**
     * Unique identifier/reference
     */
    id: string;
    /**
     * Label used for display purposes.
     * Can be html for icons.
     */
    label: string;
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
}
