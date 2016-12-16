export interface Question {
    image: string,
    question: string,
    answered: string,
    answers: string[],
    correctAnswer: string
}

export interface QuestionAction {
    action: string,
    correct: boolean
}

export interface Result {
    total: number,
    correct: number,
    seconds: number
}