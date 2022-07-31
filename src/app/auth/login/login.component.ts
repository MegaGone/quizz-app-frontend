import { AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { SpacesValidator } from 'src/app/utils';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public focus!: boolean;
  public focus1!: boolean;
  public form!: FormGroup;
  public passRegex!: RegExp;

  public auth2: any;

  constructor(private fb: FormBuilder, private router: Router, private authSvc: AuthService, private ngZone: NgZone ) {
    this.passRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
  }

  ngOnInit(): void {
    this.initForm();
  }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  initForm() {
    this.form = this.fb.group({
      email     : [ localStorage.getItem('email') || '', [Validators.required, Validators.email, SpacesValidator.containsSpace]],
      password  : ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.passRegex)]],
      remember  : [ localStorage.getItem('remember') || false ]
    })
  }

  googleInit() {
    google.accounts.id.initialize({
        client_id: "967919667922-pjp97lfh7j7j6adoudjr1r24m82gm80p.apps.googleusercontent.com",
        callback: (response: any) => this.handleCredentialResponse(response.credential)
    });
    google.accounts.id.renderButton(
        this.googleBtn.nativeElement,
        { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    console.log(response);
    
    this.authSvc.googleSignIn(response).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token)
        return this.router.navigate(['/home/myquizzes'])
      },
      err => {
        Swal.fire('Error', 'Error to sign in', 'error')
      })
  }

  login() {
  
    if(this.form.invalid){
      return Object.values(this.form.controls).forEach(control => {
        control.markAllAsTouched();
      })
    }
    
    this.authSvc.login( this.form.value ).subscribe( res => {
      
      
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
}
