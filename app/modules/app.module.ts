import {QuizApp} from "../components/quizapp.component";
import {QuizService} from "../services/question.service";
import {HttpModule} from "@angular/http";
import {ResultComponent} from "../components/result.component";
import {QuestionComponent} from "../components/question.component";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
    imports: [HttpModule, BrowserModule],
    declarations: [QuestionComponent, ResultComponent, QuizApp],
    providers: [HttpModule, QuizService],
    bootstrap: [QuizApp]
})

export class AppModule {}