import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private fb: FormBuilder, private router: Router) { 
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email     : ['', [Validators.required, Validators.email]],
      password  : ['', [Validators.required, Validators.minLength(8), Validators.pattern("^[a-zA-Z0-9_]*$")]]
    })
  }

  login() {
  
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }

    // TODO: Service to login and get JWT, 'cause JWT its can activate
    console.log(this.form.value);
    this.router.navigate(['/home/myquizzes'])

  }

  get emailValid(){
    return this.form.get('email')?.invalid && this.form.get('email')?.touched
  }

  get passwordValid () {
    return this.form.get('password')?.invalid && this.form.get('password')?.touched
  }

  get f() {
    return this.form.controls;
  }


}
