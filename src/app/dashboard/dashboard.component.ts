import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  stats: any;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getStatistics().subscribe((response) => {
      if(response.status) {
        this.stats = response.data;
      }
    });
  }

}
