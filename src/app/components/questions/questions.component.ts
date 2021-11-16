import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionInterface, QuizInterface } from '../../interfaces';

const QuestionSample: QuestionInterface = {
  title: "Question",
  answers: [
    {
      title: "Cambiar",
      isCorrect: false
    },
    {
      title: "Cambiar 2",
      isCorrect: false
    },
    {
      title: "Cambiar 3",
      isCorrect: true
    },
    {
      title: "Cambiar 4",
      isCorrect: false
    }
  ]
}

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  public temporal = QuestionSample;

  /*
  ** ARRAY FROM PARENT COMPONENT
  */
  @Input() Questions: QuestionInterface[] = [];

  public page = 1;
  public pageSize = 5;
  public collectionSize!: number;
  public quizzes!: QuestionInterface[];

  constructor(private modalSvc: NgbModal) { }

  ngOnInit(): void {
    this.refreshQuizzes();
  }

  refreshQuizzes() {
    this.collectionSize = this.Questions.length;
    this.quizzes = this.Questions
      .map((quiz, i) => ({ id: i + 1, ...quiz }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  openVerticallyCentered(content: any, question?: QuestionInterface) {
    this.modalSvc.open(content, { centered: true });

    if(question) {
      console.log(question);
    }
  }

  deleteQuestion(id: string | number | undefined) {
    console.log(id);
  }
}
