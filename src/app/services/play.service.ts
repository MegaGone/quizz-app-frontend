import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICreateStats, IGetQuizByCodeResponse, IJoinToQuizGuest, IPlayer, IPlayerStats, IStats, QuizInterface } from '../interfaces';
import { BehaviorSubject, Observable, of, fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  public currentQuizBehavor: BehaviorSubject<QuizInterface | undefined> = new BehaviorSubject<QuizInterface | undefined>(undefined);
  public currentCodeBehavor: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public currentGuestPlayerBehavor: BehaviorSubject<IPlayer | undefined> = new BehaviorSubject<IPlayer | undefined>(undefined);
  public quizPlayedBehavor: BehaviorSubject<ICreateStats | undefined> = new BehaviorSubject<ICreateStats | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * 
   * @param code: string = Quiz code to get
   * @returns Ok message and Quiz
   */
  getQuizByCodeGuest(code: string): Observable<IGetQuizByCodeResponse> {
    return this.http.post<IGetQuizByCodeResponse>(`${base_url}/quiz/code/guest`, code).pipe(
      tap((res: IGetQuizByCodeResponse) => this.currentCodeBehavor.next(res.code!))
    )
  }

  /**
   * 
   * @returns CurrentCode
   */
  getCurrentCode(): Observable<string> | any {

    if (this.currentCodeBehavor.value != '') {
      return this.currentCodeBehavor.asObservable();
    }

    return this.router.navigate(['/play']);
  }

  /**
   * Data: IJOinToQuizGuest - Necesary to join to the quiz
   */
  joinToQuizGuest(data: IJoinToQuizGuest): Observable<IGetQuizByCodeResponse> {
    return this.http.post<IGetQuizByCodeResponse>(`${base_url}/quiz/join/guest`, data)
  };

  /**
   * 
   * @param stats: IStats - Stats to save
   * @returns Observable<IPlayerStats>
   */
  createStats(stats: IStats): Observable<IPlayerStats> {
    return this.http.post<IPlayerStats>(`${base_url}/stats`, stats).pipe(
      tap((res: IPlayerStats) => {
        if (res.token) {
          localStorage.setItem('token', res.token)
        }
      })
    )
  }

  /**
 * 
 * @param quizId: string - Quiz id
 * @param userId: string - Player Id
 * @returns Observable<ICreateStats>
 */
  getUserStats(quizId: string, userId: string): Observable<ICreateStats | undefined> {
    return this.http.get<IPlayerStats>(`${base_url}/stats/player/${quizId}/${userId}`)
    .pipe(
      map((res: IPlayerStats) => res.playerStats)
    )
  }

  /** 
   * @returns Observable<ICreateStats>
   */
  getQuizPlayed(): Observable<ICreateStats> | any {
    if (this.quizPlayedBehavor.getValue() == undefined || !this.quizPlayedBehavor.getValue()) {
      const quizId   = localStorage.getItem('QuizId');
      const playerId = localStorage.getItem('PlayerId');

      return this.getUserStats(quizId!, playerId!);
    }

    return this.quizPlayedBehavor.asObservable().pipe(
      delay(300)
    )
  }

  /**
 * 
 * @returns Observable<QuizInterface>
 */
  getCurrentQuiz(): Observable<QuizInterface | undefined> | Promise<boolean> {
    if (this.currentQuizBehavor.value == undefined) {
      return this.router.navigate(['/play']);
    }

    this.router.navigate(['/play/guest'])
    return this.currentQuizBehavor.asObservable();
  }

  /**
   * @returns Observable<IPlayer>
   */
  getCurrentPlayer(): Observable<IPlayer | undefined> | Promise<boolean> {
    if (this.currentGuestPlayerBehavor.value == undefined) {
      return this.router.navigate(['/play']);
    }

    return this.currentGuestPlayerBehavor.asObservable();
  }
}