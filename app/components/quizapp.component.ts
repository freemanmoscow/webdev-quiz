import {Component, OnInit, OnDestroy} from '@angular/core';
import {Question, Result, QuestionAction} from '../interfaces/interfaces';
import {QuizService} from '../services/question.service';
import {TimerService} from '../services/timer.service';
import {Constants} from '../config/app.constants';

@Component({
    selector: 'quiz',
    template: `
    <div class="row">
        <quiz-header
          [tick]="timer"
          (restart)="onRestart($event)">                    
        </quiz-header>
        <div id="quiz center-align" class="col s12 l10 offset-l1" *ngIf="_isLoaded">
            <quiz-question
              *ngIf="!_showResult"
              [question]="questions[_currentQuestion]"
              [totalQuestions]="result.total"
              [currentQuestion]="_currentQuestion"
              (questionAction)="onQuestionAction($event)"
              (answer)="onAnswer($event)">
            </quiz-question>
            <quiz-result class="card horizontal white"
              *ngIf="_showResult"
              [result]="result"
              (restart)="onRestart($event)">
            </quiz-result>
        </div>
    </div>
 `
})

export class QuizApp {
    result: Result;
    questions: Question[];
    timer: number;
    private _isLoaded: boolean;
    private _currentQuestion: number;
    private _maxQuestions: number;
    private _showResult: boolean;
    private _images: HTMLImageElement[];
    private _getQuestionsObservable: any;
    private _timerObservable: any;

    constructor(private Quiz: QuizService, private TimerService: TimerService) {
        this._isLoaded = false;
        this._showResult = false;
        this._maxQuestions = Constants.NUMBEROFQUESTIONS;
        this._currentQuestion = 0;
        this.startTimer();
    }

    ngOnInit() {
        this._getQuestionsObservable = this.Quiz.getQuestions().subscribe((response) => {
            this.questions = response;
            this._isLoaded = true;
            this.questions = this.arrayShuffle(this.questions);
            this.result = {
                total: this.questions.length < this._maxQuestions ? this.questions.length : this._maxQuestions,
                correct: 0,
                seconds: Constants.QUIZTIME - this.timer
            }
            this.imageLazyLoad();
        });
    }

    ngOnDestroy() {
        this._getQuestionsObservable.unsubscribe();
        this._timerObservable.unsubscribe();
    }

    onQuestionAction(message: QuestionAction): void {
        if (message.action === 'answer') {
            if (message.correct)
                this.result.correct++;
        }
        if (message.action === 'next') {
            if (this.questions[this._currentQuestion + 1] && this._currentQuestion < this._maxQuestions - 1)
                this._currentQuestion++;
            else {
                this._timerObservable.unsubscribe();
                this._showResult = true;
            }
        }
    }

    onRestart(message: string) {
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

    }

    arrayShuffle<T>(src: T[]): T[] {
        for (var j, x, i = src.length; i; j = parseInt(String(Math.random() * i)), x = src[--i], src[i] = src[j], src[j] = x);
        return src;
    }

    imageLazyLoad(): void {
        this._images = [];
        if (this.questions) {
            for (let question of this.questions) {
                let image: HTMLImageElement = new Image();
                image.src = question.image;
                this._images.push(image);
            }
        }
    }

    startTimer() {
        this.timer = 0;
        this._timerObservable = this.TimerService.getTimer()
            .map(i => Constants.QUIZTIME - i)
            .take(Constants.QUIZTIME + 1)
            .subscribe((response) => {
                this.timer = response;
                this.result.seconds = Constants.QUIZTIME - response;
                this._showResult = this._showResult || this.timer <= 0;
            });
    }
};
