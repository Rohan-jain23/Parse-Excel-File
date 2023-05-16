"use strict";
exports.__esModule = true;
exports.AppModule = void 0;
var tslib_1 = require("tslib");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var file_upload_component_1 = require("./file-upload/file-upload.component");
var ngx_csv_parser_1 = require("ngx-csv-parser");
var chart_component_1 = require("./chart/chart.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib_1.__decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                file_upload_component_1.FileUploadComponent,
                chart_component_1.ChartComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                http_1.HttpClientModule,
                forms_1.ReactiveFormsModule,
                forms_1.FormsModule,
                ngx_csv_parser_1.NgxCsvParserModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map