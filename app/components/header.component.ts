import {Component, EventEmitter} from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'quiz-header',
    host: {
        class: 'row'
    },
    outputs: ['restart'],
    inputs: ['tick'],
    template: `
    <nav class="col s12 l10 offset-l1 white">
      <div class="nav-wrapper">
        <a class="brand-logo">WebDev Quiz</a>
        <ul class="right">
          <li class="timer"
            [class.timeout]="tick <= 5 && tick > 0"
            [class.done]="tick <= 0">
            {{ moment.utc(tick * 1000).format('mm:ss') }} left
          </li>
          <li class="reload">
            <a (click)="resetQuestions()" href="#">
              <i class="material-icons blue-grey-text right">refresh</i>
            </a>
          </li>
          <li class="github-button hide-on-med-and-down">
            <a class="waves-effect waves-light btn" href="https://github.com/freemanmoscow/webdev-quiz" target="_blank">
              <i class="material-icons left">code</i>
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </nav>
`
})

export class HeaderComponent {
    restart: EventEmitter<string>;
    moment: any;

    constructor() {
        this.restart = new EventEmitter<string>();
        this.moment = moment;
    }

    resetQuestions(): void {
        this.restart.emit('restart');
    }
}
