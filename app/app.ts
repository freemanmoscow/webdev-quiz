import {enableProdMode} from '@angular/core';
import {QuizApp} from './components/quizapp.component';
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {Constants} from "./config/app.constants";
import {HeaderComponent} from "./components/header.component";
import {QuestionComponent} from "./components/question.component";
import {ResultComponent} from "./components/result.component";
import {HTTP_PROVIDERS} from "@angular/http";
import {TimerService} from "./services/timer.service";
import {QuizService} from "./services/question.service";
import {bootstrap} from "@angular/platform-browser-dynamic";

@NgModule({
    imports: [Constants, HTTP_PROVIDERS, QuizService, TimerService],
    declarations: [QuizApp, HeaderComponent, QuestionComponent, ResultComponent],
    providers: [Constants, HTTP_PROVIDERS, QuizService, TimerService],
    bootstrap: [QuizApp]
})

export class AppModule {
//    constructor (Constants: Constants) {}
}

enableProdMode();

bootstrap(AppModule);
