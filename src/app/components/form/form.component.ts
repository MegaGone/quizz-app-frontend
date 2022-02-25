import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionInterface } from 'src/app/interfaces';
import { QuizService } from 'src/app/services';
import { SpacesValidator } from 'src/app/utils';
import { ValidationMessageService } from '../../services/validation.message.service';
import { QuizInterface } from '../../interfaces/quiz.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public disableSelect!: Boolean;
  public quizForm!: FormGroup;
  public showError: Boolean = false;
  public submitted: Boolean = false;

  constructor(private fb: FormBuilder, private quizSvc: QuizService, private router: Router, private route: ActivatedRoute, private msgSvc: ValidationMessageService) { }

  ngOnInit(): void {
    this.validateQuizCode();
    this.initForm();
    this.getTest();
  }

  /**
  * @returns The initialization of the parent form
  */
  initForm() {
    this.disableSelect = true;
    this.quizForm = this.fb.group({
      title         : ['', [Validators.required, Validators.minLength(5), SpacesValidator.containsSpace]],
      code          : [''],
      description   : ['', [Validators.required, Validators.minLength(10), SpacesValidator.spaces, SpacesValidator.doubleSpace]],
      questions     : this.fb.array([], Validators.required),
      participants  : this.fb.array([])
    })
  }

  createQuiz() {
    this.submitted = true;
    this.validateQuestions();
    if (this.quizForm.invalid) {
      return Object.values(this.quizForm.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    this.quizSvc.createQuiz(this.quizForm.value).subscribe(
      res => {
        this.msgSvc.showMessage(`${res}`, 'CREATED', true)
        return this.router.navigate(['/home/quiz'])
      },
      err => {
        this.msgSvc.showMessage('Error creating quiz', 'ERROR', false)
        return this.router.navigate(['/home/quiz'])
      }
    )

  }

  // Validations
  get f() {
    return this.quizForm.controls;
  }

  get title() {
    return this.quizForm.get('title')?.invalid && this.quizForm.get('title')?.touched;
  }

  get description() {
    return this.quizForm.get('description')?.invalid && this.quizForm.get('description')?.touched;
  }

  getTest() {
    this.quizSvc.reciveTest().subscribe(res => {

      const temporalQuestions: QuestionInterface[] = res;

      if(temporalQuestions.length < 8) {
        return this.quizForm.get('questions')?.setErrors({minQuestions: true});
      } else {
        this.quizForm.get('questions')?.setErrors(null)
        return this.quizForm.updateValueAndValidity()
      }

    })
  }

  validateQuestions() {
    if(this.submitted && this.quizForm.get('questions')?.hasError('minQuestions')) {
      this.showError = true;
      
      setTimeout(() => {
        this.showError = false;
      }, 3000)
    }
  }

  validateQuizCode() {
    const quizCode: string = this.route.snapshot.paramMap.get('quizCode')!;

    if(quizCode != "new") {
      this.quizSvc.getQuizByCode(quizCode).subscribe(
        res => {
          this.loadQuiz(res)
          // console.log(res);
        },
        err => {
          this.msgSvc.showMessage('Error getting quiz', 'ERROR', false);
          return this.router.navigate(['/home/quiz'])
        }
      )
    }
  }

  loadQuiz(quiz: QuizInterface) {

    this.quizForm.setValue({
      title       : quiz.title,
      code        : quiz.code,
      description : quiz.description,
      questions   : [],
      participants: []
    })

  }
}
