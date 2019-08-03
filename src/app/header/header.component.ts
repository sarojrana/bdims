import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.authService.logout().subscribe((response) => {
      if(response.status){
        Swal.fire('Success', response.message, 'success');
        localStorage.clear();
        this.router.navigate(['/']);
      } else {
        Swal.fire('Sorry', response.message, 'error');
      }
    }, (err) => {
      Swal.fire('Sorry', err.message, 'error');
    })
  }

}
