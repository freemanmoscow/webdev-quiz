import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Question } from '../interfaces/interfaces';

@Injectable()

export class QuizService {

    constructor(private http: Http) {
    }

    getQuestions(): Observable<any> {
        return this.http
            .get('resources/api/questions.json')
            .map(response => response.json().questions.map(_toQuestions));
    }
}

function _toQuestions(question: any): Question {
    return <Question>({
        image: question.image,
        question: question.question,
        answered: question.answered,
        answers: question.answers,
        correctAnswer: question.correctAnswer
    });
}