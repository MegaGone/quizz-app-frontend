import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private modalSvc: NgbModal) { }

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

  // Eliminar pregunta
  deleteQuestion(id?: number | string) {
    console.log(id);
  }

  createQuestion() {
    if(this.formParent.invalid) {
      return Object.values(this.formParent.controls).forEach(control => {
        control.markAsTouched();
      })  
    }

    this.questionClose.close();

    console.log(this.formParent.value);
  }

  /**
   *  ANSWERS METHODS
  **/

  // Inicializar el form hijo
  initFormAnswer(): FormGroup {
    return new FormGroup({
      title:      new FormControl('', [Validators.required, Validators.minLength(4), SpacesValidator.doubleSpace]),
      isCorrect:  new FormControl(false, [Validators.required])
    })
  }

  // Agregar respuesta
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

  patternKey(index: number, key: string) {
    const refParent = this.formParent.get('answers') as FormArray;
    const refSingle = refParent.at(index).get(key) as FormControl;

    return refSingle.errors?.pattern && refParent.invalid;
  }

  getKey(index: number, key: string) {
    const refParent = this.formParent.get('answers') as FormArray;
    const refSingle = refParent.at(index).get(key) as FormControl;

    return refSingle;
  }

  getValidation(index: number, key: string) {
    const refParent = this.formParent.get('answers') as FormArray;
    const refSingle = refParent.at(index).get(key) as FormGroup;

    return refSingle.invalid;
  }

  // TODO: Validate if the formChildren its valid, if its invalid, addAnswer Button disabled
  startSpace(event: any) {
    if(event.target.selectionStart === 0 && event.code === "Space") {
      event.preventDefault();
    }
  }
}
