import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BloodRequestComponent } from './blood-request/blood-request.component';
import { BloodDonationComponent } from './blood-donation/blood-donation.component';
import { ManageBloodRequestComponent } from './manage-blood-request/manage-blood-request.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'blood-request', component: BloodRequestComponent },
  { path: 'blood-donation', component: BloodDonationComponent },
  { path: 'user-list', component: UserListComponent },
  { path: 'user-register', component: UserRegisterComponent },
  { path: 'user-edit/:id', component: UserEditComponent },
  { path: 'manage-blood-request', component: ManageBloodRequestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
