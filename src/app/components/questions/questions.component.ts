import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  /*
  ** Form
  */
  public questionForm!: FormGroup;

  /*
  ** Sample
  */

  /*
  ** Pagination
  */
  public page = 1;
  public pageSize = 5;
  public collectionSize!: number;
  public quizzes!: QuestionInterface[];

  constructor(private modalSvc: NgbModal, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.refreshQuestions();
  }

  refreshQuestions() {
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

  // TODO: Get the answers from the question
  initializeComponent() {
    this.questionForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      answers: this.fb.array([])
    })
  }

  // Get the answers array
  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  addQuestion() {
    this.answers.push(this.fb.control('', Validators.required))
  }

  deleteAnswer(i: number) {
    this.answers.removeAt(i);
  }

  setForm (question: QuestionInterface){ 
       
    const data: QuestionInterface = {
      "title": question.title,
      "answers": question.answers
    }
    
    this.questionForm.patchValue({
      title: data.title,
      answers: data.answers
    })
    
  }
}
