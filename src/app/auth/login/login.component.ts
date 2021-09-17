import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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

  constructor(private fb: FormBuilder, private router: Router, private authSvc: AuthService) { 
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      email     : [ localStorage.getItem('email') || '', [Validators.required, Validators.email]],
      password  : ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[a-zA-Z0-9_]*$")]],
      remember  : [ localStorage.getItem('remember') || false ]
    })
  }

  login() {
  
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    
    this.authSvc.login( this.form.value ).subscribe( res => {
      console.log(res);
      
      if(this.form.get('remember')?.value ){
        localStorage.setItem('email', this.form.get('email')?.value )
        localStorage.setItem('remember', this.form.get('remember')?.value )
      } else {
        localStorage.removeItem('email')
        localStorage.removeItem('remember')
      }

    }, (err) => {
      console.log(err);
      Swal.fire('Error', err.error, 'error')
    })

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
