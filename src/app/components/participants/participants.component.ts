import { Component, OnInit } from '@angular/core';
import { Quiz, Quizzes } from '../../interfaces';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent implements OnInit {

  public page = 1;
  public pageSize = 5;
  public collectionSize = Quizzes.length;
  public quizzes!: Quiz[];

  constructor() { 
    this.refreshQuizzes();
  }

  ngOnInit(): void {
  }

  refreshQuizzes() {
    this.quizzes = Quizzes
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
