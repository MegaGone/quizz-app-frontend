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

  // TODO: UPLOAD THE QUESTION SELECT.

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

  // REFRESH THE QUESTIONS TO PAGINATE
  refreshQuestions() {
    this.collectionSize = this.Questions.length;
    this.quizzes = this.Questions
      .map((quiz, i) => ({ id: i + 1, ...quiz }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  /**
   *  QUESTION METHODS 
  **/

  // INIT FORMPARENT (QUESTIONFORM)
  initFormParent(): void {
    this.formParent = new FormGroup({
      title:    new FormControl('', [Validators.required, Validators.minLength(5), SpacesValidator.doubleSpace, SpacesValidator.spaces]),
      answers:  new FormArray([], [Validators.required])
    })
  }  

  // CLEAR ALL THE FORM PARENT
  clearForm() {

    this.formParent.patchValue({
      title: ''
    })

    const control = <FormArray>this.formParent.controls['answers'];

    for(let i = control.length-1; i >= 0; i--) {
      control.removeAt(i)
    }

  }

  // DELETE QUESTION
  deleteQuestion(index: number, id?: number | string) {
    this.Questions.splice(index, 1);

    this.toastSvc.success('Question Deleted', 'Successfully', {
      timeOut: 1250,
      progressBar: true
    })

    this.refreshQuestions();
  }

  // CREATE AND PUSH QUESTION
  async createQuestion() {
    if(this.formParent.invalid) {
      return Object.values(this.formParent.controls).forEach(control => {
        control.markAsTouched();
      })  
    }

    await this.addQuestion(this.formParent.value);
    this.refreshQuestions();
    this.questionClose.close();
    this.clearForm();
    // this.initFormParent();
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

  // INIT FORM CHILDREN (ANSWER FORM)
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
  }

  // GET ANSWERS TO HTML
  getControls() {
    return (this.formParent.get('answers') as FormArray).controls;
  }

  // DELETE ANSWERS
  deleteAnswer(i: number) {
    this.getControls().splice(i, 1);
  }

  /**
   *  MODALS METHODS
  **/
  openVerticallyCentered(content: any, question?: QuestionInterface) {

    this.clearForm();

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
