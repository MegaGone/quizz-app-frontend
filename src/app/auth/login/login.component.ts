import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  public focus!: boolean;
  public focus1!: boolean;
  public form!: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.initForm();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login() {
    console.log('OK');
  }

  get emailValid(){
    return this.form.get('email')?.invalid && this.form.get('email')?.touched
  }
}
