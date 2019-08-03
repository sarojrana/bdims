import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { AddressService } from '../services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blood-request',
  templateUrl: './blood-request.component.html',
  styleUrls: ['./blood-request.component.css']
})
export class BloodRequestComponent implements OnInit {

  requestForm: FormGroup;
  provinces = [];
  districts = [];
  bloodRequests = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private addressService: AddressService
  ) { }

  ngOnInit() {
    this.prepareRequestForm();
    this.fetchProvince();
    this.getBloodRequests();
  }

  /**
   * get list of blood request
   */
  getBloodRequests() {
    this.userService.getBloodRequests().subscribe(response => {
      if(response.status) {
        this.bloodRequests = response.data;
      }
    });
  }

  /**
   * initialize user form
   */
  prepareRequestForm(){
    this.requestForm = this.fb.group({
      date: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      addressId: ['', Validators.required],
      province: ['', Validators.required],
    })
  }

  get form(){ return this.requestForm.controls; }

  /**
   * request blood
   */
  requestBlood(){
    if(this.requestForm.invalid){
      return;
    }
    this.userService.createBloodRequest(this.requestForm.value).subscribe(response => {
      if(response.status){
        Swal.fire('Success', response.message, 'success');
        this.requestForm.reset();
        this.requestForm.markAsUntouched();
      }else{
        Swal.fire('Sorry', response.message, 'error');
      }
    }, (error) => {
      Swal.fire('Sorry', error.error.message, 'error');
    });
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
