import {Component, OnInit, OnDestroy} from '@angular/core';
import {Question, NextQuestion} from '../interfaces/interfaces';
import {QuizService} from '../services/question.service';
import {HTTP_PROVIDERS} from '@angular/http';
import {QuestionComponent} from '../components/question.component';
import {ResultComponent} from '../components/result.component';

@Component({
    selector: 'quiz',
    directives: [QuestionComponent, ResultComponent],
    providers: [HTTP_PROVIDERS, QuizService],
    template: `
    <div id="quiz center-align" class="col s12 l10 offset-l1" *ngIf="_isLoaded">
        <quiz-question class="card horizontal white" *ngIf="!_showResult"
          [question]="question[_currentQuestion]"
          (next)="onNotify($event)">
        </quiz-question>
        <quiz-result class="card horizontal white"
          *ngIf="_showResult"
          [result]="result"
          (restart)="onRestart($event)">
        </quiz-result>
    </div>
 `
})

export class QuizApp {
    private _isLoaded: boolean;
    private _currentQuestion: number;
    private _maxQuestions: number;
    private _showResult: boolean;
    private sub: any;
    result: {total: number, correct: number};
    question: Question[];

    constructor(private Quiz: QuizService) {
        this._isLoaded = false;
        this._showResult = false;
        this._maxQuestions = 1;
        this._currentQuestion = 0;
    }

    ngOnInit() {
        this.sub = this.Quiz.getQuestions().subscribe((response) => {
            this.question = response;
            this._isLoaded = true;
            this.question = this.arrayShuffle(this.question);
            this.result = {
                total: this.question.length < this._maxQuestions ? this.question.length : this._maxQuestions,
                correct: 0
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onNotify(message: NextQuestion): void {
        if (message.action === 'next') {
            if (message.correct)
                this.result.correct++;
            if (this.question[this._currentQuestion + 1] && this._currentQuestion < this._maxQuestions - 1)
                this._currentQuestion++;
            else
                this._showResult = true;
        }
    }

    onRestart(message: string) {
        // TODO: Figure out how to reload
        if (message === 'restart') {
            this._isLoaded = false;
            this._showResult = false;
            this._maxQuestions = 1;
            this._currentQuestion = 0;
            this.ngOnInit();
        }

    }

    arrayShuffle<T>(src: T[]): T[] {
        for (var j, x, i = src.length; i; j = parseInt(String(Math.random() * i)), x = src[--i], src[i] = src[j], src[j] = x);
        return src;
    }
}
