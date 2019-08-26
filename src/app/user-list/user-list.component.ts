import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users = [];
  userDetail: any;
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
  };

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserList();
  }

  /**
   * get user list
   */
  getUserList(query?: any){
    this.userService.getUserList(query).subscribe(response => {
      if(response.status){
        this.users = response.data;
      }
    })
  }

  /**
   * delete user
   * @param id
   */
  deleteUser(id){
    this.userService.deleteUser(id).subscribe(response => {
      if(response.status){
        Swal.fire('Success', response.message, 'success');
        this.getUserList();
      }else{
        Swal.fire('Sorry', response.message, 'error');
      }
    }, (error) => {
      Swal.fire('Sorry', error.error.message, 'error');
    })
  }

  /**
   * update user status
   * @param id
   */
  updateUserStatus(id){
    this.userService.updateUserStatus(id).subscribe(response => {
      if(response.status){
        Swal.fire('Success', response.message, 'success');
        this.getUserList();
      }else{
        Swal.fire('Sorry', response.message, 'error');
      }
    }, (error) => {
      Swal.fire('Sorry', error.error.message, 'error');
    })
  }

  /**
   * reset search Params
   */
  clearParams(){
    this.searchParams = {
      bloodGroup: '',
      gender: '',
    }
  }

}
