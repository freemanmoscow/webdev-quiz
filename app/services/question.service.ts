import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()

export class QuizService {

    constructor(private http: Http) {
    }

    getQuestions(): Observable<any> {
        return this.http
            .get('resources/api/questions.json')
            .map(response => response.json().questions);
    }
}
