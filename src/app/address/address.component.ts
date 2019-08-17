import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  addressForm: FormGroup;
  provinces = [];
  districts = [];
  places = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.prepareAddressForm();
    this.fetchProvince();
    this.getProfile();
  }

  /**
   * get profile details
   */
  getProfile() {
    this.userService.getProfile().subscribe((response) => {
      if(response.status) {
        this.form['province'].setValue(response.data.province);
        this.form['place'].setValue(response.data.location); 
        this.fetchDistricts(response.data.province);
        this.form['district'].setValue(response.data.district); 
      }
    })
  }

  /**
   * initialize user form
   */
  prepareAddressForm(){
    this.addressForm = this.fb.group({
      place: ['', Validators.required],
      district: ['', Validators.required],
      province: ['', Validators.required],
      placeId : ['']
    })
  }

  get form(){ return this.addressForm.controls; }

  /**
   * set place values
   * @param place 
   */
  selectPlace(place) {
    this.form['placeId'].setValue(place.place_id);
    this.form['place'].setValue(place.description);
    this.places = [];
  }

  /**
   * update address
   */
  updateAddress(){
    if(this.addressForm.invalid){
      return;
    }
    this.userService.updateAddress(this.addressForm.value).subscribe(response => {
      if(response.status){
        Swal.fire('Success', response.message, 'success');
      }else{
        Swal.fire('Sorry', response.message, 'error');
      }
    }, (error) => {
      Swal.fire('Sorry', error.error.message, 'error');
    });
  }

  /**
   * get province list
   */
  fetchProvince() {
    this.addressService.getProvinces().subscribe(response => {
      this.provinces = response.data;
    })
  }

  /**
   * get district list by province
   * @param province 
   */
  fetchDistricts(province) {
    this.addressService.getProvinceWiseDistricts(province).subscribe(response => {
      this.districts = response.data;
    })
  }

  /**
   * get place suggestions
   */
  getPlaces() {
    this.userService.getPlaceSuggestions(this.addressForm.value.place).subscribe(response => {
      if(response.status) {
        this.places = response.data;
      }
    })
  }

}
