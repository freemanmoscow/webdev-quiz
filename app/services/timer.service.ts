import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';

@Injectable()

export class TimerService {
    timerObservable: Observable<any>;

    constructor() {
        this.setTimer(0);
    }

    getTimer(): Observable<any> {
        return this.timerObservable;
    }

    setTimer(initialTime: number = 0): any {
        this.timerObservable = Observable.timer(initialTime, 1000);
        return this.timerObservable;
    }
}