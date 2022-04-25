import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";

import { environment } from 'src/environments/environment';

import { RegisterUser } from '../interfaces/register-user.interface';
import { Login } from '../interfaces/login.interface';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ILoginResponse, IUser } from '../interfaces';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  public currentUserBehavor: BehaviorSubject<IUser | undefined> = new BehaviorSubject<IUser | undefined>(undefined);

  constructor(private http: HttpClient, private router: Router) {}

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

  createUser(user: RegisterUser) {

    const { fName, lName, password, email } = user;

    const tempData = {
      name: `${fName} ${lName}`,
      email,
      password
    }

    return this.http.post(`${base_url}/users`, tempData)
      .pipe(
        tap( (res: any) => {
          localStorage.setItem('token', res.token)
        })
      )
  }

  login( formData: Login ) {
    return this.http.post<ILoginResponse>(`${base_url}/auth/login`, formData)
      .pipe(
        tap( (res: ILoginResponse) => {

          this.currentUserBehavor.next(res.user);
          localStorage.setItem('token', res.token)
        })
      )
  }

  googleSignIn( token: string ) {
    // return console.log(token);
    return this.http.post(`${base_url}/auth/google`, { token })
        .pipe(
          tap( (res: any) => {
            localStorage.setItem('token', res.token)
          })
        )
  }

  // TODO: Ver porque no redirecciona de forma correcta
  logOut() {
    localStorage.removeItem('token')
    return this.router.navigate(['/auth/login'])
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
