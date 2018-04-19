export declare enum OrderByDirection {
    Ascending = 0,
    Descending = 1,
    None = 2,
}
export declare class TabularOrderByService {
    static _orderByComparator(a: any, b: any): number;
    doTransform(data: any, [config]: [string]): any;
}
