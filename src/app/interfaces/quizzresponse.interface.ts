import { ParticipantInterface, QuestionInterface, QuizInterface } from ".";

export interface QuizzResponseInterface {
    total:   number;
    quizzes: QuizInterface[];
}

export interface QuizzList {
    no?: number,
    id?: string | any,
    title: string,
    description: string,
    author: string,
    code: string,
    participants: Array<ParticipantInterface> | any,
    questions: Array<QuestionInterface>
}