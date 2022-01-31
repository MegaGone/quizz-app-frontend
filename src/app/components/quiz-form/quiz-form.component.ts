import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ParticipantInterface, ParticipantsExample, QuestionInterface, QuestionsExample } from 'src/app/interfaces';
import { QuizService } from 'src/app/services';
import { SpacesValidator  } from "../../utils";

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.css']
})
export class QuizFormComponent implements OnInit {

  public disableSelect!: Boolean;
  public quizForm!: FormGroup;
  public participants : ParticipantInterface[] = [];
  public questions    : QuestionInterface[] = [];

  constructor(private fb: FormBuilder, private quizSvc: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();

    // this.participants = ParticipantsExample;
    this.questions = QuestionsExample;
    this.getTest();
  }

  /**
   * @returns The initialization of the parent form
   */
  initForm() {
    this.disableSelect = true;
    this.quizForm = this.fb.group({
      title       : ['', [Validators.required, Validators.minLength(5), SpacesValidator.containsSpace]],
      code        : [''],
      description : ['', [Validators.required, Validators.minLength(10), SpacesValidator.spaces, SpacesValidator.doubleSpace]]
    })
  }

  createQuiz() {
    if (this.quizForm.invalid) {
      return Object.values(this.quizForm.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    console.log(this.quizForm.value);
    
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
      console.log(res);
    })
  }
}
