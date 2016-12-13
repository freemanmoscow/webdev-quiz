import {Component} from '@angular/core';
import {TimerService} from '../services/timer.service';
import {Constants} from "../config/app.constants";

@Component({
    selector: 'quiz-header',
    host: {
        class: 'row'
    },
    inputs: ['timer'],
    providers: [TimerService],
    template: `
    <nav class="col s12 l10 offset-l1 white">
      <div class="nav-wrapper">
        <a class="brand-logo">WebDev Quiz</a>
        <ul class="right hide-on-med-and-down">
          <li class="reload">
            <a onclick="location.reload();">
              <i class="material-icons blue-grey-text right">refresh</i>
              {{ timer }} left
            </a>
          </li>
          <li class="github-button">
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
    timer: string;
    _timerObservable: any;

    constructor(TimerService: TimerService) {
        this._timerObservable = TimerService.getTimer().map(i => Constants.QUIZTIME - i).take(Constants.QUIZTIME + 1).subscribe(response => this.timer = String(response));
    }
}