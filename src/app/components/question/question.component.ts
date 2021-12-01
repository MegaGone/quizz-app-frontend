import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QuestionInterface } from 'src/app/interfaces';
import { SpacesValidator } from '../../utils/whitespaces.validation';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  /*
  **  ARRAY FROM PARENT COMPONENT
  */
  @Input() Questions: QuestionInterface[] = [];

  /*
  **  PAGINATION
  */
  public page = 1;
  public pageSize = 5;
  public collectionSize!: number;
  public quizzes!: QuestionInterface[];

  /**
   *  FORMS 
  **/
  public formParent!: FormGroup;

  /**
   *  MODALS 
  **/
  public questionClose!:  NgbModalRef;

  constructor(private modalSvc: NgbModal, private toastSvc: ToastrService) { }

  ngOnInit(): void {
    this.refreshQuestions();
    this.initFormParent();
  }

  refreshQuestions() {
    this.collectionSize = this.Questions.length;
    this.quizzes = this.Questions
      .map((quiz, i) => ({ id: i + 1, ...quiz }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  /**
   *  QUESTION METHODS 
  **/

  // Inicializar el form padre
  initFormParent(): void {
    this.formParent = new FormGroup({
      title:    new FormControl('', [Validators.required, Validators.minLength(5), SpacesValidator.doubleSpace, SpacesValidator.spaces]),
      answers:  new FormArray([], [Validators.required])
    })
  }  

  // DeleteQuestion
  deleteQuestion(id?: number | string) {
    console.log(id);
  }

  async createQuestion() {
    if(this.formParent.invalid) {
      return Object.values(this.formParent.controls).forEach(control => {
        control.markAsTouched();
      })  
    }

    await this.addQuestion(this.formParent.value);
    this.questionClose.close();
  }

  // ADD QUESTION
  addQuestion(question: QuestionInterface) {

    this.Questions.push(question);

    this.toastSvc.success('Question Add', 'Successfully', {
      progressBar: true,
      timeOut: 1250
    })

  }

  /**
   *  ANSWERS METHODS
  **/

  // Inicializar el form hijo
  initFormAnswer(): FormGroup {
    return new FormGroup({
      title:      new FormControl('', [Validators.required, Validators.minLength(4), SpacesValidator.doubleSpace, SpacesValidator.spaces]),
      isCorrect:  new FormControl(false, [Validators.required])
    })
  }

  // ADD ANSWER
  addAnswer(): void {
    const refAnswers = this.formParent.get('answers') as FormArray;
    refAnswers.push(this.initFormAnswer());

    console.log(this.formParent.value);
  }

  // Get Answers to HTML
  getControls() {
    return (this.formParent.get('answers') as FormArray).controls;
  }

  deleteAnswer(i: number) {
    this.getControls().splice(i, 1);
  }

  /**
   *  MODALS METHODS
  **/
  openVerticallyCentered(content: any, question?: QuestionInterface) {
    this.questionClose = this.modalSvc.open(content, { centered: true });

    if(question) {
      console.log(question);
    }
  }

  /**
   *  GETTERS TO VALIDATE
  **/

  get questionTitleValidation() {
    return this.formParent.get('title')?.touched && this.formParent.get('title')?.invalid;
  }

  get pForm() {
    return this.formParent.controls;
  }
}
