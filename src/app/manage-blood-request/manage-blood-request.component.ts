import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-blood-request',
  templateUrl: './manage-blood-request.component.html',
  styleUrls: ['./manage-blood-request.component.css']
})
export class ManageBloodRequestComponent implements OnInit {

  bloodRequests = [];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getBloodRequestList();
  }

  /**
   * get list of blood request
   */
  getBloodRequestList() {
    this.userService.getBloodRequesList().subscribe(response => {
      if(response.status) {
        this.bloodRequests = response.data;
      }
    });
  }

  approveBloodRequest(id){
    this.userService.approveBloodRequest(id).subscribe(response => {
      if(response.status){
        Swal.fire('Success', response.message, 'success');
        this.getBloodRequestList();
      }else{
        Swal.fire('Sorry', response.message, 'error');
      }
    }, (error) => {
      Swal.fire('Sorry', error.error.message, 'error');
    })
  }

}
