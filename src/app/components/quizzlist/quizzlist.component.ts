import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuizzList } from 'src/app/interfaces';
import { QuizService } from 'src/app/services';

@Component({
  selector: 'app-quizzlist',
  templateUrl: './quizzlist.component.html',
  styleUrls: ['./quizzlist.component.css']
})
export class QuizzlistComponent implements OnInit {

  public QuizzesToList: QuizzList[] = [];
  public errMsg!: string;

  constructor(private quizSvc: QuizService) { }

  ngOnInit(): void {
    this.getQuizzes();
  }

  getQuizzes() {
    this.quizSvc.getQuizzes().subscribe( 
      data => this.QuizzesToList = data,    // If dont have errors, assign the quizzes with the response
      err => this.throwErrorMsg(err)
    )
  }

  private throwErrorMsg(error: HttpErrorResponse) {
    
    if(error.status != 200) {
      return this.errMsg = "Server error"
    }

    return this.errMsg = error.error.text;

  }

}
