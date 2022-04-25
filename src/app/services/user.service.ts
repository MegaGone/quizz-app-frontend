import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUpdateUser } from '../interfaces/IUpdateUser';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

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
        'x-token': token,
      },
    });
  }

  /**
   * 
   * @param user: IUpdateUser - User to update
   * @returns Update the user
   */
  updateUser(user: IUpdateUser) {

    const token: string = this.getToken();

    return this.http.put(`${base_url}/users/${user.uid}`, user, {
      headers: {
        'x-token': token
      }
    })

  }


  /**
   * 
   * @param currentPassword: string - Currently password
   * @param newPassword: string - New Password
   */
  changePassword(currentPassword: string, newPassword: string) {

    const token: string = this.getToken();

    const body = {
      currentPassword,
      newPassword
    }

    return this.http.post(`${base_url}/auth/password`, body, {
      headers: {
        'x-token': token
      },
      responseType: 'text'
    })

  }

  changeImage(user: IUpdateUser, file: File) {

    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.http.put(`${base_url}/uploads/${user.uid}`, formData, {
      headers: {
        'x-token': this.getToken()
      }
    })
  }

  /**
   * 
   * @param file: File - File to upload
   * @param user: IUpdateUser - User data
   * @returns Name and image
   */
  updateUserv2(file: File, user: IUpdateUser): Observable<IUser> {

    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('name', user.name)

    return this.http.put<IUser>(`${base_url}/users/${user.uid}`, formData, {
      headers: {
        'x-token': this.getToken()
      }
    })
  }
}
