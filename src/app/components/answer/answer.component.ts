import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { IAnswerStat, ICreateStats } from 'src/app/interfaces';

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
        console.log(this.answerSelected)
      })
    }
  }

  getDetails() {
    if (this.details) {
      this.details.subscribe(res => {
        this.quizDetails = res;
        this.startSelected = true;
        console.log(this.quizDetails);
      })
    }
  }

}
