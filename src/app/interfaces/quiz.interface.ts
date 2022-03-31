import { ParticipantInterface, QuestionInterface } from ".";

export interface QuizInterface {
    _id?: string | any,
    title: string,
    description: string,
    author: string,
    code: string,
    participants: Array<ParticipantInterface> | any,
    questions: Array<QuestionInterface>,
    lapse: number
}