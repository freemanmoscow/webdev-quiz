import {Component} from '@angular/core';
import {Question} from '../interfaces/interfaces';

@Component({
    selector: '<lazy-load>',
    inputs: ['questions'],
    host: {
        class: 'hidden'
    },
    template: `
      <img *ngFor="let question of questions;" [src]="question.image">
`
})

export class LazyLoadComponent {
    questions: Question[];

    constructor() {
    }
}