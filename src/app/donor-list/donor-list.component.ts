import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';

@Component({
  selector: 'app-donor-list',
  templateUrl: './donor-list.component.html',
  styleUrls: ['./donor-list.component.css']
})
export class DonorListComponent implements OnInit {

  donors = [];
  donorDetail: any;
  provinces = [];
  districts = [];
  bloodGroups = [
    { title: 'A+', value: 'Ap' },
    { title: 'A-', value: 'An' },
    { title: 'B+', value: 'Bp' },
    { title: 'B-', value: 'Bn' },
    { title: 'O+', value: 'Op' },
    { title: 'O-', value: 'On' },
    { title: 'AB+', value: 'ABp'},
    { title: 'AB-', value: 'ABn'}
  ];
  searchParams = {
    bloodGroup: '',
    gender: '',
    province: '',
    district: ''
  };

  constructor(
    private userService: UserService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.getDonorList();
    this.fetchProvince();
  }

  /**
   * get donor list
   */
  getDonorList(query?: any){
    this.userService.getDonorList(query).subscribe(response => {
      if(response.status){
        this.donors = response.data;
      }
    })
  }

  /**
   * reset search Params
   */
  clearParams(){
    this.searchParams = {
      bloodGroup: '',
      gender: '',
      province: '',
      district: ''
    }
  }

  fetchProvince() {
    this.addressService.getProvinces().subscribe(response => {
      this.provinces = response.data;
      this.fetchDistricts(this.provinces[0]);
    })
  }

  fetchDistricts(province) {
    this.addressService.getProvinceWiseDistricts(province).subscribe(response => {
      this.districts = response.data;
    })
  }
}
