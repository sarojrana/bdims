import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats: any;
  user: any;
  addressStatus: boolean = true;

  constructor(
    public auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getProfile();
    this.getStatistics();
    this.getAddressStatus();
  }

  /**
   * get profile details
   */
  getProfile() {
    this.userService.getProfile().subscribe((response) => {
      if(response.status) {
        this.user = response.data;
      }
    })
  }

  /**
   * get statistics
   */
  getStatistics() {
    this.userService.getStatistics().subscribe((response) => {
      if(response.status) {
        this.stats = response.data;
      }
    });
  }

  /**
   * get address status
   */
  getAddressStatus() {
    this.userService.checkAddressStatus().subscribe(response => {
      if(response.status && response.data == 'COMPLETE') {
        this.addressStatus = true;
      } else {
        this.addressStatus = false;
      }
    })
  }
}
