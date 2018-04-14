export declare enum TabularColumnTypes {
    String = 0,
    Icon = 1,
    Date = 2,
    Actions = 3,
    Status = 4,
    DateTime = 5,
    Checkbox = 6,
    Badge = 7,
}
export declare abstract class ITabularColumn {
    /**
     * Unique identifier/reference
     */
    id: string;
    /**
     * Label used for display purposes.
     */
    label: string;
    /**
     * Column data type
     */
    dataType: TabularColumnTypes;
    /**
     * Css class name to append to columns
     */
    cssClass: string;
}
