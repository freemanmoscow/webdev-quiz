System.register(['@angular/platform-browser-dynamic', '@angular/core', './question.service', '@angular/http'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var platform_browser_dynamic_1, core_1, question_service_1, http_1;
    var QuestionComponent, ResultComponent, RedditApp;
    return {
        setters:[
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (question_service_1_1) {
                question_service_1 = question_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            QuestionComponent = (function () {
                function QuestionComponent() {
                    this.next = new core_1.EventEmitter();
                }
                QuestionComponent.prototype.selectAnswer = function (answer) {
                    this._selectedAnswer = answer;
                };
                QuestionComponent.prototype.isCorrect = function (answer) {
                    return answer === this.question.correctAnswer && this._selectedAnswer !== undefined;
                };
                QuestionComponent.prototype.isIncorrect = function (answer) {
                    return answer !== this.question.correctAnswer && this._selectedAnswer === answer;
                };
                QuestionComponent.prototype.isDisabled = function () {
                    return this._selectedAnswer !== undefined;
                };
                QuestionComponent.prototype.nextQuestion = function () {
                    console.log("emit next");
                    this.next.emit({ action: 'next', correct: this._selectedAnswer === this.question.correctAnswer });
                    this._selectedAnswer = void (0);
                };
                QuestionComponent = __decorate([
                    core_1.Component({
                        selector: 'quiz-question',
                        inputs: ['question'],
                        outputs: ['next'],
                        host: {
                            class: 'row'
                        },
                        template: "\n    <div class=\"ui grid middle aligned question\">\n        <div class=\"four wide column center aligned logo\">\n            <img src=\"{{ question.image ? question.image : 'resources/images/blank.png' }}\">\n        </div>\n        <div class=\"twelve wide column text\">\n            <div>{{ question.question }}</div>\n        </div>\n    </div>\n\t<div class=\"ui grid middle aligned answers\">\n        <div class=\"eight wide column answer\" *ngFor=\"let answer of question.answers; let i = index;\" [class.is-incorrect]=\"isIncorrect(i.toString())\" [class.is-correct]=\"isCorrect(i.toString())\">\n          <label>\n          <input [checked]= \"isIncorrect(i.toString())\" [disabled]=\"isDisabled()\" class=\"checkbox\" (click)=\"selectAnswer(i.toString())\" type=\"checkbox\" name=\"answer\" \n            [value]=\"i\">\n            {{ answer }}\n          </label>\n        </div>\n        <div class=\"sixteen wide column middle center aligned next\">\n          <button (click)=\"nextQuestion()\" [disabled]=\"!isDisabled()\">Next</button>\n        </div>\n    </div>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], QuestionComponent);
                return QuestionComponent;
            }());
            ResultComponent = (function () {
                function ResultComponent() {
                }
                ResultComponent.prototype.resetQuestions = function () {
                    platform_browser_dynamic_1.bootstrap(RedditApp);
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
                        template: "\n    <div class=\"ui grid middle center aligned result\" [class.bad]=\"resultGrade() <= 1\" [class.ok]=\"resultGrade() === 2\" [class.good]=\"resultGrade() >= 3\">\n        <div class=\"sixteen wide column middle aligned text\">Result: {{ result.correct }} out of {{ result.total }} correct</div>\n        <div class=\"sixteen wide column middle aligned next\">\n          <button (click)=\"resetQuestions()\">Restart Quiz</button>\n        </div>\n    </div>\n"
                    }), 
                    __metadata('design:paramtypes', [])
                ], ResultComponent);
                return ResultComponent;
            }());
            RedditApp = (function () {
                function RedditApp(Quiz) {
                    this.Quiz = Quiz;
                    this.isLoaded = false;
                    this._showResult = false;
                    this.currentQuestion = 0;
                }
                RedditApp.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sub = this.Quiz.getQuestions().subscribe(function (response) {
                        _this.questions = response;
                        _this.isLoaded = true;
                        _this.questions = _this.arrayShuffle(_this.questions);
                        _this.result = {
                            total: _this.questions.length,
                            correct: 0
                        };
                    });
                };
                RedditApp.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                };
                RedditApp.prototype.onNotify = function (message) {
                    console.log(message);
                    if (message.action === 'next') {
                        if (message.correct)
                            this.result.correct++;
                        if (this.questions[this.currentQuestion + 1])
                            this.currentQuestion++;
                        else
                            this._showResult = true;
                    }
                };
                RedditApp.prototype.arrayShuffle = function (src) {
                    for (var j, x, i = src.length; i; j = parseInt(String(Math.random() * i)), x = src[--i], src[i] = src[j], src[j] = x)
                        ;
                    return src;
                };
                RedditApp = __decorate([
                    core_1.Component({
                        selector: 'quiz',
                        directives: [QuestionComponent, ResultComponent],
                        providers: [http_1.HTTP_PROVIDERS, question_service_1.QuizService],
                        template: "\n    <div class=\"ui main text container\" *ngIf=\"isLoaded\">\n        <div class=\"ui grid middle aligned questions\">\n          <quiz-question *ngIf=\"!_showResult\" [question]=\"questions[currentQuestion]\" (next)=\"onNotify($event)\"></quiz-question>\n          <quiz-result *ngIf=\"_showResult\" [result]=\"result\"></quiz-result>\n        </div>\n    </div>\n "
                    }), 
                    __metadata('design:paramtypes', [question_service_1.QuizService])
                ], RedditApp);
                return RedditApp;
            }());
            platform_browser_dynamic_1.bootstrap(RedditApp);
        }
    }
});
//# sourceMappingURL=app.js.map