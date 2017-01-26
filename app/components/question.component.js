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
var core_1 = require("@angular/core");
var QuestionComponent = (function () {
    function QuestionComponent() {
        this.questionAction = new core_1.EventEmitter();
    }
    QuestionComponent.prototype.selectAnswer = function (answer) {
        this._selectedAnswer = answer;
        this.questionAction.emit({ action: 'answer', correct: this._selectedAnswer === this.question.correctAnswer });
        //console.log(this.question);
    };
    QuestionComponent.prototype.isCorrect = function (answer) {
        return answer === this.question.correctAnswer && this._selectedAnswer !== undefined;
    };
    QuestionComponent.prototype.isIncorrect = function (answer) {
        return answer !== this.question.correctAnswer && this._selectedAnswer === answer;
    };
    QuestionComponent.prototype.isDisabled = function () {
        return this._selectedAnswer === undefined;
    };
    QuestionComponent.prototype.nextQuestion = function () {
        this.questionAction.emit({ action: 'next', correct: this._selectedAnswer === this.question.correctAnswer });
        this._selectedAnswer = undefined;
        //Materialize.showStaggeredList('quiz-question');
    };
    return QuestionComponent;
}());
QuestionComponent = __decorate([
    core_1.Component({
        selector: 'quiz-question',
        inputs: ['question', 'totalQuestions', 'currentQuestion'],
        outputs: ['questionAction'],
        template: "\n    <ul class=\"row horizontal\">\n      <li class=\"card card-stacked white\">\n        <div class=\"card-content\">\n            <div class=\"row card-panel question grey lighten-3 valign-wrapper\">\n              <div class=\"col s3 m2\" *ngIf=\"question.image\"><div class=\"image valign-wrapper\"><img class=\"valign\" [src]=\"question.image\"></div></div>\n              <div class=\"col valign-wrapper text s9\"\n                [class.m12]=\"!question.image\"\n                [class.m10]=\"question.image\"><h5 class=\"valign\">{{ question.question }}</h5></div>\n            </div>\n            <div class=\"row answers\">\n              <div class=\"lighten-4 col s12 l6 valign-wrapper card-panel waves-effect waves-light\" *ngFor=\"let answer of question.answers; let i = index;\"\n                [class.red]=\"isIncorrect(i.toString())\"\n                [class.green]=\"isCorrect(i.toString())\"\n                [class.yellow]=\"isDisabled()\"\n                [class.disabled]=\"!isDisabled()\"\n                (click)=\"selectAnswer(i.toString())\">\n                  <div class=\"valign answer\">{{ answer }}</div>\n              </div>\n            </div>\n          </div>\n        <div class=\"card-action center\">\n          <a class=\"waves-effect waves-light btn-large\" (click)=\"nextQuestion()\" [class.disabled]=\"isDisabled()\">Next</a>\n        </div>\n        <div class=\"progress\">\n          <div class=\"determinate orange\" [style.width]=\"(currentQuestion / totalQuestions * 100) + '%'\"></div>\n        </div>\n      </li>\n    </ul>\n"
    }),
    __metadata("design:paramtypes", [])
], QuestionComponent);
exports.QuestionComponent = QuestionComponent;
//# sourceMappingURL=question.component.js.map