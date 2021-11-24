import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { QuestionInterface } from 'src/app/interfaces';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  /*
  ** ARRAY FROM PARENT COMPONENT
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
  public answerClose!:    NgbModalRef;

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
      title:    new FormControl('', [Validators.required]),
      answers:  new FormArray([], [Validators.required])
    })
  }  

  // Eliminar pregunta
  deleteQuestion(id?: number | string) {
    console.log(id);
  }


  /**
   *  ANSWERS METHODS
  **/

  // Inicializar el form hijo
  initFormAnswer(): FormGroup {
    return new FormGroup({
      title:      new FormControl('', [Validators.required]),
      isCorrect:  new FormControl(false, [Validators.required])
    })
  }

  // Agregar respuesta
  addAnswer(): void {
    const refAnswers = this.formParent.get('answers') as FormArray;
    refAnswers.push(this.initFormAnswer())
  }

  getCtrl(key: string, form: FormGroup) {
    return form.get(key);
  }

  /**
   *  MODALS METHODS
  **/
  openVerticallyCentered(content: any, question?: QuestionInterface) {
    this.modalSvc.open(content, { centered: true });

    if(question) {
      console.log(question);
    }
  }

  answerModal(content: any) {
    this.answerClose = this.modalSvc.open(content, {centered: true, size: "sm"});
  }

}
