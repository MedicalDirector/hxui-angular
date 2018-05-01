import { Context } from '../enums';
/** Default values provider for tooltip */
export declare class TooltipConfig {
    /** tooltip placement, supported positions: 'top', 'bottom', 'left', 'right' */
    placement: 'top' | 'bottom' | 'left' | 'right';
    /** tooltip context (colour) */
    context: Context;
    /** should tooltip start in a disabled state */
    disabled: boolean;
    /** animate tooltip or not */
    animation: boolean;
}
