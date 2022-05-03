import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IGetQuizByCodeResponse, QuizInterface } from '../interfaces';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class PlayService {

  public currentQuizBehavor: BehaviorSubject<QuizInterface | undefined> = new BehaviorSubject<QuizInterface | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * 
   * @param code: string = Quiz code to get
   * @returns Ok message and Quiz
   */
  getQuizByCodeGuest(code: string): Observable<IGetQuizByCodeResponse> {
    return this.http.post<IGetQuizByCodeResponse>(`${base_url}/quiz/code/guest`, code);
  }

  /**
   * 
   * @returns Observable<IGetQuizByCodeResponse>
   */
  getCurrentQuiz() {

    if (this.currentQuizBehavor.value == undefined) {
      return this.router.navigate(['/play']);
    }

    return this.currentQuizBehavor.asObservable();

  }
}