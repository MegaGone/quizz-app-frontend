import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {

  }

  /**
   * 
   * @returns JWT
   */
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  /**
   * 
   * @param id: String - UID
   * @returns Delete an user
   */
  deleteUser(id: string) {
    const token = this.getToken();

    return this.http.delete(`${base_url}/users/${id}`, {
      headers: {
        'x-token': token
      }
    })
  }
}
