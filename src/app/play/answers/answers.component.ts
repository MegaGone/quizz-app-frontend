import { Component, OnInit, OnDestroy } from '@angular/core';
import { Answer, IPlayer, IUserAnswer, QuestionInterface, QuizInterface, IStats } from 'src/app/interfaces';
import { PlayService, ValidationMessageService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit, OnDestroy {

  public currentQuiz!     : QuizInterface;
  public currentPlayer!   : IPlayer;
  public questionIndex    : number;
  public seconds          : number;
  public setInterval!: ReturnType<typeof setTimeout>;

  // public optionSelected!  : Answer | false;
  
  public optionSelected!  : any;
  public indexSelected!   : number | undefined;
  
  public correctAnswers   : number;
  public incorrectAnswers : number;
  public userAnswers      : IUserAnswer[] = [];

  constructor(private playSvc: PlayService, private router: Router, private msgSvc: ValidationMessageService) { 
    this.questionIndex = 0;
    this.seconds = 0;
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
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
        this.addAnswer();
      }

      this.seconds -= 1;
    }, 1000)
  }

  /**
   * 
   * @param answer: Answer - Get the selected answer
   * @param i: number - Index of the Answer obtained.
   */
  selectedQuestion(answer: Answer, i: number) {
    this.optionSelected = answer;
    this.indexSelected = i;
  }

  /**
   * 
   * @param answer: Answer - Answer selected
   * @returns Class selectedAnswer (Paint the selected answer)
   */
  paintSelectedAnswer(answer: Answer): string {
    return (answer === this.optionSelected) ? "selectedtAnswer" : '';
  }

  /**
   * Reditect to the next question
   */
  nextQuestion(): void {
    clearInterval(this.setInterval);
    this.addAnswer();
    this.initCounter();
  }

  /**
   * Add the answer
   */
  addAnswer(): void | Promise<boolean> {
    this.verifyAnswer(); // Verify if the answer is correct

    const answerResponse: IUserAnswer = {
      time: parseInt(this.getAnswerLapse),
      selectedIndex: this.getIndexSelectedAnswer,
      questionId: this.getQuestions[this.questionIndex]._id
    }

    this.userAnswers.push(answerResponse);

    this.optionSelected = false;
    this.indexSelected  = undefined;

    if (this.currentQuiz.questions.length - 1 === this.questionIndex) {

      const stats : IStats = {
        quizId          : this.currentQuiz._id,
        playerId        : this.currentPlayer.userId,
        playerName      : this.currentPlayer.name,
        incorrectAnswers: this.incorrectAnswers,
        correctAnswers  : this.correctAnswers,
        joinIn          : this.currentPlayer.joinIn,
        questions       : this.userAnswers
      }

      this.playSvc.createStats(stats).subscribe(
        res => {
          if (res.Ok && res.playerStats) {
            localStorage.setItem('QuizId', res.playerStats.quizId);
            console.log(res.playerStats)
            return this.router.navigate(['/play/results'])
          }
          return;
        },
        err => {
          console.log(err)
          return this.msgSvc.showMessage('ERROR', 'Error to save your stats', false);
        }
      )
      return;
    }

    this.questionIndex++; // Increment the question
    this.seconds = this.currentQuiz.lapse;
  }

  /**
   * 
   * @returns If answer is selected or valid, increments the correcAnswers to one
   */
  verifyAnswer() {

    if ( this.optionSelected === undefined) {
      return this.incorrectAnswers++;

    } else if (!this.optionSelected.isCorrect) {
      return this.incorrectAnswers++;
    }

    return this.correctAnswers++;
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

  /**
   * @returns Lapse of answer's responses 
   */
  get getAnswerLapse(): string {
    if (this.optionSelected === undefined) {
      return "NO RESPONSE"
    }

    const lapse: number = this.currentQuiz.lapse;
    const lapseResponse = lapse - this.seconds;

    return lapseResponse.toString();
  }

  /**
   * @returns Index of the answer selected by user
   */
  get getIndexSelectedAnswer(): any {
    if (this.optionSelected === undefined) {
      return '';
    }

    return this.indexSelected;
  }

  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }
}
