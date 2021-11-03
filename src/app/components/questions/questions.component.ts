import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Quiz, Quizzes } from '../../interfaces';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public page = 1;
  public pageSize = 5;
  public collectionSize = Quizzes.length;
  public quizzes!: Quiz[];

  constructor(private modalSvc: NgbModal) { }

  ngOnInit(): void {
    this.refreshQuizzes();
  }

  refreshQuizzes() {
    this.quizzes = Quizzes
      .map((country, i) => ({ id: i + 1, ...country }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openVerticallyCentered(content: any) {
    this.modalSvc.open(content, { centered: true });
  }
}
