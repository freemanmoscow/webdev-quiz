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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var question_service_1 = require("../services/question.service");
var timer_service_1 = require("../services/timer.service");
var app_constants_1 = require("../config/app.constants");
var QuizApp = QuizApp_1 = (function () {
    function QuizApp(quiz, timerService) {
        this.quiz = quiz;
        this.timerService = timerService;
        this._isLoaded = false;
        this._showResult = false;
        this._maxQuestions = app_constants_1.Constants.NUMBEROFQUESTIONS;
        this._currentQuestion = 0;
        this.result = {
            total: 0,
            correct: 0,
            seconds: 0
        };
        this.startTimer();
    }
    QuizApp.arrayShuffle = function (src) {
        for (var i = src.length, j = void 0; i; i--) {
            j = parseInt(String(Math.random() * i), 10);
            _a = [src[j], src[i - 1]], src[i - 1] = _a[0], src[j] = _a[1];
        }
        return src;
        var _a;
    };
    QuizApp.prototype.ngOnInit = function () {
        var _this = this;
        this._getQuestionsObservable = this.quiz.getQuestions().subscribe(function (response) {
            _this.questions = response;
            _this._isLoaded = true;
            _this.questions = QuizApp_1.arrayShuffle(_this.questions);
            _this.result = {
                total: _this.questions.length < _this._maxQuestions ? _this.questions.length : _this._maxQuestions,
                correct: 0,
                seconds: app_constants_1.Constants.QUIZTIME - _this.timer
            };
            _this.imageLazyLoad();
        });
    };
    QuizApp.prototype.ngOnDestroy = function () {
        this._getQuestionsObservable.unsubscribe();
        this._timerObservable.unsubscribe();
    };
    QuizApp.prototype.onQuestionAction = function (message) {
        if (message.action === 'answer') {
            if (message.correct) {
                this.result.correct++;
            }
        }
        if (message.action === 'next') {
            if (this.questions[this._currentQuestion + 1] && this._currentQuestion < this._maxQuestions - 1) {
                this._currentQuestion++;
            }
            else {
                this._timerObservable.unsubscribe();
                this._showResult = true;
            }
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
            this._timerObservable.unsubscribe();
            this.startTimer();
        }
    };
    QuizApp.prototype.imageLazyLoad = function () {
        this._images = [];
        if (this.questions) {
            for (var _i = 0, _a = this.questions; _i < _a.length; _i++) {
                var question = _a[_i];
                var image = new Image();
                image.src = question.image;
                this._images.push(image);
            }
        }
    };
    QuizApp.prototype.startTimer = function () {
        var _this = this;
        this.timer = 0;
        this._timerObservable = this.timerService.getTimer()
            .map(function (i) { return app_constants_1.Constants.QUIZTIME - i; })
            .take(app_constants_1.Constants.QUIZTIME + 1)
            .subscribe(function (response) {
            _this.timer = response;
            _this.result.seconds = app_constants_1.Constants.QUIZTIME - response;
            _this._showResult = _this._showResult || _this.timer <= 0;
        });
    };
    return QuizApp;
}());
QuizApp = QuizApp_1 = __decorate([
    core_1.Component({
        selector: 'quiz',
        template: "\n        <div class=\"row\">\n            <quiz-header\n                    [tick]=\"timer\"\n                    (restart)=\"onRestart($event)\">\n            </quiz-header>\n            <div id=\"quiz center-align\" class=\"col s12 l10 offset-l1\" *ngIf=\"_isLoaded\">\n                <quiz-question\n                        *ngIf=\"!_showResult\"\n                        [question]=\"questions[_currentQuestion]\"\n                        [totalQuestions]=\"result.total\"\n                        [currentQuestion]=\"_currentQuestion\"\n                        (questionAction)=\"onQuestionAction($event)\"\n                        (answer)=\"onAnswer($event)\">\n                </quiz-question>\n                <quiz-result class=\"card horizontal white\"\n                             *ngIf=\"_showResult\"\n                             [result]=\"result\"\n                             (restart)=\"onRestart($event)\">\n                </quiz-result>\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [question_service_1.QuizService, timer_service_1.TimerService])
], QuizApp);
exports.QuizApp = QuizApp;
var QuizApp_1;
//# sourceMappingURL=quizapp.component.js.map