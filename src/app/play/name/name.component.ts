import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styles: [
  ]
})
export class NameComponent implements OnInit {

  public quizForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initQuizForm();
  }

  /**
   * Initialize quizForm
   */
  initQuizForm() {
    this.quizForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(7)]]
    })
  };

  joinToQuiz() {

    if (this.quizForm.invalid) {
      return Object.values(this.quizForm.controls).forEach(c => c.markAllAsTouched)
    }

  }
}
