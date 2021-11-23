import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { QuestionInterface, QuizInterface, AnswerInterface } from '../../interfaces';

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
  ** Forms
  */
  public questionForm!: FormGroup;
  public answerForm!:   FormGroup;

  /*
  ** Modals
  */
  public answerClose!: NgbModalRef;
  public questionClose!: NgbModalRef;

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
    this.initQuestionForm();
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

  /*
  ** Open Answer Modal Form
  */
  answerModal(content: any) {
    this.answerClose = this.modalSvc.open(content, {centered: true, size: "sm"})
    
    // Initialize the answer form
    this.initAnswerForm();
  }

  deleteQuestion(id: string | number | undefined) {
    console.log(id);
  }

  // TODO: Get the answers from the question
  initQuestionForm() {
    this.questionForm = this.fb.group({
      title:    ['', [Validators.required, Validators.minLength(5)]],
      answers:  this.fb.array([])
    })
  }

  setForm (question: QuestionInterface){ 
       
    const data: QuestionInterface = {
      "title": question.title,
      "answers": question.answers
    }
    
    // this.questionForm.patchValue({
    //   title: data.title,
    //   answers: data.answers
    // })
    
  }


  /**
   * Answers methods 
  **/
  initAnswerForm() {
    this.answerForm = this.fb.group({
      title:      ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9_]*$")]],
      isCorrect:  [false]
    })
  }

  createAnswer() {

    if(this.answerForm.invalid) {
      return Object.values(this.answerForm.controls).forEach(control => {
        control.markAsTouched();
      })
    } 

    // console.log(this.answerForm.value);

    const { title: tempTitle, isCorrect: tempCorrect } = this.answerForm.value; 

    const tempAnswer = new FormGroup({
      title: new FormControl(tempTitle),
      isCorrect: new FormControl(tempCorrect || false)
    })

    this.answers.push(tempAnswer);

    console.log(this.answers.value);

    this.answerClose.close();
  }

  deleteAnswer(i: number) {
    // this.answers.removeAt(i);
    console.log(this.temporal.answers.length);
  }

  // Get the answers array
  get answers() {
    return this.questionForm.get('answers') as FormArray;
  }

  /** 
   *  Getters to input validations 
  **/

  get answerTitleValid() {
    return this.answerForm.get('title')?.touched && this.answerForm.get('title')?.invalid;
  }

  get fAnswer() {
    return this.answerForm.controls;
  }
}
