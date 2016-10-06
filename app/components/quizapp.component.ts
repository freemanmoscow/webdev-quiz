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
    <div id="quiz center-align" class="col s12 l10 offset-l1" *ngIf="isLoaded">
        <quiz-question class="card horizontal white" *ngIf="!_showResult" [question]="questions[currentQuestion]" (next)="onNotify($event)"></quiz-question>
        <quiz-result class="card horizontal white" *ngIf="_showResult" [result]="result"></quiz-result>
    </div>
 `
})

export class QuizApp {
    isLoaded: boolean;
    currentQuestion: number;
    questions: Question[];
    maxQuestions: number;
    private _showResult: boolean;
    result: {total: number, correct: number};
    private sub: any;

    constructor(private Quiz: QuizService) {
        this.isLoaded = false;
        this._showResult = false;
        this.maxQuestions = 10;
        this.currentQuestion = 0;
    }

    ngOnInit() {
        this.sub = this.Quiz.getQuestions().subscribe((response) => {
            this.questions = response;
            this.isLoaded = true;
            this.questions = this.arrayShuffle(this.questions);
            this.result = {
                total: this.questions.length < this.maxQuestions ? this.questions.length : this.maxQuestions,
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
            if (this.questions[this.currentQuestion + 1] && this.currentQuestion < this.maxQuestions - 1)
                this.currentQuestion++;
            else
                this._showResult = true;
        }
    }

    arrayShuffle<T>(src: T[]): T[] {
        for (var j, x, i = src.length; i; j = parseInt(String(Math.random() * i)), x = src[--i], src[i] = src[j], src[j] = x);
        return src;
    }
}
