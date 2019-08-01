import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.prepareLoginForm();
  }

  /**
   * initialize login form
   */
  prepareLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  get form() { return this.loginForm.controls; }

  /**
   * login
   */
  login(){
    this.authService.login(this.loginForm.value).subscribe(response => {
      if(response.status){
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        swal.fire('Success', response.message, 'success');
        if(response.data.role == 'ADMIN') {
          this.router.navigate(['/user-list']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      }else{
        swal.fire('Sorry', response.message, 'error');
      }
    }, (error) => {
      swal.fire('Sorry', error.error.message, 'error');
    });
  }

}
