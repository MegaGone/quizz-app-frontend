import { AnswerInterface } from './answer.interface';

export interface IAnswerStat {
    selectedIndex   : number;
    time            : number;
    title           : string;
    answers         : [AnswerInterface]
}

export interface ICreateStats {
    quizId          : string;
    title           : string;
    correctAnswers  : number;
    incorrectAnswers: number;
    lapse           : number;
    description     : string;
    playerId        : string;
    playerName      : string;
    joinIn          : string | Date;
    answers         : [IAnswerStat]
}

export interface IPlayerStats {
    Ok              : boolean;
    playerStats?    : ICreateStats;
    token          ?: string;
}