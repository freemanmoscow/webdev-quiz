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
var timer_service_1 = require('../services/timer.service');
var app_constants_1 = require("../config/app.constants");
var HeaderComponent = (function () {
    function HeaderComponent(TimerService) {
        var _this = this;
        this._timerObservable = TimerService.getTimer().map(function (i) { return app_constants_1.Constants.QUIZTIME - i; }).take(app_constants_1.Constants.QUIZTIME + 1).subscribe(function (response) { return _this.timer = String(response); });
    }
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'quiz-header',
            host: {
                class: 'row'
            },
            inputs: ['timer'],
            template: "\n    <nav class=\"col s12 l10 offset-l1 white\">\n      <div class=\"nav-wrapper\">\n        <a class=\"brand-logo\">WebDev Quiz</a>\n        <ul class=\"right hide-on-med-and-down\">\n          <li class=\"reload\">\n            <a onclick=\"location.reload();\">\n              <i class=\"material-icons blue-grey-text right\">refresh</i>\n              {{ timer }} left\n            </a>\n          </li>\n          <li class=\"github-button\">\n            <a class=\"waves-effect waves-light btn\" href=\"https://github.com/freemanmoscow/webdev-quiz\" target=\"_blank\">\n              <i class=\"material-icons left\">code</i>\n              GitHub\n            </a>\n          </li>\n        </ul>\n      </div>\n    </nav>\n"
        }), 
        __metadata('design:paramtypes', [timer_service_1.TimerService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map