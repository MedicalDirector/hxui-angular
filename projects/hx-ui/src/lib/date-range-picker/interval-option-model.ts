export class IntervalItem {
    displayName: string;
    unit: string;
    count: number;
    id:string;

    constructor(DisplayName: string, Unit: string, Count:number, ID:string ) {
        this.displayName = DisplayName;
        this.unit = Unit;
        this.count = Count;
        this.id = ID
    }
}

//Possible options to choose from, can be expanded in future
const  IntervalOptionList: IntervalItem[] = [
    new IntervalItem('Today','day',0,'today'),
    new IntervalItem('Yesterdy','day', -1,'yesterday'),
    new IntervalItem('Tomorrow','day',1,'tomorrow'),
    new IntervalItem('Last Year','year',1,'lastyear'),
    new IntervalItem('Next Year','year',-1,'nextyear'),
    new IntervalItem('Last 6 Months','month',-6,'last6month'),
    new IntervalItem('Next 6 Months','month',6,'next6months'),
    new IntervalItem('Last 3 Months','month',-3,'last3months'),
    new IntervalItem('Next 3 Months','month',3,'next3months'),
    new IntervalItem('Last Month','month',-1,'lastmonth'),
    new IntervalItem('Next Month','month',1,'nextmonth'),
    new IntervalItem('Last Week','day',-1*7,'lastweek'),
    new IntervalItem('Next Week','day',1*7,'nextweek'),
    new IntervalItem('Last Fortnight','day',-1*14,'lastfortnight'),
    new IntervalItem('Next Fortnight','day',1*14,'nextfortnight')
]

