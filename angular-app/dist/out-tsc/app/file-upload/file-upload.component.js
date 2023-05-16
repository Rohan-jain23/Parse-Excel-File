"use strict";
exports.__esModule = true;
exports.FileUploadComponent = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var FileUploadComponent = /** @class */ (function () {
    function FileUploadComponent(fileUploadService) {
        this.fileUploadService = fileUploadService;
        this.name = "";
        this.timestamp = new Date().toISOString();
        this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        this.browser = window.navigator.userAgent;
        this.myGroup = new forms_1.FormGroup({
            chartname: new forms_1.FormControl()
        });
    }
    FileUploadComponent.prototype.onFileSelected = function (event) {
        this.file = event.target.files[0];
    };
    FileUploadComponent.prototype.onSubmit = function () {
        this.name = this.myGroup.value.chartname;
        this.fileUploadService.uploadFile(this.file, this.name, this.timestamp, this.timezone, this.browser)
            .subscribe(function (response) { return console.log(response); }, function (error) { return console.log(error); });
    };
    FileUploadComponent = tslib_1.__decorate([
        core_1.Component({
            selector: 'app-file-upload',
            templateUrl: './file-upload.component.html',
            styleUrls: ['./file-upload.component.css']
        })
    ], FileUploadComponent);
    return FileUploadComponent;
}());
exports.FileUploadComponent = FileUploadComponent;
//# sourceMappingURL=file-upload.component.js.map