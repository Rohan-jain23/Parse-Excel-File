"use strict";
exports.__esModule = true;
exports.ChartComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var auto_1 = require("chart.js/auto");
var ChartComponent = /** @class */ (function () {
    function ChartComponent(api) {
        this.api = api;
        this.data = [];
    }
    ChartComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.api.apiCall().subscribe(function (data) {
            _this.mydata = data.value;
            console.log("get api data", _this.mydata);
        });
    };
    ChartComponent.prototype.plotChart = function (file) {
        console.log("file data is " + file);
        this.data = JSON.parse(file);
        var ctx = document.getElementById('chartCanvas');
        var timestamps = this.data.map(function (item) { return item.TimeStamp; });
        var processedData = this.data.map(function (item) { return parseInt(item.ProcessedDataMemory); });
        var heapData = this.data.map(function (item) { return parseInt(item.HeapDataMemory); });
        new auto_1.Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps,
                datasets: [
                    {
                        label: 'Processed Data Memory',
                        data: processedData,
                        borderColor: 'blue'
                    },
                    {
                        label: 'Heap Data Memory',
                        data: heapData,
                        borderColor: 'green'
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'TimeStamp'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Memory'
                        }
                    }
                }
            }
        });
    };
    tslib_1.__decorate([
        core_1.ViewChild('chartCanvas')
    ], ChartComponent.prototype, "chartCanvas");
    ChartComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-chart',
            templateUrl: './chart.component.html',
            styleUrls: ['./chart.component.css']
        })
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;
//# sourceMappingURL=chart.component.js.map