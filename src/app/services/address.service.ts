import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../app.config';


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getProvinces(){
    return this.httpClient.get<any>(config.serverApiUrl + 'address/provinces');
  }

  getProvinceWiseDistricts(province){
    return this.httpClient.get<any>(config.serverApiUrl + 'address/districts/' + province);
  }
}
