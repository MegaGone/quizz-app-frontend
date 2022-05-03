import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IGetQuizByCodeResponse } from 'src/app/interfaces';
import { ValidationMessageService, PlayService } from 'src/app/services';
import { Router } from '@angular/router';
import { SpacesValidator } from 'src/app/utils';
@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styles: [
  ]
})
export class NameComponent implements OnInit {

  public quizForm!: FormGroup;

  constructor(private fb: FormBuilder, private playSvc: PlayService, private msgSvc: ValidationMessageService, private router: Router) { }

  ngOnInit(): void {
    this.initQuizForm();
  }

  /**
   * Initialize quizForm
   */
  initQuizForm() {
    this.quizForm = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(7), SpacesValidator.containsSpace]]
    })
  };

  joinToQuiz() {

    if (this.quizForm.invalid) {
      return Object.values(this.quizForm.controls).forEach(c => c.markAllAsTouched)
    }

    this.playSvc.getQuizByCodeGuest(this.quizForm.value).subscribe(
      (res: IGetQuizByCodeResponse) => {
        
        if (res.Ok && res.quizDB) {
          this.playSvc.currentQuizBehavor.next(res.quizDB);
          return this.router.navigate(['/play/guest']);
        }
  
        return;
      },
      err => {
        if(!err.error.Ok) {
          return this.msgSvc.showMessage(`${err.error.message}`, 'ERROR', false) 
        }

        return this.msgSvc.showMessage('Error getting quiz', 'ERROR', false);
      }
    )  
  }

  /* ######### INPUT VALIDATION ######### */
  get f() {
    return this.quizForm.controls;
  }

  get invalidCode() {
    return this.quizForm.get('code')?.invalid && this.quizForm.get('code')?.touched;
  }
}
