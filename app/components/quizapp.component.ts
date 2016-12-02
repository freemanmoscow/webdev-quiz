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
          [question]="questions[_currentQuestion]"
          [totalQuestions]="result.total"
          [currentQuestion]="_currentQuestion"
          (next)="onNext($event)">
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
    result: {total: number, correct: number};
    questions: Question[];
    private _isLoaded: boolean;
    private _currentQuestion: number;
    private _maxQuestions: number;
    private _showResult: boolean;
    private _images: HTMLImageElement[];
    private _getQuestionsObservable: any;

    constructor(private Quiz: QuizService) {
        this._isLoaded = false;
        this._showResult = false;
        this._maxQuestions = 10;
        this._currentQuestion = 0;
    }

    ngOnInit() {
        this._getQuestionsObservable = this.Quiz.getQuestions().subscribe((response) => {
            this.questions = response;
            this._isLoaded = true;
            this.questions = this.arrayShuffle(this.questions);
            this.result = {
                total: this.questions.length < this._maxQuestions ? this.questions.length : this._maxQuestions,
                correct: 0
            }
            this.imageLazyLoad();
        });
    }

    ngOnDestroy() {
        this._getQuestionsObservable.unsubscribe();
    }

    onNext(message: NextQuestion): void {
        if (message.action === 'next') {
            if (message.correct)
                this.result.correct++;
            if (this.questions[this._currentQuestion + 1] && this._currentQuestion < this._maxQuestions - 1)
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
            this._maxQuestions = 10;
            this._currentQuestion = 0;
            this.ngOnInit();
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
}
