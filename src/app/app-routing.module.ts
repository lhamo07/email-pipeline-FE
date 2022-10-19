import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { MfaComponent } from './Auth/mfa/mfa.component';
import { NewPasswordComponent } from './Auth/new-password/new-password.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { SignupComponent } from './Auth/signup/signup.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForceChangePasswordComponent } from './force-change-password/force-change-password.component';
import { AuthGuard } from './guard/auth.guard';
import { SendEmailComponent } from './send-email/send-email.component';
import { SomethinggComponent } from './somethingg/somethingg.component';

const routes: Routes = [
  // { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  // { path: 'forcechnagepassword', component: ForceChangePasswordComponent },
  // { path: 'signup', component: SignupComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'new-password', component: NewPasswordComponent },
  { path: 'send-email', component: SendEmailComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'complaint', component: ComplaintComponent },
  { path: 'something', component: SomethinggComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
