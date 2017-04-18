"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var quizapp_component_1 = require("../components/quizapp.component");
var question_service_1 = require("../services/question.service");
var result_component_1 = require("../components/result.component");
var question_component_1 = require("../components/question.component");
var timer_service_1 = require("../services/timer.service");
var header_component_1 = require("../components/header.component");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var platform_browser_1 = require("@angular/platform-browser");
var angular2_materialize_1 = require("angular2-materialize");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [http_1.HttpModule, platform_browser_1.BrowserModule, angular2_materialize_1.MaterializeModule],
        declarations: [question_component_1.QuestionComponent, result_component_1.ResultComponent, quizapp_component_1.QuizApp, header_component_1.HeaderComponent],
        providers: [question_service_1.QuizService, timer_service_1.TimerService],
        bootstrap: [quizapp_component_1.QuizApp]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map