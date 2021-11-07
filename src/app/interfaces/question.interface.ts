import { AnswerInterface } from "./answer.interface";

export interface QuestionInterface {
    title: string,
    answers: Array<AnswerInterface>
}

// TODO: Check the answers array