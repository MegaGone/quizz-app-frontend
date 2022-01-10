import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizToList } from 'src/app/interfaces';
import { QuizService } from 'src/app/services';

@Component({
  selector: 'app-quizzlist',
  templateUrl: './quizzlist.component.html',
  styleUrls: ['./quizzlist.component.css'],
})
export class QuizzlistComponent implements OnInit {
  public QuizzesToList: QuizToList[] = [];
  public errMsg!: string;
  public page: number = 0;
  public term: string = '';

  constructor(private quizSvc: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.getQuizzes();
  }

  getQuizzes() {
    this.quizSvc.getQuizzes().subscribe(
      (data) => (this.QuizzesToList = data), // If dont have errors, assign the quizzes with the response
      (err) => this.throwErrorMsg(err)
    );
  }

  private throwErrorMsg(error: HttpErrorResponse) {
    if (error.status != 200) {
      return (this.errMsg = 'Server error');
    }
    return (this.errMsg = error.error.text);
  }

  prevPage() {
    if (this.page >= 1) {
      this.page -= 5;
    }
  }

  nxtPage() {
    this.page += 5;
  }

  /**
   * 
   * @param quiz: QuizToList = Need Quiz to navigate to QuizComponent and get the quiz info to update or set the component with this data.
   */
  navigateToQuiz(quiz: string) {
    console.log(quiz);

    if (quiz) {
    
      // this.quizSvc.tempQuiz = quiz;
      this.router.navigate(['/home/quiz'])
    }

    return;
  }

  createQuiz() {
    this.router.navigate(['/home/quiz']);
  }

  searchQuiz(term: string) {
    this.page = 0;
    this.term = term;
  }
}
