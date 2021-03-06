import { Component, OnInit, OnDestroy } from '@angular/core';
import { Answer, IPlayer, IUserAnswer, QuestionInterface, QuizInterface, IStats, IGetQuizByCodeResponse } from 'src/app/interfaces';
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

  public counter!: boolean;

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
          this.playSvc.removeGuestPlayer().subscribe(
            res => {
              if (res) {
                localStorage.removeItem('quid');
                localStorage.removeItem('uid');
              }
            },
            err => {
              localStorage.removeItem('quid');
              localStorage.removeItem('uid');
            }
          )
          return this.router.navigate(['/play']);
        };

        this.playSvc.setTemporalId('quid', res._id);
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

        this.playSvc.setTemporalId('uid', res.userId);
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
      clearInterval(this.setInterval);

      const token = localStorage.getItem('token');

      const stats : IStats = {
        quizId          : this.currentQuiz._id,
        playerId        : this.currentPlayer.userId,
        playerName      : this.currentPlayer.name,
        incorrectAnswers: this.incorrectAnswers,
        correctAnswers  : this.correctAnswers,
        joinIn          : this.currentPlayer.joinIn,
        questions       : this.userAnswers
      }

      if (token) {
        const { playerName, playerId, ...userStats } = stats;

        this.playSvc.createStats(userStats).subscribe(
          (res: IGetQuizByCodeResponse) => {

            if (res.Ok && res.message == "Created") {
              this.router.navigate([`/home/stats/${this.currentQuiz._id}/${this.currentPlayer.userId}`])
              return;
            }

          },
          err => {
            this.router.navigate(['/home/myquizzes'])
            return this.msgSvc.showMessage('ERROR', 'Error to save your stats', false);
          }
        )

        return;
      }

      this.playSvc.createStatsGuest(stats).subscribe(
        res => {
          if (res.Ok && res.token) {
            return this.router.navigate(['/play/results'])
          }
          return;
        },
        err => {
          return this.msgSvc.showMessage('ERROR', 'Error to save your stats', false);
        }
      )
      return;
    } else {
          this.questionIndex++; // Increment the question
          this.seconds = this.currentQuiz.lapse;
    }
  }

  /**
   * 
   * @returns If answer is selected or valid, increments the correcAnswers to one
   */
  verifyAnswer() {

    if ( this.optionSelected === undefined || !this.optionSelected) {
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
    if (this.optionSelected === undefined || !this.optionSelected) {
      return "-1"
    }

    const lapse: number = this.currentQuiz.lapse;
    const lapseResponse = lapse - this.seconds;

    return lapseResponse.toString();
  }

  /**
   * @returns Index of the answer selected by user
   */
  get getIndexSelectedAnswer(): any {
    if (this.optionSelected === undefined || !this.optionSelected) {
      return -1;
    }

    return this.indexSelected;
  }

  /**
   * @returns TOTAL RESPONSES
   */
  get getQuestionsResolved(): number {
    return (this.userAnswers.length < this.getTotalQuestions) ? this.userAnswers.length + 1 : this.getTotalQuestions;
    // return this.userAnswers.length + 1;
  }

  /**
   * @returns TOTAL QUESTION
   */
  get getTotalQuestions(): number {
    return this.currentQuiz.questions.length
  }

  ngOnDestroy(): void {
    clearInterval(this.setInterval);
  }

  getCounterStatus(counter: boolean) {
    
    if (counter) {
      this.counter = counter
    }

  }
}
