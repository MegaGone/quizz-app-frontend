import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from "rxjs/operators";

import { environment } from 'src/environments/environment';

import { RegisterUser } from '../interfaces/register-user.interface';
import { Login } from '../interfaces/login.interface';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
      map( resp => true),
      catchError( err => of(false)) // CatchError atrapa el error que va en el flujo y debuelve un nuevo Observable con un nuevo valor
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
    return this.http.post(`${base_url}/auth/login`, formData)
      .pipe(
        tap( (res: any) => {
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
}
