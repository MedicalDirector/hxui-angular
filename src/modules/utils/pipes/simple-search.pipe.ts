/**
 * Example use
 * Array of objects: *ngFor="#row of rows | simpleSearch : 'the search term'"
 */

import {Pipe, PipeTransform} from '@angular/core';

export interface ISimpleSearchPipe extends PipeTransform {
    searchValue(item:any, searchTerm:string):boolean;
}

@Pipe({
    name: 'simpleSearch',
    pure: false
})

export class SimpleSearchPipe implements ISimpleSearchPipe{

    constructor(){}

    public searchValue = (item:any, searchTerm:string = ""):boolean =>
    {
        var keys = Object.keys(item);
        for(var i = 0, len = keys.length; i < len; i++)
        {
            var match = false,
                propertyValue = item[keys[i]];

            if(propertyValue)
                match = (propertyValue.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);

            if(match||searchTerm=="")
                return true;
        }

        return false;
    };

    transform(items: any[], args: any[]): any
    {
        if(!Array.isArray(items)) return items;

        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(item => (args)? this.searchValue(item, args.toString()) : item);
    }
}
