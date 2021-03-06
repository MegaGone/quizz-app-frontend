import { IPlayer } from './IPlayer';
import { QuizInterface } from './quiz.interface';

export interface IGetQuizByCodeResponse {

    Ok      : boolean;
    quizDB? : QuizInterface;
    message?: string;
    code?   : string;
    player? : IPlayer

};