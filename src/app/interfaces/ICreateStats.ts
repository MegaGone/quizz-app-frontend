import { IUserAnswer } from './IUserAnswer';

export interface IStats {
    quizId              : string;
    playerId            : string;
    playerName          : string;
    incorrectAnswers    : number;
    joinIn              : Date | string;
    correctAnswers      : number;
    questions           : Array<IUserAnswer>
}

export interface ICreateStatsRequest {
    Ok      : boolean;
    stats   : IStats;
}