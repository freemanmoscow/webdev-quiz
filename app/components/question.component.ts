import {Component, EventEmitter} from '@angular/core';
import {Question, NextQuestion} from '../interfaces/interfaces';

@Component({
    selector: 'quiz-question',
    inputs: ['question'],
    outputs: ['next'],
    host: {
        class: 'row'
    },
    template: `
      <div class="card-stacked">
        <div class="card-content">
            <div class="row card-panel question grey lighten-3">
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
      </div>
`
})

export class QuestionComponent {
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
        return this._selectedAnswer === undefined;
    }

    nextQuestion(): void {
        console.log("emit next");
        this.next.emit({action: 'next', correct: this._selectedAnswer === this.question.correctAnswer});
        this._selectedAnswer = void(0);
    }
}
