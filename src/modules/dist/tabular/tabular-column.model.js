import { ITabularColumn } from './tabular-column.interface';
var TabularColumn = /** @class */ (function () {
    function TabularColumn(id, label, dataType, sortable, cssClass) {
        if (cssClass === void 0) { cssClass = ''; }
        this.id = id;
        this.label = label;
        this.dataType = dataType;
        this.sortable = sortable;
        this.cssClass = cssClass;
    }
    return TabularColumn;
}());
export { TabularColumn };
//# sourceMappingURL=tabular-column.model.js.map