"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
// If you want to bundle these - uncomment (results in larger file)
// import 'jquery';
// import 'materialize-css';
// import 'angular2-materialize';
var app_module_1 = require("./modules/app.module");
core_1.enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule)
    .catch(function (err) { return console.error('Bootstrap error:', err); });
//# sourceMappingURL=app.js.map