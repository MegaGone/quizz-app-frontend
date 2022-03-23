import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { ToastrService } from 'ngx-toastr';
import { QuestionInterface } from 'src/app/interfaces';
import { QuizService, ValidationMessageService } from 'src/app/services';
import { AnswersValidations, SpacesValidator } from 'src/app/utils';
import { AnswerInterface } from '../../interfaces/answer.interface';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  @Input() Form!: FormGroup;

  public Questions!: QuestionInterface[];
  public loaded: boolean;

  /*
  **  PAGINATION
  */
  public page = 1;
  public pageSize = 4;
  public collectionSize!: number;
  public questions!: QuestionInterface[];

  /**
 *  FORMS
 **/
  public formParent!: FormGroup;
  public submitted!: Boolean;

  /**
   *  MODALS
   **/
  public questionClose!: NgbModalRef;

  constructor(
    private modalSvc: NgbModal,
    private toastSvc: ToastrService,
    private messageSvc: ValidationMessageService,
    private quizSvc: QuizService
  ) { 
    this.loaded = false;
  }

  ngOnInit(): void {

    setTimeout(() => {
    this.loaded = true;
    // Set Questions Array from parent Component
    this.Questions = this.getQuestions;
    this.refreshQuestions();
    this.initFormParent();
      
    }, 500)


  }

  /**
   * @returns The setter from FormParent to Questions: QuestionInterface[]
   */
  get getQuestions() {
    const questions = (this.Form.get('questions') as FormArray).value;
    return questions;
  }

  // TODO: Send the subject when questions are updated.
  // REFRESH THE QUESTIONS TO PAGINATE
  refreshQuestions() {
    this.collectionSize = this.Questions.length;
    this.questions = this.Questions.map((quiz, i) => ({
      id: i + 1,
      ...quiz,
    })).slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize
    );
  }

  /**
 *  QUESTION METHODS
 **/

  // INIT FORMPARENT (QUESTIONFORM)
  initFormParent(): void {
    this.submitted = false;
    this.formParent = new FormGroup({
      id  : new FormControl(''),
      title: new FormControl('', [Validators.required, Validators.minLength(5), SpacesValidator.doubleSpace, SpacesValidator.spaces]),
      answers: new FormArray([], [Validators.required, AnswersValidations.minLengthArray(2), AnswersValidations.allAnswersFalse, AnswersValidations.allAnswersTrue]
      ),
    });
  }

  // CLEAR ALL THE FORM PARENT
  clearForm() {
    this.formParent.patchValue({
      title: '',
    });

    const control = <FormArray>this.formParent.controls['answers'];

    for (let i = control.length - 1; i >= 0; i--) {
      control.removeAt(i);
    }
  }

  // DELETE QUESTION
  deleteQuestion(index: number, id: any) {

    // if(id != undefined) {
    //   const quizID = this.getQuizId()
      
    //   this.quizSvc.deleteQuestion(quizID, id).subscribe(res => {
    //     console.log(res);
    //   })
      
    // }
    this.Questions.splice(index, 1);
    this.messageSvc.showMessage('Question Deleted', 'Successfully', true);
    this.sendTest(this.Questions);
    this.refreshQuestions();
  }

  getKey(index: number, key: string) {
    const refParent = this.formParent.get('answers') as FormArray;
    const refSingle = refParent.at(index).get(key) as FormControl;

    return refSingle;
  }

  // CREATE AND PUSH QUESTION
  async createQuestion() {
    this.submitted = true;
    if (this.formParent.invalid) {
      return Object.values(this.formParent.controls).forEach((control) => {
        control.markAsTouched();
      });
    }

    await this.addQuestion(this.formParent.value);
    this.sendTest(this.Questions)
    this.refreshQuestions();
    this.questionClose.close();
    // this.clearForm();
    this.initFormParent();
  }

  // TODO: VALIDAR PORQUE SI DEJA ACTUALIZAR CON EL MISMO TITLE

  // ADD QUESTION
  async addQuestion(question: QuestionInterface) {
    this.submitted = false;
    const questionRepeated = await this.validateQuestion(question);    

    // Muestro 
    if (questionRepeated) {
      return this.messageSvc.showMessage('Question already exist', 'Error', false);
    }

    // Se actualiza la question
    if(question.id != '' && !questionRepeated) {
      await this.updateQuestion(question);
      return this.messageSvc.showMessage('Quiz Updated', 'UPDATED', true);
    }

    await this.Questions.push(question);
    return this.messageSvc.showMessage('Question Added', 'Successfully', true);
  }

  /**
   * 
   * @param question: QuestionInterface - Question to Update
   */
  updateQuestion(question: QuestionInterface): void {
    let questionOnArray = this.Questions.find(q => q.id === question.id);

    questionOnArray!.answers = question.answers;
    questionOnArray!.title = question.title;
  }

  // Validate if question exist
  async validateQuestion(question: QuestionInterface) {

    const existQuestion = await this.Questions.findIndex(q => q.title == question.title);

    return (existQuestion >= 0) ? true : false;
  }

  /**
   *  ANSWERS METHODS
   **/

  // INIT FORM CHILDREN (ANSWER FORM)
  initFormAnswer(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [ Validators.required, Validators.minLength(4), SpacesValidator.doubleSpace, SpacesValidator.spaces, RxwebValidators.unique({ message: 'You must enter a unique answer title.', }),]),
      isCorrect: new FormControl(false, [Validators.required]),
    });
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

  // GET ANSWERS VALUES
  get Answers() {
    return (this.formParent.get('answers') as FormArray).value;
  }

  // DELETE ANSWERS
  deleteAnswer(i: number) {
    this.getControls().splice(i, 1); // Delete in UI
    this.Answers.splice(i, i);
    this.formParent.get('answers')?.updateValueAndValidity();
  }

  // LOAD ANSWER
  loadData(Question: QuestionInterface): void {
    for (const _ of Question.answers) {
      this.addAnswer();
    }

    this.formParent.patchValue(Question);
  }

  /**
   *  MODALS METHODS
   **/
  openVerticallyCentered(content: any, question?: QuestionInterface) {
    this.clearForm();

    this.questionClose = this.modalSvc.open(content, { centered: true });

    if (question) {
      this.loadData(question);
    }
  }

  /**
 *  GETTERS TO VALIDATE
 **/

  get questionTitleValidation() {
    return (
      this.formParent.get('title')?.touched &&
      this.formParent.get('title')?.invalid
    );
  }

  get pForm() {
    return this.formParent.controls;
  }

  get answers() {
    return this.formParent.get('answers');
  }

  sendTest(data: QuestionInterface[]) {
    return this.quizSvc.sendTest(data);
  }
}
