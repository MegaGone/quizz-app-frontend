import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IGetQuizByCodeResponse, IJoinToQuizGuest, QuizInterface } from '../interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  public currentQuizBehavor: BehaviorSubject<QuizInterface | undefined> = new BehaviorSubject<QuizInterface | undefined>(undefined);
  public currentCodeBehavor: BehaviorSubject<string> = new BehaviorSubject<string>('');

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

  getCurrentCode(): Observable<string> | any {

    if ( this.currentCodeBehavor.value != '') {
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
   * @returns Observable<QuizInterface>
   */
  getCurrentQuiz(): Observable<QuizInterface | undefined> | Promise<boolean> {

    if (this.currentQuizBehavor.value == undefined) {
      return this.router.navigate(['/play']);
    }
  
    this.router.navigate(['/play/guest'])
    return this.currentQuizBehavor.asObservable();
  }
}