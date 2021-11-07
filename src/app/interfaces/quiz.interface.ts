import { ParticipantInterface, QuestionInterface } from ".";

export interface QuizInterface {
    id?: string,
    description: string,
    title: string,
    author: string,
    code: string,
    questions: Array<QuestionInterface>,
    participants: Array<ParticipantInterface>
}