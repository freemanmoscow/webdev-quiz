import {Injectable} from '@angular/core';

@Injectable()

export class Constants {
    static get QUIZTIME(): number {
        return 120; // time to complete the quiz in seconds
    }

    static get NUMBEROFQUESTIONS(): number {
        return 10; // number of questions in the quiz
    }
}
