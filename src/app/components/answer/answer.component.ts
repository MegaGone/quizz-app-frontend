import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AnswerInterface, IAnswerStat, ICreateStats } from 'src/app/interfaces';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input() public answer  !: EventEmitter<IAnswerStat>
  @Input() public details !: EventEmitter<ICreateStats>

  public answerSelected !: IAnswerStat;
  public quizDetails    !: ICreateStats;
  public startSelected   : boolean;

  constructor() { 
    this.startSelected = false;
  }

  ngOnInit(): void {
    this.getAnswerSelected();
    this.getDetails();
  }

  /**
   * GET SELECTED ANSWER TO SHOW IN HTML
   */
  getAnswerSelected(): void {
    if (this.answer) {
      this.answer.subscribe(res => {
        this.answerSelected = res;
      })
    }
  }

  /**
   * GET QUIZ DETAILS
   */
  getDetails() {
    if (this.details) {
      this.details.subscribe(res => {
        this.quizDetails = res;
        this.startSelected = true;
        console.log(this.quizDetails);
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
