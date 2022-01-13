import { ParticipantInterface, QuizInterface } from ".";

export interface QuizzResponseInterface {
    total:   number;
    quizzes: QuizInterface[];
}
export interface QuizToList {
    no?: number,
    _id: string
    name: string,
    code: string,
    participants: Array<ParticipantInterface> | any
}
export interface GetQuizResponse {
    _id:          string;
    title:        string;
    description:  string;
    author:       string;
    code:         string;
    participants: Participant[];
    questions:    Question[];
}

export interface Participant {
    correctAnswers: number;
    _id?:           string;
    name:           string;
    userId:         string;
    joinIn:         string;
}

export interface Question {
    _id:     string;
    title:   string;
    answers: Answer[];
}

export interface Answer {
    isCorrect: boolean;
    _id?:      string;
    title:     string;
}