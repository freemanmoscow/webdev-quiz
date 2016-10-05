import {bootstrap} from '@angular/platform-browser-dynamic';
import {Component, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import {Question, NextQuestion} from './interfaces';
import {QuizService} from './question.service';
import {HTTP_PROVIDERS} from '@angular/http';

@Component({
    selector: 'quiz-question',
    inputs: ['question'],
    outputs: ['next'],
    host: {
        class: 'row'
    },
    template: `
    <div class="ui grid middle aligned question">
        <div class="four wide column center aligned logo">
            <img src="{{ question.image ? question.image : 'resources/images/blank.png' }}">
        </div>
        <div class="twelve wide column text">
            <div>{{ question.question }}</div>
        </div>
    </div>
	<div class="ui grid middle aligned answers">
        <div class="eight wide column answer" *ngFor="let answer of question.answers; let i = index;" [class.is-incorrect]="isIncorrect(i.toString())" [class.is-correct]="isCorrect(i.toString())">
          <label>
          <input [checked]= "isIncorrect(i.toString())" [disabled]="isDisabled()" class="checkbox" (click)="selectAnswer(i.toString())" type="checkbox" name="answer" 
            [value]="i">
            {{ answer }}
          </label>
        </div>
        <div class="sixteen wide column middle center aligned next">
          <button (click)="nextQuestion()" [disabled]="!isDisabled()">Next</button>
        </div>
    </div>
`
})

class QuestionComponent {
    question: Question;
    next: EventEmitter<NextQuestion>;
    private _selectedAnswer: string;

    constructor() {
        this.next = new EventEmitter<NextQuestion>();
    }

    selectAnswer(answer): void {
        this._selectedAnswer = answer;
    }

    isCorrect(answer): boolean {
        return answer === this.question.correctAnswer && this._selectedAnswer !== undefined;
    }

    isIncorrect(answer): boolean {
        return answer !== this.question.correctAnswer && this._selectedAnswer === answer;
    }

    isDisabled(): boolean {
        return this._selectedAnswer !== undefined;
    }

    nextQuestion(): void {
        console.log("emit next");
        this.next.emit({action: 'next', correct: this._selectedAnswer === this.question.correctAnswer});
        this._selectedAnswer = void(0);
    }
}

@Component({
    selector: 'quiz-result',
    inputs: ['result'],
    outputs: ['restart'],
    host: {
        class: 'row'
    },
    template: `
    <div class="ui grid middle center aligned result" [class.bad]="resultGrade() <= 1" [class.ok]="resultGrade() === 2" [class.good]="resultGrade() >= 3">
        <div class="sixteen wide column middle aligned text">Result: {{ result.correct }} out of {{ result.total }} correct</div>
        <div class="sixteen wide column middle aligned next">
          <button (click)="resetQuestions()">Restart Quiz</button>
        </div>
    </div>
`
})

class ResultComponent {
    result: {total: number, correct: number};

    constructor() {
    }

    resetQuestions(): void {
        bootstrap(RedditApp);
    }

    resultGrade(): number {
        return Math.ceil(this.result.correct / this.result.total * 3);
    }
}

@Component({
    selector: 'quiz',
    directives: [QuestionComponent, ResultComponent],
    providers: [HTTP_PROVIDERS, QuizService],
    template: `
    <div class="ui main text container" *ngIf="isLoaded">
        <div class="ui grid middle aligned questions">
          <quiz-question *ngIf="!_showResult" [question]="questions[currentQuestion]" (next)="onNotify($event)"></quiz-question>
          <quiz-result *ngIf="_showResult" [result]="result"></quiz-result>
        </div>
    </div>
 `
})

class RedditApp {
    isLoaded: boolean;
    currentQuestion: number;
    questions: Question[];
    private _showResult: boolean;
    result: {total: number, correct: number};
    private sub: any;

    constructor(private Quiz: QuizService) {
        this.isLoaded = false;
        this._showResult = false;

        this.currentQuestion = 0;
    }

    ngOnInit() {
        this.sub = this.Quiz.getQuestions().subscribe((response) => {
            this.questions = response;
            this.isLoaded = true;
            this.questions = this.arrayShuffle(this.questions);
            this.result = {
                total: this.questions.length,
                correct: 0
            }
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onNotify(message: NextQuestion): void {
        console.log(message)
        if (message.action === 'next') {
            if (message.correct)
                this.result.correct++;
            if (this.questions[this.currentQuestion + 1])
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

bootstrap(RedditApp);