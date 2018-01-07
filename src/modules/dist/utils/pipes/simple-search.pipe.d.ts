/**
 * Example use
 * Array of objects: *ngFor="#row of rows | simpleSearch : 'the search term'"
 */
import { PipeTransform } from '@angular/core';
export interface ISimpleSearchPipe extends PipeTransform {
    searchValue(item: any, searchTerm: string): boolean;
}
export declare class SimpleSearchPipe implements ISimpleSearchPipe {
    constructor();
    searchValue: (item: any, searchTerm?: string) => boolean;
    transform(items: any[], args: any[]): any;
}
