import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { GetQuizResponse, QuestionInterface, QuizInterface, QuizToList, QuizzResponseInterface } from '../interfaces';
import { Observable, Subject, of } from 'rxjs';
import { GetQuizByCodeResponse, QuizDB } from '../interfaces/getquizbycode.response.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  public tempQuiz!: QuizInterface;
  private subject = new Subject<QuestionInterface[]>()

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

  /**
   * 
   * @param id: String - Need ID to get a specific quiz
   * @returns Quiz
   */
  getQuizById(id: string) {

    const token = this.getToken();

    return this.http.get<GetQuizResponse>(`${base_url}/quiz/${id}`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map(this.transformToQuiz)
    )

  }

  /**
   * 
   * @param quiz: QUizInterface - Quiz to create
   * @returns
   */
  createQuiz(quiz: QuizInterface) {

    const token = this.getToken();

    return this.http.post(`${base_url}/quiz`, quiz, {
      headers: {
        'x-token': token
      },
      responseType: 'text'
    })
  }

  /**
   * 
   * @param code: String - Code to find the quiz
   * @returns Quiz
   */
  getQuizByCode(code: string) {

    const token = this.getToken();

    return this.http.get<GetQuizByCodeResponse>(`${base_url}/quiz/code/${code}`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map(this.transformQuizByCode)
    )

  }

  /**
   * 
   * @param quizId: string - Quiz Id's
   * @param question: QuestionInterface - Question to update
   * @returns UPTADED message
   */
  updateQuiz(quizId: string, question: QuestionInterface) {
   
    const token = this.getToken();

    return this.http.put(`${base_url}/quiz/${quizId}`, question, {
      headers: {
        'x-token': token
      },
      responseType: 'text'
    })
  }

  /**
   * quizId: string - Id of the quiz
   * userId: string - Id of the user to remove from the quiz
   */
  removeParticipant(quizId: string, userId: string) {

    const token = this.getToken();
    
    return this.http.delete(`${base_url}/quiz/remove/${quizId}/${userId}`, {
      headers: {
        'x-token': token
      },
      responseType: 'text'
    })

  }


  // Methods to transform
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

  private transformToQuiz(res: GetQuizResponse): QuizInterface {

    const temporalQuiz: QuizInterface = {
      _id: res._id,
      title: res.title,
      description: res.description,
      author: res.author,
      code: res.code,
      participants: res.participants,
      questions: res.questions
    }

    return temporalQuiz;
  }

  /**
   * 
   * @param res: GetQuizByCodeResponse - To Convert of tipo QuizDB to QuizInterface
   * @returns Quiz: QuizInterface
   */
  private transformQuizByCode(res: GetQuizByCodeResponse): QuizInterface {

    const quiz: QuizDB = res.quizDB[0];

    const temporalQuiz: QuizInterface = {
      _id: quiz._id,
      title: quiz.title,
      description: quiz.description,
      code: quiz.code,
      author: quiz.author,
      questions: quiz.questions,
      participants: quiz.participants,
    }
    
    return temporalQuiz;
  }

  // To Comunicate QuestionsComponent to FormComponent
  sendTest(participants: QuestionInterface[]) {
    this.subject.next(participants);
  }

  reciveTest(): Observable<QuestionInterface[]> {
    return this.subject.asObservable();
  }
}
