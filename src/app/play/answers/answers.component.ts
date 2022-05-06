import { Component, OnInit } from '@angular/core';
import { IPlayer, QuestionInterface, QuizInterface } from 'src/app/interfaces';
import { PlayService, ValidationMessageService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {

  public currentQuiz!: QuizInterface;
  public currentPlayer!: IPlayer;
  public questionIndex: number;
  public seconds: number;
  public setInterval!: ReturnType<typeof setTimeout>;

  constructor(private playSvc: PlayService, private router: Router, private msgSvc: ValidationMessageService) { 
    this.questionIndex = 0;
    this.seconds = 0;
  }

  ngOnInit(): void {
    this.getCurrentQuiz();
    this.getCurrentPlayer();
    this.initCounter();
  }

  /* ####################### CURRENT QUIZ & CURRENT PLAYER ####################### */

  /**
   * @returns CurrentQuiz
   */
  getCurrentQuiz(): void {
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
   * @returns CurrentPlayer
   */
  getCurrentPlayer(): void {
    this.playSvc.currentGuestPlayerBehavor.asObservable().subscribe(
      (res: IPlayer | undefined) => {
        if(res == undefined) {
          return this.router.navigate(['/play']);
        }
        return this.currentPlayer = res;
      },
      err => {
        this.router.navigate(['/play']);
        return this.msgSvc.showMessage('Ooops, session expired', 'ERROR', false);
      }
    )
  }

  /* ####################### METHODS ####################### */

  /**
   * Init the counter
   */
  initCounter() {

    this.seconds = this.currentQuiz.lapse;

    this.setInterval = setInterval(() => {

      if (this.seconds === 0) {
        this.questionIndex++; // Increment the question
        clearInterval(this.setInterval);
        this.initCounter();
      }

      this.seconds -= 1;
    }, 1000)
  }


  /* ####################### GETTERS ####################### */

  /**
   * @returns QuestionInterface[]
   */
  get getQuestions(): QuestionInterface[] {
    return this.currentQuiz.questions;
  }

  /**
   * @returns Lapse
   */
  get getSeconds(): number {
    return this.seconds;
  }

  /**
   * @returns Title of each question
   */
  get getTitle(): string {
    return this.getQuestions[this.questionIndex].title;
  }
}
