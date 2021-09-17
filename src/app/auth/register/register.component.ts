import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public focus!: boolean;
  public focus2!: boolean;
  public focus3!: boolean;
  public focus4!: boolean;
  public focus5!: boolean;
  public form!: FormGroup;
  public submitted = false;

  constructor(private fb: FormBuilder, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      fName:      ['Frontend', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9_]*$")]],
      lName:      ['User1', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9_]*$")]],
      password:   ['12345678', [Validators.required, Validators.minLength(6)]],
      password2:  ['12345678', [Validators.required]],
      email:      ['jm@gmail.com', [Validators.required, Validators.email]],
      terms:      [false, Validators.requiredTrue]
    }, 
    {
      validators: [this.MustMatch('password', 'password2')]
    })
  }

  // Confirm password
  MustMatch(controlName: string, matchingControlName: string) {
    
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.MustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  register() {
    // To validate the checkbox
    this.submitted = true;

    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    this.authSvc.createUser(this.form.value).subscribe( res => {
      console.log(res);
    }, (err) => console.warn(err))
  }

  get f() {
    return this.form.controls;
  }

  get fNameValid() {
    return this.form.get('fName')?.invalid && this.form.get('fName')?.touched
  }

  get lNameValid() {
    return this.form.get('lName')?.invalid && this.form.get('lName')?.touched
  }

  get passwordValid() {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched
  }

  get password2Valid() {
    return this.form.get('password2')?.invalid && this.form.get('password2')?.touched
  }

  get emailValid() {
    return this.form.get('email')?.invalid && this.form.get('email')?.touched
  }

  get termsValid() {
    return this.form.get('terms')?.invalid
  }

}