import { Component, OnInit } from '@angular/core';
import { QuestionInterface, QuizInterface } from 'src/app/interfaces';
import { PlayService, ValidationMessageService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  public currentQuiz!: QuizInterface;

  constructor(private playSvc: PlayService, private router: Router, private msgSvc: ValidationMessageService) { }

  ngOnInit(): void {
    this.getCurrentQuiz();
    console.log(this.getQuestions);
  }

  /**
   * @returns CurrentQuiz
   */
  getCurrentQuiz() {
    this.playSvc.currentQuizBehavor.asObservable().subscribe(
      res => {
        if(res == undefined) {
          return this.router.navigate(['/play']);
        }
        return this.currentQuiz = res;
      },
      err => {
        this.router.navigate(['/play']);
        return this.msgSvc.showMessage('Ooops, something was wrong', 'ERROR', false);
      }
    )
  }

  /**
   * @returns QuestionInterface[]
   */
  get getQuestions(): QuestionInterface[] {
    return this.currentQuiz.questions;
  }

}
