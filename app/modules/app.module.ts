import {QuizApp} from "../components/quizapp.component";
import {QuizService} from "../services/question.service";
import {ResultComponent} from "../components/result.component";
import {QuestionComponent} from "../components/question.component";
import {TimerService} from "../services/timer.service";
import {HeaderComponent} from "../components/header.component";
import {NgModule} from "@angular/core";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [HttpModule, BrowserModule],
    declarations: [QuestionComponent, ResultComponent, QuizApp, HeaderComponent],
    providers: [QuizService, TimerService],
    bootstrap: [QuizApp]
})

export class AppModule {}