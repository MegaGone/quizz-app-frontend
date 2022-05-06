import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlayService, ValidationMessageService } from 'src/app/services';
import { QuizInterface, IGetQuizByCodeResponse } from 'src/app/interfaces';
import { SpacesValidator } from 'src/app/utils';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.css']
})
export class GuestComponent implements OnInit {

  public joinForm!: FormGroup;
  public code!: string;

  constructor(private http: HttpClient, private fb: FormBuilder, private playSvc: PlayService, private msgSvc: ValidationMessageService) { }

  ngOnInit(): void {
    this.getCurrentCode();
    this.initForm();
  }

  /**
   * @returns Initialize the form
   */
  initForm(): void {
    this.joinForm = this.fb.group({
      name  : ['', [Validators.required, SpacesValidator.spaces, SpacesValidator.doubleSpace]],
      email : ['', [Validators.required, Validators.email, SpacesValidator.containsSpace]]
    })
  }

  getCurrentCode() {
    this.playSvc.getCurrentCode().subscribe((res: string) => {
      this.code = res;  
    })
  }

  joinToQuiz() {
    
    if (this.joinForm.invalid) {
      return Object.values(this.joinForm.controls).forEach(c => c.markAsTouched());
    }

    const code = this.code;

    const tempData = {
      ...this.joinForm.value,
      code
    }    

    this.playSvc.joinToQuizGuest(tempData).subscribe(
      (res: IGetQuizByCodeResponse) => {
        
        if( res.Ok && res.message == 'Joined') {
          return this.msgSvc.showMessage('Joined to quiz', `${res.message.toUpperCase()}`, true)
        }

        return;
      },
      err => {
        if (!err.error.Ok && err.error.message == "You have already participate in the quiz") {
          return this.msgSvc.showMessage(`${err.error.message}`, 'ERROR', false)
        }
        
        return this.msgSvc.showMessage('Error to join to the quiz', 'ERROR', false)
      }
    )
  }

  /* ########## INPUT VALIDATIONS ########## */
  get f() {
    return this.joinForm.controls;
  }

  get invalidName() {
    return this.joinForm.get('name')?.invalid && this.joinForm.get('name')?.touched;
  }

  get invalidEmail() {
    return this.joinForm.get('email')?.invalid && this.joinForm.get('email')?.touched;
  }

}
