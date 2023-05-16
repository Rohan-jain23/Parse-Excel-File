"use strict";
exports.__esModule = true;
exports.ChartService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var ChartService = /** @class */ (function () {
    function ChartService(http) {
        this.http = http;
    }
    ChartService.prototype.apiCall = function () {
        return this.http.get("https://localhost:44311/api/File/Data");
    };
    ChartService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ChartService);
    return ChartService;
}());
exports.ChartService = ChartService;
//# sourceMappingURL=chart.service.js.map