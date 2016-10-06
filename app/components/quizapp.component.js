System.register(['@angular/core', '../services/question.service', '@angular/http', '../components/question.component', '../components/result.component'], function(exports_1, context_1) {
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
    var core_1, question_service_1, http_1, question_component_1, result_component_1;
    var QuizApp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (question_service_1_1) {
                question_service_1 = question_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (question_component_1_1) {
                question_component_1 = question_component_1_1;
            },
            function (result_component_1_1) {
                result_component_1 = result_component_1_1;
            }],
        execute: function() {
            QuizApp = (function () {
                function QuizApp(Quiz) {
                    this.Quiz = Quiz;
                    this.isLoaded = false;
                    this._showResult = false;
                    this.maxQuestions = 10;
                    this.currentQuestion = 0;
                }
                QuizApp.prototype.ngOnInit = function () {
                    var _this = this;
                    this.sub = this.Quiz.getQuestions().subscribe(function (response) {
                        _this.questions = response;
                        _this.isLoaded = true;
                        _this.questions = _this.arrayShuffle(_this.questions);
                        _this.result = {
                            total: _this.questions.length < _this.maxQuestions ? _this.questions.length : _this.maxQuestions,
                            correct: 0
                        };
                    });
                };
                QuizApp.prototype.ngOnDestroy = function () {
                    this.sub.unsubscribe();
                };
                QuizApp.prototype.onNotify = function (message) {
                    if (message.action === 'next') {
                        if (message.correct)
                            this.result.correct++;
                        if (this.questions[this.currentQuestion + 1] && this.currentQuestion < this.maxQuestions - 1)
                            this.currentQuestion++;
                        else
                            this._showResult = true;
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
                        directives: [question_component_1.QuestionComponent, result_component_1.ResultComponent],
                        providers: [http_1.HTTP_PROVIDERS, question_service_1.QuizService],
                        template: "\n    <div id=\"quiz center-align\" class=\"col s12 l10 offset-l1\" *ngIf=\"isLoaded\">\n        <quiz-question class=\"card horizontal white\" *ngIf=\"!_showResult\" [question]=\"questions[currentQuestion]\" (next)=\"onNotify($event)\"></quiz-question>\n        <quiz-result class=\"card horizontal white\" *ngIf=\"_showResult\" [result]=\"result\"></quiz-result>\n    </div>\n "
                    }), 
                    __metadata('design:paramtypes', [question_service_1.QuizService])
                ], QuizApp);
                return QuizApp;
            }());
            exports_1("QuizApp", QuizApp);
        }
    }
});
//# sourceMappingURL=quizapp.component.js.map