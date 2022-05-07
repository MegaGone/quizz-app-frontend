import { AnswerInterface } from "./answer.interface";

export interface IUserAnswer {
    answerSelected  : string | number;
    id?             : string | number;
    title           : string;
    answers         : Array<AnswerInterface>;
    seconds         : number | string;
}