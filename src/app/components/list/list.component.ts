import { Component, OnInit } from '@angular/core';
import { Quiz, Quizzes } from '../../interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {

  // Pagination
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
      .map((quiz, i) => ({id: i + 1, ...quiz}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

}
