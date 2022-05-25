import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { IAnswerStat } from 'src/app/interfaces';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {

  @Input() public answer!: EventEmitter<IAnswerStat>

  public answerSelected !: IAnswerStat;

  constructor() { }

  ngOnInit(): void {
    this.getAnswerSelected();
  }

  getAnswerSelected() {
    if (this.answer) {
      this.answer.subscribe(res => {
        this.answerSelected = res;
        console.log(this.answerSelected)
      })
    }
  }

}
