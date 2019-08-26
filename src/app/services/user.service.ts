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
   * get address completion status
   */
  checkAddressStatus() {
    return this.http.get<any>(`${config.serverApiUrl}users/addressStatus`);
  }

  /**
   * update user address
   * @param address 
   */
  updateAddress(address) {
    return this.http.post<any>(`${config.serverApiUrl}users/updateUserLocation`, address);
  }

  /**
   * delete user
   * @param id
   */
  deleteUser(id){
    return this.http.delete<any>(this.apiUrl + 'delete/' + id);
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
   * delete blood donation
   * @param id 
   */
  deleteBloodDonation(id) {
    return this.http.delete<any>(this.apiUrl + 'deleteDonation/' + id);
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
    return this.http.post<any>(this.apiUrl + 'approveBloodRequest/' + id, {});
  }

  /**
   * delete blood request
   * @param id 
   */
  deleteBloodRequest(id) {
    return this.http.delete<any>(this.apiUrl + 'deleteBloodRequest/' + id);
  }

  /**
   * get statistcs
   */
  getStatistics() {
    return this.http.get<any>(config.serverApiUrl + 'users/statistics');
  }

  /**
   * get profile of logged in user
   */
  getProfile() {
    return this.http.get<any>(config.serverApiUrl + 'users/profile');
  }

  /**
   * get donor list
   * @param queryParams 
   */
  getDonorList(queryParams: any = {}) {
    return this.http.get<any>(config.serverApiUrl + 'users/donors', { params: queryParams});
  }

  /**
   * get place suggestions
   * @param search 
   */
  getPlaceSuggestions(search) {
    return this.http.get<any>(`${config.serverApiUrl}users/placesAutocomplete`, { params: { search }});
  }

  /**
   * updates user profile
   * @param data 
   */
  updateProfile(data) {
    return this.http.post<any>(config.serverApiUrl + 'users/updateProfile', data);
  }

  /**
   * updates user status
   * @param id 
   */
  updateUserStatus(id) {
    return this.http.post<any>(this.apiUrl + 'changeUserStatus/' + id, {});
  }
}
