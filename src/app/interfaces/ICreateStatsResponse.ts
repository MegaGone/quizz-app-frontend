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
    laspe           : number;
    description     : string;
    playerId        : string;
    playerName      : string;
    joinIn          : string | Date;
    anwers          : [IAnswerStat]
}

export interface IPlayerStats {
    Ok              : boolean;
    playerStats     : ICreateStats;
}