import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { IAnswerStat, ICreateStats } from 'src/app/interfaces';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input() public answer  !: EventEmitter<number>;
  @Input() public details !: EventEmitter<ICreateStats>;
  @Input() public answers !: EventEmitter<IAnswerStat[]>;

  public answerSelected !: IAnswerStat;
  public quizDetails    !: ICreateStats;
  public startSelected   : boolean;
  public answersArray   !: IAnswerStat[];

  constructor() { 
    this.startSelected = false;
  }

  ngOnInit(): void {
    this.getAnswers();
    this.getDetails();
    this.getAnswerSelected();
  }

  /**
   * GET SELECTED ANSWER TO SHOW IN HTML
   */
  getAnswerSelected(): void {
    if (this.answer) {
      this.answer.subscribe((res: number) => {
        this.answerSelected = this.answersArray[res];
        this.startSelected = false;
      })
    }
  }

  /**
   * GET QUIZ DETAILS
   */
  getDetails() {
    if (this.details) {
      this.details.subscribe(res => {
        this.startSelected = true;
        this.quizDetails = res;
      })
    }
  }

  /**
   * GET ANSWERS
   */
  getAnswers(): void {
    if (this.answers) {
      this.answers.subscribe(res => {
        this.answersArray = res;        
      })
    }
  }

  /**
   * 
   * @param state: boolean - IsValid answer
   * @returns icon
   */
  getAnswerIcon(state: boolean | undefined): string {
    if (!state) {
      return 'close.png'
    }

    return 'check.png';
  }

  /**
   * 
   * @param i: number - Index of selected answer
   * @returns paint selected answer
   */
  paintCorrectAnswer(i: number): string {
    return (i == this.answerSelected.selectedIndex) ? 'selectedtAnswer' : '';
  }
}
