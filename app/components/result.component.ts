import {Component} from '@angular/core';

@Component({
    selector: 'quiz-result',
    inputs: ['result'],
    outputs: ['restart'],
    host: {
        class: 'row'
    },
    template: `
 <div class="card-stacked">
     <div class="card-content">
        <div class="result card-panel s12 l8 offset-l2 valign-wrapper" [class.bad]="resultGrade() <= 1" [class.ok]="resultGrade() === 2" [class.good]="resultGrade() >= 3">
            <div class="valign text">Result: {{ result.correct }} out of {{ result.total }} correct</div>
        </div>
    </div>
    <div class="card-action center">
      <a class="waves-effect waves-light btn-large" (click)="resetQuestions()" [class.disabled]="isDisabled()">Restart Quiz</a>
    </div>
 </div>
`
})

export class ResultComponent {
    result: {total: number, correct: number};

    constructor() {
    }

    resetQuestions(): void {
        // TODO: Figure out how to reload
    }

    resultGrade(): number {
        return Math.ceil(this.result.correct / this.result.total * 3);
    }
}