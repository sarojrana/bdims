import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  private GOOGLE_API_KEY = 'AIzaSyC5h1VY3zzly6GZ4DwoXxBs50_0lljrb84';
  private OPEN_STREET_API_KEY = '169ee4a0-7120-49f1-a81b-aaa315cde5ad';
  private googleUrl = 'https://maps.googleapis.com/maps/api/place'

  constructor(
    private http: HttpClient
  ) { }

  /**
   * get place suggestions
   * @param input 
   */
  getPlaceList(input = '') {
    const params = {
      input: input,
      language: 'en',
      components: 'country:np',
      key: this.GOOGLE_API_KEY
    };
    return this.http.get<any>(`${this.googleUrl}/autocomplete/json`, { params });
  }

  /**
   * get place detail
   * @param placeId 
   */
  getPlaceDetail(placeId) {
    const params = {
      place_id: placeId,
      fields: 'formatted_address,name,geometry',
      key: this.GOOGLE_API_KEY
    };
    return this.http.get<any>(`${this.googleUrl}/details/json`, { params });
  }
}
