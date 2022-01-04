import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  /**
   * 
   * @returns JWT
   */
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * @returns Quizzes By User - JWT Must be provided
   */
  getQuizzes() {
    
    const token = this.getToken();
    
    return this.http.get(`${base_url}/quiz/quizzes`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      catchError(err => of(err))
    )

  }
}
