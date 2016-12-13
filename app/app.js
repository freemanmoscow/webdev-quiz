"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var quizapp_component_1 = require('./components/quizapp.component');
var ng_module_1 = require("@angular/core/src/metadata/ng_module");
var app_constants_1 = require("./config/app.constants");
var header_component_1 = require("./components/header.component");
var question_component_1 = require("./components/question.component");
var result_component_1 = require("./components/result.component");
var http_1 = require("@angular/http");
var timer_service_1 = require("./services/timer.service");
var question_service_1 = require("./services/question.service");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        ng_module_1.NgModule({
            imports: [app_constants_1.Constants, http_1.HTTP_PROVIDERS, question_service_1.QuizService, timer_service_1.TimerService],
            declarations: [quizapp_component_1.QuizApp, header_component_1.HeaderComponent, question_component_1.QuestionComponent, result_component_1.ResultComponent],
            providers: [app_constants_1.Constants, http_1.HTTP_PROVIDERS, question_service_1.QuizService, timer_service_1.TimerService],
            bootstrap: [quizapp_component_1.QuizApp]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
core_1.enableProdMode();
platform_browser_dynamic_1.bootstrap(AppModule);
//# sourceMappingURL=app.js.map