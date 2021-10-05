import { Component, NgZone, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

declare const gapi: any;

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

  public auth2: any;

  constructor(private fb: FormBuilder, private router: Router, private authSvc: AuthService, private ngZone: NgZone ) { 
  }

  ngOnInit(): void {
    this.initForm();
    this.renderButton();
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

      this.router.navigate(['/home/myquizzes'])

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

  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark'
    });

    this.startApp();
  }

  startApp() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '967919667922-pjp97lfh7j7j6adoudjr1r24m82gm80p.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('my-signin2'));
    });
  };

  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser: any) => {

      const id_token = googleUser.getAuthResponse().id_token;
      
      this.authSvc.googleSignIn( id_token ).subscribe( res => {

        this.ngZone.run(() => {
          this.router.navigate(['/home/myquizzes'])
        })

      });

    }, function(error: any) {
        alert(JSON.stringify(error, undefined, 2));
    });
  }
}
