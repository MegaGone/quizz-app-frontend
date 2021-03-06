import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";

import { environment } from 'src/environments/environment';

import { RegisterUser } from '../interfaces/register-user.interface';
import { Login } from '../interfaces/login.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ILoginResponse, IUser } from '../interfaces';

const base_url = environment.base_url;

declare const gapi: any;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public currentUserBehavor: BehaviorSubject<IUser | undefined> = new BehaviorSubject<IUser | undefined>(undefined);
  public auth2: any;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit();
  }

  /**
   * @returns Initialize google init
   */
  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '967919667922-pjp97lfh7j7j6adoudjr1r24m82gm80p.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });

        resolve();
      });
    });
  }

  /**
   * 
   * @returns Boolean
   */
  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${base_url}/auth/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (res: any) => {
        localStorage.setItem('token', res.token)
      }),
      map( resp => true),           // Transforma la response a true
      catchError( err => of(false)) // CatchError atrapa el error que va en el flujo y regresa un nuevo Observable con un nuevo valor en este caso False
    );

  }

  /**
   * 
   * @param user: RegisterUser - User data to create the user
   * @returns token
   */
  createUser(user: RegisterUser) {

    const { fName, lName, password, email } = user;

    const tempData = {
      name: `${fName} ${lName}`,
      email,
      password
    }

    return this.http.post(`${base_url}/users`, tempData, { headers: {}, responseType: 'text' })
      .pipe(
        tap( (res: any) => {
          localStorage.setItem('token', res.token)
        })
      )
  }

  /**
   * 
   * @param formData: Login - Credenctials
   * @returns Token and ILoginResponse
   */
  login( formData: Login ) {
    return this.http.post<ILoginResponse>(`${base_url}/auth/login`, formData)
      .pipe(
        tap( (res: ILoginResponse) => {

          this.currentUserBehavor.next(res.user);
          localStorage.setItem('token', res.token)
        })
      )
  }

  /**
   * 
   * @param token: string - Token to send to the backend
   * @returns Token and ILoginResponse
   */
  googleSignIn( token: string ) {
    return this.http.post<ILoginResponse>(`${base_url}/auth/google`, { token })
        .pipe(
          tap( (res: ILoginResponse) => {
            
            this.currentUserBehavor.next(res.user);
            localStorage.setItem('token', res.token)
          })
        )
  }

  // TODO: Ver porque no redirecciona de forma correcta
  logOut() {
    localStorage.removeItem('token')
    
    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/auth/login'])
      });
    });
  }

  /**
   * 
   * @returns Observable<IUser>
   */
  getSession(): Observable<IUser | undefined> {
    const token = localStorage.getItem('token') || '';

    if(this.currentUserBehavor.value == undefined) {
      return this.http.get<IUser>(`${base_url}/auth/session`, {
        headers: {
          'x-token': token
        }
      })
    } 

    return this.currentUserBehavor.asObservable()

  }
}
