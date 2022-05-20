import { AnswerInterface } from "./answer.interface";

export interface QuestionInterface {
    id?: string | number,
    title: string,
    answers: Array<AnswerInterface>
    _id:    string
}

// TODO: Check the answers array