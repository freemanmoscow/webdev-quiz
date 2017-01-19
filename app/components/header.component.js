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
var moment = require('moment');
var HeaderComponent = (function () {
    function HeaderComponent() {
        this.restart = new core_1.EventEmitter();
        this.moment = moment;
    }
    HeaderComponent.prototype.resetQuestions = function () {
        this.restart.emit("restart");
    };
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'quiz-header',
            host: {
                class: 'row'
            },
            outputs: ['restart'],
            inputs: ['tick'],
            template: "\n    <nav class=\"col s12 l10 offset-l1 white\">\n      <div class=\"nav-wrapper\">\n        <a class=\"brand-logo\">WebDev Quiz</a>\n        <ul class=\"right hide-on-med-and-down\">\n          <li class=\"timer\"\n            [class.timeout]=\"tick <= 5 && tick > 0\"\n            [class.done]=\"tick <= 0\">\n            {{ moment.utc(tick * 1000).format('mm:ss') }} left\n          </li>\n          <li class=\"reload\">\n            <a (click)=\"resetQuestions()\">\n              <i class=\"material-icons blue-grey-text right\">refresh</i>\n            </a>\n          </li>\n          <li class=\"github-button\">\n            <a class=\"waves-effect waves-light btn\" href=\"https://github.com/freemanmoscow/webdev-quiz\" target=\"_blank\">\n              <i class=\"material-icons left\">code</i>\n              GitHub\n            </a>\n          </li>\n        </ul>\n      </div>\n    </nav>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map