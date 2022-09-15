import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { MfaComponent } from './Auth/mfa/mfa.component';
import { NewPasswordComponent } from './Auth/new-password/new-password.component';
import { ResetPasswordComponent } from './Auth/reset-password/reset-password.component';
import { SignupComponent } from './Auth/signup/signup.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: 'new-password', component: NewPasswordComponent},
  {path: 'mfa', component: MfaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
