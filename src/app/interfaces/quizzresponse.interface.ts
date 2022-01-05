import { ParticipantInterface, QuizInterface } from ".";

export interface QuizzResponseInterface {
    total:   number;
    quizzes: QuizInterface[];
}
export interface QuizToList {
    no?: number,
    id: string
    name: string,
    code: string,
    participants: Array<ParticipantInterface> | any
}