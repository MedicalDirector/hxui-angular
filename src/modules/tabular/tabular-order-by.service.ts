import {Injectable} from "@angular/core";

export enum OrderByDirection{
    Ascending,
    Descending,
    None
}

@Injectable()
export class TabularOrderByService {
    constructor(){}

    static _orderByComparator(a:any, b:any):number{

        if((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))){
            //Isn't a number so lowercase the string to properly compare
            if(a.toLowerCase() < b.toLowerCase()) return -1;
            if(a.toLowerCase() > b.toLowerCase()) return 1;
        }
        else{
            //Parse strings as numbers to compare properly
            if(parseFloat(a) < parseFloat(b)) return -1;
            if(parseFloat(a) > parseFloat(b)) return 1;
        }

        return 0; //equal each other
    }


    public doTransform(data:any,[config = '+']){
        if(!Array.isArray(data)) return data;

        if(!Array.isArray(config) || (Array.isArray(config) && config.length == 1)){
            let propertyToCheck:string = !Array.isArray(config) ? config : config[0];
            let desc = propertyToCheck.substr(0, 1) == '-';

            // Basic array
            if(!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+'){
                return !desc ? data.sort() : data.sort().reverse();
            }
            else {
                let property:string = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;

                return data.sort(function(a:any,b:any){
                    return !desc
                        ? TabularOrderByService._orderByComparator(a[property], b[property])
                        : -TabularOrderByService._orderByComparator(a[property], b[property]);
                });
            }
        } else {
            // Loop over property of the array in order and sort
            return data.sort(function(a:any,b:any){
                for(let i:number = 0; i < config.length; i++){
                    const desc = config[i].substr(0, 1) == '-';
                    const property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];

                    const comparison = !desc
                        ? TabularOrderByService._orderByComparator(a[property], b[property])
                        : -TabularOrderByService._orderByComparator(a[property], b[property]);

                    // Don't return 0 yet in case of needing to sort by next property
                    if (comparison !== 0) return comparison;
                }

                return 0; // equal each other
            });
        }
    }
}
