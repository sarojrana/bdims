import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = config.serverApiUrl;
  constructor(
    private http: HttpClient
  ) { }

  /**
   * login
   * @param loginDetail
   */
  login(loginDetail){
    return this.http.post<any>(this.apiUrl + 'login', loginDetail);
  }

  /**
   * logout current user
   */
  logout(){
    return this.http.post<any>(this.apiUrl + 'logout', { }, { headers: { token: this.getToken() }});
  }

  private getToken() {
    return localStorage.getItem('token');
  }

  /**
   * check if user is authenticated
   */
  isUserAuthenticated() {
    const token = localStorage.getItem('token');
    if(token) return true;
    else return false;
  }

  /**
   * check if user is admin
   */
  isUserAdmin() {
    const role = localStorage.getItem('role');
    if(role == 'ADMIN') return true;
    else return false;
  }

  /**
   * check if user id verified
   */
  isUserVerified() {
    const verified = localStorage.getItem('verified');
    if(verified == 'true') return true;
    return false;
  }
}
