import { Question, Participant } from './quizzresponse.interface';

export interface GetQuizByCodeResponse {
    status: string;
    quizDB: QuizDB;
}

export interface QuizDB {
    _id:            string;
    title:          string;
    description:    string;
    questions:      Question[];
    author:         string;
    code:           string;
    participants?:  Participant[];
    lapse:          number;
}