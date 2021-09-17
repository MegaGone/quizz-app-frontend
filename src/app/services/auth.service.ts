import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from "rxjs/operators";

import { environment } from 'src/environments/environment';

import { RegisterUser } from '../interfaces/register-user.interface';
import { Login } from '../interfaces/login.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
}
