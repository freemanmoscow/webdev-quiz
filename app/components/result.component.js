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
var ResultComponent = (function () {
    function ResultComponent() {
    }
    ResultComponent.prototype.resetQuestions = function () {
        // TODO: Figure out how to reload
        location.reload();
    };
    ResultComponent.prototype.resultGrade = function () {
        return Math.ceil(this.result.correct / this.result.total * 3);
    };
    ResultComponent = __decorate([
        core_1.Component({
            selector: 'quiz-result',
            inputs: ['result'],
            outputs: ['restart'],
            host: {
                class: 'row'
            },
            template: "\n <div class=\"card-stacked\">\n     <div class=\"card-content\">\n        <div class=\"result card-panel s12 l8 offset-l2 valign-wrapper\" [class.bad]=\"resultGrade() <= 1\" [class.ok]=\"resultGrade() === 2\" [class.good]=\"resultGrade() >= 3\">\n            <div class=\"valign text\">Result: {{ result.correct }} out of {{ result.total }} correct</div>\n        </div>\n    </div>\n    <div class=\"card-action center\">\n      <a class=\"waves-effect waves-light btn-large\" (click)=\"resetQuestions()\">Restart Quiz</a>\n    </div>\n </div>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], ResultComponent);
    return ResultComponent;
}());
exports.ResultComponent = ResultComponent;
//# sourceMappingURL=result.component.js.map