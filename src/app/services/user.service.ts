import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { config } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = `${config.serverApiUrl}admin/`;

  constructor(
    private http: HttpClient
  ) { }

  /**
   * get user list
   * @param queryParams
   */
  getUserList(queryParams: any = {}){
    return this.http.get<any>(this.apiUrl + 'users', { params: queryParams });
  }

  /**
   * get user detail
   * @param id
   */
  getUserDetail(id){
    return this.http.get<any>(this.apiUrl + '/' + id);
  }

  /**
   * create user
   * @param userData
   */
  createUser(userData){
    return this.http.post<any>(config.serverApiUrl + 'users/register', userData);
  }

  /**
   * edit user
   * @param id
   * @param userData
   */
  editUser(id, userData){
    return this.http.put<any>(this.apiUrl + '/' + id, userData);
  }

  /**
   * delete user
   * @param id
   */
  approveUser(id){
    return this.http.post<any>(this.apiUrl + '/approveUser/' + id, {});
  }

  /**
   * create blood request
   * @param data 
   */
  createBloodRequest(data) {
    return this.http.post<any>(config.serverApiUrl + 'users/bloodRequest', data);
  }

  /**
   * get list of blood request
   */
  getBloodRequests() {
    return this.http.get<any>(config.serverApiUrl + 'users/bloodRequests');
  }
  
  /**
   * add blood donation
   * @param data 
   */
  addBloodDonation(data) {
    return this.http.post<any>(this.apiUrl + 'bloodDonation', data);
  }

  /**
   * get list of blood donations
   */
  getBloodDonations() {
    return this.http.get<any>(this.apiUrl + 'donationList');
  }

  /**
   * get list of blood request for admin
   */
  getBloodRequesList() {
    return this.http.get<any>(this.apiUrl + 'bloodRequests');
  }

  /**
   * approve blood request
   * @param id 
   */
  approveBloodRequest(id) {
    return this.http.post<any>(this.apiUrl + '/approveBloodRequest/' + id, {});
  }
}
