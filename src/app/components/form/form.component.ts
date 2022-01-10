import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'

import { ToastrService } from 'ngx-toastr';
import { QuizService } from 'src/app/services';
import { QuizzesExample, QuizInterface, QuizzExample } from '../../interfaces';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public participants!: Array<QuizInterface>;

  public quiz!: QuizInterface;

  /*
  ** FORM
  */
  public quizForm!: FormGroup;
  public focus!: boolean;
  public focus2!: boolean;
  public focus3!: boolean;

  constructor(private fb: FormBuilder, private quizSvc: QuizService) { }

  ngOnInit(): void {
    this.quiz = QuizzExample;
    
    // console.log(this.quizSvc.tempQuiz);
  
    this.initForm();
    this.participants = QuizzesExample;
  }

  // TODO: Check if the minlength validation is equal like backend and Validate the whitespaces and check the disabled on code html/ts
  initForm() {
    this.quizForm = this.fb.group({
      title: [this.quiz.title, [Validators.required, Validators.minLength(5)]],
      code: [{ value: this.quiz.code, disabled: true }],
      description: [this.quiz.description, [Validators.required, Validators.minLength(10)]],
      questions: [this.fb.array([]), [Validators.required]],
      participants: [this.fb.array([]), [Validators.required]]
    })
  }

  createQuiz() {

    if (this.quizForm.valid) {
      console.log(this.quizForm.value);
    }

  }
}
