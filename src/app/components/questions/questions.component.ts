import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QuestionInterface } from 'src/app/interfaces';
import { QuizService, ValidationMessageService } from 'src/app/services';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  @Input() Form!: FormGroup;

  public temp!: [];

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

  /**
   *  MODALS
   **/
  public questionClose!: NgbModalRef;

  constructor(
    private modalSvc: NgbModal,
    private toastSvc: ToastrService,
    private messageSvc: ValidationMessageService,
    private quizSvc: QuizService
  ) { }

  ngOnInit(): void {
    this.questions = this.getQuestions;
    console.log(this.questions);
  }

  /**
   * @returns The setter from FormParent to Questions: QuestionInterface[]
   */
  get getQuestions() {
    const questions = (this.Form.get('questions') as FormArray).value;
    return questions;
  }
}
