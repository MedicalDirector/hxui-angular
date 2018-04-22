import { ITabularColumn } from './tabular-column.interface';
export declare class TabularColumn implements ITabularColumn {
    id: string;
    label: string;
    dataType: number;
    sortable: boolean;
    cssClass: string;
    options: any;
    constructor(id: string, label: string, dataType: number, sortable: boolean, cssClass?: string, options?: any);
}