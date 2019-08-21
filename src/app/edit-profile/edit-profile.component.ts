import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.prepareForm();
    this.getUserDetail();
  }

  /**
   * get user profile
   */
  getUserDetail() {
    this.userService.getProfile().subscribe(response => {
      if(response.status) {
        this.form['firstName'].setValue(response.data.firstName || '');
        this.form['lastName'].setValue(response.data.lastName || '');
        this.form['gender'].setValue(response.data.gender || '');
        this.form['bloodGroup'].setValue(response.data.bloodGroup || '');
        this.form['dob'].setValue(response.data.dob.split("T")[0] || '');
      }
    })
  }

  /**
   * initialize user form
   */
  prepareForm(){
    this.profileForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z][a-zA-Z\\s]+$')]],
      bloodGroup: ['', Validators.required],
      gender: ['', Validators.required],
      dob: [''],
    })
  }

  get form(){ return this.profileForm.controls; }

  /**
   * update user profile
   */
  updateProfile() {
    if(this.profileForm.invalid){
      return;
    }
    this.userService.updateProfile(this.profileForm.value).subscribe(response => {
      if(response.status){
        Swal.fire('Success', response.message, 'success');
      }else{
        Swal.fire('Sorry', response.message, 'error');
      }
    }, (error) => {
      Swal.fire('Sorry', error.error.message, 'error');
    });
  }
}
