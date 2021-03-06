import {Component, EventEmitter} from '@angular/core';
import {IQuestion, IQuestionAction} from '../interfaces/interfaces';

@Component({
    selector: 'quiz-question',
    inputs: ['question', 'totalQuestions', 'currentQuestion'],
    outputs: ['questionAction'],
    template: `
    <ul class="row horizontal">
      <li class="card card-stacked white">
        <div class="card-content">
            <div class="row card-panel question grey lighten-3 valign-wrapper">
              <div class="col s3 m2" *ngIf="question.image"><div class="image valign-wrapper"><img class="valign" [src]="question.image"></div></div>
              <div class="col valign-wrapper text s9"
                [class.m12]="!question.image"
                [class.m10]="question.image"><h5 class="valign">{{ question.question }}</h5></div>
            </div>
            <div class="row answers">
              <div class="lighten-4 col s12 l6 valign-wrapper card-panel waves-effect waves-light" *ngFor="let answer of question.answers; let i = index;"
                [class.red]="isIncorrect(i.toString())"
                [class.green]="isCorrect(i.toString())"
                [class.yellow]="isDisabled()"
                [class.disabled]="!isDisabled()"
                (click)="selectAnswer(i.toString())">
                  <div class="valign answer">{{ answer }}</div>
              </div>
            </div>
          </div>
        <div class="card-action center">
          <a class="waves-effect waves-light btn-large" (click)="nextQuestion()" [class.disabled]="isDisabled()">Next</a>
        </div>
        <div class="progress">
          <div class="determinate orange" [style.width]="(currentQuestion / totalQuestions * 100) + '%'"></div>
        </div>
      </li>
    </ul>
`
})

export class QuestionComponent {
    question: IQuestion;
    questionAction: EventEmitter<IQuestionAction>;
    private _selectedAnswer: string;

    constructor() {
        this.questionAction = new EventEmitter<IQuestionAction>();
    }

    selectAnswer(answer: string): void {
        this._selectedAnswer = answer;
        this.questionAction.emit({action: 'answer', correct: this._selectedAnswer === this.question.correctAnswer});
    }

    isCorrect(answer: string): boolean {
        return answer === this.question.correctAnswer && this._selectedAnswer !== undefined;
    }

    isIncorrect(answer: string): boolean {
        return answer !== this.question.correctAnswer && this._selectedAnswer === answer;
    }

    isDisabled(): boolean {
        return this._selectedAnswer === undefined;
    }

    nextQuestion(): void {
        this.questionAction.emit({action: 'next', correct: this._selectedAnswer === this.question.correctAnswer});
        this._selectedAnswer = undefined;
    }
}
