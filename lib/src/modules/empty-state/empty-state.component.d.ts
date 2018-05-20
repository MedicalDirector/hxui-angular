import { OnInit } from '@angular/core';
import { IEmptyStateAction } from './empty-state-action.interface';
import { EmptyStateConfig } from './empty-state.config';
export declare class EmptyStateComponent implements OnInit {
    private config;
    icon: string;
    msg: string;
    actions: IEmptyStateAction[];
    constructor(config: EmptyStateConfig);
    ngOnInit(): void;
    /**
     * Calls the parsed callback with optional arguments
     * @param event
     * @param cb
     */
    private executeCallback(event, cb);
}
