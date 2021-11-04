import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms'  

import { ToastrService } from 'ngx-toastr';
import { Quizzes, Quiz } from '../../interfaces';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public participants!: Array<Quiz>;

  /*
  ** FORM
  */
  public quizForm!: FormGroup;
  public focus!: boolean;
  public focus2!: boolean;
  public focus3!: boolean;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
    this.participants = Quizzes;
  }

  // TODO: Check if the minlength validation is equal like backend and Validate the whitespaces and check the disabled on code html/ts
  initForm() {
    this.quizForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      code: [{value: 'ABCDEF', disabled: true}],
      description: ['', [Validators.required, Validators.minLength(10)]],
      questions: this.fb.array([]),
      participants: this.fb.array([])
    })
  }

  createQuiz(){

    if(this.quizForm.valid){
      console.log("OK");
    }

  }
}
