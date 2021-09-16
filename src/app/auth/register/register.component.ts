import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    // Validators.pattern("^.+\s.+$]")
    this.form = this.fb.group({
      fName:      ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9_]*$")]],
      lName:      ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9_]*$")]],
      password:   ['', [Validators.required, Validators.minLength(8)]],
      password2:  ['', [Validators.required]],
      email:      ['', [Validators.required, Validators.email]],
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

    console.log(this.form.value);
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