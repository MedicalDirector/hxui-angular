/**
 * Example use
 * Array of objects: *ngFor="#row of rows | simpleSearch : 'the search term'"
 */
import { Pipe, PipeTransform } from '@angular/core';
var SimpleSearchPipe = /** @class */ (function () {
    function SimpleSearchPipe() {
        this.searchValue = function (item, searchTerm) {
            if (searchTerm === void 0) { searchTerm = ''; }
            var keys = Object.keys(item);
            for (var i = 0, len = keys.length; i < len; i++) {
                var match = false, propertyValue = item[keys[i]];
                if (propertyValue)
                    match = (propertyValue.toString().toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
                if (match || searchTerm == '')
                    return true;
            }
            return false;
        };
    }
    SimpleSearchPipe.prototype.transform = function (items, args) {
        var _this = this;
        if (!Array.isArray(items))
            return items;
        // filter items array, items which match and return true will be kept, false will be filtered out
        return items.filter(function (item) { return (args) ? _this.searchValue(item, args.toString()) : item; });
    };
    SimpleSearchPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'simpleSearch',
                    pure: false
                },] },
    ];
    /** @nocollapse */
    SimpleSearchPipe.ctorParameters = function () { return []; };
    return SimpleSearchPipe;
}());
export { SimpleSearchPipe };
//# sourceMappingURL=simple-search.pipe.js.map