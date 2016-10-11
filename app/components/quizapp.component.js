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
var question_service_1 = require('../services/question.service');
var http_1 = require('@angular/http');
var question_component_1 = require('../components/question.component');
var result_component_1 = require('../components/result.component');
var image_lazyload_component_1 = require('../components/image.lazyload.component');
var QuizApp = (function () {
    function QuizApp(Quiz) {
        this.Quiz = Quiz;
        this._isLoaded = false;
        this._showResult = false;
        this._maxQuestions = 10;
        this._currentQuestion = 0;
    }
    QuizApp.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.Quiz.getQuestions().subscribe(function (response) {
            _this.questions = response;
            _this._isLoaded = true;
            _this.questions = _this.arrayShuffle(_this.questions);
            _this.result = {
                total: _this.questions.length < _this._maxQuestions ? _this.questions.length : _this._maxQuestions,
                correct: 0
            };
        });
    };
    QuizApp.prototype.ngOnDestroy = function () {
        this.sub.unsubscribe();
    };
    QuizApp.prototype.onNext = function (message) {
        if (message.action === 'next') {
            if (message.correct)
                this.result.correct++;
            if (this.questions[this._currentQuestion + 1] && this._currentQuestion < this._maxQuestions - 1)
                this._currentQuestion++;
            else
                this._showResult = true;
        }
    };
    QuizApp.prototype.onRestart = function (message) {
        // TODO: Figure out how to reload
        if (message === 'restart') {
            this._isLoaded = false;
            this._showResult = false;
            this._maxQuestions = 10;
            this._currentQuestion = 0;
            this.ngOnInit();
        }
    };
    QuizApp.prototype.arrayShuffle = function (src) {
        for (var j, x, i = src.length; i; j = parseInt(String(Math.random() * i)), x = src[--i], src[i] = src[j], src[j] = x)
            ;
        return src;
    };
    QuizApp = __decorate([
        core_1.Component({
            selector: 'quiz',
            directives: [question_component_1.QuestionComponent, result_component_1.ResultComponent, image_lazyload_component_1.LazyLoadComponent],
            providers: [http_1.HTTP_PROVIDERS, question_service_1.QuizService],
            template: "\n    <div id=\"quiz center-align\" class=\"col s12 l10 offset-l1\" *ngIf=\"_isLoaded\">\n        <quiz-question class=\"card horizontal white\" *ngIf=\"!_showResult\"\n          [question]=\"questions[_currentQuestion]\"\n          [totalQuestions]=\"result.total\"\n          [currentQuestion]=\"_currentQuestion\"\n          (next)=\"onNext($event)\">\n        </quiz-question>\n        <quiz-result class=\"card horizontal white\"\n          *ngIf=\"_showResult\"\n          [result]=\"result\"\n          (restart)=\"onRestart($event)\">\n        </quiz-result>\n    </div>\n    <!-- lazy-load [questions]=\"questions\"></lazy-load -->\n "
        }), 
        __metadata('design:paramtypes', [question_service_1.QuizService])
    ], QuizApp);
    return QuizApp;
}());
exports.QuizApp = QuizApp;
//# sourceMappingURL=quizapp.component.js.map