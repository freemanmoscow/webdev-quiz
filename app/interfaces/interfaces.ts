export interface Question {
    image: string,
    question: string,
    answered: string,
    answers: string[],
    correctAnswer: string
}

export interface NextQuestion {
    action: string,
    correct: boolean
}
