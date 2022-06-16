import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICreateStats, IGetQuizByCodeResponse, IJoinToQuizGuest, IPlayer, IPlayerStats, IStats, QuizInterface } from '../interfaces';
import { BehaviorSubject, Observable, of, fromEvent } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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
 * @param code: string - Quiz code
 * @returns Observable<IGetQuizByCodeResponse>
 */
  getQuizByCode(code: string): Observable<IGetQuizByCodeResponse> {
    return this.http.get<IGetQuizByCodeResponse>(`${base_url}/quiz/code/${code}`, {
      headers: {
        'x-token': this.getToken
      }
    }).pipe(
      tap((res: IGetQuizByCodeResponse) => this.currentCodeBehavor.next(res.code!))
    );
  };

  /**
   * 
   * @param code: string - Quiz Code
   * @returns Join to quiz code
   */
  joinToQuiz(code: string): Observable<IGetQuizByCodeResponse> {

    const data: FormData = new FormData();
    data.append('code', code.toUpperCase());

    return this.http.post<IGetQuizByCodeResponse>(`${base_url}/quiz/join`, data, {
      headers: {
        'x-token': this.getToken
      }
    });
  };

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
   * @returns Observable<IGetQuizByCodeResponse>
   */
  createStats(stats: IStats): Observable<IGetQuizByCodeResponse> {
    return this.http.post<IGetQuizByCodeResponse>(`${base_url}/stats`, stats, {
      headers: {
        'x-token': this.getToken
      }
    });
  }

  /**
   * 
   * @param stats: IStats - Stats to save
   * @returns Observable<IPlayerStats>
   */
  createStatsGuest(stats: IStats): Observable<IPlayerStats> {
    return this.http.post<IPlayerStats>(`${base_url}/stats/guest`, stats).pipe(
      tap((res: IPlayerStats) => {
        if (res.token) {
          localStorage.setItem('y-token', res.token)
        }
      })
    )
  }

  /**
   * 
   * @param quizId: string - QuizID 
   * @returns 
   */
  getUsersStats(quizId: string) {
    return this.http.get<IPlayerStats>(`${base_url}/stats/${quizId}`, {
      headers: {
        'x-token': this.getToken
      }
    })
  }

  /**
 * 
 * @param quizId: string - Quiz id
 * @param userId: string - Player Id
 * @returns Observable<ICreateStats>
 */
  getUserStatsGuest(token: string): Observable<ICreateStats | undefined> {
    return this.http.get<IPlayerStats>(`${base_url}/stats/guest`, {
      headers: {
        'y-token': token
      }
    })
      .pipe(
        map((res: IPlayerStats) => res.playerStats)
      )
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

  /**
   * TOKEN
   */
  get getToken(): string {
    return localStorage.getItem('token')!;
  }
}