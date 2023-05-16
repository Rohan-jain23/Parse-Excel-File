"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var chart_service_service_1 = require("./chart-service.service");
describe('ChartServiceService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(chart_service_service_1.ChartServiceService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=chart-service.service.spec.js.map