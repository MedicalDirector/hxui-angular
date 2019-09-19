import { TooltipConfig } from '../tooltip/tooltip.config';

export interface IWithTooltip {
    content: any;
    tooltip?: {
        config: TooltipConfig;
        content: string;
    };
}
