import {Component, EventEmitter} from '@angular/core';

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
      <a class="waves-effect waves-light btn-large" (click)="resetQuestions()">Restart Quiz</a>
    </div>
    <div class="progress">
       <div class="determinate orange" [style.width]="'100%'"></div>
     </div>
 </div>
`
})

export class ResultComponent {
    result: {total: number, correct: number};
    restart: EventEmitter<string>;

    constructor() {
        this.restart = new EventEmitter<string>();
    }

    resetQuestions(): void {
        this.restart.emit("restart");
    }

    resultGrade(): number {
        return Math.ceil(this.result.correct / this.result.total * 3);
    }
}