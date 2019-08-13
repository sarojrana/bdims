import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blood-donation',
  templateUrl: './blood-donation.component.html',
  styleUrls: ['./blood-donation.component.css']
})
export class BloodDonationComponent implements OnInit {

  donationForm: FormGroup;
  bloodDonations = [];
  donors = [];
  donorDetail: any;
  date: Date;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.getDonors();
    this.prepareDonationForm();
    this.getBloodDonations();
    this.date = new Date();
  }

  /**
   * get donors list
   */
  getDonors() {
    this.userService.getUserList().subscribe((response) => {
      if(response.status) {
        this.donors = response.data;
      }
    })
  }

  /**
   * get Donor Detail
   */
  getDonorDetail() {
    const donorId = this.donationForm.value.userId;
    this.donorDetail = this.donors.find(donor => donor._id === donorId)
  }

  /**
   * get list of blood request
   */
  getBloodDonations() {
    this.userService.getBloodDonations().subscribe(response => {
      if(response.status) {
        this.bloodDonations = response.data;
      }
    });
  }

  /**
   * initialize user form
   */
  prepareDonationForm(){
    this.donationForm = this.fb.group({
      date: ['', Validators.required],
      userId: ['', Validators.required],
    })
  }

  get form(){ return this.donationForm.controls; }

  /**
   * request blood
   */
  bloodDonation(){
    if(this.donationForm.invalid){
      return;
    }
    this.userService.addBloodDonation(this.donationForm.value).subscribe(response => {
      if(response.status){
        Swal.fire('Success', response.message, 'success');
        this.donationForm.reset();
        this.donationForm.markAsUntouched();
        this.donorDetail = null;
        this.getBloodDonations();
      }else{
        Swal.fire('Sorry', response.message, 'error');
      }
    }, (error) => {
      Swal.fire('Sorry', error.error.message, 'error');
    });
  }

  /**
   * delete blood donation
   * @param id 
   */
  deleteDonation(id) {
    this.userService.deleteBloodDonation(id).subscribe(response => {
      if(response.status){
        Swal.fire('Success', response.message, 'success');
        this.getBloodDonations();
      }else{
        Swal.fire('Sorry', response.message, 'error');
      }
    }, (error) => {
      Swal.fire('Sorry', error.error.message, 'error');
    });
  }
}
