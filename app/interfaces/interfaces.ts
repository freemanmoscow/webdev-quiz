export interface IQuestion {
    image: string;
    question: string;
    answered: string;
    answers: string[];
    correctAnswer: string;
}

export interface IQuestionAction {
    action: string;
    correct: boolean;
}

export interface IResult {
    total: number;
    correct: number;
    seconds: number;
}
