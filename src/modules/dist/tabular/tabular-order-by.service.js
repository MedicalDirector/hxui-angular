import { Injectable } from '@angular/core';
export var OrderByDirection;
(function (OrderByDirection) {
    OrderByDirection[OrderByDirection["Ascending"] = 0] = "Ascending";
    OrderByDirection[OrderByDirection["Descending"] = 1] = "Descending";
    OrderByDirection[OrderByDirection["None"] = 2] = "None";
})(OrderByDirection || (OrderByDirection = {}));
var TabularOrderByService = /** @class */ (function () {
    function TabularOrderByService() {
    }
    TabularOrderByService._orderByComparator = function (a, b) {
        if ((isNaN(parseFloat(a)) || !isFinite(a)) || (isNaN(parseFloat(b)) || !isFinite(b))) {
            //Isn't a number so lowercase the string to properly compare
            if (a.toLowerCase() < b.toLowerCase())
                return -1;
            if (a.toLowerCase() > b.toLowerCase())
                return 1;
        }
        else {
            //Parse strings as numbers to compare properly
            if (parseFloat(a) < parseFloat(b))
                return -1;
            if (parseFloat(a) > parseFloat(b))
                return 1;
        }
        return 0; //equal each other
    };
    TabularOrderByService.prototype.doTransform = function (data, _a) {
        var _b = _a[0], config = _b === void 0 ? '+' : _b;
        if (!Array.isArray(data))
            return data;
        if (!Array.isArray(config) || (Array.isArray(config) && config.length == 1)) {
            var propertyToCheck = !Array.isArray(config) ? config : config[0];
            var desc_1 = propertyToCheck.substr(0, 1) == '-';
            // Basic array
            if (!propertyToCheck || propertyToCheck == '-' || propertyToCheck == '+') {
                return !desc_1 ? data.sort() : data.sort().reverse();
            }
            else {
                var property_1 = propertyToCheck.substr(0, 1) == '+' || propertyToCheck.substr(0, 1) == '-'
                    ? propertyToCheck.substr(1)
                    : propertyToCheck;
                return data.sort(function (a, b) {
                    return !desc_1
                        ? TabularOrderByService._orderByComparator(a[property_1], b[property_1])
                        : -TabularOrderByService._orderByComparator(a[property_1], b[property_1]);
                });
            }
        }
        else {
            // Loop over property of the array in order and sort
            return data.sort(function (a, b) {
                for (var i = 0; i < config.length; i++) {
                    var desc = config[i].substr(0, 1) == '-';
                    var property = config[i].substr(0, 1) == '+' || config[i].substr(0, 1) == '-'
                        ? config[i].substr(1)
                        : config[i];
                    var comparison = !desc
                        ? TabularOrderByService._orderByComparator(a[property], b[property])
                        : -TabularOrderByService._orderByComparator(a[property], b[property]);
                    // Don't return 0 yet in case of needing to sort by next property
                    if (comparison !== 0)
                        return comparison;
                }
                return 0; // equal each other
            });
        }
    };
    TabularOrderByService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TabularOrderByService.ctorParameters = function () { return []; };
    return TabularOrderByService;
}());
export { TabularOrderByService };
//# sourceMappingURL=tabular-order-by.service.js.map