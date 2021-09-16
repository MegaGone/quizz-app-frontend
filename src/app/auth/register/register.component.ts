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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    // Validators.pattern("^.+\s.+$]")
    this.form = this.fb.group({
      fName:      ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9_]*$")]],
      lName:      ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z0-9_]*$")]],
      password:   ['', [Validators.required, Validators.minLength(8), Validators.pattern("^[a-zA-Z0-9_]*$")]],
      password2:  ['', [Validators.required, Validators.minLength(8), Validators.pattern("^[a-zA-Z0-9_]*$")]],
      email:      ['', [Validators.required, Validators.email]],
      terms:      [false, Validators.requiredTrue]
    })
  }

  register() {

    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    console.log('OK');
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
    return this.form.get('terms')?.invalid && this.form.get('terms')?.touched
  }
}
