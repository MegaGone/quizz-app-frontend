import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IAnswerStat, ICreateStats } from 'src/app/interfaces';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input() public answer  !: EventEmitter<IAnswerStat>
  @Input() public details !: EventEmitter<ICreateStats>
  @Output() public nonDetails: EventEmitter<boolean> = new EventEmitter(false);

  public answerSelected !: IAnswerStat;
  public quizDetails    !: ICreateStats;
  public startSelected   : boolean;

  constructor() { 
    this.startSelected = false;
  }

  ngOnInit(): void {
    this.getDetails();
    this.getAnswerSelected();
  }

  /**
   * GET SELECTED ANSWER TO SHOW IN HTML
   */
  getAnswerSelected(): void {
    if (this.answer) {
      this.answer.subscribe(res => {
        this.answerSelected = res;
        this.startSelected = false;
      })
    }
  }

  /**
   * GET QUIZ DETAILS
   */
  getDetails() {
    if(!this.quizDetails) {
      this.nonDetails.emit(true);
    }

    
    
    if (this.details) {
      this.details.subscribe(res => {
        this.startSelected = true;
        this.quizDetails = res;
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
