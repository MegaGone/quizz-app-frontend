import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuizInterface, QuizzesExample } from '../../interfaces';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  /*
  ** ARRAY FROM PARENT COMPONENT
  */
  @Input() Questions: QuizInterface[] = [];

  public page = 1;
  public pageSize = 5;
  public collectionSize!: number;
  public quizzes!: QuizInterface[];

  constructor(private modalSvc: NgbModal) { }

  ngOnInit(): void {
    this.refreshQuizzes();
  }

  refreshQuizzes() {
    this.collectionSize = this.Questions.length;
    this.quizzes = this.Questions
    .map((quiz, i) => ({id: i + 1, ...quiz }))
    .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openVerticallyCentered(content: any) {
    this.modalSvc.open(content, { centered: true });
  }
}
