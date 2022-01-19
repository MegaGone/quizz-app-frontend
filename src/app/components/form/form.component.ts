import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';

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

  public quizFromList !: QuizInterface;
  public noQuiz       !: boolean;

  /*
  ** FORM
  */
  public quizForm!: FormGroup;
  public focus!: boolean;
  public focus2!: boolean;
  public focus3!: boolean;

  constructor(private fb: FormBuilder, private quizSvc: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.quiz = QuizzExample;
    this.initForm();

    const state = history.state.isNew;

    if(!state) {
      this.saveOnStorage();
      this.validateQuizOnRefresh();
      console.log(this.saveOnStorage);
    }
    
    // console.log(this.quizSvc.tempQuiz);


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

  saveOnStorage() {

    if(this.quizSvc.tempQuiz != undefined) {
      localStorage.setItem('quiz', JSON.stringify(this.quizSvc.tempQuiz));
    }

  }

  validateQuizOnRefresh() {

    if(this.quizSvc.tempQuiz === undefined) {
      const quiz = JSON.parse(localStorage.getItem('quiz') || '{"noQuiz": true}');

      if(this.quizSvc.tempQuiz === undefined && quiz.noQuiz) {
        this.router.navigate(['/home/myquizzes'])
      } else {
        this.quizFromList = quiz;
      }

    } else {
      this.quizFromList = this.quizSvc.tempQuiz;      
    }



  }
}
