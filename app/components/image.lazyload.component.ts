import {Component} from '@angular/core';
import {Question} from '../interfaces/interfaces';

@Component({
    selector: '<lazy-load>',
    inputs: ['questions'],
    host: {
        class: 'hidden'
    },
    template: `
      <img *ngFor="let question of questions;" [src]="question.image" [hidden]="true">
`
})

export class LazyLoadComponent {
    questions: Question[];
    _images: HTMLImageElement[];

    constructor() {
    }

    ngOnChanges() {
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