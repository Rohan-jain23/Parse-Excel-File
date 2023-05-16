"use strict";
exports.__esModule = true;
exports.FileUploadService = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var FileUploadService = /** @class */ (function () {
    function FileUploadService(http) {
        this.http = http;
    }
    FileUploadService.prototype.uploadFile = function (file, name, timestamp, timezone, browser) {
        var formData = new FormData();
        formData.append('FileData', file);
        formData.append('ChartName', name);
        formData.append('Timestamp', timestamp);
        formData.append('Timezone', timezone);
        formData.append('UserAgent', browser);
        return this.http.post('https://localhost:44311/api/File', formData);
    };
    FileUploadService = tslib_1.__decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], FileUploadService);
    return FileUploadService;
}());
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=file-upload.service.js.map