"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var file_upload_service_1 = require("./file-upload.service");
describe('FileUploadService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(file_upload_service_1.FileUploadService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=file-upload.service.spec.js.map