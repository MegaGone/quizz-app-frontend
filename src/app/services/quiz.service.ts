import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { QuizInterface, QuizToList, QuizzResponseInterface } from '../interfaces';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  public tempQuiz!: QuizToList;

  constructor(private http: HttpClient) { }

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

    return this.http.get<QuizzResponseInterface>(`${base_url}/quiz/quizzes`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map(this.transformToQuizzesToList)
    )
  }

  private transformToQuizzesToList(res: QuizzResponseInterface): QuizToList[] {

    const quizzesList: QuizToList[] = res.quizzes.map((quiz: QuizInterface, i: number) => {
      return {
        no: i + 1,
        _id: quiz._id,
        name: quiz.title,
        code: quiz.code,
        participants: quiz.participants
      }
    })

    return quizzesList;
  }
}
